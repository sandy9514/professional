import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HomeScreen from "./src/screens/HomeScreen";
import DetailScreen from "./src/screens/DetailScreen";
import FavouriteScreen from "./src/screens/FavouriteScreen";
import AddRecipeScreen from "./src/screens/AddRecipeScreen";

import SEED_ITEMS from "./src/data/seed";

const Stack = createNativeStackNavigator();

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const savedRecipes = await AsyncStorage.getItem("recipes");
      const savedFavourites = await AsyncStorage.getItem("favourites");

      if (savedRecipes) {
  const parsed = JSON.parse(savedRecipes).map((recipe) => ({
    tags: [],
    notes: "",
    favourite: false,
    ...recipe,
  }));

  setRecipes(parsed);
} else {
  setRecipes(SEED_ITEMS);
}
     if (savedFavourites) {
  const favs = JSON.parse(savedFavourites).map((recipe) => ({
    tags: [],
    notes: "",
    favourite: false,
    ...recipe,
  }));

  setFavourites(favs);
}
    } catch (error) {
      console.log(error);
      setRecipes(SEED_ITEMS);
    }
  };

  const saveRecipes = async (updatedRecipes) => {
    setRecipes(updatedRecipes);
    await AsyncStorage.setItem(
      "recipes",
      JSON.stringify(updatedRecipes)
    );
  };

  const addRecipe = async (recipe) => {
    const updated = [recipe, ...recipes];
    await saveRecipes(updated);
  };

  const deleteRecipe = async (id) => {
    const updatedRecipes = recipes.filter((item) => item.id !== id);
    await saveRecipes(updatedRecipes);

    const updatedFavs = favourites.filter((item) => item.id !== id);
    setFavourites(updatedFavs);

    await AsyncStorage.setItem(
      "favourites",
      JSON.stringify(updatedFavs)
    );
  };
  const editRecipe = async (updatedRecipe) => {
  const updatedRecipes = recipes.map((recipe) =>
    recipe.id === updatedRecipe.id ? updatedRecipe : recipe
  );

  setRecipes(updatedRecipes);

  await AsyncStorage.setItem(
    "recipes",
    JSON.stringify(updatedRecipes)
  );

  const updatedFavourites = favourites.map((recipe) =>
    recipe.id === updatedRecipe.id ? updatedRecipe : recipe
  );

  setFavourites(updatedFavourites);

  await AsyncStorage.setItem(
    "favourites",
    JSON.stringify(updatedFavourites)
  );
};

  const toggleFavourite = async (recipe) => {
    const exists = favourites.some((item) => item.id === recipe.id);

    let updated;

    if (exists) {
      updated = favourites.filter((item) => item.id !== recipe.id);
    } else {
      updated = [...favourites, recipe];
    }

    setFavourites(updated);

    await AsyncStorage.setItem(
      "favourites",
      JSON.stringify(updated)
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="Home"
          options={{ title: "Recipe Collection" }}
        >
          {(props) => (
            <HomeScreen
              {...props}
              recipes={recipes}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="Detail"
          options={{ title: "Recipe Details" }}
        >
          {(props) => (
            <DetailScreen
              {...props}
              toggleFavourite={toggleFavourite}
              deleteRecipe={deleteRecipe}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="Favourite"
          options={{ title: "Favourite Recipes" }}
        >
          {(props) => (
            <FavouriteScreen
              {...props}
              favourites={favourites}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
  name="Add Recipe"
  options={{ title: "Add / Edit Recipe" }}
>
  {(props) => (
    <AddRecipeScreen
      {...props}
      addRecipe={addRecipe}
      editRecipe={editRecipe}
    />
  )}
</Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}