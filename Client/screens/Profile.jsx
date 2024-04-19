import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Alert,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  MaterialCommunityIcons,
  SimpleLineIcons,
  AntDesign,
} from "react-native-vector-icons";
import { COLORS, SIZES } from "../constants";
import { StatusBar } from "expo-status-bar";

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);

  useEffect(() => {
    checkUserExistence();
  }, []);
  const checkUserExistence = async () => {
    const id = await AsyncStorage.getItem("id");
    const userID = `user${JSON.parse(id)}`;
    try {
      const userData = await AsyncStorage.getItem(userID);
      if (userData !== null) {
        // User data exists
        const parsedData = JSON.parse(userData);
        // Use the retrieved data as needed
        setUserData(parsedData);
        setUserLogin(true);
      } else {
        navigation.navigate("Login");
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
  };

  const deleteAllKeys = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(allKeys);
      console.log("All keys deleted successfully.");
    } catch (error) {
      console.error("Error deleting keys:", error);
    }
  };

  const userLogout = async () => {
    const id = await AsyncStorage.getItem("id");
    const userID = `user${JSON.parse(id)}`;
    try {
      await AsyncStorage.multiRemove([userID, "token", "id"]);
      navigation.replace("Bottom Navigation");
    } catch (error) {
      console.error("Error deleting keys:", error);
    }
  };

  const deleteUser = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account?",
      [
        { text: "Cancel", onPress: () => console.log("Cancel pressed") },
        { text: "Yes", onPress: () => console.log("Delete pressed") },
      ],
      { defaultIndex: 1 } // Index 1 corresponds to the "Delete" button
    );
  };

  const clearCache = () => {
    Alert.alert(
      "Clear Cache",
      "Are you sure you want to clear all saved data on your device?",
      [
        { text: "Cancel", onPress: () => console.log("Cancel pressed") },
        { text: "Delete", onPress: () => deleteAllKeys() },
      ],
      { defaultIndex: 1 } // Index 1 corresponds to the "Delete" button
    );
  };

  const logout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", onPress: () => console.log("Cancel pressed") },
        { text: "Continue", onPress: () => userLogout() },
      ],
      { defaultIndex: 1 } // Index 1 corresponds to the "Delete" button
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.lightWhite,
        }}
      >
        <StatusBar backgroundColor={COLORS.gray} />
        <View style={{ width: "100%" }}>
          <Image
            source={require("../assets/images/space.jpg")}
            resizeMode="cover"
            style={styles.maiImag}
          />
        </View>

        <View style={{ flex: 1, alignItems: "center" }}>
          <Image
            source={require("../assets/images/profile.jpeg")}
            resizeMode="cover"
            style={styles.profileImg}
          />

          <Text style={styles.name}>
            {userData ? userData.username : "Please login into your account"}
          </Text>
          {userLogin === false ? (
            <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
              <View style={styles.loginBtn}>
            <Text style={styles.menuItemText}>LOGIN    </Text>
          </View>
            </TouchableOpacity>
          ): (
            <View style={styles.loginBtn}>
            <Text style={styles.menuItemText}>
              {userData ? userData.email : "email@email.com"}{" "}
            </Text>
          </View>
          )}


          {userLogin === false ? (
            <View></View>
          ): (
            <View style={styles.menuWrapper}>
            <TouchableOpacity onPress={() => navigation.navigate("Favorites")}>
              <View style={styles.menuItem(0.5)}>
                <MaterialCommunityIcons
                  name="heart-outline"
                  color={COLORS.primary}
                  size={25}
                />
                <Text style={styles.menuItemText}>Favorites</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Orders")}>
              <View style={styles.menuItem(0.5)}>
                <MaterialCommunityIcons
                  name="truck-delivery-outline"
                  size={24}
                  color={COLORS.primary}
                />
                <Text style={styles.menuItemText}>Orders</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
              <View style={styles.menuItem(0.5)}>
                <SimpleLineIcons name="bag" size={24} color={COLORS.primary} />
                <Text style={styles.menuItemText}>Cart</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={clearCache}>
              <View style={styles.menuItem(0.5)}>
                <MaterialCommunityIcons
                  name="cached"
                  size={24}
                  color={COLORS.primary}
                />
                <Text style={styles.menuItemText}>Clear Cache</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={deleteUser}>
              <View style={styles.menuItem(0.5)}>
                <AntDesign name="deleteuser" size={24} color={COLORS.primary} />
                <Text style={styles.menuItemText}>Delete Account</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={logout}>
              <View style={styles.menuItem(0)}>
                <AntDesign name="logout" size={24} color={COLORS.primary} />
                <Text style={styles.menuItemText}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
          )}
          
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  loginBtn:{
    backgroundColor: COLORS.secondary,
    padding: 2,
    borderWidth: 0.4,
    borderRadius: SIZES.xxLarge,
    borderColor: COLORS.primary,
  },
  maiImag: {
    height: 290,
    width: "100%",
  },
  profileImg: {
    height: 155,
    width: 155,
    borderRadius: 999,
    borderColor: COLORS.primary,
    borderWidth: 2,
    marginTop: -90,
  },

  uppaRow: {
    marginHorizontal: 20,
    marginBottom: 25,
  },

  name: {
    fontFamily: "bold",
    color: COLORS.primary,
    marginVertical: 4,
  },

  row: {
    flexDirection: "row",
  },

  menuWrapper: {
    marginTop: SIZES.xLarge,
    width: SIZES.width - SIZES.large,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 12,
  },
  menuItem: (borderBottomWidth) => ({
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderBottomColor: COLORS.gray,
    borderBottomWidth: borderBottomWidth,
  }),
  menuItemText: {
    fontFamily: "regular",
    color: COLORS.gray,
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 26,
  },
});
