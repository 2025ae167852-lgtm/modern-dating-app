import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background relative overflow-hidden">
      
      {/* Decorative background blobs */}
      <div className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md flex flex-col items-center space-y-8 z-10 animate-in slide-in-from-bottom-10 fade-in duration-700">
        
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="w-20 h-20 bg-gradient-primary rounded-2xl rotate-3 flex items-center justify-center shadow-xl shadow-primary/30 mb-6">
             <span className="text-4xl">🔥</span>
          </div>
          <h1 className="text-5xl font-display font-bold text-foreground tracking-tight">Spark</h1>
          <p className="text-lg text-muted-foreground max-w-[280px]">
            Meaningful connections start here. Match, chat, and meet people near you.
          </p>
        </div>

        <div className="w-full space-y-4">
          <Link href="/swipe">
            <Button className="w-full h-14 text-lg font-semibold rounded-full bg-gradient-primary shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-0.5">
              Create Account
            </Button>
          </Link>
          
          <Link href="/swipe">
            <Button variant="outline" className="w-full h-14 text-lg font-semibold rounded-full border-2 hover:bg-muted/50">
              Sign In
            </Button>
          </Link>
        </div>

        <div className="text-xs text-muted-foreground text-center px-8 leading-relaxed">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </div>
      </div>
    </div>
  );
}
