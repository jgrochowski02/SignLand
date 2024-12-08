import React from 'react';
import { View,  Text } from 'react-native';
import styles from '../utils/styles';
import HelpComponent from '../components/HelpComponent'; 
import BottomMenu from '../components/BottomMenu';
import Header from '../components/Header';

const HelpScreen = ({navigation}) => {
  return (
    <View style={styles.containerNoCenter}>
        <Header title="FAQ" />
            <HelpComponent />          
        <BottomMenu navigation={navigation} />
    </View>
  );
};

export default HelpScreen;
