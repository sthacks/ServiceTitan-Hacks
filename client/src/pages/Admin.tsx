import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, ShieldOff, Loader2 } from "lucide-react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface CoursePurchase {
  id: string;
  userId: string;
  courseId: string;
  amount: number;
  stripePaymentIntentId: string | null;
  purchasedAt: Date;
}

interface UserWithPurchases {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  profileImageUrl: string | null;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
  purchases: CoursePurchase[];
}

export default function Admin() {
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: users, isLoading: usersLoading } = useQuery<UserWithPurchases[]>({
    queryKey: ["/api/admin/users"],
    enabled: isAuthenticated,
  });

  const toggleAdminMutation = useMutation({
    mutationFn: async ({ userId, isAdmin }: { userId: string; isAdmin: boolean }) => {
      const response = await fetch(`/api/admin/users/${userId}/admin`, {
        method: "PATCH",
        body: JSON.stringify({ isAdmin }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update admin status");
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({
        title: "Success",
        description: "User admin status updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update admin status",
        variant: "destructive",
      });
    },
  });

  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" data-testid="loader-auth" />
      </div>
    );
  }

  if (!isAuthenticated) {
    setLocation("/api/login");
    return null;
  }

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">Access Denied</CardTitle>
            <CardDescription>You don't have permission to access this page.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setLocation("/")} data-testid="button-home">
              Go Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2" data-testid="heading-admin">
            Admin Dashboard
          </h1>
          <p className="text-gray-400">Manage users and their permissions</p>
        </div>

        {usersLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" data-testid="loader-users" />
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>All Users</CardTitle>
              <CardDescription>
                {users?.length || 0} total users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Admin</TableHead>
                      <TableHead>Purchases</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users?.map((user) => (
                      <TableRow key={user.id} data-testid={`row-user-${user.id}`}>
                        <TableCell className="font-medium" data-testid={`text-email-${user.id}`}>
                          {user.email || "N/A"}
                        </TableCell>
                        <TableCell data-testid={`text-name-${user.id}`}>
                          {user.firstName && user.lastName
                            ? `${user.firstName} ${user.lastName}`
                            : user.firstName || user.lastName || "N/A"}
                        </TableCell>
                        <TableCell data-testid={`text-admin-${user.id}`}>
                          {user.isAdmin ? (
                            <Badge variant="default" className="bg-primary">
                              <Shield className="h-3 w-3 mr-1" />
                              Admin
                            </Badge>
                          ) : (
                            <Badge variant="secondary">User</Badge>
                          )}
                        </TableCell>
                        <TableCell data-testid={`text-purchases-${user.id}`}>
                          {user.purchases.length > 0 ? (
                            <div className="flex flex-col gap-1">
                              {user.purchases.map((purchase) => (
                                <Badge key={purchase.id} variant="outline">
                                  {purchase.courseId}
                                </Badge>
                              ))}
                            </div>
                          ) : (
                            <span className="text-gray-500">None</span>
                          )}
                        </TableCell>
                        <TableCell data-testid={`text-joined-${user.id}`}>
                          {format(new Date(user.createdAt), "MMM d, yyyy")}
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant={user.isAdmin ? "destructive" : "default"}
                            onClick={() =>
                              toggleAdminMutation.mutate({
                                userId: user.id,
                                isAdmin: !user.isAdmin,
                              })
                            }
                            disabled={toggleAdminMutation.isPending}
                            data-testid={`button-toggle-admin-${user.id}`}
                          >
                            {toggleAdminMutation.isPending ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : user.isAdmin ? (
                              <>
                                <ShieldOff className="h-4 w-4 mr-1" />
                                Remove Admin
                              </>
                            ) : (
                              <>
                                <Shield className="h-4 w-4 mr-1" />
                                Make Admin
                              </>
                            )}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {users?.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                          No users found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
