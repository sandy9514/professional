import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
  Image,
  Alert,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import RecipeCard from "../component/RecipeCard";


export default function HomeScreen({ navigation, recipes }) {

  const [search, setSearch] = useState("");
  const [image, setImage] = useState(null);


  const pickImage = async () => {

    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();


    if (!permission.granted) {
      Alert.alert(
        "Permission Required",
        "Allow access to gallery"
      );
      return;
    }


    const result =
      await ImagePicker.launchImageLibraryAsync({

       mediaTypes: ["images"],
        allowsEditing: true,

        aspect: [1, 1],

        quality: 1,

      });


    if (!result.canceled) {

      setImage(result.assets[0].uri);

    }

  };


  const filteredRecipes = recipes.filter((recipe) => {

    const text = search.toLowerCase();

    return (
      recipe.title.toLowerCase().includes(text) ||
      recipe.subtitle.toLowerCase().includes(text)
    );

  });



  return (

    <View style={styles.container}>


      <Text style={styles.heading}>
        🍽 Recipe Collection
      </Text>


      <Text style={styles.subHeading}>
        Discover and manage your favourite recipes
      </Text>



      {/* Image Picker */}

      <Pressable
        style={styles.imageContainer}
        onPress={pickImage}
      >

        {
          image ? (

            <Image
              source={{ uri: image }}
              style={styles.profileImage}
            />

          ) : (

            <MaterialIcons
              name="add-a-photo"
              size={40}
              color="#6b7280"
            />

          )

        }

      </Pressable>



      <View style={styles.searchContainer}>

        <MaterialIcons
          name="search"
          size={22}
          color="#6b7280"
        />


        <TextInput

          placeholder="Search recipes..."

          placeholderTextColor="#6b7280"

          style={styles.searchInput}

          value={search}

          onChangeText={setSearch}

        />

      </View>



      <View style={styles.buttonRow}>


        <Pressable

          style={[styles.button, styles.addButton]}

          onPress={() => navigation.navigate("Add Recipe")}

        >

          <MaterialIcons
            name="add"
            size={20}
            color="#fff"
          />

          <Text style={styles.buttonText}>
            Add
          </Text>

        </Pressable>




        <Pressable

          style={[styles.button, styles.favButton]}

          onPress={() => navigation.navigate("Favourite")}

        >

          <MaterialIcons
            name="favorite"
            size={20}
            color="#fff"
          />

          <Text style={styles.buttonText}>
            Favourites
          </Text>

        </Pressable>


      </View>




      <FlatList

        data={filteredRecipes}

        keyExtractor={(item) => item.id}

        showsVerticalScrollIndicator={false}

        contentContainerStyle={{ paddingBottom: 20 }}

        renderItem={({ item }) => (

          <RecipeCard

            recipe={item}

            onPress={() =>
              navigation.navigate("Detail", {
                recipe: item,
              })
            }

          />

        )}

      />


    </View>

  );

}



const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor: "#f3f4f6",

    padding: 16,

  },


  heading: {

    fontSize: 30,

    fontWeight: "bold",

    color: "#111827",

    marginTop: 10,

  },


  subHeading: {

    fontSize: 15,

    color: "#6b7280",

    marginTop: 4,

    marginBottom: 15,

  },


  imageContainer: {

    width: 100,

    height: 100,

    borderRadius: 50,

    backgroundColor: "#e5e7eb",

    justifyContent: "center",

    alignItems: "center",

    alignSelf: "center",

    marginBottom: 20,

    overflow: "hidden",

  },


  profileImage: {

    width: 100,

    height: 100,

  },


  searchContainer: {

    flexDirection: "row",

    alignItems: "center",

    backgroundColor: "#fff",

    borderRadius: 15,

    paddingHorizontal: 15,

    marginBottom: 20,

    elevation: 2,

  },


  searchInput: {

    flex: 1,

    paddingVertical: 14,

    paddingHorizontal: 10,

    fontSize: 16,

  },


  buttonRow: {

    flexDirection: "row",

    justifyContent: "space-between",

    marginBottom: 20,

  },


  button: {

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    paddingVertical: 14,

    borderRadius: 15,

    flex: 0.48,

  },


  addButton: {

    backgroundColor: "#2563eb",

  },


  favButton: {

    backgroundColor: "#ef4444",

  },


  buttonText: {

    color: "#fff",

    fontSize: 16,

    fontWeight: "bold",

    marginLeft: 6,

  },

});