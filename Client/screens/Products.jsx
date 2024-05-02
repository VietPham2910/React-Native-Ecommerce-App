import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants';
import { AnimatedTitle, ProductList } from '../components';


const Products = ({ route, navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <View style={styles.upperRow}>
                    <TouchableOpacity
                        style={{paddingLeft: 0}}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="chevron-back-circle" size={30} color={COLORS.lightWhite} />
                    </TouchableOpacity>
                   <AnimatedTitle title={route.params.screenTitle}/>
                </View>
                    <ProductList category={route.params.screenTitle}/>
            </View>
        </SafeAreaView>
    )
}

export default Products

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightWhite
    },
    wrapper: {
        flex: 1,
        backgroundColor: COLORS.lightWhite
    },
    upperRow: {
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        position: "absolute",
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.large,
        width: SIZES.width - 50,
        top: 20,
        zIndex: 999
    },
    title:(fam, fz, padding, color)=>({
        fontFamily: fam,
        fontSize: fz,
        paddingHorizontal: padding,
        color: color??COLORS.black,
      }),
})