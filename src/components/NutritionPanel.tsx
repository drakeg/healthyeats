import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface NutritionInfo {
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
}

interface NutritionPanelProps {
  originalNutrition?: NutritionInfo;
  modifiedNutrition?: NutritionInfo;
}

const NutritionPanel = ({
  originalNutrition = {
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
  modifiedNutrition = {
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
}: NutritionPanelProps) => {
  // Calculate percentage differences
  const calculateDifference = (original: number, modified: number) => {
    const diff = ((modified - original) / original) * 100;
    return diff.toFixed(1);
  };

  // Helper function to determine badge color based on nutritional value change
  const getBadgeVariant = (nutrient: string, diff: number) => {
    if (nutrient === 'protein' || nutrient === 'fiber' || nutrient === 'vitaminC' || 
        nutrient === 'calcium' || nutrient === 'iron' || nutrient === 'potassium') {
      return diff > 0 ? 'default' : 'destructive';
    } else if (nutrient === 'calories' || nutrient === 'carbs' || nutrient === 'fat' || 
               nutrient === 'sugar' || nutrient === 'sodium' || nutrient === 'cholesterol') {
      return diff < 0 ? 'default' : 'destructive';
    }
    return 'secondary';
  };

  // Helper function to format nutrient values
  const formatNutrient = (value: number, nutrient: string) => {
    if (nutrient === 'calories') return `${value} kcal`;
    if (nutrient === 'sodium') return `${value}mg`;
    if (nutrient === 'cholesterol') return `${value}mg`;
    if (nutrient === 'vitaminC') return `${value}mg`;
    if (nutrient === 'calcium') return `${value}mg`;
    if (nutrient === 'iron') return `${value}mg`;
    if (nutrient === 'potassium') return `${value}mg`;
    return `${value}g`;
  };

  const renderNutrientRow = (nutrient: string, label: string) => {
    const original = originalNutrition[nutrient as keyof NutritionInfo] as number;
    const modified = modifiedNutrition[nutrient as keyof NutritionInfo] as number;
    const diff = calculateDifference(original, modified);
    const isPositive = Number(diff) > 0;
    const sign = isPositive ? '+' : '';

    return (
      <div key={nutrient}>
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">{label}</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {formatNutrient(modified, nutrient)}
            </span>
            <Badge variant={getBadgeVariant(nutrient, Number(diff))}>
              {sign}{diff}%
            </Badge>
          </div>
        </div>
        <Progress
          value={(modified / original) * 100}
          className="h-2 bg-gray-200"
        />
      </div>
    );
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
              {Object.entries({
                calories: 'Calories',
                protein: 'Protein',
                carbs: 'Total Carbohydrate',
                fat: 'Total Fat',
                fiber: 'Dietary Fiber',
                sugar: 'Total Sugars',
                sodium: 'Sodium',
                cholesterol: 'Cholesterol',
                vitaminC: 'Vitamin C',
                calcium: 'Calcium',
                iron: 'Iron',
                potassium: 'Potassium'
              }).map(([key, label]) => (
                <div key={key}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{label}</span>
                    <span className="text-sm font-medium">
                      {formatNutrient(originalNutrition[key as keyof NutritionInfo] as number, key)}
                    </span>
                  </div>
                  <Progress value={100} className="h-2 bg-gray-200" />
                </div>
              ))}
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
              {Object.entries({
                calories: 'Calories',
                protein: 'Protein',
                carbs: 'Total Carbohydrate',
                fat: 'Total Fat',
                fiber: 'Dietary Fiber',
                sugar: 'Total Sugars',
                sodium: 'Sodium',
                cholesterol: 'Cholesterol',
                vitaminC: 'Vitamin C',
                calcium: 'Calcium',
                iron: 'Iron',
                potassium: 'Potassium'
              }).map(([key, label]) => renderNutrientRow(key, label))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Separator className="my-4" />
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Summary</h3>
          <p className="text-sm text-gray-600">
            The modified recipe has {Math.abs(Number(calculateDifference(originalNutrition.calories, modifiedNutrition.calories)))}%{" "}
            {Number(calculateDifference(originalNutrition.calories, modifiedNutrition.calories)) < 0 ? "fewer" : "more"} calories,
            {Math.abs(Number(calculateDifference(originalNutrition.protein, modifiedNutrition.protein)))}%{" "}
            {Number(calculateDifference(originalNutrition.protein, modifiedNutrition.protein)) > 0 ? "more" : "less"} protein,
            {Math.abs(Number(calculateDifference(originalNutrition.carbs, modifiedNutrition.carbs)))}%{" "}
            {Number(calculateDifference(originalNutrition.carbs, modifiedNutrition.carbs)) < 0 ? "fewer" : "more"} carbs, and
            {Math.abs(Number(calculateDifference(originalNutrition.fat, modifiedNutrition.fat)))}% {Number(calculateDifference(originalNutrition.fat, modifiedNutrition.fat)) < 0 ? "less" : "more"}{" "}
            fat than the original recipe.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NutritionPanel;
