-- Drop the duplicate policy first
DROP POLICY IF EXISTS "Users can update their own streaks" ON public.learning_streaks;

-- Create the correct policies for learning streaks
CREATE POLICY "Users can view their own streaks" ON public.learning_streaks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own streaks" ON public.learning_streaks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own streaks" ON public.learning_streaks FOR UPDATE USING (auth.uid() = user_id);