import { useState } from "react";
import { HelpCircle, X, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const HelpPanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Help Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg",
          "bg-primary hover:bg-primary/90 text-primary-foreground",
          "transition-transform hover:scale-105",
          isOpen && "hidden"
        )}
        size="icon"
      >
        <HelpCircle className="h-6 w-6" />
        <span className="sr-only">Need help?</span>
      </Button>

      {/* Help Panel */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 w-80 rounded-xl bg-card border border-border shadow-lg transition-all duration-300",
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="font-semibold text-foreground">Need Help?</h3>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-4 space-y-4">
          <p className="text-sm text-muted-foreground">
            Get in touch with the Project Beet team
          </p>

          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <MessageCircle className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Slack Channel</p>
                <p className="text-xs text-muted-foreground">
                  #Project-beet-assesment-1
                </p>
              </div>
            </div>

            <a 
              href="mailto:projectbeet@joinhandshake.com"
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Email Support</p>
                <p className="text-xs text-muted-foreground">
                  projectbeet@joinhandshake.com
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpPanel;
