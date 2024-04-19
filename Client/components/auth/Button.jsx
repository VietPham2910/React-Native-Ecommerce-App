import React from 'react';
import { Text, TouchableOpacity, StyleSheet} from 'react-native';
import { COLORS } from '../../constants';



const Button = ({title, onPress = ()=> {}}) => {
    return (
        <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.btnStyle}>
      <Text style={styles.textStyle}>
        {title}
      </Text>
    </TouchableOpacity> 
    );
}

export default Button;

const styles = StyleSheet.create({
   btnStyle: {
    height: 50,
    width: '100%',
    backgroundColor: COLORS.primary,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12
  },

  textStyle:{
    color: COLORS.white,
     fontWeight: 'bold', 
     fontSize: 18}
})