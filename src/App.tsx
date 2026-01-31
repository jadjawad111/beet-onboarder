import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import LandingPage from "./pages/LandingPage";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Project Info pages
import { ProjectInfoLayout } from "./pages/project-info";

// Education pages
import { EducationLayout } from "./pages/education";

// Prompt Writing modules
import {
  PromptWritingModule1,
  PromptWritingModule2,
  PromptWritingModule3,
  PromptWritingCourse,
} from "./pages/education/prompt-writing";

// Rubrics modules
import {
  RubricsModule1,
  RubricsModule2,
  RubricsModule3,
  RubricsModule4,
} from "./pages/education/rubrics";

// Tasking Assistance
import { TaskingAssistancePage } from "./pages/tasking-assistance";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing page - full screen, no layout */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Prompt Writing Course - Full screen presentation (outside layout) */}
          <Route path="/education/prompt-writing/course" element={<PromptWritingCourse />} />
          
          {/* Main app with layout */}
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Index />} />
            
            {/* Tasking Assistance */}
            <Route path="/tasking-assistance" element={<TaskingAssistancePage />} />
            
            {/* Project Information - Single scrollable page */}
            <Route path="/project-info" element={<ProjectInfoLayout />} />
            
            {/* Education Routes */}
            <Route path="/education" element={<EducationLayout />}>
              <Route index element={null} />
              
              {/* Prompt Writing Track */}
              <Route path="prompt-writing" element={null} />
              <Route path="prompt-writing/module-1" element={<PromptWritingModule1 />} />
              <Route path="prompt-writing/module-2" element={<PromptWritingModule2 />} />
              <Route path="prompt-writing/module-3" element={<PromptWritingModule3 />} />
              
              {/* Rubrics Track */}
              <Route path="rubrics" element={null} />
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
