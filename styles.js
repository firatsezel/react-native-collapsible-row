import { StyleSheet } from 'react-native';

function getStyle() {
  return StyleSheet.create({
    container: {
      marginTop: 7,
      width: '90%',
      alignSelf: 'center',
      borderRadius: 20,
    },
    containerStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    defaultTitleStyle: {
      marginLeft: 15,
      marginTop: 5,
      maxWidth: 300,
    },
    toggleStyle: {
      position: 'absolute',
      right: 15,
      alignSelf: 'center',
    },
    arrowStyle: {
      height: 25,
      width: 25,
      borderRadius: 20,
      backgroundColor: '#E6E9FC',
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageStyle: {
      alignSelf: 'center',
      width: 10,
      height: 10,
    },
  });
}

module.exports = getStyle;
