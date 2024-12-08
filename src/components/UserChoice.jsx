import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

const UserChoice = ({ title, iconName, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <MaterialIcons name={iconName} size={32} color="black" style={styles.icon} />
      <Text style={styles.title}>{title}</Text>
      <MaterialIcons name="chevron-right" size={24} color="black" style={styles.arrow} />
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
    marginRight: 15,
  },
  title: {
    flex: 1,
    fontSize: 20,
  },
  arrow: {},
});

export default UserChoice;
