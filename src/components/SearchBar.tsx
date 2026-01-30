import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, FileText, GraduationCap, HelpCircle, Rocket, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchItem {
  title: string;
  description: string;
  href: string;
  category: "Onboarding" | "Education" | "FAQ" | "Module";
  icon: typeof FileText;
}

const searchableItems: SearchItem[] = [
  // Onboarding
  { title: "Welcome", description: "Get started with Project Beet 2.0", href: "/onboarding/welcome", category: "Onboarding", icon: Rocket },
  { title: "Access & Accounts", description: "Set up your accounts and access", href: "/onboarding/access", category: "Onboarding", icon: Rocket },
  { title: "Tools & Platforms", description: "Learn about the tools you'll use", href: "/onboarding/tools", category: "Onboarding", icon: Rocket },
  { title: "Communication", description: "Communication guidelines and channels", href: "/onboarding/communication", category: "Onboarding", icon: Rocket },
  { title: "Workflow", description: "Daily workflow and processes", href: "/onboarding/workflow", category: "Onboarding", icon: Rocket },
  { title: "Quality Standards", description: "Quality expectations and standards", href: "/onboarding/quality", category: "Onboarding", icon: Rocket },
  { title: "Checklist", description: "Onboarding completion checklist", href: "/onboarding/checklist", category: "Onboarding", icon: Rocket },
  
  // Education tracks
  { title: "Education Hub", description: "All training tracks and modules", href: "/education", category: "Education", icon: GraduationCap },
  { title: "Prompt Writing Track", description: "Master prompt writing skills", href: "/education/prompt-writing", category: "Education", icon: GraduationCap },
  { title: "Rubrics Creation Track", description: "Learn to create evaluation rubrics", href: "/education/rubrics", category: "Education", icon: GraduationCap },
  
  // Prompt Writing Modules
  { title: "Prompt Writing: Module 1", description: "Introduction to prompt writing fundamentals", href: "/education/prompt-writing/module-1", category: "Module", icon: BookOpen },
  { title: "Prompt Writing: Module 2", description: "Advanced prompt techniques", href: "/education/prompt-writing/module-2", category: "Module", icon: BookOpen },
  { title: "Prompt Writing: Module 3", description: "Expert-level prompt crafting", href: "/education/prompt-writing/module-3", category: "Module", icon: BookOpen },
  
  // Rubrics Modules
  { title: "Rubrics: Module 1", description: "Rubric fundamentals and structure", href: "/education/rubrics/module-1", category: "Module", icon: BookOpen },
  { title: "Rubrics: Module 2", description: "Criterion types and weights", href: "/education/rubrics/module-2", category: "Module", icon: BookOpen },
  { title: "Rubrics: Module 3", description: "Common errors and how to fix them", href: "/education/rubrics/module-3", category: "Module", icon: BookOpen },
  { title: "Rubrics: Module 4", description: "Advanced rubric creation", href: "/education/rubrics/module-4", category: "Module", icon: BookOpen },
  
  // FAQ
  { title: "FAQ", description: "Frequently asked questions", href: "/faqs", category: "FAQ", icon: HelpCircle },
  { title: "General FAQ", description: "General questions about Project Beet", href: "/faqs/general", category: "FAQ", icon: HelpCircle },
  { title: "Technical FAQ", description: "Technical support and troubleshooting", href: "/faqs/technical", category: "FAQ", icon: HelpCircle },
  { title: "Workflow FAQ", description: "Questions about daily workflow", href: "/faqs/workflow", category: "FAQ", icon: HelpCircle },
];

const categoryColors: Record<string, string> = {
  Onboarding: "bg-primary/10 text-primary border-primary/20",
  Education: "bg-secondary/20 text-secondary-foreground border-secondary/30",
  Module: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  FAQ: "bg-amber-500/10 text-amber-600 border-amber-500/20",
};

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredItems = query.trim()
    ? searchableItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || filteredItems.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
        break;
      case "Enter":
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          handleSelect(filteredItems[selectedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  };

  const handleSelect = (item: SearchItem) => {
    navigate(item.href);
    setQuery("");
    setIsOpen(false);
    inputRef.current?.blur();
  };

  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none z-10" />
      <Input
        ref={inputRef}
        type="search"
        placeholder="Search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => query.trim() && setIsOpen(true)}
        onKeyDown={handleKeyDown}
        className="pl-9 bg-card border border-border text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:bg-card"
      />

      {/* Dropdown */}
      {isOpen && filteredItems.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 mt-2 bg-card border border-border rounded-xl shadow-xl z-[9999] overflow-hidden max-h-80 overflow-y-auto w-80 md:w-96"
        >
          <div className="p-2">
            <p className="text-xs text-muted-foreground px-2 py-1 mb-1">
              {filteredItems.length} result{filteredItems.length !== 1 ? "s" : ""} found
            </p>
            {filteredItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.href}
                  onClick={() => handleSelect(item)}
                  className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors ${
                    index === selectedIndex
                      ? "bg-primary/10 border border-primary/20"
                      : "hover:bg-muted/50 border border-transparent"
                  }`}
                >
                  <div className="mt-0.5">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-foreground truncate">
                        {item.title}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full border ${categoryColors[item.category]}`}
                      >
                        {item.category}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {item.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* No results */}
      {isOpen && query.trim() && filteredItems.length === 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 mt-2 bg-card border border-border rounded-xl shadow-xl z-[9999] p-4 text-center w-80 md:w-96"
        >
          <p className="text-sm text-muted-foreground">
            No results found for "{query}"
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
