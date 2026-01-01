import { BottomNav } from "@/components/bottom-nav";
import { useApp } from "@/lib/app-context";
import { Link } from "wouter";
import { Search, MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ChatListPage() {
  const { matches } = useApp();

  // Mock messages for matches
  const getLastMessage = (id: string) => {
    const messages = [
      "Hey! How's your weekend going?",
      "I love that photo of you hiking!",
      "Are you free this Friday?",
      "Hahaha totally agree 😂",
      "Let's grab coffee soon."
    ];
    return messages[parseInt(id) % messages.length];
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto p-4">
        
        <header className="flex justify-between items-center mb-6 pt-2">
          <h1 className="text-3xl font-display font-bold">Messages</h1>
          <MoreVertical className="text-muted-foreground" />
        </header>

        <div className="relative mb-6">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
           <Input 
             placeholder="Search conversations" 
             className="pl-10 h-12 rounded-xl bg-white border-border/50 focus:border-primary/50"
           />
        </div>

        <div className="space-y-1">
          {matches.length > 0 ? (
            matches.map(match => (
              <Link key={match.id} href={`/chat/${match.id}`}>
                <div className="flex items-center gap-4 p-3 hover:bg-white rounded-2xl transition-colors cursor-pointer active:scale-[0.98] transition-transform">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
                      <img src={match.images[0]} alt={match.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-lg text-foreground">{match.name}</h3>
                      <span className="text-xs text-muted-foreground">12:30 PM</span>
                    </div>
                    <p className="text-muted-foreground text-sm truncate pr-4">
                      {getLastMessage(match.id)}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-20 opacity-50">
              <p>No messages yet.</p>
              <p className="text-sm">Get matching to start chatting!</p>
            </div>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
