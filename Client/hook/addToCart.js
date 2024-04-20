import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';


const addToCart = async (productId, quantity) => {

  try {
    const id = await AsyncStorage.getItem('id');
    const endpoint = 'http://10.0.2.2:3000/api/cart';
    const data = {
      cartItem: productId,
      quantity: quantity,
      userId: JSON.parse(id)
    };
     await axios.post(endpoint, data);

     Alert.alert("", "Product added to cart.", [
      { text: "OK", onPress: () => console.log("Product added") },
    ],)
    
  } catch (error) {
    throw new Error(error.message);
  }
};

export default addToCart;