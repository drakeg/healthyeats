-- Create recipes table
CREATE TABLE recipes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    original_ingredients TEXT[] NOT NULL,
    original_instructions TEXT[] NOT NULL,
    modified_ingredients TEXT[] NOT NULL,
    modified_instructions TEXT[] NOT NULL,
    nutrition_data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create RLS policies
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own recipes
CREATE POLICY "Users can view their own recipes"
    ON recipes FOR SELECT
    USING (auth.uid() = user_id);

-- Allow users to insert their own recipes
CREATE POLICY "Users can insert their own recipes"
    ON recipes FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own recipes
CREATE POLICY "Users can update their own recipes"
    ON recipes FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own recipes
CREATE POLICY "Users can delete their own recipes"
    ON recipes FOR DELETE
    USING (auth.uid() = user_id);

-- Create function to automatically set updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_recipes_updated_at
    BEFORE UPDATE ON recipes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 