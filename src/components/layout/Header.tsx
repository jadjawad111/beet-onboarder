import { Menu, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import handshakeLogo from "@/assets/handshake-logo.png";
import SearchBar from "@/components/SearchBar";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="flex h-16 items-center gap-4 px-4 lg:px-6">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        <div className="flex items-center gap-3">
          <img 
            src={handshakeLogo} 
            alt="Handshake AI" 
            className="h-12 w-auto"
          />
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-foreground">Project Beet</h1>
            <p className="text-xs text-muted-foreground hidden sm:block">
              Onboarding & Training Portal
            </p>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-4">
          <div className="hidden md:block">
            <SearchBar />
          </div>
          
          {/* Official Contact Email */}
          <a 
            href="mailto:projectbeet@joinhandshake.com"
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/30 hover:bg-primary/20 transition-colors"
          >
            <Mail className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">projectbeet@joinhandshake.com</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
