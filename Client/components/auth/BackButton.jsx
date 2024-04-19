import React from 'react';
import { Ionicons, Feather, Fontisto } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from 'react-native'; 
import { SIZES } from '../../constants';

const BackButton = ({ onPress }) => {

    return (
        <View style={styles.upperRow}>
            <TouchableOpacity onPress={onPress}>
            <Ionicons name="chevron-back-circle-outline" size={30} color="black" />
            </TouchableOpacity>
            </View>
    );
}

export default BackButton;

const styles = StyleSheet.create({
    
    upperRow: {
        marginTop: SIZES.large,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        position: "absolute",
        borderRadius: SIZES.large,
        width: SIZES.width - SIZES.xxLarge,
        zIndex: 999
    },
})