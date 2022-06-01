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

  container: {
    flex: 1,
    paddingLeft: mainAppPadding,
    paddingRight: mainAppPadding,
  },

  formContainer: {
    flexGrow: 1,
    justifyContent: 'center'
  },

  margin12Top: {
    marginTop: 12
  },

  picker: {
    color: 'white',
    backgroundColor: '#2F2F2F'
  },

  containerRadius: {
    borderRadius: 4
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

  padding12LR: {
    paddingLeft: 12,
    paddingRight: 12
  },

  headerIcon: {
    color: 'white',
    fontSize: 48,
    paddingLeft: mainAppPadding,
  }
});

export { styles };
