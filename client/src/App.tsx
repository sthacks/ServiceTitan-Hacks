import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import { initGA } from "@/lib/analytics";
import { useAnalytics } from "@/hooks/use-analytics";
import Home from "@/pages/Home";
import Partners from "@/pages/Partners";
import Sponsors from "@/pages/Sponsors";
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
import SmartACROICalculator from "@/pages/SmartACROICalculator";
import SmartACROICalculatorTest from "@/pages/SmartACROICalculatorTest";
import WinkROICalculator from "@/pages/WinkROICalculator";
import WinkROISaverCalculator from "@/pages/WinkROISaverCalculator";
import HiringROICalculator from "@/pages/HiringROICalculator";
import TruckRollCalculator from "@/pages/TruckRollCalculator";
import DashboardCourse from "@/pages/DashboardCourse";
import DashboardCourseLanding from "@/pages/DashboardCourseLanding";
import DashboardCourseContent from "@/pages/DashboardCourseContent";
import DashboardCourseCheckout from "@/pages/DashboardCourseCheckout";
import FixUglyFormsCourse from "@/pages/FixUglyFormsCourse";
import FixUglyFormsCourseDetails from "@/pages/FixUglyFormsCourseDetails";
import JobSummaryCourse from "@/pages/JobSummaryCourse";
import CompanyAppCourse from "@/pages/CompanyAppCourse";
import MakeIntegrationCourse from "@/pages/MakeIntegrationCourse";
import ZapierIntegrationCourse from "@/pages/ZapierIntegrationCourse";
import AutomationPlaybookLanding from "@/pages/AutomationPlaybookLanding";
import ServiceTitanMetricsLanding from "@/pages/ServiceTitanMetricsLanding";
import SwimlaneChartsLanding from "@/pages/SwimlaneChartsLanding";
import PricingObjectionsLanding from "@/pages/PricingObjectionsLanding";
import PurchasingPlatform from "@/pages/PurchasingPlatform";
import PartnerDetail from "@/pages/PartnerDetail";
import WinkBookDemo from "@/pages/WinkBookDemo";
import SmartACBookDemo from "@/pages/SmartACBookDemo";
import ContractorCommerceBookDemo from "@/pages/ContractorCommerceBookDemo";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import SMSPrivacyPolicy from "@/pages/SMSPrivacyPolicy";
import SMSTermsConditions from "@/pages/SMSTermsConditions";
import SponsorSummary from "@/pages/SponsorSummary";
import AclarifySponsorSummary from "@/pages/AclarifySponsorSummary";
import ReferProSponsorSummary from "@/pages/ReferProSponsorSummary";
import SponsorROICalculator from "@/pages/SponsorROICalculator";
import PropertyComProposal from "@/pages/PropertyComProposal";
import Giveaway from "@/pages/Giveaway";
import Admin from "@/pages/Admin";
import PartnerPortal from "@/pages/PartnerPortal";
import PartnerPortalAdmin from "@/pages/PartnerPortalAdmin";
import PartnerPortalAcceptInvite from "@/pages/PartnerPortalAcceptInvite";
import WebinarLandingPage from "@/pages/WebinarLandingPage";
import WinkPayrollWebinar from "@/pages/WinkPayrollWebinar";
import ContractorCommerceWebinar from "@/pages/ContractorCommerceWebinar";
import SmartACWebinar from "@/pages/SmartACWebinar";
import Events from "@/pages/Events";
import NotFound from "@/pages/not-found";

function Router() {
  useAnalytics();
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/partners" component={Partners} />
      <Route path="/sponsors" component={Sponsors} />
      <Route path="/apps" component={Tools} />
      <Route path="/courses" component={Courses} />
      <Route path="/all-access" component={AllAccess} />
      <Route path="/podcast" component={Podcast} />
      <Route path="/resources" component={Resources} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/blog" component={Blog} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/pricebook-optimizer" component={PricebookOptimizer} />
      <Route path="/smartac-roi-calculator-test" component={SmartACROICalculatorTest} />
      <Route path="/smartac-roi-calculator" component={SmartACROICalculator} />
      <Route path="/wink-roi-calculator" component={WinkROICalculator} />
      <Route path="/wink-roi-saver" component={WinkROISaverCalculator} />
      <Route path="/hiring-roi-calculator" component={HiringROICalculator} />
      <Route path="/truck-roll-calculator" component={TruckRollCalculator} />
      <Route path="/dashboard-course" component={DashboardCourse} />
      <Route path="/dashboard-course-landing" component={DashboardCourseLanding} />
      <Route path="/dashboard-course/content" component={DashboardCourseContent} />
      <Route path="/dashboard-course/checkout" component={DashboardCourseCheckout} />
      <Route path="/fix-ugly-forms-course" component={FixUglyFormsCourse} />
      <Route path="/fix-ugly-forms-course-landing" component={FixUglyFormsCourseDetails} />
      <Route path="/job-summary-course" component={JobSummaryCourse} />
      <Route path="/company-app-course" component={CompanyAppCourse} />
      <Route path="/make-integration-course" component={MakeIntegrationCourse} />
      <Route path="/zapier-integration-course" component={ZapierIntegrationCourse} />
      <Route path="/automation-playbook-landing" component={AutomationPlaybookLanding} />
      <Route path="/servicetitan-metrics-landing" component={ServiceTitanMetricsLanding} />
      <Route path="/swimlane-charts-landing" component={SwimlaneChartsLanding} />
      <Route path="/pricing-objections-landing" component={PricingObjectionsLanding} />
      <Route path="/purchasing-platform" component={PurchasingPlatform} />
      <Route path="/partners/wink-toolbox/book-demo" component={WinkBookDemo} />
      <Route path="/partners/smartac/book-demo" component={SmartACBookDemo} />
      <Route path="/partners/contractor-commerce/book-demo" component={ContractorCommerceBookDemo} />
      <Route path="/partners/:slug" component={PartnerDetail} />
      <Route path="/giveaway" component={Giveaway} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/sms-privacy-policy" component={SMSPrivacyPolicy} />
      <Route path="/sms-terms-conditions" component={SMSTermsConditions} />
      <Route path="/private/sponsor-summary-finturf" component={SponsorSummary} />
      <Route path="/private/sponsor-summary/aclarify" component={AclarifySponsorSummary} />
      <Route path="/private/sponsor-summary-referpro" component={ReferProSponsorSummary} />
      <Route path="/private/sponsor-roi-calculator" component={SponsorROICalculator} />
      <Route path="/private/proposal/property-com" component={PropertyComProposal} />
      <Route path="/admin" component={Admin} />
      <Route path="/partner-portal" component={PartnerPortal} />
      <Route path="/partner-portal/admin" component={PartnerPortalAdmin} />
      <Route path="/partner-portal/accept-invite" component={PartnerPortalAcceptInvite} />
      <Route path="/webinar/invisible-labor-market" component={WebinarLandingPage} />
      <Route path="/webinar/stop-spreadsheet-payroll" component={WinkPayrollWebinar} />
      <Route path="/webinar/upfront-pricing" component={ContractorCommerceWebinar} />
      <Route path="/webinar/membership-retention" component={SmartACWebinar} />
      <Route path="/events" component={Events} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    if (!import.meta.env.VITE_GA_MEASUREMENT_ID) {
      console.warn('Google Analytics not configured. Add VITE_GA_MEASUREMENT_ID to enable tracking.');
    } else {
      initGA();
    }
  }, []);

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
