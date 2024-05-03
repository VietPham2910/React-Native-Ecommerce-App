import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useCallback, useContext  } from "react";
import { StripeProvider } from "@stripe/stripe-react-native";
import BottomTabNavigation from './navigation/BottomTabNavigation';
import { Cart, Favorites, Details, Products, LoginPage, Signup, Profile } from './screens';
import Orders from "./screens/Orders";
import CartProvider from "./components/cart/cartContext";

const Stack = createNativeStackNavigator();
//we are going creates a native stack navigator  using the createNativeStackNavigator function.

// Defining the main App component
export default function App() {
  // Step One
  // Loading custom fonts using the useFonts hook
  const [fontsLoaded] = useFonts({
    regular: require("./assets/fonts/Poppins-Regular.ttf"), // Loading a font file for regular style
    light: require("./assets/fonts/Poppins-Light.ttf"), // Loading a font file for light style
    bold: require("./assets/fonts/Poppins-Bold.ttf"), // Loading a font file for bold style
    semibold: require("./assets/fonts/Poppins-SemiBold.ttf"), // Loading a font file for semi-bold style
    medium: require("./assets/fonts/Poppins-Medium.ttf"), // Loading a font file for medium style
    extrabold: require("./assets/fonts/Poppins-ExtraBold.ttf") // Loading a font file for extra bold style
  })
  // Defining a callback function to be called when the root view layout changes
  const onLayoutRootView = useCallback(async () => {
    // Checking if the fonts have been loaded
    if (fontsLoaded) {

      // Hiding the splash screen asynchronously
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // If the fonts are not loaded yet
  if (!fontsLoaded) {
    // Return null to render nothing (possibly displaying a loading indicator)
    return null;
  }

  return (
    //  1.   // Wrapping the app with the NavigationContainer component
    //  this serves as a container or wrapper that holds the navigation state and provides an essential context for navigation within your app

    //  2. //  Stack navigator the one we created on top can be used to define screen components 
    // and navigation options. in short this component which manages the child screens.


    //  3. // To add Screens to our stack we use Stack.Screen component
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Bottom Navigation'
            component={BottomTabNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Details'
            component={Details}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name='Cart'
            component={Cart}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name='Orders'
            component={Orders}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name='Login'
            component={LoginPage}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name='Signup'
            component={Signup}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name='Products'
            component={Products}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name='Favorites'
            component={Favorites}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name='Profile'
            component={Profile}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}

