import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || localStorage.getItem('supabase_url') || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || localStorage.getItem('supabase_anon_key') || '';

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Check if Supabase is configured
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey);
};

// Save Supabase configuration
export const configureSupabase = (url, anonKey) => {
  localStorage.setItem('supabase_url', url);
  localStorage.setItem('supabase_anon_key', anonKey);
  // Reload the page to reinitialize Supabase client
  window.location.reload();
};

// User management functions
export const authService = {
  // Sign up new user
  async signUp(email, password, metadata = {}) {
    if (!supabase) throw new Error('Supabase not configured');

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    });

    return { data, error };
  },

  // Sign in existing user
  async signIn(email, password) {
    if (!supabase) throw new Error('Supabase not configured');

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    return { data, error };
  },

  // Sign out
  async signOut() {
    if (!supabase) throw new Error('Supabase not configured');

    const { error } = await supabase.auth.signOut();
    return { error };
  },

  // Get current user
  async getCurrentUser() {
    if (!supabase) return null;

    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  // Listen to auth changes
  onAuthStateChange(callback) {
    if (!supabase) return () => {};

    const { data: { subscription } } = supabase.auth.onAuthStateChange(callback);
    return () => subscription.unsubscribe();
  },

  // Send password reset email
  async resetPassword(email) {
    if (!supabase) throw new Error('Supabase not configured');

    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    return { data, error };
  }
};

// Journey storage functions
export const journeyService = {
  // Save a journey
  async saveJourney(journey) {
    if (!supabase) throw new Error('Supabase not configured');

    const user = await authService.getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('journeys')
      .insert({
        user_id: user.id,
        title: journey.title,
        nodes: journey.nodes,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    return { data, error };
  },

  // Get user's journeys
  async getUserJourneys() {
    if (!supabase) throw new Error('Supabase not configured');

    const user = await authService.getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('journeys')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    return { data, error };
  },

  // Delete a journey
  async deleteJourney(journeyId) {
    if (!supabase) throw new Error('Supabase not configured');

    const { error } = await supabase
      .from('journeys')
      .delete()
      .eq('id', journeyId);

    return { error };
  },

  // Update a journey
  async updateJourney(journeyId, updates) {
    if (!supabase) throw new Error('Supabase not configured');

    const { data, error } = await supabase
      .from('journeys')
      .update(updates)
      .eq('id', journeyId)
      .select()
      .single();

    return { data, error };
  }
};

// User preferences functions
export const preferencesService = {
  // Save user preferences
  async savePreferences(preferences) {
    if (!supabase) throw new Error('Supabase not configured');

    const user = await authService.getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('user_preferences')
      .upsert({
        user_id: user.id,
        preferences: preferences,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    return { data, error };
  },

  // Get user preferences
  async getPreferences() {
    if (!supabase) throw new Error('Supabase not configured');

    const user = await authService.getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error} = await supabase
      .from('user_preferences')
      .select('preferences')
      .eq('user_id', user.id)
      .single();

    return { data: data?.preferences, error };
  }
};

export default supabase;
