import { useState } from "react";
import { useApp } from "@/lib/app-context";
import { SwipeCard } from "@/components/swipe-card";
import { BottomNav } from "@/components/bottom-nav";
import { X, Heart, RotateCcw, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SwipePage() {
  const { profiles, swipe, reset } = useApp();
  
  // We only render the top 2 cards for performance and visual stacking
  const activeProfiles = profiles.slice(0, 2).reverse();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center overflow-hidden">
      {/* Header */}
      <header className="w-full max-w-md p-4 flex justify-between items-center z-10 pt-6">
        <h1 className="text-2xl font-bold text-primary font-display tracking-tight">Spark</h1>
        <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-primary">
          <Filter size={24} />
        </Button>
      </header>

      {/* Card Stack */}
      <main className="flex-1 w-full max-w-md relative flex flex-col justify-center items-center px-4 pb-24">
        <div className="relative w-full h-[65vh] md:h-[70vh]">
          {activeProfiles.length > 0 ? (
            activeProfiles.map((profile, index) => (
              <SwipeCard 
                key={profile.id} 
                profile={profile} 
                onSwipe={(dir) => swipe(dir, profile.id)}
                active={index === activeProfiles.length - 1} // Only top card is interactive
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6 animate-in fade-in duration-500">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
                <Heart className="text-muted-foreground/50" size={48} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">No more profiles</h3>
                <p className="text-muted-foreground max-w-xs mx-auto">
                  You've gone through all the profiles in your area. Check back later!
                </p>
              </div>
              <Button onClick={reset} variant="outline" className="gap-2 rounded-full border-primary/20 text-primary hover:text-primary hover:bg-primary/5">
                <RotateCcw size={16} />
                Start Over (Demo)
              </Button>
            </div>
          )}
        </div>

        {/* Controls - Only visible if there are cards */}
        {activeProfiles.length > 0 && (
          <div className="flex items-center justify-center gap-6 mt-8 w-full max-w-xs z-20">
            <Button 
              size="lg" 
              className="h-14 w-14 rounded-full bg-white border border-red-100 shadow-lg text-red-500 hover:text-red-600 hover:bg-red-50 hover:scale-110 transition-all duration-300"
              onClick={() => swipe("left", activeProfiles[activeProfiles.length - 1].id)}
            >
              <X size={28} strokeWidth={3} />
            </Button>
            
            <Button 
              size="lg" 
              className="h-16 w-16 rounded-full bg-gradient-primary shadow-xl shadow-primary/30 text-white hover:scale-110 transition-all duration-300 border-none"
              onClick={() => swipe("right", activeProfiles[activeProfiles.length - 1].id)}
            >
              <Heart size={32} fill="currentColor" />
            </Button>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
