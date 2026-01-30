import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import CoachPanel from "./CoachPanel";
import { cn } from "@/lib/utils";

interface ModuleLayoutProps {
  moduleId: string;
  sections: Array<{
    id: string;
    title: string;
    anchor: string;
  }>;
  reminders?: string[];
  children: React.ReactNode;
}

const ModuleLayout = ({ moduleId, sections, reminders, children }: ModuleLayoutProps) => {
  const isMobile = useIsMobile();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  if (isMobile) {
    return (
      <div className="relative">
        {/* Mobile Coach Panel Trigger */}
        <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <SheetTrigger asChild>
            <Button
              variant="default"
              size="sm"
              className="fixed bottom-6 right-6 z-50 shadow-lg gap-2 rounded-full px-4"
            >
              <Menu className="h-4 w-4" />
              Coach
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[320px] p-0 overflow-y-auto">
            <CoachPanel
              moduleId={moduleId}
              sections={sections}
              reminders={reminders}
              className="border-0 rounded-none shadow-none"
            />
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <div className="max-w-3xl mx-auto">
          {children}
        </div>
      </div>
    );
  }

  // Desktop 2-column layout
  return (
    <div className="grid grid-cols-[1fr_280px] gap-8 items-start">
      {/* Main Content Column */}
      <div className="max-w-3xl">
        {children}
      </div>

      {/* Coach Panel - Sticky Sidebar */}
      <div className="sticky top-24">
        <CoachPanel
          moduleId={moduleId}
          sections={sections}
          reminders={reminders}
        />
      </div>
    </div>
  );
};

export default ModuleLayout;
