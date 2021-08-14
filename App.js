import React, { useState } from 'react'
import Sorting from './Sorting'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  Touchable,
  ListView,
} from 'react-native'
import Header from './sortComponents/header'
import { Dimensions } from 'react-native'
import { ArrowLeftOutlined } from '@ant-design/icons'
const height = Math.round(Dimensions.get('window').height)
const width = Math.round(Dimensions.get('window').width)
let counter = 0
const min = 4
const max = 40
const header = '#30475e'
const barColor = '#30475e'
const yellow = '#f5d76e'
const grey = '#ccc'
const green = '#1DBC60'
const plain = '#ececec'

export default function App() {
  const [isSortingActive, SetSortingActive] = useState(false)

  if (isSortingActive) return <Sorting goBack={() => SetSortingActive(false)} />

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sharan's AlgoVisualizer</Text>
      </View>
      <View style={styles.center}>
        <TouchableHighlight
          onPress={() => SetSortingActive(true)}
          style={styles.button}>
          <Text style={styles.buttonText}>Sorting Visualizer</Text>
        </TouchableHighlight>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ececec',
  },
  header: {
    flexDirection: 'row',
    height: '8%',
    padding: 5,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: header,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: plain,
    fontSize: 20,
    fontWeight: 'bold',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    margin: 5,
    borderRadius: 10,
    backgroundColor: header,
  },
  buttonText: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 32,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: plain,
  },
})
