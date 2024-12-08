import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getAuth } from 'firebase/auth';
import styles from '../utils/styles';

const UserInfo = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  if (!user) return null; 

  return (
    <View style={styles.container}>
      <Text style={styles.itemText}> {user.email}</Text>
    </View>
  );
};


export default UserInfo;
