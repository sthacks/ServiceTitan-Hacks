import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Partners from "@/pages/Partners";
import Tools from "@/pages/Tools";
import Courses from "@/pages/Courses";
import AllAccess from "@/pages/AllAccess";
import Podcast from "@/pages/Podcast";
import Resources from "@/pages/Resources";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import PricebookOptimizer from "@/pages/PricebookOptimizer";
import DashboardCourse from "@/pages/DashboardCourse";
import DashboardCourseContent from "@/pages/DashboardCourseContent";
import DashboardCourseCheckout from "@/pages/DashboardCourseCheckout";
import FixUglyFormsCourse from "@/pages/FixUglyFormsCourse";
import PurchasingPlatform from "@/pages/PurchasingPlatform";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/partners" component={Partners} />
      <Route path="/tools" component={Tools} />
      <Route path="/courses" component={Courses} />
      <Route path="/all-access" component={AllAccess} />
      <Route path="/podcast" component={Podcast} />
      <Route path="/resources" component={Resources} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/blog" component={Blog} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/pricebook-optimizer" component={PricebookOptimizer} />
      <Route path="/dashboard-course" component={DashboardCourse} />
      <Route path="/dashboard-course/content" component={DashboardCourseContent} />
      <Route path="/dashboard-course/checkout" component={DashboardCourseCheckout} />
      <Route path="/fix-ugly-forms-course" component={FixUglyFormsCourse} />
      <Route path="/purchasing-platform" component={PurchasingPlatform} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
