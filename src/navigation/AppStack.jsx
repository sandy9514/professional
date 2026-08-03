// src/navigation/AppStack.jsx
//
// EMPTY ON PURPOSE — we write this together in class.
//
// Everything a logged-IN user can reach.
// The FIRST Screen is what opens — reorder them and the app opens elsewhere.
//
// What goes in here:
//   1. const Stack = createNativeStackNavigator()   // from
//      "@react-navigation/native-stack"
//   2. <Stack.Navigator> with four screens:
//        "List"    -> ListScreen     options={{ title: "My Collection" }}
//        "Detail"  -> DetailScreen   options={({ route }) => ({
//                                      title: route.params?.title ?? "Detail"
//                                    })}   <- the FUNCTION form: the title
//                                             comes from the params
//        "Add"     -> AddScreen      options={{ title: "Add meal",
//                                               presentation: "modal" }}
//        "Profile" -> ProfileScreen