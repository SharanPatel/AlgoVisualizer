import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Dimensions } from 'react-native'

const screenHeight = Math.round(0.75 * Dimensions.get('window').height)

export default function Card(props) {
  return (
    <View style={styles.card}>
      <View style={styles.cardComponent}>{props.children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#ececec',
    shadowOffset: { width: 2, height: 2 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    margin: 5,
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    height: (screenHeight - 5 * 26) / 25,
  },
  cardComponent: {
    textAlignVertical: 'center',
    textAlign: 'center',
    padding: 5,
    margin: 5,
    flex: 1,
  },
})
