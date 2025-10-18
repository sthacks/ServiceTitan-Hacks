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
import PricebookOptimizer from "@/pages/PricebookOptimizer";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
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
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/pricebook-optimizer" component={PricebookOptimizer} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
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
