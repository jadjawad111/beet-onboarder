import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Project Info pages
import {
  ProjectInfoLayout,
  WelcomePage,
  AccessPage,
  WorkflowPage,
  ToolsPage,
  FAQsPage,
} from "./pages/project-info";

// Education pages
import { EducationLayout } from "./pages/education";

// Prompt Writing modules
import {
  PromptWritingModule1,
  PromptWritingModule2,
  PromptWritingModule3,
} from "./pages/education/prompt-writing";

// Rubrics modules
import {
  RubricsModule1,
  RubricsModule2,
  RubricsModule3,
  RubricsModule4,
} from "./pages/education/rubrics";

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
            
            {/* Project Information Routes */}
            <Route path="/project-info" element={<ProjectInfoLayout />}>
              <Route index element={null} />
              <Route path="welcome" element={<WelcomePage />} />
              <Route path="access" element={<AccessPage />} />
              <Route path="workflow" element={<WorkflowPage />} />
              <Route path="tools" element={<ToolsPage />} />
              <Route path="faqs" element={<FAQsPage />} />
            </Route>
            
            {/* Education Routes */}
            <Route path="/education" element={<EducationLayout />}>
              <Route index element={null} />
              
              {/* Prompt Writing Track */}
              <Route path="prompt-writing/module-1" element={<PromptWritingModule1 />} />
              <Route path="prompt-writing/module-2" element={<PromptWritingModule2 />} />
              <Route path="prompt-writing/module-3" element={<PromptWritingModule3 />} />
              
              {/* Rubrics Track */}
              <Route path="rubrics/module-1" element={<RubricsModule1 />} />
              <Route path="rubrics/module-2" element={<RubricsModule2 />} />
              <Route path="rubrics/module-3" element={<RubricsModule3 />} />
              <Route path="rubrics/module-4" element={<RubricsModule4 />} />
            </Route>

            {/* Redirects for old routes */}
            <Route path="/onboarding/*" element={<Navigate to="/project-info" replace />} />
            <Route path="/faqs" element={<Navigate to="/project-info/faqs" replace />} />
            <Route path="/tools" element={<Navigate to="/project-info/tools" replace />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
