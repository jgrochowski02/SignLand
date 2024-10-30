import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const UserChoice = ({ title, icon, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.title}>{title}</Text>
      <Image source={require('../assets/icons/right-arrow.png')} style={styles.arrow} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  title: {
    flex: 1,
    fontSize: 16,
  },
  arrow: {
    width: 16,
    height: 16,
  },
});

export default UserChoice;
