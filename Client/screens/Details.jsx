import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { COLORS, SIZES, images } from '../constants';
import { SimpleLineIcons, Ionicons, MaterialCommunityIcons, Fontisto } from '@expo/vector-icons';
import { ColorList } from '../components';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import addToCart from '../hook/addToCart';
import axios from 'axios';
import { CartContext } from '../components/cart/cartContext';
import { useStripe } from '@stripe/stripe-react-native';

const Details = ({ navigation }) => {
  const route = useRoute();
  const { item } = route.params;
  const [paymentUrl, setPaymentUrl] = useState('');
  const [favorites, setFavorites] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(1);
  const {count, setCount} = useContext(CartContext)
  const { initPaymentSheet, presentPaymentSheet } = useStripe();


  useEffect(() => {
    checkFavorites();
    checkIdInAsyncStorage();
  }, []);

  const onCreateOrder = async () => {
    const id = await AsyncStorage.getItem('id');
    const result = await axios.post(`http://10.0.2.2:3000/api/orders/`,{
      cartItems: JSON.stringify([{
        cartItem: item,
        quantity: cartCount
      }]),
      userId: id,
      delivery_status: "Packaging",
      payment_status: "Pully paid",
    });

    if (result.status == 200) {
      Alert.alert(
        'Order has been submitted',
      );
    }
     else {
      Alert.alert(result.statusText);
     }
  };

  const onCheckout = async () => {
    // 1. Create a payment intent
    let url = 'http://10.0.2.2:3000/api/payments'
    const data = {
      amount: (cartCount * parseFloat(item.price.replace("$", ""))).toFixed(2),
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


  const checkFavorites = async () => {
    const userId = await AsyncStorage.getItem('id');
     const favoritesId = `favorites${JSON.parse(userId)}`;
     console.log(favoritesId);
    try {
      const favoritesObj = await AsyncStorage.getItem(favoritesId);
      if (favoritesObj !== null) {
        const favorites = JSON.parse(favoritesObj);
        if (favorites[item._id]) {
          setFavorites(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIdInAsyncStorage = async () => {
    try {
      const id = await AsyncStorage.getItem('id');
      if (id){
        setIsLoggedIn(true);
  
        userId = id;
      }

    } catch (error) {
      console.error(error);
    }
  }

  const addFavorites = async () => {
    const userId = await AsyncStorage.getItem('id');
    const favoritesId = `favorites${JSON.parse(userId)}`;
    let productId = item._id;
    let productObj = {
      title: item.title,
      id: item._id,
      supplier: item.supplier,
      imageUrl: item.imageUrl,
      price: item.price,
      product_location: item.product_location,
    };

    try {
    const existingItem = await AsyncStorage.getItem(favoritesId);
      let favoritesObj = existingItem ? JSON.parse(existingItem) : {};

      if (favoritesObj[productId]) {
        // Key already exists, so delete it
        delete favoritesObj[productId];

        console.log(`Deleted key: ${productId}`);
        setFavorites(false);
      } else {
        favoritesObj[productId] = productObj;
        console.log(`Added key: ${productId}`);
        setFavorites(true);
      }

      await AsyncStorage.setItem(favoritesId, JSON.stringify(favoritesObj));
    } catch (error) {
      console.log(error);
    }
  };


  const handlePress = () => {
    if (isLoggedIn) {
      onCheckout()
    } else {
      // Navigate to the Login page when hasId is false
      navigation.navigate('Login');
    }
  };

  const increment = () => {
    setCartCount(cartCount + 1);
  };

  const decrement = () => {
    if (cartCount > 1) {
      setCartCount(cartCount - 1);
    }
  };


  return (

    <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.upperRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back-circle" size={30} color={COLORS.black} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => addFavorites()}>
              {favorites ? (
                <Ionicons name="heart" size={30} color="green" />
              ) : (
                <Ionicons name="heart-outline" size={30} color={COLORS.black} />
              )
              }
            </TouchableOpacity>
          </View>

          <Image
            source={{ uri: item.imageUrl }}
            style={styles.image}
          />

          <View style={styles.details}>

            <View style={styles.titleRow(20, 20, SIZES.width - 44)}>
              <Text style={styles.title('bold', SIZES.large)}>{item.title}</Text>
              <View style={styles.priceWrapper}>
                <Text style={styles.title('semibold', SIZES.large, 10)}> {item.price}</Text>
              </View>

            </View>
            <View style={styles.titleRow(0, 5, SIZES.width - 10)}>
              <View style={styles.rating}>
                <View style={{ flexDirection: 'row' }}>
                  {[1, 2, 3, 4, 5].map((index) => (
                    <Ionicons
                      key={index}
                      name="star"
                      size={24}
                      color="gold"
                    />
                  ))}
                </View>
                <Text style={{ color: COLORS.gray, fontSize: SIZES.medium }}>  (4.9) </Text>
              </View>

              <View style={styles.rating}>
                <TouchableOpacity onPress={()=> increment()}>
                  <SimpleLineIcons name="plus" size={20} color="black" />
                </TouchableOpacity>
                <Text>   {cartCount}   </Text>
                <TouchableOpacity onPress={()=> decrement()}>
                  <SimpleLineIcons name="minus" size={20} color="black" />
                </TouchableOpacity>
              </View>

            </View>
          </View>



          <View style={styles.descriptionWrapper}>
            <Text style={styles.description}>Description</Text>
            <Text style={styles.descriptionText}>{item.description}</Text>

            <View style={{ marginBottom: 10 }}>
              <View style={styles.location}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="location-outline" size={20} color="black" />
                  <Text>   {item.product_location}</Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <MaterialCommunityIcons name="truck-delivery-outline" size={20} color="black" />
                  <Text>   Free Delivery      </Text>
                </View>
              </View>
            </View>

            <View >
              <ColorList colors={item.product_colors} />
            </View>


            <View style={styles.titleRow(0, 0)}>
              {/* onPress={handlePress} */}
              <TouchableOpacity style={styles.cartBtn} onPress={handlePress}>
                <Text style={styles.title('bold', SIZES.large, 10, COLORS.lightWhite)}>BUY NOW</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.addToCart} onPress={() => {
                  if (isLoggedIn){
                    addToCart(item._id, cartCount)
                    setCount(count + cartCount)
                  } else {
                    navigation.navigate('Login');
                  }}}>
                <Fontisto name="shopping-bag" size={22} color={COLORS.lightWhite} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
    </View>
  )
}


export default Details

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.lightWhite
  },
  location: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
    padding: 5,
    borderRadius: SIZES.xLarge
  },
  upperRow: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    width: SIZES.width - 44,
    top: SIZES.xxLarge,
    zIndex: 999
  },
  titleRow: (marginHorizontal, top, width) => ({
    marginHorizontal: marginHorizontal,
    paddingBottom: SIZES.xSmall,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: width,
    top: top,
  }),

  image: {
    aspectRatio: 1,
    resizeMode: 'cover',
  },
  details: {
    marginTop: -SIZES.large,
    backgroundColor: COLORS.lightWhite,
    width: SIZES.width,
    borderTopLeftRadius: SIZES.medium,
    borderTopRightRadius: SIZES.medium,
  },
  title: (fam, fz, padding, color) => ({
    fontFamily: fam,
    fontSize: fz,
    paddingHorizontal: padding,
    color: color ?? COLORS.black,
  }),

  priceWrapper: {
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.large
  },
  rating: {
    top: SIZES.large,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: SIZES.large,
  },
  description: {
    fontFamily: 'medium',
    fontSize: SIZES.large - 2,
  },
  descriptionWrapper: {
    marginTop: SIZES.large * 2,
    marginHorizontal: SIZES.large,
  },
  descriptionText: {
    fontFamily: 'regular',
    fontSize: SIZES.small,
    textAlign: "justify",
    marginBottom: SIZES.small

  },
  addToCart: {
    width: 37,
    height: 37,
    borderRadius: 50,
    margin: SIZES.small,
    backgroundColor: COLORS.black,
    alignItems: "center",
    justifyContent: "center",
  },

  cartBtn: {
    width: SIZES.width * 0.7,
    backgroundColor: COLORS.black,
    padding: SIZES.xSmall / 2,
    borderRadius: SIZES.large

  },



})