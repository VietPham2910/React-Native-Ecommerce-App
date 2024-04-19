import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';


const ColorCircle = ({ color }) => {
  return (
    <View style={[styles.colorCircle, { backgroundColor: color.hexCode }]} />
  );
};

const ColorList = ({ colors }) => {
  return (
    <FlatList
      data={colors}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => <ColorCircle color={item} />}
      horizontal={true}
    />
  );
};

const styles = StyleSheet.create({
  colorCircle: {
    width: 20,
    height: 20,
    borderRadius: 50,
    margin: 10,
    
  }
});

export default ColorList;
