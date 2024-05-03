import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { View, FlatList, StyleSheet, ActivityIndicator, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import CartTile from './cartTile';
import fetchCart from '../../hook/fetchCart';
import { COLORS, SIZES } from '../../constants';
import { useStripe } from '@stripe/stripe-react-native';
import { CartContext } from "./cartContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartList = ({forceUpdateCart}) => {
  const { data, isLoading, setData} = fetchCart();
  const [renderData, setRenderData] = useState([])
  const {count, setCount} = useContext(CartContext)
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  useEffect(()=>{
    setRenderData(data)
  }, [data])

  const onCreateOrder = async () => {
    const id = await AsyncStorage.getItem('id');
    const result = await axios.post(`http://10.0.2.2:3000/api/orders/`,{
      cartItems: JSON.stringify(data),
      userId: id,
      delivery_status: "Packaging",
      payment_status: "Pully paid",
    });

    if (result.status == 200) {
      console.log(`http://10.0.2.2:3000/api/cart/${JSON.parse(id)}`)
      const response = await axios.delete(`http://10.0.2.2:3000/api/cart/reset/${JSON.parse(id)}`)
      if (response.status != 200){
        console.log(response.statusText)
      } else {
        setCount(0)
        setData([])
        forceUpdateCart()
      }
      Alert.alert(
        'Order has been submitted',
      );
    }
     else {
      Alert.alert(result.statusText);
     }
  };

  deleteCartItem = async (item) => {
    const endpoint = `http://10.0.2.2:3000/api/cart/${item._id}`;
    
    try {
      const response = await axios.delete(endpoint)
      const newData = data.filter(i => i._id !== item._id)
      setData([...newData])
      setCount(count - item.quantity)
      forceUpdateCart()
    } catch (error) {
      console.error("Failed to delete cart item:", error);
    }
  };

  let roundedTotalPrice = 0
  if (data.length !== 0){
    const totalPrice = data.reduce((sum, item) => {
      const price = parseFloat(item.cartItem.price.replace('$', ''));
      const quantity = item.quantity;
      const itemTotal = price * quantity;
      return sum + itemTotal;
    }, 0);
    roundedTotalPrice = totalPrice.toFixed(2);
  }


  const onCheckout = async () => {
    // 1. Create a payment intent
    let url = 'http://10.0.2.2:3000/api/payments'
    const data = {
      amount: roundedTotalPrice,
    };
    console.log("Creating payment intent...")
    const response = await axios.post(url, data)
    if (response.error) {
      Alert.alert('Something went wrong');
      return;
    }

    //2. Initialize the Payment sheet
    console.log("Initialize the Payment sheet...")
    console.log(response.data)
    const initResponse = await initPaymentSheet({
      merchantDisplayName: 'Furniture shop',
      paymentIntentClientSecret: response.data.clientSecret,
      customFlow: false,
    });
    if (initResponse.error) {
      console.log(initResponse.error);
      Alert.alert('Something went wrong');
      return;
    }

    // 3. Present the Payment Sheet from Stripe
    console.log("presenting payment sheet...")
    const paymentResponse = await presentPaymentSheet();

    if (paymentResponse.error) {
      Alert.alert(
        `Error code: ${paymentResponse.error.code}`,
        paymentResponse.error.message
      );
      return;
    }

    //4. If payment ok -> create the order
    onCreateOrder();
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  function checkoutBtn(){
    return(
       <> 

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
        <View style={styles.checkWrapper}>
          <TouchableOpacity onPress={onCheckout} style={styles.checkoutBtn}>
            <Text style={styles.checkOutText}>CHECKOUT ${roundedTotalPrice}</Text>
          </TouchableOpacity>
        </View>
      </>
    )
  }
  
  return (
    <View>
      {/* Render cart item list */}
      {console.log("Total cart count: ", count)}
      <FlatList
        ListFooterComponent={checkoutBtn}
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => 
          <CartTile item={item} onItemDelete={deleteCartItem} />
      }
        vertical={true}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
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
