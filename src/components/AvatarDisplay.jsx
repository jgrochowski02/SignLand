import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const AvatarDisplay = ({ avatarUri }) => {
  return (
    <View style={styles.container}>
      <Image source={avatarUri} style={styles.avatar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    marginBottom: -30
  },
  avatar: {
    width: 200,
    height: 200,
  },
});

export default AvatarDisplay;
