
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { SIZES, COLORS, SHADOWS } from '../../constants';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 


const OrderTile = ({ item }) => {
  
  return (

    <View >
        <TouchableOpacity
          onPress={() => {}}
          style={styles.container}
          
        >
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: item.productId.imageUrl }}
              resizeMode='cover'
              style={styles.productImg}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.productTxt} numberOfLines={1}>
              {item.productId.title}
            </Text>
            <Text style={styles.supplierTxt} numberOfLines={1}>
              {item.productId.supplier}
            </Text>
            <Text style={styles.supplierTxt} numberOfLines={1}>
              ${item.productId.price} * {item.quantity}
            </Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => { }} style={styles.checkoutBtn}>
              <Text style={styles.checkOutText}>{item.payment_status} </Text>
            </TouchableOpacity>

            <View style={styles.orderRow}>
            <MaterialCommunityIcons name="truck-fast-outline" size={16} color="gray" />
              <Text style={styles.totalText}>  {item.delivery_status}</Text>
            </View>
          </View>
          </TouchableOpacity>
    </View>
  )
}

export default OrderTile;

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
    fontWeight: '500',
    letterSpacing: 1,
    color: COLORS.lightWhite,
    textTransform: 'uppercase'
  },
  checkoutBtn: {
    width: '100%',
    height: '35%',
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',

  },
  orderRow: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalText: {
    fontFamily: 'medium',
    fontSize: SIZES.small,
    color: COLORS.gray,
    textTransform: 'uppercase'
  }
})