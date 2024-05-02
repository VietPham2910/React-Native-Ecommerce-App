import React from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native';
import ProductCardView from '../ProductViewCard';
import useFetch from "../../hook/useFetch";
import { COLORS, SIZES } from '../../constants';

const ProductList = ({category}) => {
  switch (category) {
    case "Working desks":
      category = "desk";
      break;
    case "Chairs":
      category = "chair";
      break;
    case "Couches":
      category = "couch"
      break;
    default:
      category = null
  }
  const { data, isLoading, error } = useFetch(category);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (<ProductCardView item={item} />)}
        numColumns={2}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    alignItems: "center", 
    paddingTop: SIZES.xxLarge,
    paddingLeft: SIZES.small/2},
  separator: {
    height: 16
  },
  loadingContainer:{
    flex: 1, 
    alignItems: "center",
    justifyContent:"center",
    alignContent: "center"
  }
});

export default ProductList;
