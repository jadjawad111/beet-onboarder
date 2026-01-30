import { useState, useEffect, useRef } from "react";
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

// Section divider component
const SectionDivider = ({ number }: { number: number }) => (
  <div className="relative py-16">
    {/* Full-width line */}
    <div className="absolute inset-x-0 top-1/2 h-px bg-border" />
    
    {/* Center badge with section number */}
    <div className="relative flex justify-center">
      <div className="bg-background px-6 flex items-center gap-3">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/50" />
        <div className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
          <span className="text-sm font-bold text-primary">{number}</span>
        </div>
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/50" />
      </div>
    </div>
  </div>
);

// Animated section wrapper with scroll-triggered fade-in
const AnimatedSection = ({ 
  id, 
  children,
  sectionNumber,
  isFirst = false,
}: { 
  id: string; 
  children: React.ReactNode; 
  sectionNumber: number;
  isFirst?: boolean;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold: 0.05, rootMargin: "0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="scroll-mt-4"
    >
      {/* Section Divider - skip for first section */}
      {!isFirst && <SectionDivider number={sectionNumber} />}
      
      {/* Content with animation */}
      <div 
        className={cn(
          "transition-all duration-700 ease-out",
          isVisible 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-8"
        )}
      >
        <div className="py-8 px-6 lg:px-10">
          <div className="max-w-5xl">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectInfoLayout = () => {
  const [activeSection, setActiveSection] = useState("welcome");
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Track scroll position to highlight active section and update progress
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
          if (rect.top <= 150 && rect.bottom > 150) {
            setActiveSection(id);
            break;
          }
        }
      }
      
      // Calculate scroll progress
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Calculate which section index we're on for the step indicator
  const activeSectionIndex = sections.findIndex(s => s.id === activeSection);

  return (
    <div className="min-h-screen flex">
      {/* Sticky Sidebar - Anchor Navigation */}
      <aside className="w-72 border-r border-border bg-card flex-shrink-0">
        <div className="sticky top-0 pt-4">
          {/* Progress Header */}
          <div className="px-4 pb-4 border-b border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">On This Page</span>
              <span className="text-xs text-muted-foreground">{Math.round(scrollProgress)}%</span>
            </div>
            {/* Scroll Progress Bar */}
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-150 ease-out"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          </div>

          {/* Nav Items with step indicator line */}
          <nav className="p-2">
            <div className="relative">
              {/* Vertical progress line - positioned through center of dots */}
              <div className="absolute left-[17px] top-5 bottom-5 w-0.5 bg-muted rounded-full" />
              <div 
                className="absolute left-[17px] top-5 w-0.5 bg-primary rounded-full transition-all duration-300"
                style={{ 
                  height: `${((activeSectionIndex) / (sections.length - 1)) * 100}%`,
                  maxHeight: 'calc(100% - 40px)'
                }}
              />
              
              <div className="space-y-1 relative">
                {sections.map((item, index) => {
                  const active = activeSection === item.id;
                  const passed = index <= activeSectionIndex;
                  const Icon = item.icon;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm text-left",
                        active 
                          ? "bg-primary/10 text-primary" 
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {/* Step dot - line goes through center */}
                      <div className={cn(
                        "w-3 h-3 rounded-full border-2 transition-colors flex-shrink-0 bg-background z-10",
                        passed 
                          ? "border-primary bg-primary" 
                          : "border-muted-foreground/30"
                      )} />
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>
        </div>
      </aside>

      {/* Content Area - All sections stacked */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <ContentHeader 
          title="Project Information"
          subtitle="Everything you need to get started"
        />

        {/* Scrollable Content with all sections */}
        <div className="flex-1 overflow-y-auto">
          {/* Welcome Section */}
          <AnimatedSection id="welcome" sectionNumber={1} isFirst>
            <WelcomePage />
          </AnimatedSection>
          
          {/* Access Section */}
          <AnimatedSection id="access" sectionNumber={2}>
            <AccessPage />
          </AnimatedSection>
          
          {/* Workflow Section */}
          <AnimatedSection id="workflow" sectionNumber={3}>
            <WorkflowPage />
          </AnimatedSection>
          
          {/* Tools Section */}
          <AnimatedSection id="tools" sectionNumber={4}>
            <ToolsPage />
          </AnimatedSection>
          
          {/* FAQs Section */}
          <AnimatedSection id="faqs" sectionNumber={5}>
            <FAQsPage />
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfoLayout;
