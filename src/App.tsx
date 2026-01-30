import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Onboarding pages
import OnboardingIndex from "./pages/onboarding/OnboardingIndex";
import Welcome from "./pages/onboarding/Welcome";
import Access from "./pages/onboarding/Access";
import Workflow from "./pages/onboarding/Workflow";
import Tools from "./pages/onboarding/Tools";
import Communication from "./pages/onboarding/Communication";
import Quality from "./pages/onboarding/Quality";
import Checklist from "./pages/onboarding/Checklist";

// Education pages
import EducationIndex from "./pages/education/EducationIndex";
import ModuleList from "./pages/education/ModuleList";
import ModulePage from "./pages/education/ModulePage";

// Prompt Writing modules
import {
  PromptWritingIndex,
  PromptWritingModule1,
  PromptWritingModule2,
  PromptWritingModule3,
} from "./pages/education/prompt-writing";

// Rubrics modules
import {
  RubricsIndex,
  RubricsModule1,
  RubricsModule2,
  RubricsModule3,
  RubricsModule4,
} from "./pages/education/rubrics";

// FAQ pages
import FAQIndex from "./pages/faqs/FAQIndex";
import FAQCategory from "./pages/faqs/FAQCategory";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Index />} />
            
            {/* Onboarding Routes */}
            <Route path="/onboarding" element={<OnboardingIndex />} />
            <Route path="/onboarding/welcome" element={<Welcome />} />
            <Route path="/onboarding/access" element={<Access />} />
            <Route path="/onboarding/workflow" element={<Workflow />} />
            <Route path="/onboarding/tools" element={<Tools />} />
            <Route path="/onboarding/communication" element={<Communication />} />
            <Route path="/onboarding/quality" element={<Quality />} />
            <Route path="/onboarding/checklist" element={<Checklist />} />
            
            {/* Education Routes */}
            <Route path="/education" element={<EducationIndex />} />
            
            {/* Prompt Writing Routes - Must be before wildcard routes */}
            <Route path="/education/prompt-writing" element={<PromptWritingIndex />} />
            <Route path="/education/prompt-writing/module-1" element={<PromptWritingModule1 />} />
            <Route path="/education/prompt-writing/module-2" element={<PromptWritingModule2 />} />
            <Route path="/education/prompt-writing/module-3" element={<PromptWritingModule3 />} />
            
            {/* Rubrics Routes */}
            <Route path="/education/rubrics" element={<RubricsIndex />} />
            <Route path="/education/rubrics/module-1" element={<RubricsModule1 />} />
            <Route path="/education/rubrics/module-2" element={<RubricsModule2 />} />
            <Route path="/education/rubrics/module-3" element={<RubricsModule3 />} />
            <Route path="/education/rubrics/module-4" element={<RubricsModule4 />} />
            
            {/* Generic Education Routes - After specific routes */}
            <Route path="/education/:category" element={<ModuleList />} />
            <Route path="/education/:category/:moduleId" element={<ModulePage />} />
            
            {/* FAQ Routes */}
            <Route path="/faqs" element={<FAQIndex />} />
            <Route path="/faqs/:categoryId" element={<FAQCategory />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
