import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
    
  } catch (error) {
    throw new Error(error.message);
  }
};

export default addToCart;