import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Lock } from "lucide-react";
import NutritionPanel from "./NutritionPanel";
import AuthDialog from "./AuthDialog";
import { recipeService } from "@/services/recipeService";
import { useToast } from "@/components/ui/use-toast";

interface Recipe {
  title: string;
  ingredients: string[];
  instructions: string[];
}

interface ConversionResultsProps {
  originalRecipe: Recipe;
  modifiedRecipe: Recipe;
  nutritionData: {
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
  };
  onSave: () => void;
  isPremium?: boolean;
}

const ConversionResults: React.FC<ConversionResultsProps> = ({
  originalRecipe,
  modifiedRecipe,
  nutritionData,
  onSave,
  isPremium = false,
}) => {
  const [activeTab, setActiveTab] = React.useState("comparison");
  const [showLoginDialog, setShowLoginDialog] = React.useState(false);
  const [showPremiumDialog, setShowPremiumDialog] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const { toast } = useToast();

  const handleSaveClick = () => {
    if (!isLoggedIn) {
      setShowLoginDialog(true);
    } else if (!isPremium) {
      setShowPremiumDialog(true);
    } else {
      saveRecipe();
    }
  };

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    if (isPremium) {
      saveRecipe();
    } else {
      setShowPremiumDialog(true);
    }
  };

  const saveRecipe = async () => {
    try {
      setIsSaving(true);
      await recipeService.saveRecipe(originalRecipe, modifiedRecipe, nutritionData);
      toast({
        title: "Recipe saved!",
        description: "Your recipe has been saved to your recipe book.",
      });
      onSave();
    } catch (error) {
      toast({
        title: "Error saving recipe",
        description: error instanceof Error ? error.message : "An error occurred while saving your recipe.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-background w-full max-w-7xl mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Recipe Conversion Results</h2>
          <p className="text-muted-foreground">
            See how we've made your recipe healthier
          </p>
        </div>
        <div className="flex items-center mt-4 md:mt-0 space-x-2">
          <Button 
            onClick={handleSaveClick} 
            className="flex items-center gap-2"
            disabled={isSaving}
          >
            <Save size={16} />
            {isSaving ? "Saving..." : "Save Recipe"}
            {!isPremium && <Lock size={14} className="ml-1" />}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="comparison">Nutrition Comparison</TabsTrigger>
          <TabsTrigger value="recipes">Recipe Details</TabsTrigger>
        </TabsList>

        <TabsContent value="comparison">
          <NutritionPanel
            originalNutrition={nutritionData.original}
            modifiedNutrition={nutritionData.modified}
          />
        </TabsContent>

        <TabsContent value="recipes">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Original Recipe</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Ingredients</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {originalRecipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Instructions</h4>
                    <ol className="list-decimal pl-5 space-y-2">
                      {originalRecipe.instructions.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Modified Recipe</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Ingredients</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {modifiedRecipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Instructions</h4>
                    <ol className="list-decimal pl-5 space-y-2">
                      {modifiedRecipe.instructions.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <AuthDialog
        open={showLoginDialog}
        onOpenChange={setShowLoginDialog}
        onAuthSuccess={handleAuthSuccess}
      />

      <AlertDialog open={showPremiumDialog} onOpenChange={setShowPremiumDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Upgrade to Premium</AlertDialogTitle>
            <AlertDialogDescription>
              Saving recipes is a premium feature. Upgrade your account to
              unlock your personal recipe book and more.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Upgrade Now</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ConversionResults;
