import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const EmergencySharingTest = () => {
  return (
    <View style={styles.container}>
     <View style={styles.outerBox}>
     <View style={styles.circularTimerContainer}></View>


     <View style={styles.userMenu}>
       <View style={styles.menuItem}>
        <View style={styles}></View>
       </View>
       <View style={styles.menuItem}></View>
       <View style={styles.menuItem}></View>
     </View>
     </View>
    </View>
  )
}

export default EmergencySharingTest

const styles = StyleSheet.create({

  container: {
    height: '100%',
    width: '100%',
    margin: 0,
    padding: 20,
    backgroundColor: 'rgba(164, 164, 164, 0.29)'
  },
  outerBox:{
    flex: 0.8,
    borderWidth: 1,
    borderColor: 'white',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  circularTimerContainer: {
    height: '50%',
    width: '80%',
    borderColor: 'orange',
    borderWidth: 10,
    borderRadius: 200
  },
  userMenu:{
    flex: 1,
    flexGrow: 'true',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  menuItem: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    backgroundColor: 'rgba(77, 45, 45, 0.8)'
  }

})