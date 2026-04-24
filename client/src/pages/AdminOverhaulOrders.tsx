import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, ArrowLeft, CheckCircle, Clock, Package, ExternalLink } from "lucide-react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Link } from "wouter";

type OrderStatus = "received" | "in_progress" | "complete";

interface OverhaulOrder {
  id: string;
  email: string;
  firstName: string | null;
  status: OrderStatus;
  fileName: string;
  downloadUrl: string | null;
  notes: string | null;
  submittedAt: string;
  updatedAt: string;
}

const STATUS_LABELS: Record<OrderStatus, string> = {
  received: "Received",
  in_progress: "In Progress",
  complete: "Complete",
};

const STATUS_VARIANTS: Record<OrderStatus, "default" | "secondary" | "outline"> = {
  received: "outline",
  in_progress: "secondary",
  complete: "default",
};

function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <Badge variant={STATUS_VARIANTS[status] ?? "outline"} data-testid={`badge-status-${status}`}>
      {STATUS_LABELS[status] ?? status}
    </Badge>
  );
}

function OrderRow({ order }: { order: OverhaulOrder }) {
  const { toast } = useToast();
  const [editStatus, setEditStatus] = useState<OrderStatus>(order.status);
  const [editUrl, setEditUrl] = useState(order.downloadUrl || "");
  const [isDirty, setIsDirty] = useState(false);

  const updateMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("PATCH", `/api/admin/overhaul-orders/${order.id}`, {
        status: editStatus,
        downloadUrl: editUrl.trim() || null,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/overhaul-orders"] });
      setIsDirty(false);
      toast({ title: "Order updated", description: "Changes saved successfully." });
    },
    onError: (err: any) => {
      toast({
        title: "Update failed",
        description: err.message || "Could not save changes.",
        variant: "destructive",
      });
    },
  });

  const handleStatusChange = (val: string) => {
    setEditStatus(val as OrderStatus);
    setIsDirty(true);
  };

  const handleUrlChange = (val: string) => {
    setEditUrl(val);
    setIsDirty(true);
  };

  return (
    <TableRow data-testid={`row-order-${order.id}`}>
      <TableCell className="font-medium text-sm">
        <div>{order.email}</div>
        <div className="text-muted-foreground text-xs mt-0.5">
          {format(new Date(order.submittedAt), "MMM d, yyyy")}
        </div>
      </TableCell>
      <TableCell>
        <StatusBadge status={order.status} />
      </TableCell>
      <TableCell className="text-sm text-muted-foreground truncate max-w-[180px]">
        {order.fileName}
      </TableCell>
      <TableCell>
        <Select value={editStatus} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[140px]" data-testid={`select-status-${order.id}`}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="received">Received</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="complete">Complete</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Input
            value={editUrl}
            onChange={e => handleUrlChange(e.target.value)}
            placeholder="https://..."
            className="w-[220px] text-sm"
            data-testid={`input-download-url-${order.id}`}
          />
          {order.downloadUrl && (
            <a
              href={order.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground"
              data-testid={`link-open-download-${order.id}`}
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </TableCell>
      <TableCell>
        <Button
          size="sm"
          disabled={!isDirty || updateMutation.isPending}
          onClick={() => updateMutation.mutate()}
          data-testid={`button-save-order-${order.id}`}
        >
          {updateMutation.isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : "Save"}
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default function AdminOverhaulOrders() {
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      setLocation("/");
    }
  }, [authLoading, isAuthenticated, setLocation]);

  const { data, isLoading } = useQuery<{ orders: OverhaulOrder[] }>({
    queryKey: ["/api/admin/overhaul-orders"],
    enabled: isAuthenticated && !!user?.isAdmin,
  });

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (!user?.isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center max-w-sm p-8">
          <h2 className="text-xl font-bold mb-2">Access Denied</h2>
          <p className="text-muted-foreground mb-4">You don't have permission to view this page.</p>
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const orders = data?.orders ?? [];
  const counts = {
    received: orders.filter(o => o.status === "received").length,
    in_progress: orders.filter(o => o.status === "in_progress").length,
    complete: orders.filter(o => o.status === "complete").length,
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/admin">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="link-back-admin">
              <ArrowLeft className="h-4 w-4" />
              Back to Admin
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Pricebook Overhaul Orders</h1>
            <p className="text-muted-foreground text-sm">Manage customer overhaul orders and send completed files</p>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Received</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="count-received">{counts.received}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="count-in-progress">{counts.in_progress}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Complete</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="count-complete">{counts.complete}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Orders</CardTitle>
            <CardDescription>
              Update order status and add a download URL. When you save an order as "Complete" with a download URL, the customer will automatically receive an email.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground" data-testid="text-no-orders">
                No overhaul orders yet.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Current Status</TableHead>
                    <TableHead>File</TableHead>
                    <TableHead>Update Status</TableHead>
                    <TableHead>Download URL</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map(order => (
                    <OrderRow key={order.id} order={order} />
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
