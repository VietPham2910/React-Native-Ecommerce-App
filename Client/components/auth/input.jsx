import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';

import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants';

const Input = ({
    label,
    icon,
    error,
    password,
    onFocus = () => { },
    ...props }) => {
    const [obsecurePassWord, setObsecurePassWord] = React.useState(password);
    const [isFocused, setFocused] = React.useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={[styles.inputWrapper, { borderColor: error ? COLORS.primary: isFocused ? COLORS.secondary : COLORS.lightWhite }]}>
               
                {label === 'Location' ? (
                    <Ionicons name={icon} size={20} color="gray" style={{ marginRight: 10 }} />
                ) : (
                    <MaterialCommunityIcons name={icon} size={20} color="gray" style={{ marginRight: 10 }} />
                )}


                <TextInput
                    secureTextEntry={obsecurePassWord}
                    autoCapitalize='none'
                    autoCorrect={false}
                    onFocus={() => {
                        onFocus();
                        setFocused(true);
                    }}
                    onBlur={() => {
                        setFocused(false);
                    }}
                    style={{ flex: 1 }} {...props} />
                {label === "Password" && (<Ionicons onPress={() => setObsecurePassWord(!obsecurePassWord)} name={obsecurePassWord ? "eye-outline" : 'eye-off-outline'} size={24} color="black" />)}
            </View>
            {error && (
                <Text style={styles.erroMsg}>{error}</Text>
            )}

        </View>
    );
}

export default Input;

const styles = StyleSheet.create({
    container: {
        marginBottom: 20
    },
    inputWrapper: {
        backgroundColor: COLORS.secondary,
        height: 55,
        borderRadius: 12,
        flexDirection: 'row',
        paddingHorizontal: 15,
        alignItems: "center"
    },
    erroMsg: {
        color: COLORS.red,
        marginTop: 6, 
        marginLeft: 5,
        fontFamily: "regular",
        fontSize: SIZES.xSmall
    },
    label:{ 
        fontFamily: "regular",
        fontSize: SIZES.xSmall,
        marginBottom: 5, marginEnd: 5,textAlign: "right"}
})