import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Recipe {
  title: string;
  ingredients: string[];
  instructions: string[];
}

interface NutritionData {
  original: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
    sodium: number;
    cholesterol: number;
    vitaminC: number;
    calcium: number;
    iron: number;
    potassium: number;
  };
  modified: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
    sodium: number;
    cholesterol: number;
    vitaminC: number;
    calcium: number;
    iron: number;
    potassium: number;
  };
}

export const recipeService = {
  async saveRecipe(
    originalRecipe: Recipe,
    modifiedRecipe: Recipe,
    nutritionData: NutritionData
  ) {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User must be logged in to save recipes');
    }

    const { data, error } = await supabase
      .from('recipes')
      .insert({
        user_id: user.id,
        title: originalRecipe.title,
        original_ingredients: originalRecipe.ingredients,
        original_instructions: originalRecipe.instructions,
        modified_ingredients: modifiedRecipe.ingredients,
        modified_instructions: modifiedRecipe.instructions,
        nutrition_data: nutritionData,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  },

  async getRecipes() {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User must be logged in to view recipes');
    }

    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data;
  },

  async deleteRecipe(recipeId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User must be logged in to delete recipes');
    }

    const { error } = await supabase
      .from('recipes')
      .delete()
      .eq('id', recipeId)
      .eq('user_id', user.id);

    if (error) {
      throw error;
    }
  }
}; 