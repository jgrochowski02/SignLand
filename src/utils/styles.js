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
    paddingTop: '15%',
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
    height: 80,
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
BottomMenuicon: {
    width: 35,
    height: 35,
},
label: {
    fontSize: 12,
    color: '#000',
},



containerLogin: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 16,
  
},
inputLoginContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  borderBottomWidth: 1,
  borderBottomColor: '#000',
  marginBottom: 20,
  
  width: '100%',
  color: colours.text
  
},
overlay: {
  padding: 50,
  marginTop: 80,
  width: '100%',
  alignItems: 'center',
},
inputLogin: {
  flex: 1,
  height: 40,
  paddingHorizontal: 10,
},
buttonLogin: {
  backgroundColor: colours.orange,
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 25,
  marginTop: 20, 
},
buttonTextLogin: {
  color: colours.text,
  fontSize: 25,
  textAlign: 'center'
},
iconLogin: {
  width: 24,
  height: 24,
  marginRight: 10, 
},
titleLogin: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 20,
},
forgotPassword: {
  marginTop: 10,
},
register: {
  marginTop: 30, 
},
link: {
  color: colours.text,
},

itemText:{
  fontSize: 20,
  fontWeight: 'bold',
},
itemText2:{
  fontSize: 28,
  fontWeight: 'bold',
}



});

export default styles;
