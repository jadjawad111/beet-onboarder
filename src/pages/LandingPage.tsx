import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import beetIcon from "@/assets/beet-icon.png";
import { cn } from "@/lib/utils";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);

  const handleGetStarted = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate("/home");
    }, 600);
  };

  return (
    <div 
      className={cn(
        "fixed inset-0 flex items-center justify-center overflow-hidden transition-all duration-700 ease-out",
        isExiting && "scale-110 opacity-0"
      )}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-secondary/60" />
      
      {/* Subtle animated overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
      
      {/* Floating beet decorations */}
      <div className="absolute top-[15%] right-[12%] opacity-30">
        <img 
          src={beetIcon} 
          alt="" 
          className="w-24 h-24 animate-bounce"
          style={{ animationDuration: '3s' }}
        />
      </div>
      <div className="absolute top-[25%] right-[25%] opacity-20">
        <img 
          src={beetIcon} 
          alt="" 
          className="w-16 h-16 animate-bounce"
          style={{ animationDuration: '4s', animationDelay: '1s' }}
        />
      </div>
      <div className="absolute bottom-[20%] right-[18%] opacity-25">
        <img 
          src={beetIcon} 
          alt="" 
          className="w-20 h-20 animate-bounce"
          style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}
        />
      </div>
      <div className="absolute bottom-[30%] left-[8%] opacity-15">
        <img 
          src={beetIcon} 
          alt="" 
          className="w-14 h-14 animate-bounce"
          style={{ animationDuration: '4.5s', animationDelay: '1.5s' }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-8 max-w-3xl animate-fade-in">
        {/* Welcome badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-8 animate-scale-in">
          <Sparkles className="w-4 h-4" />
          Welcome to the Portal
        </div>

        {/* Main title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
          <span className="text-white">Project Beet</span>
          <br />
          <span className="text-secondary">2.0</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-white/90 max-w-xl mx-auto mb-12 leading-relaxed">
          Your complete onboarding and training portal for data annotation excellence. 
          Master the skills needed to create professional AI training data with Handshake AI.
        </p>

        {/* CTA Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          {/* Get Started button */}
          <button
            onClick={handleGetStarted}
            className="group flex items-center gap-3 px-8 py-4 bg-white text-primary rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Learning tracks indicator */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[1, 2, 3].map((num) => (
                <div 
                  key={num}
                  className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-sm font-medium"
                >
                  {num}
                </div>
              ))}
            </div>
            <span className="text-white/80 text-sm">3 Learning Tracks</span>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/10 to-transparent" />
    </div>
  );
};

export default LandingPage;
