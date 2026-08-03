import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";


export default function AddRecipeScreen({
  navigation,
  route,
  addRecipe,
  editRecipe,
}) {


  const editingRecipe = route.params?.recipe;


  const [title, setTitle] = useState(
    editingRecipe ? editingRecipe.title : ""
  );


  const [subtitle, setSubtitle] = useState(
    editingRecipe ? editingRecipe.subtitle : ""
  );


  const [ingredients, setIngredients] = useState(
    editingRecipe
      ? editingRecipe.ingredients.join("\n")
      : ""
  );


  const [image, setImage] = useState(
    editingRecipe ? editingRecipe.image : null
  );



  const pickImage = async () => {

    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();


    if (!permission.granted) {

      Alert.alert(
        "Permission Required",
        "Allow gallery access"
      );

      return;

    }


    const result =
      await ImagePicker.launchImageLibraryAsync({

        mediaTypes: ImagePicker.MediaTypeOptions.Images,

        allowsEditing: true,

        aspect: [4, 3],

        quality: 1,

      });



    if (!result.canceled) {

      setImage(result.assets[0].uri);

    }

  };




  const saveRecipe = () => {


    if (!title || !subtitle || !ingredients) {

      Alert.alert(
        "Missing Fields",
        "Please fill all details"
      );

      return;

    }



    const recipeData = {

      id: editingRecipe
        ? editingRecipe.id
        : Date.now().toString(),


      title,


      subtitle,


      ingredients:
        ingredients
          .split("\n")
          .filter(item => item.trim() !== ""),


      image,


    };



    if (editingRecipe) {

      editRecipe(recipeData);

    } 
    
    else {

      addRecipe(recipeData);

    }



    navigation.goBack();

  };




  return (

    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >


      <Text style={styles.heading}>

        {
          editingRecipe
            ? "Edit Recipe"
            : "Add New Recipe"
        }

      </Text>



      <Pressable
        style={styles.imageBox}
        onPress={pickImage}
      >

        {
          image ? (

            <Image
              source={{ uri: image }}
              style={styles.image}
            />

          ) : (

            <MaterialIcons
              name="add-a-photo"
              size={45}
              color="#6b7280"
            />

          )

        }


      </Pressable>



      <Text style={styles.label}>
        Recipe Name
      </Text>


      <TextInput

        placeholder="Enter recipe name"

        style={styles.input}

        value={title}

        onChangeText={setTitle}

      />



      <Text style={styles.label}>
        Description
      </Text>


      <TextInput

        placeholder="Enter description"

        style={styles.input}

        value={subtitle}

        onChangeText={setSubtitle}

      />



      <Text style={styles.label}>
        Ingredients
      </Text>



      <TextInput

        placeholder={
          "Enter ingredients\nExample:\n2 eggs\n1 cup flour"
        }

        style={[
          styles.input,
          styles.textArea
        ]}

        value={ingredients}

        onChangeText={setIngredients}

        multiline

      />





      <Pressable

        style={styles.saveButton}

        onPress={saveRecipe}

      >

        <MaterialIcons
          name="save"
          size={22}
          color="#fff"
        />


        <Text style={styles.saveText}>

          {
            editingRecipe
              ? "Update Recipe"
              : "Save Recipe"
          }

        </Text>


      </Pressable>



    </ScrollView>

  );

}





const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor: "#f3f4f6",

    padding: 16,

  },


  heading: {

    fontSize: 28,

    fontWeight: "bold",

    color: "#111827",

    marginBottom: 20,

  },


  imageBox: {

    height: 220,

    backgroundColor: "#e5e7eb",

    borderRadius: 15,

    justifyContent: "center",

    alignItems: "center",

    marginBottom: 20,

    overflow: "hidden",

  },


  image: {

    width: "100%",

    height: "100%",

  },


  label: {

    fontSize: 16,

    fontWeight: "bold",

    marginBottom: 6,

    color: "#374151",

  },


  input: {

    backgroundColor: "#fff",

    borderRadius: 12,

    padding: 14,

    fontSize: 16,

    marginBottom: 15,

  },


  textArea: {

    height: 120,

    textAlignVertical: "top",

  },


  saveButton: {

    backgroundColor: "#2563eb",

    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    padding: 15,

    borderRadius: 15,

    marginTop: 10,

    marginBottom: 30,

  },


  saveText: {

    color: "#fff",

    fontSize: 17,

    fontWeight: "bold",

    marginLeft: 8,

  },

});