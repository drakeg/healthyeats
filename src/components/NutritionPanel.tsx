import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface NutritionPanelProps {
  originalNutrition?: NutritionInfo;
  modifiedNutrition?: NutritionInfo;
}

const NutritionPanel = ({
  originalNutrition = {
    calories: 450,
    protein: 15,
    carbs: 55,
    fat: 20,
  },
  modifiedNutrition = {
    calories: 350,
    protein: 20,
    carbs: 40,
    fat: 12,
  },
}: NutritionPanelProps) => {
  // Calculate percentage differences
  const calculateDifference = (original: number, modified: number) => {
    const diff = ((modified - original) / original) * 100;
    return diff.toFixed(1);
  };

  const caloriesDiff = calculateDifference(
    originalNutrition.calories,
    modifiedNutrition.calories,
  );
  const proteinDiff = calculateDifference(
    originalNutrition.protein,
    modifiedNutrition.protein,
  );
  const carbsDiff = calculateDifference(
    originalNutrition.carbs,
    modifiedNutrition.carbs,
  );
  const fatDiff = calculateDifference(
    originalNutrition.fat,
    modifiedNutrition.fat,
  );

  // Helper function to determine badge color based on nutritional value change
  const getBadgeVariant = (diff: number) => {
    if (diff > 0) {
      // For protein, increase is good
      return diff > 0 && diff < 100 ? "secondary" : "default";
    } else {
      // For calories, carbs, fat - decrease is good
      return diff < 0 ? "default" : "destructive";
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Nutritional Comparison
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Original Recipe Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Original Recipe</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Calories</span>
                  <span className="text-sm font-medium">
                    {originalNutrition.calories} kcal
                  </span>
                </div>
                <Progress value={100} className="h-2 bg-gray-200" />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Protein</span>
                  <span className="text-sm font-medium">
                    {originalNutrition.protein}g
                  </span>
                </div>
                <Progress value={100} className="h-2 bg-gray-200" />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Carbs</span>
                  <span className="text-sm font-medium">
                    {originalNutrition.carbs}g
                  </span>
                </div>
                <Progress value={100} className="h-2 bg-gray-200" />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Fat</span>
                  <span className="text-sm font-medium">
                    {originalNutrition.fat}g
                  </span>
                </div>
                <Progress value={100} className="h-2 bg-gray-200" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Modified Recipe Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Modified Recipe</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Calories</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {modifiedNutrition.calories} kcal
                    </span>
                    <Badge variant={getBadgeVariant(Number(caloriesDiff))}>
                      {caloriesDiff}%
                    </Badge>
                  </div>
                </div>
                <Progress
                  value={
                    (modifiedNutrition.calories / originalNutrition.calories) *
                    100
                  }
                  className="h-2 bg-gray-200"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Protein</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {modifiedNutrition.protein}g
                    </span>
                    <Badge variant={getBadgeVariant(Number(proteinDiff))}>
                      {proteinDiff}%
                    </Badge>
                  </div>
                </div>
                <Progress
                  value={
                    (modifiedNutrition.protein / originalNutrition.protein) *
                    100
                  }
                  className="h-2 bg-gray-200"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Carbs</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {modifiedNutrition.carbs}g
                    </span>
                    <Badge variant={getBadgeVariant(Number(carbsDiff))}>
                      {carbsDiff}%
                    </Badge>
                  </div>
                </div>
                <Progress
                  value={
                    (modifiedNutrition.carbs / originalNutrition.carbs) * 100
                  }
                  className="h-2 bg-gray-200"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Fat</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {modifiedNutrition.fat}g
                    </span>
                    <Badge variant={getBadgeVariant(Number(fatDiff))}>
                      {fatDiff}%
                    </Badge>
                  </div>
                </div>
                <Progress
                  value={(modifiedNutrition.fat / originalNutrition.fat) * 100}
                  className="h-2 bg-gray-200"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Separator className="my-4" />
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Summary</h3>
          <p className="text-sm text-gray-600">
            The modified recipe has {Math.abs(Number(caloriesDiff))}%{" "}
            {Number(caloriesDiff) < 0 ? "fewer" : "more"} calories,
            {Math.abs(Number(proteinDiff))}%{" "}
            {Number(proteinDiff) > 0 ? "more" : "less"} protein,
            {Math.abs(Number(carbsDiff))}%{" "}
            {Number(carbsDiff) < 0 ? "fewer" : "more"} carbs, and
            {Math.abs(Number(fatDiff))}% {Number(fatDiff) < 0 ? "less" : "more"}{" "}
            fat than the original recipe.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NutritionPanel;
