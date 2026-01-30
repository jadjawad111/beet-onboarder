import { Link, useLocation } from "react-router-dom";
import { Home } from "lucide-react";

const TopBar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">B</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-foreground leading-none">Beet 2.0</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Training Portal</span>
          </div>
        </Link>

        {!isHome && (
          <Link 
            to="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default TopBar;
