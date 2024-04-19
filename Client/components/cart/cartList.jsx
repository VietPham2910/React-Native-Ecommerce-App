import React, { useContext, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import CartTile from './cartTile';
import fetchCart from '../../hook/fetchCart';
import { COLORS, SIZES } from '../../constants';

const CartList = () => {
  const { data, isLoading, error } = fetchCart();
  const [selectedItem, setSelectedItem] = useState(null);

  const totalPrice = data.reduce((sum, item) => {
    const price = parseFloat(item.cartItem.price.replace('$', ''));
    const quantity = item.quantity;
    const itemTotal = price * quantity;
    return sum + itemTotal;
  }, 0);

  const roundedTotalPrice = totalPrice.toFixed(2);


  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }
  
    return (
      <View>
        {/* Render cart item list */}
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => 
            <CartTile item={item} />
        }
          vertical={true}
          contentContainerStyle={styles.container}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
  
        {/* Render order info */}
        <View style={styles.orderWrapper}>
          <Text style={styles.deliveryTitle}>Order Info</Text>
          <View style={styles.subs}>
            <Text style={styles.regularForOders}>Subtotal</Text>
            <Text style={styles.regularText}>${roundedTotalPrice}</Text>
          </View>
          <View style={styles.orderRow}>
            <Text style={styles.orderInfo}>Total</Text>
            <Text style={styles.totalTxt}>${roundedTotalPrice}</Text>
          </View>
        </View>
  
        {/* Render checkout button */}
        <View style={styles.checkWrapper}>
          <TouchableOpacity onPress={() => { }} style={styles.checkoutBtn}>
            <Text style={styles.checkOutText}>CHECKOUT ${roundedTotalPrice}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  selectedCartTile:{
    color: COLORS.secondary
  },

  separator: {
    // width: 16,
    height: 16
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center"
  },

  deliveryWrapper: {
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  deliveryTitle: {
    fontFamily: 'semibold',
    fontSize: SIZES.medium,
    color: COLORS.black,
    marginBottom: 20,
  },
  regularText: {
    fontFamily: 'regular',
    color: COLORS.gray,
  },
  checkOutText: {
    fontSize: SIZES.small,
    fontWeight: '500',
    letterSpacing: 1,
    color: COLORS.lightWhite,
    textTransform: 'uppercase'
  },
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconWrapper: {
    color: COLORS.primary,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 10,
    marginRight: 18,
  },
  checkoutBtn: {
    width: '90%',
    height: '85%',
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkWrapper: {
    position: 'absolute',
    bottom: 0,
    height: '10%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalTxt: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.black,
  },
  orderInfo: {
    fontSize: SIZES.small,
    fontWeight: '400',
    maxWidth: '80%',
    color: COLORS.gray,
  },
  orderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  orderWrapper: {
    paddingHorizontal: 16,
    marginTop: SIZES.large,
    marginBottom: 75,
  },
  subs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  regularForOders: {
    fontSize: SIZES.small,
    fontWeight: '400',
    maxWidth: '80%',
    color: COLORS.black,
    opacity: 0.5,
  }
});

export default CartList;
