import { useState } from "react";
import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { COLORS, SIZES } from '../constants'
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Welcome = () => {
  
 const navigation = useNavigation();

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.welcomeTxt}> Find The Most</Text>
        <Text style={styles.welcomeMessage}> Luxurious Furniture</Text>
      </View>
      
      
      <View style={styles.searchContainer}>
      <TouchableOpacity>
      <Feather style={styles.searchIcon} name="search" size={24} color="black" />
      </TouchableOpacity>
        <View style={styles.searchWrapper}>
       
          <TextInput
            style={styles.searchInput}
            value=""
            onPressIn={() => navigation.navigate("Search")}
            placeholder="What are you looking for?"
          />
      </View>
      
        <TouchableOpacity style={styles.searchBtn} onPress={() => {}}>
        <Ionicons name="camera-outline" size={SIZES.xLarge} color={COLORS.offwhite} />
        </TouchableOpacity>
     
      </View>
      
    </View>
  );
};

export default Welcome;



const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  welcomeTxt: {
    fontFamily:'bold',
    fontSize: SIZES.xxLarge-5,
    color: COLORS.black,
    marginTop: SIZES.xSmall
  },
  welcomeMessage: {
    fontFamily: 'bold',
    fontSize: SIZES.xxLarge - 6,
    color: COLORS.primary,
  },
  
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    marginVertical: SIZES.medium,
    height: 50,
  },
  
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    marginRight: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.small,
    height: "100%",
  },
  searchInput: {
    fontFamily: 'regular',
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.medium,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  searchIcon: {
    marginRight: 10,
    marginLeft: 10,
    color: 'gray',
  },
  tabsContainer: {
    width: "100%",
    marginTop: SIZES.medium,
  },
  tab: (activeJobType, item) => ({
    paddingVertical: SIZES.small / 2,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.medium,
    borderWidth: 1,
    borderColor: activeJobType === item ? COLORS.secondary : COLORS.gray2,
  }),
  tabText: (activeJobType, item) => ({
    fontFamily: 'medium',
    color: activeJobType === item ? COLORS.secondary : COLORS.gray2,
  }),
});