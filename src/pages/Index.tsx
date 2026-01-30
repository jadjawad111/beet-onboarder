import { Link } from "react-router-dom";
import { BookOpen, Info, ChevronRight, FileText, ClipboardList } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-3xl mx-auto px-6 py-6">
          <h1 className="text-2xl font-bold text-foreground">Beet 2.0</h1>
          <p className="text-muted-foreground mt-1">Training & Resources Hub</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-10 space-y-8">
        
        {/* Section 1: Project Information */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Info className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Beet 2.0 Project Information</h2>
          </div>
          
          <div className="grid gap-2">
            <Link 
              to="/onboarding/welcome"
              className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium text-foreground">Welcome & Overview</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              to="/onboarding/access"
              className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium text-foreground">Access & Setup</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              to="/onboarding/workflow"
              className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium text-foreground">Workflow Guide</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              to="/onboarding/tools"
              className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium text-foreground">Tools & Resources</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              to="/faqs"
              className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium text-foreground">FAQs</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-border" />

        {/* Section 2: Educational Modules */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Educational Modules & Assessment</h2>
          </div>
          
          <div className="grid gap-2">
            <Link 
              to="/education/prompt-writing"
              className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <ClipboardList className="w-5 h-5 text-muted-foreground" />
                <div>
                  <span className="font-medium text-foreground block">Prompt Writing</span>
                  <span className="text-sm text-muted-foreground">Learn to write effective prompts</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              to="/education/rubrics"
              className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <ClipboardList className="w-5 h-5 text-muted-foreground" />
                <div>
                  <span className="font-medium text-foreground block">Rubrics Creation</span>
                  <span className="text-sm text-muted-foreground">Build evaluation rubrics</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
};

export default Index;
