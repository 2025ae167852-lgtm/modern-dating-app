import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Profile, MOCK_PROFILES } from './mock-data';
import { useToast } from "@/hooks/use-toast";

type AppContextType = {
  profiles: Profile[];
  likedProfiles: Profile[];
  passedProfiles: Profile[];
  matches: Profile[]; // For now, let's just say every like is a match for the MVP demo sweetness
  swipe: (direction: 'left' | 'right', profileId: string) => void;
  reset: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [profiles, setProfiles] = useState<Profile[]>(MOCK_PROFILES);
  const [likedProfiles, setLikedProfiles] = useState<Profile[]>([]);
  const [passedProfiles, setPassedProfiles] = useState<Profile[]>([]);
  const [matches, setMatches] = useState<Profile[]>([]);
  const { toast } = useToast();

  const swipe = (direction: 'left' | 'right', profileId: string) => {
    const profile = profiles.find(p => p.id === profileId);
    if (!profile) return;

    // Remove from main stack
    setProfiles(prev => prev.filter(p => p.id !== profileId));

    if (direction === 'right') {
      setLikedProfiles(prev => [...prev, profile]);
      // Simulate a match for every right swipe in this demo, maybe with a delay or probability
      // For MVP "happy path", let's match 50% of the time immediately
      if (Math.random() > 0.3) {
        setMatches(prev => [profile, ...prev]);
        toast({
          title: "It's a Match! 🎉",
          description: `You and ${profile.name} liked each other.`,
          className: "bg-gradient-primary text-white border-none"
        });
      }
    } else {
      setPassedProfiles(prev => [...prev, profile]);
    }
  };

  const reset = () => {
    setProfiles(MOCK_PROFILES);
    setLikedProfiles([]);
    setPassedProfiles([]);
    setMatches([]);
  };

  return (
    <AppContext.Provider value={{ profiles, likedProfiles, passedProfiles, matches, swipe, reset }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
