import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useContext, useState } from "react";
import { SIZES, COLORS, SHADOWS } from "../../constants";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import { CartContext } from "./cartContext";


const CartTile = ({ item }) => {
  const navigation = useNavigation();
  const {setCount} = useContext(CartContext)

  deleteCart = async () => {
    const endpoint = `http://10.0.2.2:3000/api/cart/${item._id}`;
    
    try {
      const response = await axios.delete(endpoint)
      setCount(response.data.products.length)
      
      navigation.navigate("Bottom Navigation")
      
    } catch (error) {
      console.error("Failed to delete cart item:", error);
    }
  };


  return (
    <View>
      <TouchableOpacity style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.cartItem.imageUrl }}
            resizeMode="cover"
            style={styles.productImg}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.productTxt} numberOfLines={1}>
            {item.cartItem.title}
          </Text>
          <Text style={styles.supplierTxt} numberOfLines={1}>
            {item.cartItem.supplier}
          </Text>
          <Text style={styles.supplierTxt} numberOfLines={1}>
            {item.cartItem.price} * {item.quantity}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={{ paddingBottom: 20, paddingLeft: 75 }}
            onPress={()=> deleteCart()}
          >
            <AntDesign name="delete" size={18} color="red" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}} style={styles.checkoutBtn}>
            <Text style={styles.checkOutText}>CHECKOUT </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CartTile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: "#FFF",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  },
  imageContainer: {
    width: 70,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  productImg: {
    width: "100%",
    height: 65,
    borderRadius: SIZES.small,
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  productTxt: {
    fontSize: SIZES.medium,
    fontFamily: "bold",
    color: COLORS.primary,
  },
  supplierTxt: {
    fontSize: SIZES.small + 2,
    fontFamily: "regular",
    color: COLORS.gray,
    marginTop: 3,
    textTransform: "capitalize",
  },
  checkOutText: {
    paddingHorizontal: 10,
    fontSize: SIZES.small,
    fontWeight: "500",
    letterSpacing: 1,
    color: COLORS.lightWhite,
    textTransform: "uppercase",
  },
  checkoutBtn: {
    width: "100%",
    height: "35%",
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  orderRow: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  totalText: {
    fontFamily: "medium",
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
});
