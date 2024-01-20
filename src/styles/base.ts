import { StyleSheet, Dimensions } from 'react-native';

const mainAppPadding = 12;
const deviceWidth = Dimensions.get('window').width - mainAppPadding;
const dividedDeviceHeight = Dimensions.get('window').height / 2;

const styles = StyleSheet.create({
  appMainContainer: {
    flex: 1,
    width: '100%',
  },

  flashMessage: {
    paddingTop: 30
  },

  headerIcon: {
    color: 'white',
    fontSize: 48,
    paddingLeft: mainAppPadding,
  },

  personBoxIcon: {
    fontSize: 20,
    color: 'rgba(255,0,0,0.6)'
  },

  personBoxButton: {
    alignSelf: 'center',
    marginLeft: 'auto',
  },

  peopleView: {
    padding: 12
  },

  container: {
    flex: 1,
    paddingLeft: mainAppPadding,
    paddingRight: mainAppPadding,
  },

  picker: {
    color: 'white',
    backgroundColor: '#2F2F2F'
  },
  
  button: {
    padding: 10,
    backgroundColor: '#339966',
    borderRadius: 2,
  },
  
  pickerButton: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 10,
    paddingLeft: 10,
    backgroundColor: '#339966',
    borderRadius: 2,
    marginBottom: 6,
    marginTop: 12
  },

  personsView: {
    flexGrow: 1,
    paddingLeft: 12,
    paddingRight: 12,
    marginLeft: mainAppPadding,
    marginRight: mainAppPadding,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'rgba(0,0,0,0.1)',
  },

  homeTextPlaceholder: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#424242',
    padding: 20
  },
  
  header: {
    flexDirection: 'row',
    width: '100%',
    height: 70,
    backgroundColor: 'rgb(18,27,43)',
    alignItems: 'center',
  },

  home: {
    justifyContent: 'center',
    minHeight: '95%'
  },
  
  padding12LR: {
    paddingLeft: 12,
    paddingRight: 12
  },
  
  center: {
    justifyContent: 'center',
  },

  margin12Top: {
    marginTop: 12
  },

  margin12LR: {
    marginLeft: mainAppPadding,
    marginRight: mainAppPadding
  },

  margin12TopBottom: {
    marginTop: 12,
    marginBottom: 12
  },

  containerRadius: {
    borderRadius: 4
  },
  
  solidBorder: {
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'red'
  },
});

export { styles };
