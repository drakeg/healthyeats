import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, ChevronRight } from "lucide-react";
import ConversionResults from "./ConversionResults";

interface Recipe {
  title: string;
  ingredients: string[];
  instructions: string[];
}

interface RecipeConverterProps {
  onSaveRecipe: (originalRecipe: Recipe, modifiedRecipe: Recipe) => void;
  isPremiumUser: boolean;
}

const RecipeConverter: React.FC<RecipeConverterProps> = ({
  onSaveRecipe,
  isPremiumUser = false,
}) => {
  const [recipeText, setRecipeText] = useState("");
  const [recipeTitle, setRecipeTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [originalRecipe, setOriginalRecipe] = useState<Recipe | null>(null);
  const [modifiedRecipe, setModifiedRecipe] = useState<Recipe | null>(null);
  const [nutritionData, setNutritionData] = useState({
    original: {
      calories: 200,
      protein: 1,
      carbs: 23,
      fat: 12,
      fiber: 1,
      sugar: 15,
      sodium: 253,
      cholesterol: 11,
      vitaminC: 19,
      calcium: 29,
      iron: 0,
      potassium: 108
    },
    modified: {
      calories: 160,
      protein: 3,
      carbs: 18,
      fat: 8,
      fiber: 2,
      sugar: 8,
      sodium: 180,
      cholesterol: 5,
      vitaminC: 22,
      calcium: 35,
      iron: 0.5,
      potassium: 120
    },
  });

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRecipeText(e.target.value);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipeTitle(e.target.value);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setRecipeText(event.target.result as string);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = async () => {
    if (!recipeText.trim() || !recipeTitle.trim()) {
      return;
    }

    setIsLoading(true);

    // Parse the recipe text
    const lines = recipeText.split('\n').map(line => line.trim()).filter(Boolean);
    const ingredients: string[] = [];
    const instructions: string[] = [];
    let currentSection = 'ingredients';
    let foundFirstIngredient = false;

    lines.forEach(line => {
      const lowerLine = line.toLowerCase();
      
      // Skip empty lines, section headers, and image-related content
      if (!line || 
          lowerLine.includes('ingredients:') || 
          lowerLine.includes('directions:') || 
          lowerLine.includes('instructions:') || 
          lowerLine.includes('local offers') ||
          lowerLine.includes('dotdash') ||
          lowerLine.includes('food studios') ||
          lowerLine.includes('spreading') ||
          lowerLine.includes('slices of') ||
          lowerLine.includes('arranged on') ||
          lowerLine.includes('metal baking') ||
          lowerLine.includes('wooden board')) {
        return;
      }

      // Check if this line looks like an ingredient
      const isIngredient = line.match(/^\d+/) || 
                          line.match(/^[½¼¾⅓⅔⅛]/) || 
                          line.includes('cup') || 
                          line.includes('tablespoon') || 
                          line.includes('teaspoon') || 
                          line.includes('ounce') ||
                          line.includes('bag');

      // If we haven't found the first ingredient yet and this looks like one
      if (!foundFirstIngredient && isIngredient) {
        currentSection = 'ingredients';
        foundFirstIngredient = true;
      }

      // If we see instruction indicators, switch to instructions
      if (lowerLine.includes('gather') || 
          lowerLine.includes('combine') || 
          lowerLine.includes('whisk') || 
          lowerLine.includes('pour') ||
          lowerLine.includes('chill') ||
          lowerLine.includes('preheat') ||
          lowerLine.includes('grease') ||
          lowerLine.includes('spread') ||
          lowerLine.includes('lay')) {
        currentSection = 'instructions';
      }

      // Add content to appropriate section
      if (currentSection === 'ingredients' && isIngredient) {
        // Clean up ingredient lines
        const cleanLine = line.replace(/^\d+\.\s*/, '').trim();
        if (cleanLine && !cleanLine.toLowerCase().includes('directions')) {
          ingredients.push(cleanLine);
        }
      } else if (currentSection === 'instructions') {
        // Clean up instruction lines
        const cleanLine = line.replace(/^\d+\.\s*/, '').trim();
        if (cleanLine && !cleanLine.toLowerCase().includes('ingredients')) {
          instructions.push(cleanLine);
        }
      }
    });

    const parsedRecipe: Recipe = {
      title: recipeTitle,
      ingredients,
      instructions
    };

    setOriginalRecipe(parsedRecipe);

    // Create healthier version with substitutions
    const modifiedIngredients = ingredients.map(ingredient => {
      const lowerIngredient = ingredient.toLowerCase();
      if (lowerIngredient.includes('sugar')) {
        return ingredient.replace(/sugar/gi, 'honey or maple syrup');
      } else if (lowerIngredient.includes('vegetable oil')) {
        return ingredient.replace(/vegetable oil/gi, 'olive oil');
      } else if (lowerIngredient.includes('creamy salad dressing') || lowerIngredient.includes('miracle whip')) {
        return ingredient.replace(/(creamy salad dressing|miracle whip)/gi, 'light greek yogurt with herbs');
      }
      return ingredient;
    });

    const modifiedInstructions = instructions.map(instruction => {
      let modifiedInstruction = instruction;
      modifiedInstruction = modifiedInstruction.replace(/sugar/gi, 'honey or maple syrup');
      modifiedInstruction = modifiedInstruction.replace(/vegetable oil/gi, 'olive oil');
      modifiedInstruction = modifiedInstruction.replace(/(creamy salad dressing|miracle whip)/gi, 'light greek yogurt with herbs');
      return modifiedInstruction;
    });

    const modifiedRecipe: Recipe = {
      title: `Healthier ${recipeTitle}`,
      ingredients: modifiedIngredients,
      instructions: modifiedInstructions
    };

    setModifiedRecipe(modifiedRecipe);
    setIsLoading(false);
    setShowResults(true);
  };

  const resetConverter = () => {
    setRecipeText("");
    setRecipeTitle("");
    setShowResults(false);
    setOriginalRecipe(null);
    setModifiedRecipe(null);
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-background p-4 rounded-xl">
      {!showResults ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Recipe Converter
            </CardTitle>
            <CardDescription>
              Enter your recipe below to get a healthier version with
              nutritional comparison.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid w-full gap-2">
                <Label htmlFor="recipe-title">Recipe Title</Label>
                <Input
                  id="recipe-title"
                  placeholder="Enter recipe title..."
                  value={recipeTitle}
                  onChange={handleTitleChange}
                />
              </div>
              <Tabs defaultValue="text" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="text">Paste Recipe</TabsTrigger>
                  <TabsTrigger value="file">Upload File</TabsTrigger>
                </TabsList>

                <TabsContent value="text" className="space-y-4">
                  <div className="grid w-full gap-2">
                    <Label htmlFor="recipe-text">Recipe Text</Label>
                    <Textarea
                      id="recipe-text"
                      placeholder="Paste your recipe here..."
                      className="min-h-[300px] p-4"
                      value={recipeText}
                      onChange={handleTextChange}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="file" className="space-y-4">
                  <div className="grid w-full gap-2">
                    <Label htmlFor="recipe-file">Upload Recipe File</Label>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="recipe-file"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-4 text-gray-500" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> or
                            drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            TXT or PDF files only
                          </p>
                        </div>
                        <input
                          id="recipe-file"
                          type="file"
                          className="hidden"
                          accept=".txt,.pdf"
                          onChange={handleFileUpload}
                        />
                      </label>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              onClick={handleSubmit}
              disabled={!recipeText.trim() || !recipeTitle.trim() || isLoading}
              className="px-6"
            >
              {isLoading ? "Converting..." : "Convert Recipe"}
              {!isLoading && <ChevronRight className="ml-2 h-4 w-4" />}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="space-y-6">
          {originalRecipe && modifiedRecipe && (
            <ConversionResults
              originalRecipe={originalRecipe}
              modifiedRecipe={modifiedRecipe}
              nutritionData={nutritionData}
              onSave={() => onSaveRecipe(originalRecipe, modifiedRecipe)}
              isPremium={isPremiumUser}
            />
          )}
          <div className="flex justify-center">
            <Button variant="outline" onClick={resetConverter} className="mt-4">
              Convert Another Recipe
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeConverter;
