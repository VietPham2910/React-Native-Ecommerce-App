import { useState } from "react";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { COLORS, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";
import ProductCardView from "../ProductViewCard";

const ProductRow = () => {
  const { data, isLoading, error} = useFetch()
  return (
    <View style={styles.container}>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : error ? (
          <Text>Something went south</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (<ProductCardView item={item}  />)}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{columnGap: SIZES.medium}}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default ProductRow;


const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.small,

  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: 'medium',
    color: COLORS.primary,
  },
  headerBtn: {
    fontSize: SIZES.medium,
    fontFamily: 'medium',
    color: COLORS.gray,
  },
  cardsContainer: {
    marginTop: SIZES.medium,
  },
});
