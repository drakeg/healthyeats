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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeftRight, Save, Lock } from "lucide-react";
// Import NutritionPanel directly from the file path
import NutritionPanel from "./NutritionPanel";

interface Ingredient {
  original: string;
  substitution: string;
  reason: string;
}

interface Recipe {
  title: string;
  ingredients: string[];
  instructions: string[];
}

interface ConversionResultsProps {
  originalRecipe?: Recipe;
  modifiedRecipe?: Recipe;
  substitutions?: Ingredient[];
  isLoggedIn?: boolean;
  isPremium?: boolean;
  onSave?: () => void;
}

const ConversionResults: React.FC<ConversionResultsProps> = ({
  originalRecipe = {
    title: "Classic Chocolate Chip Cookies",
    ingredients: [
      "1 cup butter",
      "1 cup white sugar",
      "1 cup packed brown sugar",
      "2 eggs",
      "2 teaspoons vanilla extract",
      "3 cups all-purpose flour",
      "1 teaspoon baking soda",
      "2 teaspoons hot water",
      "1/2 teaspoon salt",
      "2 cups semisweet chocolate chips",
    ],
    instructions: [
      "Preheat oven to 350 degrees F (175 degrees C).",
      "Cream together the butter, white sugar, and brown sugar until smooth.",
      "Beat in the eggs one at a time, then stir in the vanilla.",
      "Dissolve baking soda in hot water. Add to batter along with salt.",
      "Stir in flour and chocolate chips.",
      "Drop by large spoonfuls onto ungreased pans.",
      "Bake for about 10 minutes in the preheated oven, or until edges are nicely browned.",
    ],
  },
  modifiedRecipe = {
    title: "Healthier Chocolate Chip Cookies",
    ingredients: [
      "1/2 cup coconut oil",
      "1/2 cup applesauce",
      "3/4 cup coconut sugar",
      "1/4 cup maple syrup",
      "2 eggs",
      "2 teaspoons vanilla extract",
      "2 cups whole wheat flour",
      "1 cup almond flour",
      "1 teaspoon baking soda",
      "2 teaspoons hot water",
      "1/2 teaspoon salt",
      "1 1/2 cups dark chocolate chips",
    ],
    instructions: [
      "Preheat oven to 350 degrees F (175 degrees C).",
      "Mix together the coconut oil, applesauce, coconut sugar, and maple syrup until smooth.",
      "Beat in the eggs one at a time, then stir in the vanilla.",
      "Dissolve baking soda in hot water. Add to batter along with salt.",
      "Stir in whole wheat flour, almond flour, and dark chocolate chips.",
      "Drop by large spoonfuls onto parchment-lined baking sheets.",
      "Bake for about 8-10 minutes in the preheated oven, or until edges are lightly browned.",
    ],
  },
  substitutions = [
    {
      original: "1 cup butter",
      substitution: "1/2 cup coconut oil + 1/2 cup applesauce",
      reason: "Reduces saturated fat and calories while maintaining moisture",
    },
    {
      original: "1 cup white sugar + 1 cup packed brown sugar",
      substitution: "3/4 cup coconut sugar + 1/4 cup maple syrup",
      reason: "Lower glycemic index and adds minerals and antioxidants",
    },
    {
      original: "3 cups all-purpose flour",
      substitution: "2 cups whole wheat flour + 1 cup almond flour",
      reason: "Adds fiber, protein, and reduces refined carbohydrates",
    },
    {
      original: "2 cups semisweet chocolate chips",
      substitution: "1 1/2 cups dark chocolate chips",
      reason: "Higher antioxidant content and less sugar",
    },
  ],
  isLoggedIn = false,
  isPremium = false,
  onSave = () => console.log("Recipe saved"),
}) => {
  const [activeTab, setActiveTab] = React.useState("comparison");
  const [showLoginDialog, setShowLoginDialog] = React.useState(false);
  const [showPremiumDialog, setShowPremiumDialog] = React.useState(false);

  const handleSaveClick = () => {
    if (!isLoggedIn) {
      setShowLoginDialog(true);
    } else if (!isPremium) {
      setShowPremiumDialog(true);
    } else {
      onSave();
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
          <Button onClick={handleSaveClick} className="flex items-center gap-2">
            <Save size={16} />
            Save Recipe
            {!isPremium && <Lock size={14} className="ml-1" />}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="comparison">Side by Side</TabsTrigger>
          <TabsTrigger value="substitutions">Substitutions</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
        </TabsList>

        <TabsContent value="comparison" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{originalRecipe.title}</CardTitle>
                <Badge variant="outline" className="w-fit">
                  Original
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Ingredients:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {originalRecipe.ingredients.map((ingredient, index) => (
                        <li key={index} className="text-sm">
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Instructions:</h3>
                    <ol className="list-decimal pl-5 space-y-1">
                      {originalRecipe.instructions.map((instruction, index) => (
                        <li key={index} className="text-sm">
                          {instruction}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{modifiedRecipe.title}</CardTitle>
                <Badge className="bg-green-600 text-white w-fit">
                  Healthier Version
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Ingredients:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {modifiedRecipe.ingredients.map((ingredient, index) => {
                        const isSubstituted = substitutions.some(
                          (sub) =>
                            sub.substitution.includes(ingredient) ||
                            ingredient.includes(sub.substitution.split(" ")[0]),
                        );
                        return (
                          <li
                            key={index}
                            className={`text-sm ${isSubstituted ? "text-green-600 font-medium" : ""}`}
                          >
                            {ingredient}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Instructions:</h3>
                    <ol className="list-decimal pl-5 space-y-1">
                      {modifiedRecipe.instructions.map((instruction, index) => {
                        const hasSubstitution = substitutions.some((sub) =>
                          instruction.includes(sub.substitution.split(" ")[0]),
                        );
                        return (
                          <li
                            key={index}
                            className={`text-sm ${hasSubstitution ? "text-green-600 font-medium" : ""}`}
                          >
                            {instruction}
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="substitutions">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowLeftRight size={20} />
                Ingredient Substitutions
              </CardTitle>
              <p className="text-muted-foreground">
                Learn why we made these changes to your recipe
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {substitutions.map((sub, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Original
                        </p>
                        <p className="font-medium">{sub.original}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Substitution
                        </p>
                        <p className="font-medium text-green-600">
                          {sub.substitution}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Reason</p>
                        <p>{sub.reason}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nutrition">
          <NutritionPanel />
        </TabsContent>
      </Tabs>

      {/* Login Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign in to save recipes</DialogTitle>
            <DialogDescription>
              Create an account or sign in to save this recipe to your personal
              recipe book.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Button className="w-full">Sign In</Button>
            <Button variant="outline" className="w-full">
              Create Account
            </Button>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowLoginDialog(false)}>
              Maybe Later
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Premium Upgrade Dialog */}
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
