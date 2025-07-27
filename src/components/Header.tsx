import { Button } from "@/components/ui/button";
import { Brain, Menu, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 bg-gradient-quantum rounded-lg flex items-center justify-center animate-quantum-pulse">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-quantum bg-clip-text text-transparent">
              QuantaLearn
            </h1>
            <p className="text-xs text-muted-foreground">Quantum Computing Education</p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Button variant="ghost" className="text-foreground hover:text-quantum-blue" asChild>
            <a href="/learn">Learn</a>
          </Button>
          <Button variant="ghost" className="text-foreground hover:text-quantum-purple">
            Simulate
          </Button>
          <Button variant="ghost" className="text-foreground hover:text-quantum-cyan">
            AI Assistant
          </Button>
          <Button variant="ghost" className="text-foreground hover:text-quantum-blue">
            Quizzes
          </Button>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={signOut}
                className="hidden sm:flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </>
          ) : (
            <Button 
              variant="glow" 
              size="sm" 
              className="hidden sm:flex"
              onClick={() => navigate('/auth')}
            >
              <User className="w-4 h-4" />
              Get Started
            </Button>
          )}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;