import { StyleSheet, Text, View , TouchableOpacity} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES } from '../constants'
import { Ionicons } from '@expo/vector-icons';
// import { CartList } from '../components';
import OrdersList from '../components/orders/OrdersList';


const Orders = ({navigation}) => {
  return (
    <SafeAreaView
      style={styles.container}>
       <View style={styles.upperRow}>
                    <TouchableOpacity
                        style={{paddingLeft: 0}}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="chevron-back-circle" size={30} color={COLORS.black} />
                    </TouchableOpacity>
                    <Text style={styles.title}> Orders </Text>
                </View>
        
          <OrdersList />
      
    </SafeAreaView>
  )
}

export default Orders

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.lightWhite,
        position: 'relative',
      },
      upperRow: {
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: SIZES.width - 50,
    },
      title: {
        fontSize: SIZES.xLarge,
        fontFamily: 'bold',
        fontWeight: '500',
        letterSpacing: 2,
        paddingTop: SIZES.small,
        // paddingLeft: SIZES.xLarge,
        marginBottom: SIZES.xSmall,
      },
})