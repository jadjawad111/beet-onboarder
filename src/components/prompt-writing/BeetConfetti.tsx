import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import beetIcon from "@/assets/beet-icon.png";

interface BeetParticle {
  id: number;
  x: number;
  delay: number;
  duration: number;
  rotation: number;
  size: number;
}

// Global event to trigger confetti from anywhere
export const triggerBeetConfetti = () => {
  window.dispatchEvent(new CustomEvent('trigger-beet-confetti'));
};

interface BeetConfettiProps {
  showButton?: boolean;
}

const BeetConfetti = ({ showButton = true }: BeetConfettiProps) => {
  const [particles, setParticles] = useState<BeetParticle[]>([]);
  const [nextId, setNextId] = useState(0);

  const makeItRain = useCallback(() => {
    const newParticles: BeetParticle[] = [];
    const particleCount = 25 + Math.floor(Math.random() * 15);
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: nextId + i,
        x: Math.random() * 100,
        delay: Math.random() * 0.8,
        duration: 2.5 + Math.random() * 2,
        rotation: Math.random() * 720 - 360,
        size: 24 + Math.random() * 32,
      });
    }
    
    setParticles(prev => [...prev, ...newParticles]);
    setNextId(prev => prev + particleCount);
    
    // Trigger side beets to dance
    window.dispatchEvent(new CustomEvent('beet-dance'));
    
    // Clean up old particles after animation
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.some(np => np.id === p.id)));
    }, 5000);
  }, [nextId]);

  // Listen for global trigger events
  useEffect(() => {
    const handleTrigger = () => makeItRain();
    window.addEventListener('trigger-beet-confetti', handleTrigger);
    return () => window.removeEventListener('trigger-beet-confetti', handleTrigger);
  }, [makeItRain]);

  return (
    <>
      {/* Confetti container */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute animate-beet-fall"
            style={{
              left: `${particle.x}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
              '--rotation': `${particle.rotation}deg`,
            } as React.CSSProperties}
          >
            <img
              src={beetIcon}
              alt=""
              className="drop-shadow-md"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Optional Button */}
      {showButton && (
        <div className="w-full py-8">
          <Button
            onClick={makeItRain}
            className="w-full gap-4 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold text-2xl md:text-3xl px-8 py-10 h-auto rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
          >
            <img src={beetIcon} alt="" className="w-12 h-12" />
            Make it Rain!
            <img src={beetIcon} alt="" className="w-12 h-12" />
          </Button>
        </div>
      )}
    </>
  );
};

export default BeetConfetti;
