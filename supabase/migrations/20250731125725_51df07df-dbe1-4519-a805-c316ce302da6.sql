-- Create discussion forums for lessons
CREATE TABLE IF NOT EXISTS public.discussions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lesson_id TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  likes_count INTEGER DEFAULT 0,
  replies_count INTEGER DEFAULT 0
);

-- Create discussion replies
CREATE TABLE IF NOT EXISTS public.discussion_replies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  discussion_id UUID NOT NULL REFERENCES public.discussions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  likes_count INTEGER DEFAULT 0
);

-- Create study groups
CREATE TABLE IF NOT EXISTS public.study_groups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  creator_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  member_count INTEGER DEFAULT 1,
  is_public BOOLEAN DEFAULT true
);

-- Create study group members
CREATE TABLE IF NOT EXISTS public.study_group_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID NOT NULL REFERENCES public.study_groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'moderator', 'member')),
  UNIQUE(group_id, user_id)
);

-- Create achievements system
CREATE TABLE IF NOT EXISTS public.achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  category TEXT NOT NULL,
  points INTEGER NOT NULL DEFAULT 0,
  requirement_type TEXT NOT NULL CHECK (requirement_type IN ('lessons_completed', 'points_earned', 'streak_days', 'discussions_created', 'challenges_completed')),
  requirement_value INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user achievements
CREATE TABLE IF NOT EXISTS public.user_achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

-- Create daily challenges
CREATE TABLE IF NOT EXISTS public.daily_challenges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  challenge_type TEXT NOT NULL CHECK (challenge_type IN ('quiz', 'lesson', 'discussion', 'circuit_build')),
  target_value INTEGER NOT NULL,
  points_reward INTEGER NOT NULL DEFAULT 50,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(date)
);

-- Create user challenge completions
CREATE TABLE IF NOT EXISTS public.user_challenge_completions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  challenge_id UUID NOT NULL REFERENCES public.daily_challenges(id) ON DELETE CASCADE,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, challenge_id)
);

-- Create learning streaks
CREATE TABLE IF NOT EXISTS public.learning_streaks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Create discussion likes
CREATE TABLE IF NOT EXISTS public.discussion_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  discussion_id UUID REFERENCES public.discussions(id) ON DELETE CASCADE,
  reply_id UUID REFERENCES public.discussion_replies(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, discussion_id),
  UNIQUE(user_id, reply_id),
  CHECK ((discussion_id IS NOT NULL AND reply_id IS NULL) OR (discussion_id IS NULL AND reply_id IS NOT NULL))
);

-- Enable RLS on all tables
ALTER TABLE public.discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discussion_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_challenge_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discussion_likes ENABLE ROW LEVEL SECURITY;