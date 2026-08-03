import React from "react";
import {
  ScrollView,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";

export default function DetailScreen({
  route,
  navigation,
  toggleFavourite,
  deleteRecipe,
}) {
  const { recipe } = route.params;

  const handleDelete = () => {
    Alert.alert(
      "Delete Recipe",
      "Are you sure you want to delete this recipe?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteRecipe(recipe.id);
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: recipe.image }}
        style={styles.image}
      />

      <Text style={styles.title}>{recipe.title}</Text>

      <Text style={styles.subtitle}>{recipe.subtitle}</Text>

      <Text style={styles.time}>
        ⏱ Cooking Time: {recipe.minutes} minutes
      </Text>

      <Pressable
        style={styles.favouriteButton}
        onPress={() => toggleFavourite(recipe)}
      >
        <Text style={styles.buttonText}>
          ❤️ Add to Favourites
        </Text>
      </Pressable>

      <Pressable
        style={styles.deleteButton}
        onPress={handleDelete}
      >
        <Text style={styles.buttonText}>
          🗑 Delete Recipe
        </Text>
      </Pressable>
      <Pressable
  style={styles.editButton}
  onPress={() =>
    navigation.navigate("Add Recipe", {
      recipe,
      isEditing: true,
    })
  }
>
  <Text style={styles.buttonText}>
    ✏️ Edit Recipe
  </Text>
</Pressable>

      <Text style={styles.heading}>Notes</Text>

      <Text style={styles.text}>
        {recipe.notes}
      </Text>

      <Text style={styles.heading}>Tags</Text>

      <Text style={styles.tags}>
  {recipe.tags?.join(" • ") || "No tags"}
</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
  },

  image: {
    width: "100%",
    height: 250,
    borderRadius: 15,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 15,
    color: "#111827",
  },

  subtitle: {
    fontSize: 18,
    color: "#6b7280",
    marginTop: 5,
  },

  time: {
    fontSize: 16,
    marginTop: 15,
    color: "#374151",
  },

  favouriteButton: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },

  deleteButton: {
    backgroundColor: "#dc2626",
    padding: 15,
    borderRadius: 10,
    marginTop: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 25,
  },

  text: {
    fontSize: 16,
    marginTop: 10,
    lineHeight: 24,
    color: "#374151",
  },

  tags: {
    marginTop: 10,
    fontSize: 16,
    color: "#059669",
    fontWeight: "600",
    marginBottom: 30,
  },
});