import { ArrowLeftOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native'

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
const header = '#30475e'
const yellow = '#f5d76e'
const grey = '#ccc'
const green = '#1DBC60'
const plain = '#ececec'

export default function Header({ goBack, array, setArray }) {
  const [num, setNum] = useState()
  const [run, setRun] = useState(true)
  const changeHandler = (val) => {
    if (val != '')
      setNum(
        val.toLowerCase()[0].toUpperCase() + val.toLowerCase().substring(1)
      )
    else setNum('')
  }

  async function linearSearch(start, end, speed = 30) {
    let isFound = false
    for (let i = start; i < end; i++) {
      if (isFound == true) {
        break
      }
      array[i].color = yellow
      refresh()
      await sleep(speed)
      array[i].color = grey
      if (array[i].title == num) {
        array[i].color = green
        isFound = true
      }
      refresh()
      await sleep(speed / 2)
    }
    setRun(true)
  }

  async function jumpSearch() {
    let step = Math.floor(Math.sqrt(array.length))
    for (let i = step - 1; i < array.length + step - 1; i += step) {
      let minIndex = Math.min(i, array.length - 1)

      array[minIndex].color = yellow
      refresh()
      await sleep(120)
      array[minIndex].color = grey

      if (num == array[minIndex].title) {
        array[minIndex].color = green
        break
      } else if (num < array[minIndex].title) {
        linearSearch(minIndex - step + 1, minIndex, 80)
        break
      }
      refresh()
      await sleep(60)
    }
    refresh()
    setRun(true)
  }

  async function binarySearch(first, last) {
    if (first > last) {
      setRun(true)
      return -1
    }

    let mid = Math.round((first + last) / 2)

    await sleep(400)
    array[mid].color = yellow
    refresh()
    await sleep(400)

    if (num == array[mid].title) {
      array[mid].color = green
      refresh()
      setRun(true)
      return array[mid].title
    } else if (first == last) {
      greyColor(last, first)
      setRun(true)
      return -1
    } else if (num > array[mid].title) {
      greyColor(first, mid)
      return binarySearch(mid + 1, last)
    } else {
      greyColor(mid, last)
      return binarySearch(first, mid - 1)
    }
  }

  async function interpolationSearch(first, last) {
    if (first > last) {
      setRun(true)
      return -1
    }

    let mid = Math.floor(
      first +
        ((last - first) /
          difference(array[last].title, array[first].title, false)) *
          difference(num, array[first].title)
    )

    if (mid > last) mid = last

    await sleep(400)
    array[mid].color = yellow
    refresh()
    await sleep(400)

    if (num == array[mid].title) {
      array[mid].color = green
      refresh()
      setRun(true)
      return array[mid].title
    } else if (first == last) {
      greyColor(last, first)
      setRun(true)
      return -1
    } else if (num > array[mid].title) {
      greyColor(first, mid)
      return interpolationSearch(mid + 1, last)
    } else {
      greyColor(mid, last)
      return interpolationSearch(first, mid - 1)
    }
  }

  const difference = (x, y, equalZero = true) => {
    let i = 0
    let z
    while (x.length > i && y.length > i) {
      z = Math.abs(
        Math.round(Math.pow(10, -1 * i) * (x.charCodeAt(i) - y.charCodeAt(i)))
      )
      if (z == 0 && !equalZero) {
        i++
        z = Math.pow(10, -1 * i)
      } else break
    }
    return z
  }

  const refresh = () => {
    setArray((array) => {
      return array.filter((item) => item)
    })
  }

  const greyColor = (start, end, color = grey) => {
    for (let i = start; i <= end; i++) {
      array[i].color = color
    }
    refresh()
  }

  const manageSearches = (key) => {
    if (num != '' && num != undefined && run == true) {
      console.log(num)
      setRun(false)
      greyColor(0, array.length - 1, plain)
      if (key == 1) {
        linearSearch(0, array.length)
      } else if (key == 2) {
        jumpSearch()
      } else if (key == 3) {
        binarySearch(0, array.length - 1)
      } else if (key == 4) {
        interpolationSearch(0, array.length - 1)
      }
    }
  }

  return (
    <View style={styles.header}>
      <ArrowLeftOutlined
        style={{ fontSize: '20px', color: grey, marginRight: 8 }}
        onClick={goBack}
      />
      <Text style={styles.title}>Searching Algorithms Visualizer</Text>
      <View style={styles.rightSide}>
        <TextInput
          placeholder='Enter name'
          placeholderTextColor={plain}
          style={styles.input}
          onChangeText={changeHandler}></TextInput>
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => manageSearches(1)}>
          <Text style={styles.optionTitle}>Linear Search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => manageSearches(2)}>
          <Text style={styles.optionTitle}>Jump Search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => manageSearches(3)}>
          <Text style={styles.optionTitle}>Binary Search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => manageSearches(4)}>
          <Text style={styles.optionTitle}>Interpolation Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: '8%',
    padding: 5,
    paddingHorizontal: 20,
    backgroundColor: header,
    alignItems: 'center',
  },
  rightSide: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  title: {
    flex: 1,
    color: plain,
    fontSize: 20,
    fontWeight: 'bold',
  },
  optionContainer: {
    flexDirection: 'row',
    flex: 1,
    margin: 5,
    borderRadius: 10,
    backgroundColor: plain,
  },
  optionTitle: {
    flex: 1,
    padding: 5,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: header,
  },
  input: {
    padding: 5,
    margin: 5,
    alignSelf: 'center',
    flex: 1,
    fontSize: 14,
    borderWidth: 1,
    borderColor: plain,
    borderRadius: 6,
    color: plain,
  },
})
