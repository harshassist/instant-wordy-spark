
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import type { Database } from '@/integrations/supabase/types'
import { toast } from '@/hooks/use-toast'
import { IS_FAKE_MODE, getFakeUser } from '@/lib/fake-auth'

type Profile = Database['public']['Tables']['profiles']['Row']
type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
type ProfileUpdate = Database['public']['Tables']['profiles']['Update']

const getCurrentUser = async () => {
  if (IS_FAKE_MODE) {
    return getFakeUser();
  }
  return supabase.auth.getUser();
};

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { user } } = await getCurrentUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
        throw error;
      }

      return data;
    }
  });
};

export const useCreateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (newProfile: Omit<ProfileInsert, 'user_id'>) => {
      const { data: { user } } = await getCurrentUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('profiles')
        .insert({ ...newProfile, user_id: user.id })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error) => {
      console.error('Create profile error:', error);
      toast({
        title: 'Error',
        description: 'Failed to create profile. Please try again.',
        variant: 'destructive'
      });
    }
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: ProfileUpdate & { id: string }) => {
      const { data: { user } } = await getCurrentUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id) // Extra safety check
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error) => {
      console.error('Update profile error:', error);
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive'
      });
    }
  });
};
