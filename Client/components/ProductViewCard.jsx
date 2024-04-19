import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SIZES, COLORS } from '../constants';
import { useNavigation } from '@react-navigation/native';
import addToCart from '../hook/addToCart';


const ProductCardView = ({item}) => {
const navigation = useNavigation();
  return (
    
    <TouchableOpacity onPress={() => navigation.navigate('Details', {item})} >
      <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri:item.imageUrl}}
          style={styles.image}
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.name} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.supplier}numberOfLines={1}>{item.supplier}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => addToCart(item._id, 1)}
      >
        <Ionicons name="add-circle" size={35} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
    </TouchableOpacity>
  );
};

export default ProductCardView;

const styles = StyleSheet.create({
  container: {
            width: 182,
            height: 240,
            marginEnd: 22,
            borderRadius: SIZES.medium,
            backgroundColor: COLORS.secondary,
          },
          imageContainer: {
            flex: 1,
            width: 170,
            marginLeft: SIZES.small/2,
            marginTop:SIZES.small/2,
            borderRadius: SIZES.small,
            overflow: 'hidden',
          },
          image: {
            aspectRatio: 1,
            resizeMode: 'cover',
          },
          detailsContainer: {
            padding: SIZES.small,
          },
          name: {
            fontSize: SIZES.large,
            fontFamily: 'bold',
            color: COLORS.black,
            marginBottom: 1,
          },
          supplier: {
              fontFamily: 'regular',
            fontSize: SIZES.small,
            color: COLORS.gray,
          },
          price: {
            fontSize: SIZES.medium,
            fontFamily: 'bold',
            color: COLORS.black,
          },
          addButton: {
            position: 'absolute',
            bottom: SIZES.xSmall,
            right: SIZES.xSmall,
          },
          
});