import React from 'react';
import { View } from 'react-native';
import ChangePasswordComponent from '../components/ChangePasswordComponent';
import Header from '../components/Header';
import BottomMenu from '../components/BottomMenu';
import styles from '../utils/styles';

const ChangePasswordScreen = ({ navigation }) => {
  return (
    <View style={styles.containerNoCenter}>
            <Header title="ZMIANA HASŁA" />
    <ChangePasswordComponent navigation={navigation} />
    <BottomMenu navigation={navigation} />
    </View>
  );
};

export default ChangePasswordScreen;
