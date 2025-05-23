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

interface RecipeConverterProps {
  onSaveRecipe?: (originalRecipe: string, modifiedRecipe: string) => void;
  isPremiumUser?: boolean;
}

const RecipeConverter = ({
  onSaveRecipe = () => {},
  isPremiumUser = false,
}: RecipeConverterProps) => {
  const [recipeText, setRecipeText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [originalRecipe, setOriginalRecipe] = useState("");
  const [modifiedRecipe, setModifiedRecipe] = useState("");
  const [nutritionData, setNutritionData] = useState({
    original: {
      calories: 650,
      protein: 25,
      carbs: 80,
      fat: 30,
    },
    modified: {
      calories: 450,
      protein: 30,
      carbs: 55,
      fat: 15,
    },
  });

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRecipeText(e.target.value);
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
    if (!recipeText.trim()) return;

    setIsLoading(true);
    setOriginalRecipe(recipeText);

    // Simulate API call for recipe conversion
    setTimeout(() => {
      // Mock data for demonstration
      const mockModifiedRecipe = recipeText
        .replace(/sugar/gi, "honey")
        .replace(/butter/gi, "olive oil")
        .replace(/white flour/gi, "whole wheat flour")
        .replace(/cream/gi, "greek yogurt");

      setModifiedRecipe(mockModifiedRecipe);
      setIsLoading(false);
      setShowResults(true);
    }, 1500);
  };

  const resetConverter = () => {
    setRecipeText("");
    setShowResults(false);
    setOriginalRecipe("");
    setModifiedRecipe("");
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
                  <Label htmlFor="recipe-file">Recipe File</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-10 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                    <Input
                      id="recipe-file"
                      type="file"
                      className="hidden"
                      accept=".txt,.doc,.docx,.pdf"
                      onChange={handleFileUpload}
                    />
                    <Label
                      htmlFor="recipe-file"
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      <Upload className="h-10 w-10 text-muted-foreground" />
                      <span className="font-medium">
                        Click to upload or drag and drop
                      </span>
                      <span className="text-sm text-muted-foreground">
                        .txt, .doc, .docx, or .pdf
                      </span>
                    </Label>
                  </div>
                  {recipeText && (
                    <div className="mt-4 p-4 border rounded-md bg-muted/20">
                      <p className="font-medium">File content:</p>
                      <p className="mt-2 text-sm whitespace-pre-wrap">
                        {recipeText}
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              onClick={handleSubmit}
              disabled={!recipeText.trim() || isLoading}
              className="px-6"
            >
              {isLoading ? "Converting..." : "Convert Recipe"}
              {!isLoading && <ChevronRight className="ml-2 h-4 w-4" />}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="space-y-6">
          <ConversionResults
            originalRecipe={originalRecipe}
            modifiedRecipe={modifiedRecipe}
            nutritionData={nutritionData}
            onSave={() => onSaveRecipe(originalRecipe, modifiedRecipe)}
            isPremiumUser={isPremiumUser}
          />
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
