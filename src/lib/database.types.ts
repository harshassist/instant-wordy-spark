export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          role: 'candidate' | 'recruiter' | 'admin'
          full_name: string | null
          headline: string | null
          bio: string | null
          location: string | null
          experience_years: number | null
          education: string[] | null
          skills: string[] | null
          cv_url: string | null
          completion_pct: number | null
          created_at: string
          updated_at: string
          user_id: string
          education_level: string | null
          subject_expertise: string | null
          years_of_experience: number | null
          preferred_location: string | null
        }
        Insert: {
          id?: string
          role?: 'candidate' | 'recruiter' | 'admin'
          full_name?: string | null
          headline?: string | null
          bio?: string | null
          location?: string | null
          experience_years?: number | null
          education?: string[] | null
          skills?: string[] | null
          cv_url?: string | null
          completion_pct?: number | null
          created_at?: string
          updated_at?: string
          user_id: string
          education_level?: string | null
          subject_expertise?: string | null
          years_of_experience?: number | null
          preferred_location?: string | null
        }
        Update: {
          id?: string
          role?: 'candidate' | 'recruiter' | 'admin'
          full_name?: string | null
          headline?: string | null
          bio?: string | null
          location?: string | null
          experience_years?: number | null
          education?: string[] | null
          skills?: string[] | null
          cv_url?: string | null
          completion_pct?: number | null
          created_at?: string
          updated_at?: string
          user_id?: string
          education_level?: string | null
          subject_expertise?: string | null
          years_of_experience?: number | null
          preferred_location?: string | null
        }
      }
      organizations: {
        Row: {
          id: string
          recruiter_id: string | null
          name: string
          description: string | null
          website: string | null
          logo_url: string | null
          location: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          recruiter_id?: string | null
          name: string
          description?: string | null
          website?: string | null
          logo_url?: string | null
          location?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          recruiter_id?: string | null
          name?: string
          description?: string | null
          website?: string | null
          logo_url?: string | null
          location?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      jobs: {
        Row: {
          id: string
          organization_id: string | null
          title: string
          description: string
          location: string
          salary_range: string | null
          employment_type: 'full_time' | 'part_time' | 'contract' | 'temporary' | 'internship' | 'remote'
          requirements: string[] | null
          is_active: boolean
          is_approved: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organization_id?: string | null
          title: string
          description: string
          location: string
          salary_range?: string | null
          employment_type: 'full_time' | 'part_time' | 'contract' | 'temporary' | 'internship' | 'remote'
          requirements?: string[] | null
          is_active?: boolean
          is_approved?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organization_id?: string | null
          title?: string
          description?: string
          location?: string
          salary_range?: string | null
          employment_type?: 'full_time' | 'part_time' | 'contract' | 'temporary' | 'internship' | 'remote'
          requirements?: string[] | null
          is_active?: boolean
          is_approved?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      applications: {
        Row: {
          id: string
          job_id: string
          candidate_id: string
          status: 'pending' | 'reviewing' | 'interview' | 'offer' | 'rejected' | 'withdrawn'
          cover_letter: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          job_id: string
          candidate_id: string
          status?: 'pending' | 'reviewing' | 'interview' | 'offer' | 'rejected' | 'withdrawn'
          cover_letter?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          job_id?: string
          candidate_id?: string
          status?: 'pending' | 'reviewing' | 'interview' | 'offer' | 'rejected' | 'withdrawn'
          cover_letter?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          recruiter_id: string
          plan: 'free' | 'basic' | 'premium' | 'enterprise'
          status: 'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete'
          current_period_start: string
          current_period_end: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          recruiter_id: string
          plan?: 'free' | 'basic' | 'premium' | 'enterprise'
          status?: 'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete'
          current_period_start?: string
          current_period_end: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          recruiter_id?: string
          plan?: 'free' | 'basic' | 'premium' | 'enterprise'
          status?: 'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete'
          current_period_start?: string
          current_period_end?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'candidate' | 'recruiter' | 'admin'
      application_status: 'pending' | 'reviewing' | 'interview' | 'offer' | 'rejected' | 'withdrawn'
      employment_type: 'full_time' | 'part_time' | 'contract' | 'temporary' | 'internship' | 'remote'
      subscription_plan: 'free' | 'basic' | 'premium' | 'enterprise'
      subscription_status: 'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete'
    }
  }
}
