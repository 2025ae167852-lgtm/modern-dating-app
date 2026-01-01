import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Profile } from './mock-data';
import { apiRequest } from './queryClient';
import { useToast } from "@/hooks/use-toast";

// TEMP: Hardcoded userId for demo/testing. Replace with real auth/user logic.
const DEMO_USER_ID = "demo-user-1";

type AppContextType = {
  profiles: Profile[];
  likedProfiles: Profile[];
  passedProfiles: Profile[];
  matches: Profile[];
  swipe: (direction: 'left' | 'right', profileId: string) => void;
  reset: () => void;
  loading: boolean;
  error: string | null;
};

const AppContext = createContext<AppContextType | undefined>(undefined);


export function AppProvider({ children }: { children: ReactNode }) {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [likedProfiles, setLikedProfiles] = useState<Profile[]>([]);
  const [passedProfiles, setPassedProfiles] = useState<Profile[]>([]);
  const [matches, setMatches] = useState<Profile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch profiles from API
  const fetchProfiles = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiRequest('GET', '/api/profiles');
      const data = await res.json();
      setProfiles(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load profiles');
    } finally {
      setLoading(false);
    }
  };

  // Fetch matches from API
  const fetchMatches = async () => {
    try {
      const res = await apiRequest('GET', `/api/matches?userId=${DEMO_USER_ID}`);
      const data = await res.json();
      // For demo, join with profiles to get profile info for each match
      const matchedProfiles = data.map((match: any) => {
        const otherId = match.userIds.find((id: string) => id !== DEMO_USER_ID);
        return profiles.find(p => p.id === otherId);
      }).filter(Boolean);
      setMatches(matchedProfiles);
    } catch (err) {
      // Optionally handle error
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  useEffect(() => {
    if (profiles.length > 0) fetchMatches();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profiles]);

  const swipe = async (direction: 'left' | 'right', profileId: string) => {
    const profile = profiles.find(p => p.id === profileId);
    if (!profile) return;

    setProfiles(prev => prev.filter(p => p.id !== profileId));

    if (direction === 'right') {
      setLikedProfiles(prev => [...prev, profile]);
      // Create match via API
      try {
        await apiRequest('POST', '/api/matches', {
          userId1: DEMO_USER_ID,
          userId2: profileId,
        });
        toast({
          title: "It's a Match! 🎉",
          description: `You and ${profile.name} liked each other.`,
          className: "bg-gradient-primary text-white border-none"
        });
        fetchMatches();
      } catch (err) {
        // Optionally handle error
      }
    } else {
      setPassedProfiles(prev => [...prev, profile]);
    }
  };

  const reset = () => {
    fetchProfiles();
    setLikedProfiles([]);
    setPassedProfiles([]);
    setMatches([]);
  };

  return (
    <AppContext.Provider value={{ profiles, likedProfiles, passedProfiles, matches, swipe, reset, loading, error }}>
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
