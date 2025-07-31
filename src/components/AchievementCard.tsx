import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Target, Crown, Star, Trophy, Flame, Zap, MessageCircle, Users, Calendar } from "lucide-react";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  points: number;
  requirement_value: number;
  earned?: boolean;
  progress?: number;
}

interface AchievementCardProps {
  achievement: Achievement;
}

const iconMap = {
  BookOpen,
  Target,
  Crown,
  Star,
  Trophy,
  Flame,
  Zap,
  MessageCircle,
  Users,
  Calendar,
};

const categoryColors = {
  learning: "bg-blue-500/20 text-blue-700 border-blue-200",
  points: "bg-yellow-500/20 text-yellow-700 border-yellow-200",
  streaks: "bg-orange-500/20 text-orange-700 border-orange-200",
  social: "bg-green-500/20 text-green-700 border-green-200",
  challenges: "bg-purple-500/20 text-purple-700 border-purple-200",
};

const AchievementCard = ({ achievement }: AchievementCardProps) => {
  const Icon = iconMap[achievement.icon as keyof typeof iconMap] || Star;
  const categoryColor = categoryColors[achievement.category as keyof typeof categoryColors] || categoryColors.learning;

  return (
    <Card className={`relative overflow-hidden transition-all duration-300 ${
      achievement.earned 
        ? "bg-gradient-to-br from-quantum-blue/10 to-quantum-purple/10 border-quantum-blue/30 shadow-quantum" 
        : "bg-card/50 border-border/50 hover:border-border"
    }`}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className={`p-2 rounded-lg ${achievement.earned ? 'bg-quantum-blue/20' : 'bg-muted'}`}>
            <Icon className={`w-6 h-6 ${achievement.earned ? 'text-quantum-blue' : 'text-muted-foreground'}`} />
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className={`text-xs ${categoryColor}`}>
              {achievement.category}
            </Badge>
            {achievement.earned && (
              <Badge variant="default" className="bg-quantum-blue text-primary-foreground">
                +{achievement.points} XP
              </Badge>
            )}
          </div>
        </div>
        <CardTitle className={`text-lg ${achievement.earned ? 'text-quantum-blue' : 'text-foreground'}`}>
          {achievement.name}
        </CardTitle>
        <CardDescription className="text-sm">
          {achievement.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!achievement.earned && achievement.progress !== undefined && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-muted-foreground">
                {Math.min(achievement.progress, achievement.requirement_value)}/{achievement.requirement_value}
              </span>
            </div>
            <Progress 
              value={(achievement.progress / achievement.requirement_value) * 100} 
              className="h-2"
            />
          </div>
        )}
        {achievement.earned && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-quantum-blue font-medium">Achieved!</span>
            <span className="text-xs text-muted-foreground">+{achievement.points} XP earned</span>
          </div>
        )}
      </CardContent>
      {achievement.earned && (
        <div className="absolute top-2 right-2">
          <div className="w-3 h-3 bg-quantum-blue rounded-full animate-pulse"></div>
        </div>
      )}
    </Card>
  );
};

export default AchievementCard;