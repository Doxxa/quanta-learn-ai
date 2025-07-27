import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient?: string;
  buttonText: string;
  onClick?: () => void;
}

const FeatureCard = ({ 
  title, 
  description, 
  icon: Icon, 
  gradient = "bg-gradient-quantum",
  buttonText,
  onClick 
}: FeatureCardProps) => {
  return (
    <Card className="group hover:shadow-quantum transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className={`w-12 h-12 ${gradient} rounded-xl flex items-center justify-center mb-4 group-hover:animate-quantum-pulse`}>
          <Icon className="w-6 h-6 text-primary-foreground" />
        </div>
        <CardTitle className="text-lg font-semibold text-foreground group-hover:text-quantum-blue transition-colors">
          {title}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          variant="glow" 
          className="w-full group-hover:bg-quantum-blue/30"
          onClick={onClick}
        >
          {buttonText}
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;