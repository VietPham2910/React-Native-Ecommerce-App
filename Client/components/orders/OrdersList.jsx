import React, { useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import fetchOrders from '../../hook/fetchOrders';
import OrderTile from './OrderTile';



const OrdersList = () => {
  const { data, isLoading, error } = fetchOrders();
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
            <OrderTile item={item}/>
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

});

export default OrdersList;
