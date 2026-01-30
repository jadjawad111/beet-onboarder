import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { 
  Home,
  KeyRound,
  Route,
  Wrench,
  HelpCircle,
  type LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import ContentHeader from "@/components/layout/ContentHeader";

// Import section content directly
import WelcomePage from "./WelcomePage";
import AccessPage from "./AccessPage";
import WorkflowPage from "./WorkflowPage";
import ToolsPage from "./ToolsPage";
import FAQsPage from "./FAQsPage";

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

const sections: NavItem[] = [
  { id: "welcome", label: "Welcome & Overview", icon: Home },
  { id: "access", label: "Access & Setup", icon: KeyRound },
  { id: "workflow", label: "Workflow Guide", icon: Route },
  { id: "tools", label: "Tools & Resources", icon: Wrench },
  { id: "faqs", label: "FAQs", icon: HelpCircle },
];

const ProjectInfoLayout = () => {
  const [activeSection, setActiveSection] = useState("welcome");
  
  // Track scroll position to highlight active section
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(s => ({
        id: s.id,
        element: document.getElementById(s.id)
      }));
      
      // Find the section currently in view
      for (const { id, element } of sectionElements) {
        if (element) {
          const rect = element.getBoundingClientRect();
          // Section is active if its top is near the top of viewport
          if (rect.top <= 150 && rect.bottom > 150) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sticky Sidebar - Anchor Navigation */}
      <aside className="w-72 border-r border-border bg-card flex-shrink-0">
        <div className="sticky top-0 pt-4">
          {/* Header */}
          <div className="px-4 pb-4 border-b border-border">
            <span className="text-sm font-medium text-foreground">On This Page</span>
          </div>

          {/* Nav Items */}
          <nav className="p-2">
            <div className="space-y-1">
              {sections.map((item) => {
                const active = activeSection === item.id;
                const Icon = item.icon;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={cn(
                      "w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm text-left",
                      active 
                        ? "bg-primary/10 text-primary" 
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      </aside>

      {/* Content Area - All sections stacked */}
      <div className="flex-1 flex flex-col">
        <ContentHeader 
          title="Project Information"
          subtitle="Everything you need to get started"
        />

        {/* Scrollable Content with all sections */}
        <div className="flex-1 p-6 lg:p-10">
          <div className="max-w-5xl space-y-0">
            {/* Welcome Section */}
            <section id="welcome" className="scroll-mt-8 pb-16">
              <WelcomePage />
            </section>
            
            {/* Section Divider */}
            <div className="relative py-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary/30" />
              </div>
            </div>
            
            {/* Access Section */}
            <section id="access" className="scroll-mt-8 py-16">
              <AccessPage />
            </section>
            
            {/* Section Divider */}
            <div className="relative py-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary/30" />
              </div>
            </div>
            
            {/* Workflow Section */}
            <section id="workflow" className="scroll-mt-8 py-16">
              <WorkflowPage />
            </section>
            
            {/* Section Divider */}
            <div className="relative py-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary/30" />
              </div>
            </div>
            
            {/* Tools Section */}
            <section id="tools" className="scroll-mt-8 py-16">
              <ToolsPage />
            </section>
            
            {/* Section Divider */}
            <div className="relative py-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary/30" />
              </div>
            </div>
            
            {/* FAQs Section */}
            <section id="faqs" className="scroll-mt-8 pt-16 pb-8">
              <FAQsPage />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfoLayout;
