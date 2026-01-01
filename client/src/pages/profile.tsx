import { BottomNav } from "@/components/bottom-nav";
import { Button } from "@/components/ui/button";
import { Settings, Edit2, Shield, Crown, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background pb-24">
      
      {/* Header / Cover */}
      <div className="h-40 bg-gradient-primary relative">
        <div className="absolute top-6 right-6 text-white cursor-pointer hover:opacity-80 transition-opacity">
          <Settings size={24} />
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 -mt-16 flex flex-col items-center">
        {/* Avatar */}
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-4 border-background overflow-hidden bg-muted shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
              alt="My Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full border-4 border-background shadow-lg cursor-pointer hover:scale-110 transition-transform">
            <Edit2 size={16} />
          </div>
        </div>

        <div className="text-center mt-4 mb-8">
          <h1 className="text-2xl font-bold font-display">Alex Johnson, 27</h1>
          <p className="text-muted-foreground">Product Designer</p>
        </div>

        {/* Premium Banner */}
        <div className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white shadow-xl shadow-indigo-500/20 mb-8 relative overflow-hidden group cursor-pointer hover:shadow-indigo-500/30 transition-all">
          <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-700">
             <Crown size={120} />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
               <Crown size={20} className="text-yellow-300" fill="currentColor" />
               <h3 className="font-bold tracking-wide">Spark Premium</h3>
            </div>
            <p className="text-indigo-100 text-sm mb-4">See who likes you & match instantly!</p>
            <Button size="sm" className="bg-white text-indigo-600 hover:bg-indigo-50 border-none font-bold rounded-full">
              Upgrade Now
            </Button>
          </div>
        </div>

        {/* Stats / Completion */}
        <div className="w-full bg-white rounded-2xl p-6 shadow-sm border border-border/50 mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-sm">Profile Completion</h3>
            <span className="text-xs font-bold text-primary">85%</span>
          </div>
          <Progress value={85} className="h-2 mb-2" />
          <p className="text-xs text-muted-foreground">Add 2 more photos to reach 100%</p>
        </div>

        {/* Menu Items */}
        <div className="w-full space-y-3">
          <Button variant="outline" className="w-full justify-start h-14 rounded-xl gap-3 text-muted-foreground hover:text-foreground">
             <Shield size={20} />
             Safety Center
          </Button>
           <Button variant="outline" className="w-full justify-start h-14 rounded-xl gap-3 text-muted-foreground hover:text-foreground">
             <Star size={20} />
             Restore Purchases
          </Button>
        </div>

      </div>

      <BottomNav />
    </div>
  );
}
