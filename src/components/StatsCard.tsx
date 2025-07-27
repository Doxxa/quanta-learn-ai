import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  change?: string;
  gradient?: string;
}

const StatsCard = ({ 
  title, 
  value, 
  icon: Icon, 
  change,
  gradient = "bg-gradient-quantum" 
}: StatsCardProps) => {
  return (
    <Card className="border-border/50 bg-card/30 backdrop-blur-sm hover:shadow-glow transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            {change && (
              <p className="text-xs text-quantum-cyan font-medium">{change}</p>
            )}
          </div>
          <div className={`w-12 h-12 ${gradient} rounded-xl flex items-center justify-center animate-float`}>
            <Icon className="w-6 h-6 text-primary-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;