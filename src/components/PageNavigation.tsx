import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageNavigationProps {
  previousPage?: { title: string; href: string };
  nextPage?: { title: string; href: string };
}

const PageNavigation = ({ previousPage, nextPage }: PageNavigationProps) => {
  if (!previousPage && !nextPage) return null;

  return (
    <div className="flex items-center justify-between mt-12 pt-6 border-t">
      {previousPage ? (
        <Button variant="ghost" asChild className="gap-2">
          <Link to={previousPage.href}>
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Previous:</span>
            <span className="font-medium">{previousPage.title}</span>
          </Link>
        </Button>
      ) : (
        <div />
      )}

      {nextPage && (
        <Button variant="ghost" asChild className="gap-2">
          <Link to={nextPage.href}>
            <span className="hidden sm:inline">Next:</span>
            <span className="font-medium">{nextPage.title}</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      )}
    </div>
  );
};

export default PageNavigation;
