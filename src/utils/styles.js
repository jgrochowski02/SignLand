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
    justifyContent: 'space-between',
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



  bottomMenuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: colours.background,
},
tab: {
    alignItems: 'center',
},
tabCentered: {
    alignItems: 'center',
    position: 'relative', 
   
},
centeredIconContainer: {
    backgroundColor: colours.header, 
    borderRadius: 30, 
    padding: 15, 
},
icon: {
    width: 30,
    height: 30,
},
label: {
    fontSize: 12,
    color: '#000',
},



});

export default styles;
