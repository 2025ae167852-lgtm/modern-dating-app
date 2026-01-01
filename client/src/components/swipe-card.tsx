import { motion, useMotionValue, useTransform, useAnimation, PanInfo } from "framer-motion";
import { Profile } from "@/lib/mock-data";
import { X, Heart, MapPin, Briefcase } from "lucide-react";
import { useState } from "react";

interface SwipeCardProps {
  profile: Profile;
  onSwipe: (direction: "left" | "right") => void;
  active: boolean;
}

export function SwipeCard({ profile, onSwipe, active }: SwipeCardProps) {
  const x = useMotionValue(0);
  const controls = useAnimation();
  const [exitDirection, setExitDirection] = useState<"left" | "right" | null>(null);

  // Rotate based on X position
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  
  // Opacity for "Like" and "Nope" overlays
  const likeOpacity = useTransform(x, [20, 150], [0, 1]);
  const nopeOpacity = useTransform(x, [-20, -150], [0, 1]);

  const handleDragEnd = async (event: any, info: PanInfo) => {
    const threshold = 100;
    
    if (info.offset.x > threshold) {
      setExitDirection("right");
      await controls.start({ x: 500, opacity: 0, transition: { duration: 0.2 } });
      onSwipe("right");
    } else if (info.offset.x < -threshold) {
      setExitDirection("left");
      await controls.start({ x: -500, opacity: 0, transition: { duration: 0.2 } });
      onSwipe("left");
    } else {
      controls.start({ x: 0, transition: { type: "spring", stiffness: 300, damping: 20 } });
    }
  };

  if (!active) return null;

  return (
    <motion.div
      drag={true}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}
      animate={controls}
      style={{ x, rotate, touchAction: "none" }}
      className="absolute top-0 left-0 w-full h-full origin-bottom cursor-grab active:cursor-grabbing will-change-transform"
      data-testid={`card-profile-${profile.id}`}
    >
      <div className="relative w-full h-[65vh] md:h-[70vh] rounded-3xl overflow-hidden shadow-2xl bg-white border border-border/50 select-none">
        
        {/* Image */}
        <img 
          src={profile.images[0]} 
          alt={profile.name}
          className="w-full h-full object-cover pointer-events-none"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80 pointer-events-none" />

        {/* Text Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white pointer-events-none">
          <div className="flex items-baseline gap-2 mb-1">
            <h2 className="text-3xl font-bold font-display">{profile.name}</h2>
            <span className="text-xl font-medium opacity-90">{profile.age}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm font-medium opacity-90 mb-3">
             {profile.job && (
               <div className="flex items-center gap-1">
                 <Briefcase size={14} />
                 <span>{profile.job}</span>
               </div>
             )}
             <div className="flex items-center gap-1">
               <MapPin size={14} />
               <span>{profile.distance}km away</span>
             </div>
          </div>

          <p className="text-sm opacity-80 line-clamp-2 mb-4 font-sans leading-relaxed">
            {profile.bio}
          </p>

          <div className="flex flex-wrap gap-2">
            {profile.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold tracking-wide">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Like Overlay */}
        <motion.div 
          style={{ opacity: likeOpacity }}
          className="absolute top-8 left-8 border-4 border-green-500 rounded-lg px-4 py-2 transform -rotate-12 pointer-events-none"
        >
          <span className="text-4xl font-bold text-green-500 uppercase tracking-widest">Like</span>
        </motion.div>

        {/* Nope Overlay */}
        <motion.div 
          style={{ opacity: nopeOpacity }}
          className="absolute top-8 right-8 border-4 border-red-500 rounded-lg px-4 py-2 transform rotate-12 pointer-events-none"
        >
          <span className="text-4xl font-bold text-red-500 uppercase tracking-widest">Nope</span>
        </motion.div>

      </div>
    </motion.div>
  );
}
