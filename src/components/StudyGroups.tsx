import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Plus, UserPlus, Calendar, Globe, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StudyGroup {
  id: string;
  name: string;
  description: string;
  member_count: number;
  is_public: boolean;
  created_at: string;
  creator_id: string;
}

const StudyGroups = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [groups, setGroups] = useState<StudyGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const { data, error } = await supabase
        .from("study_groups")
        .select("*")
        .eq("is_public", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setGroups(data || []);
    } catch (error) {
      console.error("Error fetching groups:", error);
      toast({
        title: "Error",
        description: "Failed to load study groups",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newName.trim()) return;

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from("study_groups")
        .insert({
          name: newName.trim(),
          description: newDescription.trim(),
          creator_id: user.id,
          is_public: isPublic,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Study group created successfully!",
      });

      setNewName("");
      setNewDescription("");
      setShowCreateForm(false);
      fetchGroups();
    } catch (error) {
      console.error("Error creating group:", error);
      toast({
        title: "Error",
        description: "Failed to create study group",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const joinGroup = async (groupId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("study_group_members")
        .insert({
          group_id: groupId,
          user_id: user.id,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Joined study group successfully!",
      });

      fetchGroups();
    } catch (error) {
      console.error("Error joining group:", error);
      toast({
        title: "Error",
        description: "Failed to join study group",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-16 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Users className="w-5 h-5 text-quantum-blue" />
          Study Groups
        </h3>
        {user && (
          <Button
            onClick={() => setShowCreateForm(!showCreateForm)}
            variant="glow"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Group
          </Button>
        )}
      </div>

      {showCreateForm && (
        <Card className="border-quantum-blue/30">
          <CardHeader>
            <CardTitle>Create a Study Group</CardTitle>
            <CardDescription>
              Collaborate with other learners and share knowledge
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={createGroup} className="space-y-4">
              <Input
                placeholder="Group name..."
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                maxLength={50}
              />
              <Textarea
                placeholder="Describe your study group..."
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                rows={3}
                maxLength={500}
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="isPublic" className="text-sm">
                  Make this group public
                </label>
              </div>
              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={submitting || !newName.trim()}
                  variant="glow"
                >
                  Create Group
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {groups.length === 0 ? (
          <Card className="md:col-span-2">
            <CardContent className="pt-6">
              <div className="text-center text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No study groups yet. Create the first one!</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          groups.map((group) => (
            <Card key={group.id} className="hover:shadow-quantum transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {group.is_public ? (
                        <Globe className="w-4 h-4 text-green-500" />
                      ) : (
                        <Lock className="w-4 h-4 text-orange-500" />
                      )}
                      {group.name}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        <Users className="w-3 h-3 mr-1" />
                        {group.member_count} members
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Created {new Date(group.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm">
                  {group.description || "No description provided"}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs bg-quantum-blue/20">
                        <Users className="w-3 h-3" />
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">
                      Active group
                    </span>
                  </div>
                  {user && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => joinGroup(group.id)}
                      className="hover:bg-quantum-blue/10"
                    >
                      <UserPlus className="w-4 h-4 mr-1" />
                      Join
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default StudyGroups;