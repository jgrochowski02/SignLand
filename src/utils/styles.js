import { StyleSheet } from 'react-native';
import colours from './colours';

const styles = StyleSheet.create({
  containerDefaultBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerNoCenter: {  
    flex: 1,
    backgroundColor: colours.background,
  },
  headerContainer: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: colours.header,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
  text: {
    color: colours.text,
  },
  cameraContainer: {
    flex: 2,
    justifyContent: 'flex-end',
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
  slider: {
    width: '80%',
    height: 40,
  },
});

export default styles;
