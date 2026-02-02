import { useState, useMemo, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronRight, BookOpen, GraduationCap, HelpCircle, Rocket, FileText, PenTool, Box, Home, Lock, AlertTriangle, X, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useModule2Completion, checkModule2Completion } from "@/hooks/useModule2Completion";
import { Button } from "@/components/ui/button";

interface NavItem {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: NavItem[];
  requiresModule2?: boolean;
  requiresRubricsModule?: number; // 1 = requires Module 1 complete, 2 = requires Module 2 complete, etc.
  locked?: boolean; // Completely locked, not accessible
  showOverlay?: boolean; // Show overlay instead of navigating
  trackProgress?: "onboarding" | "prompt-writing" | "rubrics"; // Track progress for this section
}

// Helper to get progress for each track
const getTrackProgress = (track: string): { completed: number; total: number } => {
  switch (track) {
    case "onboarding": {
      const pages = ["welcome", "access", "workflow", "tools", "communication"];
      const completed = pages.filter(page => 
        localStorage.getItem(`onboarding-${page}-visited`) === "true"
      ).length;
      return { completed, total: pages.length };
    }
    case "prompt-writing": {
      let completed = 0;
      // Module 1 - complete if they've started Module 2
      const module2Status = checkModule2Completion();
      if (localStorage.getItem("prompt-module-1-complete") === "true" || module2Status.promptsRead > 0) completed++;
      // Module 2 - uses complex completion check
      if (module2Status.isComplete) completed++;
      if (localStorage.getItem("prompt-module-3-complete") === "true") completed++;
      return { completed, total: 3 };
    }
    case "rubrics": {
      let completed = 0;
      if (localStorage.getItem("rubrics-module-1-complete") === "true") completed++;
      if (localStorage.getItem("rubrics-module-2-complete") === "true") completed++;
      if (localStorage.getItem("rubrics-module-3-complete") === "true") completed++;
      if (localStorage.getItem("rubrics-module-4-complete") === "true") completed++;
      return { completed, total: 4 };
    }
    default:
      return { completed: 0, total: 0 };
  }
};

// Helper to check if a specific page/module is complete
const isPageComplete = (href: string): boolean => {
  // Onboarding pages
  if (href === "/onboarding/welcome") return localStorage.getItem("onboarding-welcome-visited") === "true";
  if (href === "/onboarding/access") return localStorage.getItem("onboarding-access-visited") === "true";
  if (href === "/onboarding/workflow") return localStorage.getItem("onboarding-workflow-visited") === "true";
  if (href === "/onboarding/tools") return localStorage.getItem("onboarding-tools-visited") === "true";
  if (href === "/onboarding/communication") return localStorage.getItem("onboarding-communication-visited") === "true";
  
  // Prompt Writing modules
  // Module 1 - check if user has navigated to Module 2 (implying they completed Module 1)
  if (href === "/education/prompt-writing/module-1") {
    return localStorage.getItem("prompt-module-1-complete") === "true" || 
           checkModule2Completion().promptsRead > 0; // If they've started Module 2, they completed Module 1
  }
  // Module 2 - uses complex completion check
  if (href === "/education/prompt-writing/module-2") {
    return checkModule2Completion().isComplete;
  }
  if (href === "/education/prompt-writing/module-3") return localStorage.getItem("prompt-module-3-complete") === "true";
  
  // Rubrics modules
  if (href === "/education/rubrics/module-1") return localStorage.getItem("rubrics-module-1-complete") === "true";
  if (href === "/education/rubrics/module-2") return localStorage.getItem("rubrics-module-2-complete") === "true";
  if (href === "/education/rubrics/module-3") return localStorage.getItem("rubrics-module-3-complete") === "true";
  if (href === "/education/rubrics/module-4") return localStorage.getItem("rubrics-module-4-complete") === "true";
  
  return false;
};

