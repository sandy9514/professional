import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";

export default function RecipeCard({ recipe, onPress }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: recipe.image }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.title}>{recipe.title}</Text>

        <Text style={styles.subtitle}>
          {recipe.subtitle}
        </Text>

        <Text style={styles.time}>
          ⏱ {recipe.minutes} mins
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 4,
  },

  image: {
    width: "100%",
    height: 200,
  },

  content: {
    padding: 15,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#666",
    marginTop: 5,
  },

  time: {
    marginTop: 8,
    color: "#2563eb",
    fontWeight: "600",
  },
});