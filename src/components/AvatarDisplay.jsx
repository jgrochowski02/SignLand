import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const AvatarDisplay = ({ avatarUri }) => {
  const source = typeof avatarUri === 'string' ? { uri: avatarUri } : avatarUri;

  return (
    <View style={styles.container}>
      <Image source={source} style={styles.avatar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    marginBottom: -30,
  },
  avatar: {
    width: 280,
    height: 280,
    borderRadius: 140,
  },
});

export default AvatarDisplay;