const navigation: NavItem[] = [
  {
    title: "Project Onboarding",
    href: "/onboarding",
    icon: Rocket,
    trackProgress: "onboarding",
    children: [
      { title: "Welcome", href: "/onboarding/welcome" },
      { title: "Context Sharing, Beet 1.0", href: "/onboarding/access" },
      { title: "Getting Set Up", href: "/onboarding/workflow" },
      { title: "Assessment Information", href: "/onboarding/tools" },
      { title: "Communication & Support", href: "/onboarding/communication" },
    ],
  },
  {
    title: "Prompt Writing Instructions",
    href: "/instructions/prompt-writing",
    icon: PenTool,
  },
  {
    title: "Rubric Writing Instructions",
    href: "/instructions/rubric-writing",
    icon: FileText,
  },
  {
    title: "Beet 2.0 Education",
    href: "/education",
    icon: GraduationCap,
    children: [
      {
        title: "Prompt Writing",
        href: "/education/prompt-writing",
        icon: PenTool,
        trackProgress: "prompt-writing",
        children: [
          { title: "Introduction: Knowledge Work Gap", href: "/education/prompt-writing/module-1" },
          { title: "Unpacking the Beet 2.0 Prompt", href: "/education/prompt-writing/module-2" },
          { title: "Validation Checklist", href: "/education/prompt-writing/module-3", requiresModule2: true },
        ],
      },
      {
        title: "Rubrics Creation",
        href: "/education/rubrics",
        icon: Box,
        trackProgress: "rubrics",
        children: [
          { title: "Rubric Introduction", href: "/education/rubrics/module-1" },
          { title: "Anatomy of a Rubric", href: "/education/rubrics/module-2", requiresRubricsModule: 1 },
          { title: "General Rubric Errors", href: "/education/rubrics/module-3", requiresRubricsModule: 2 },
          { title: "Rubric Checklist", href: "/education/rubrics/module-4" },
        ],
      },
      {
        title: "Beet Specific Project Instructions",
        href: "/education/general",
        icon: BookOpen,
        locked: true,
        children: [
          { title: "Module 1", href: "/education/general/module-1" },
          { title: "Module 2", href: "/education/general/module-2" },
          { title: "Module 3", href: "/education/general/module-3" },
          { title: "Module 4", href: "/education/general/module-4" },
        ],
      },
    ],
  },
  {
    title: "FAQs",
    href: "/faqs",
    icon: HelpCircle,
    showOverlay: true,
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItemComponentProps {
  item: NavItem;
  depth?: number;
  onLockedClick?: (message: string) => void;
  onFAQClick?: () => void;
  isModule2Complete?: boolean;
  rubricsModulesComplete?: number[]; // Array of completed rubrics module numbers [1, 2, ...]
}

const NavItemComponent = ({ 
  item, 
  depth = 0, 
  onLockedClick,
  onFAQClick,
  isModule2Complete = false,
  rubricsModulesComplete = []
}: NavItemComponentProps) => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(
    location.pathname.startsWith(item.href)
  );
  const hasChildren = item.children && item.children.length > 0;
  const isActive = location.pathname === item.href;
  const isParentActive = location.pathname.startsWith(item.href);
  const Icon = item.icon;

  // Auto-expand when user navigates into this section
  useEffect(() => {
    if (location.pathname.startsWith(item.href) && hasChildren) {
      setIsExpanded(true);
    }
  }, [location.pathname, item.href, hasChildren]);

  // Get progress for this track if applicable
  const progress = item.trackProgress ? getTrackProgress(item.trackProgress) : null;
  const isComplete = progress && progress.completed === progress.total && progress.total > 0;

  // Check if locked due to Prompt Writing Module 2 requirement
  const isLockedPromptWriting = item.requiresModule2 && !isModule2Complete;
  
  // Check if locked due to Rubrics module requirement
  const isLockedRubrics = item.requiresRubricsModule !== undefined && 
    !rubricsModulesComplete.includes(item.requiresRubricsModule);
  
  // Check if explicitly locked
  const isExplicitlyLocked = item.locked === true;
  
  const isLocked = isLockedPromptWriting || isLockedRubrics || isExplicitlyLocked;
  
  const getLockedMessage = () => {
    if (isExplicitlyLocked) {
      return "This content is coming soon";
    }
    if (isLockedPromptWriting) {
      return "Complete previous section requirements first";
    }
    if (isLockedRubrics) {
      return `Complete Rubrics Module ${item.requiresRubricsModule} first`;
    }
    return "Complete the previous module first";
  };

  // Progress badge component
  const ProgressBadge = () => {
    if (!progress || progress.total === 0) return null;
    
    if (isComplete) {
      return (
        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/15 text-primary text-xs font-medium">
          <CheckCircle2 className="h-3 w-3" />
          Done
        </span>
      );
    }
    
    return (
      <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-medium">
        {progress.completed}/{progress.total}
      </span>
    );
  };

  // For locked items with children, show as non-expandable locked item
  if (isLocked && hasChildren) {
    return (
      <div>
        <button
          onClick={() => onLockedClick?.(getLockedMessage())}
          className={cn(
            "nav-link w-full opacity-50 cursor-not-allowed",
          )}
          style={{ paddingLeft: `${12 + depth * 16}px` }}
        >
          {Icon && <Icon className="h-5 w-5 flex-shrink-0" />}
          <span className={cn("flex-1 text-sm leading-tight", depth === 0 && "font-semibold text-base")}>{item.title}</span>
          <Lock className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
      </div>
    );
  }

  // For items with showOverlay, render a button that triggers overlay
  if (item.showOverlay) {
    return (
      <div>
        <button
          onClick={() => onFAQClick?.()}
          className={cn(
            "nav-link text-sm w-full text-left",
            isActive && "nav-link-active"
          )}
          style={{ paddingLeft: `${12 + depth * 16}px` }}
        >
          {Icon && <Icon className="h-5 w-5 flex-shrink-0" />}
          <span className={cn("flex-1 leading-tight", depth === 0 && "font-semibold text-base")}>{item.title}</span>
        </button>
      </div>
    );
  }

  // For items without children, render a simple link
  if (!hasChildren) {
    const itemComplete = isPageComplete(item.href);
    
    if (isLocked && !itemComplete) {
      return (
        <div>
          <button
            onClick={() => onLockedClick?.(getLockedMessage())}
            className={cn(
              "nav-link text-sm w-full opacity-60 cursor-not-allowed justify-between",
            )}
            style={{ paddingLeft: `${12 + depth * 16}px` }}
          >
            <span className="leading-tight">{item.title}</span>
            <Lock className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
          </button>
        </div>
      );
    }
    
    return (
      <div>
        <Link 
          to={item.href} 
          className={cn(
            "nav-link text-sm justify-between",
            isActive && "nav-link-active"
          )}
          style={{ paddingLeft: `${12 + depth * 16}px` }}
        >
          <div className="flex items-center gap-2 min-w-0">
            {Icon && <Icon className="h-5 w-5 flex-shrink-0" />}
            <span className="leading-tight">{item.title}</span>
          </div>
          {itemComplete && (
            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
          )}
        </Link>
      </div>
    );
  }

  // For items with children, show expandable section
  return (
    <div>
      <div
        className={cn(
          "nav-link cursor-pointer",
          isActive && "nav-link-active",
          !isActive && isParentActive && depth === 0 && "bg-sidebar-accent/50"
        )}
        style={{ paddingLeft: `${12 + depth * 16}px` }}
      >
        <div className="flex items-center gap-2 w-full">
          <Link 
            to={item.href} 
            className="flex items-center gap-3 flex-1 min-w-0"
            onClick={(e) => e.stopPropagation()}
          >
            {Icon && <Icon className="h-5 w-5 flex-shrink-0" />}
            <span className={cn("text-sm leading-tight", depth === 0 && "font-semibold text-base text-sidebar-foreground")}>{item.title}</span>
          </Link>
          {item.trackProgress ? <ProgressBadge /> : isPageComplete(item.href) && (
            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
          )}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-sidebar-accent rounded"
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 flex-shrink-0" />
            ) : (
              <ChevronRight className="h-4 w-4 flex-shrink-0" />
            )}
          </button>
        </div>
      </div>
      {hasChildren && (
        <div
          className={cn(
            "overflow-hidden transition-all duration-200 ease-out",
            isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          {item.children!.map((child) => (
            <NavItemComponent 
              key={child.href} 
              item={child} 
              depth={depth + 1} 
              onLockedClick={onLockedClick}
              isModule2Complete={isModule2Complete}
              rubricsModulesComplete={rubricsModulesComplete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const module2Status = useModule2Completion();
  const [showLockedToast, setShowLockedToast] = useState(false);
  const [lockedMessage, setLockedMessage] = useState("");
  const [showFAQOverlay, setShowFAQOverlay] = useState(false);

  // Build array of completed rubrics modules - read directly from localStorage for consistency
  const rubricsModulesComplete: number[] = [];
  if (localStorage.getItem("rubrics-module-1-complete") === "true") {
    rubricsModulesComplete.push(1);
  }
  if (localStorage.getItem("rubrics-module-2-complete") === "true") {
    rubricsModulesComplete.push(2);
  }
  if (localStorage.getItem("rubrics-module-3-complete") === "true") {
    rubricsModulesComplete.push(3);
  }
  if (localStorage.getItem("rubrics-module-4-complete") === "true") {
    rubricsModulesComplete.push(4);
  }

  const handleLockedClick = (message: string) => {
    setLockedMessage(message);
    setShowLockedToast(true);
    setTimeout(() => setShowLockedToast(false), 3000);
  };

  const handleFAQClick = () => {
    setShowFAQOverlay(true);
  };

  const handleGoToCommunication = () => {
    setShowFAQOverlay(false);
    navigate("/onboarding/communication");
  };

  return (
    <>
      {/* FAQ Overlay */}
      {showFAQOverlay && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
            onClick={() => setShowFAQOverlay(false)}
          />
          
          {/* Modal */}
          <div className="relative z-10 w-full max-w-md mx-4 p-6 rounded-2xl bg-card border-2 border-border shadow-2xl animate-fade-in">
            <button
              onClick={() => setShowFAQOverlay(false)}
              className="absolute top-4 right-4 p-1 rounded-lg hover:bg-muted transition-colors"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center">
                <HelpCircle className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground">FAQs Coming Soon</h2>
            </div>
            
            <p className="text-muted-foreground mb-6">
              More detailed FAQs are in progress. For now, please visit <strong className="text-foreground">Communication & Support</strong> for help and resources.
            </p>
            
            <Button
              onClick={handleGoToCommunication}
              className="w-full gap-2 bg-gradient-to-r from-primary to-primary/80 hover:opacity-90"
            >
              Go to Communication & Support
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Locked toast notification */}
      {showLockedToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] animate-fade-in">
          <div className="flex items-center gap-3 px-5 py-3 rounded-xl border-2 border-warning bg-card shadow-lg">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <div className="text-sm">
              <p className="font-semibold text-foreground">Module locked</p>
              <p className="text-muted-foreground">{lockedMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-72 bg-sidebar border-r border-sidebar-border transition-transform duration-300",
          "lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 lg:flex-shrink-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center border-b border-sidebar-border px-4 lg:hidden">
          <h2 className="text-lg font-semibold text-primary">Project Beet 2.0</h2>
        </div>

        <nav className="h-[calc(100%-4rem)] overflow-y-auto p-4 lg:h-full lg:pt-6">
          {/* Home Button */}
          <Link
            to="/"
            className="flex items-center gap-3 mb-4 px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
          >
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Home className="h-5 w-5" />
            </div>
            <span className="text-base">Home</span>
          </Link>
          
          <div className="space-y-1">
            {navigation.map((item) => (
              <NavItemComponent 
                key={item.href} 
                item={item} 
                onLockedClick={handleLockedClick}
                onFAQClick={handleFAQClick}
                isModule2Complete={module2Status.isComplete}
                rubricsModulesComplete={rubricsModulesComplete}
              />
            ))}
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
