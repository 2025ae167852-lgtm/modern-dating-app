import { useApp } from "@/lib/app-context";
import { BottomNav } from "@/components/bottom-nav";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function MatchesPage() {
  const { matches } = useApp();

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto p-6">
        <h1 className="text-3xl font-display font-bold mb-6">Matches</h1>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            placeholder="Search matches..." 
            className="pl-10 h-12 rounded-xl bg-white border-border/50 focus:border-primary/50 transition-colors"
          />
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">New Matches</h2>
            
            {matches.length > 0 ? (
               <div className="grid grid-cols-2 gap-4">
                 {matches.map(match => (
                   <div key={match.id} className="relative group cursor-pointer">
                     <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-muted relative">
                        <img 
                          src={match.images[0]} 
                          alt={match.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                        <div className="absolute bottom-3 left-3 text-white">
                          <p className="font-bold text-lg">{match.name}</p>
                        </div>
                     </div>
                   </div>
                 ))}
               </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-border">
                <p className="text-muted-foreground">No matches yet. Keep swiping!</p>
              </div>
            )}
          </section>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
