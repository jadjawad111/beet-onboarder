import { Link, Outlet, useLocation } from "react-router-dom";
import { 
  PlayCircle,
  GraduationCap,
  ChevronRight
} from "lucide-react";
import beetIcon from "@/assets/beet-icon.png";

// Single unified course
const coursePath = "/education/beet";

const EducationLayout = () => {
  const location = useLocation();
  const isOverview = location.pathname === "/education";

  // Simple overview page - single course card
  if (isOverview) {
    return (
      <div className="min-h-screen">
        {/* Hero Banner */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-secondary/70 px-8 py-16 lg:py-20">
          {/* Bouncing beet */}
          <div className="absolute top-8 right-16 opacity-25">
            <img src={beetIcon} alt="" className="w-20 h-20 animate-bounce-slow" />
          </div>
          <div className="absolute bottom-8 right-1/3 opacity-15 hidden lg:block">
            <img src={beetIcon} alt="" className="w-14 h-14 animate-bounce-slow" style={{ animationDelay: '0.7s' }} />
          </div>

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-6">
              <GraduationCap className="w-4 h-4" />
              Training Required
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
              Educational Modules
            </h1>
            <p className="text-lg text-white/90 max-w-xl">
              Complete the training course to qualify for the assessment.
            </p>
          </div>
        </div>

        {/* Single Course Card */}
        <div className="px-8 py-12">
          <div className="max-w-lg">
            <div className="p-8 rounded-2xl border border-border bg-card">
              {/* Title & Description */}
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Project Beet 2.0 Training Course
              </h3>
              <p className="text-muted-foreground mb-8">
                Prompt and Rubrics writing
              </p>
              
              {/* Start Course Button */}
              <Link
                to={coursePath}
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
              >
                <PlayCircle className="w-5 h-5" />
                Start Course
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Module content with back navigation
  return (
    <div className="min-h-screen">
      {/* Back navigation */}
      <div className="border-b border-border bg-card px-6 py-4">
        <Link 
          to="/education"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          Back to Courses
        </Link>
      </div>
      
      {/* Content */}
      <div className="p-6 lg:p-8 max-w-4xl">
        <Outlet />
      </div>
    </div>
  );
};

export default EducationLayout;
