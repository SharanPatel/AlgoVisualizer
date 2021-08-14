import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, Button } from 'react-native'
import Header from './searchComponents/header'
import { Dimensions } from 'react-native'
import text from './searchComponents/data'

const height = Math.round(Dimensions.get('window').height)
const width = Math.round(Dimensions.get('window').width)

export default function Searching({ goBack }) {
  const [array, setArray] = useState([])

  const addNumber = () => {
    let temp = text.split(' ')
    for (let i = temp.length - 1; i >= 0; i--) {
      let key = Math.random().toString()
      let object = { title: temp[i], color: '#ececec', key: key }
      setArray((currentArray) => {
        return [object, ...currentArray]
      })
    }

    console.log(array)
  }

  useEffect(() => {
    addNumber()
  }, [])

  return (
    <View style={styles.container}>
      <Header goBack={goBack} array={array} setArray={setArray} />
      <View style={styles.contentContainer}>
        <View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={array}
            numColumns={10}
            columnWrapperStyle={styles.table}
            renderItem={({ item }) => (
              <View
                style={{
                  borderRadius: 6,
                  elevation: 3,
                  shadowOffset: { width: 3, height: 3 },
                  shadowColor: '#333',
                  shadowOpacity: 0.3,
                  shadowRadius: 2,
                  margin: 8,
                  flex: 1,
                  backgroundColor: item.color,
                }}>
                <Text style={styles.cardComponent}>{item.title} </Text>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ececec',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  table: {
    borderRadius: 10,
    backgroundColor: '#D3D3D3',
    width: width - width / 6,
    height: (height - height / 4) / 10,
  },
  cardComponent: {
    textAlignVertical: 'center',
    textAlign: 'center',
    padding: 5,
    margin: 5,
  },
})
