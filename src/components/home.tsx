import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import RecipeConverter from "./RecipeConverter";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 10 }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <span className="text-2xl">🥗</span>
            </motion.div>
            <h1 className="text-xl font-bold text-green-600">
              HealthyRecipe Converter
            </h1>
          </div>
          <div className="flex space-x-4">
            <Button variant="ghost" size="sm">
              Login
            </Button>
            <Button variant="default" size="sm">
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Transform Your Favorite Recipes Into Healthier Versions
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our smart recipe converter suggests healthier ingredient
            substitutions while maintaining the flavor you love. Compare
            nutritional information and see the difference instantly.
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="w-full max-w-xs bg-green-50 border-green-100">
              <CardContent className="pt-6">
                <div className="text-center">
                  <span className="text-3xl mb-2 block">🥦</span>
                  <h3 className="font-semibold text-lg mb-2">
                    Healthier Ingredients
                  </h3>
                  <p className="text-sm text-gray-600">
                    Smart substitutions that maintain flavor
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="w-full max-w-xs bg-blue-50 border-blue-100">
              <CardContent className="pt-6">
                <div className="text-center">
                  <span className="text-3xl mb-2 block">📊</span>
                  <h3 className="font-semibold text-lg mb-2">
                    Nutrition Comparison
                  </h3>
                  <p className="text-sm text-gray-600">
                    See the nutritional improvements
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="w-full max-w-xs bg-purple-50 border-purple-100">
              <CardContent className="pt-6">
                <div className="text-center">
                  <span className="text-3xl mb-2 block">📚</span>
                  <h3 className="font-semibold text-lg mb-2">
                    Save Your Recipes
                  </h3>
                  <p className="text-sm text-gray-600">
                    Premium users can build a recipe book
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Recipe Converter Section */}
      <section className="container mx-auto px-4 py-8 mb-16">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Convert Your Recipe
          </h2>
          <RecipeConverter />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold flex items-center">
                <span className="mr-2">🥗</span> HealthyRecipe Converter
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                Eat better, feel better.
              </p>
            </div>
            <div className="flex space-x-6">
              <Link to="#" className="text-sm text-gray-300 hover:text-white">
                About
              </Link>
              <Link to="#" className="text-sm text-gray-300 hover:text-white">
                Pricing
              </Link>
              <Link to="#" className="text-sm text-gray-300 hover:text-white">
                Contact
              </Link>
              <Link to="#" className="text-sm text-gray-300 hover:text-white">
                Privacy
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} HealthyRecipe Converter. All
            rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
