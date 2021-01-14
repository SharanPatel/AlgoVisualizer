import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Slider from "react-native-slider";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
let counter = 0;
const min = 4;
const max = 40;
const header = "#30475e";
const barColor = "#30475e";
const yellow = "#f5d76e";
const grey = "#ccc";
const green = "#1DBC60";
const plain = "#ececec";

export default function Header({
  array,
  setArray,
  slider,
  setSlider,
  addNumber,
}) {
  const [run, setRun] = useState(true);
  const changeHandler = (val) => {
    setSlider(val);
    addNumber();
  };
  const refresh = () => {
    setArray((array) => {
      return array.filter((item) => item);
    });
  };
  const greyColor = (start, end, color = grey) => {
    for (let i = start; i <= end; i++) {
      array[i].color = color;
    }
    refresh();
  };
  const getNextGap = (gap) => {
    gap = Math.floor((gap * 10) / 13);
    if (gap < 1) return 1;
    return gap;
  };
  async function heapify(n, i) {
    counter++;
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    if (l < n && array[l].title > array[largest].title) largest = l;

    if (r < n && array[r].title > array[largest].title) largest = r;

    if (largest != i) {
      let swap = array[i].title;
      array[i].title = array[largest].title;
      array[largest].title = swap;

      heapify(n, largest);
    }
  }

  // sorting algorithms
  async function bubbleSort() {
    let swapped = false;
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        //changing colors
        array[j + 1].color = yellow;
        if (j == 0) array[j].color = yellow;
        else if (j == array.length - i - 2) array[j + 1].color = green;
        refresh();
        await sleep(4);
        array[j].color = barColor;
        refresh();

        //changing array values
        if (array[j].title > array[j + 1].title) {
          let temp = array[j].title;
          array[j].title = array[j + 1].title;
          array[j + 1].title = temp;
          swapped = true;
        }
      }
      if (!swapped) {
        greyColor(0, array.length - 1, green);
        break;
      } else swapped = false;

      if (i == array.length - 2) {
        array[0].color = green;
        array[1].color = green;
      }
    }
    refresh();
    await sleep(100);
    setRun(true);
  }
  async function insertionSort() {
    for (let i = 1; i < array.length; ++i) {
      array[0].color = green;
      let key = array[i].title;
      let j = i - 1;
      array[i].color = yellow;
      refresh();
      await sleep(15);
      array[i].color = green;
      refresh();

      while (j >= 0 && array[j].title > key) {
        array[j + 1].color = yellow;
        array[j].color = yellow;
        refresh();
        await sleep(15);
        array[j + 1].color = green;
        array[j].color = green;
        refresh();
        array[j + 1].title = array[j].title;
        j = j - 1;
      }
      array[j + 1].title = key;
    }
    greyColor(0, array.length - 1, green);
    await sleep(100);
    setRun(true);
  }
  async function combSort() {
    let n = array.length;
    let gap = n;
    let swapped = true;

    while (gap != 1 || swapped == true) {
      gap = getNextGap(gap);
      swapped = false;

      for (let i = 0; i < n - gap; i++) {
        //changing colors
        array[i].color = yellow;
        array[i + gap].color = yellow;
        refresh();
        await sleep(4);
        array[i].color = barColor;
        array[i + gap].color = barColor;
        refresh();
        if (array[i].title > array[i + gap].title) {
          let temp = array[i].title;
          array[i].title = array[i + gap].title;
          array[i + gap].title = temp;
          swapped = true;
        }
      }
      if (gap < array.length / 2 && !swapped) break;
    }
    refresh();
    greyColor(0, array.length - 1, green);
    await sleep(100);
    setRun(true);
  }
  async function shellSort() {
    let n = Math.floor(array.length / 2);
    for (let gap = n; gap > 0; gap = Math.floor(gap / 2)) {
      for (let i = gap; i < array.length; i += 1) {
        let temp = array[i].title;
        let j;
        for (j = i; j >= gap && array[j - gap].title > temp; j -= gap) {
          array[j].color = yellow;
          array[j - gap].color = yellow;
          refresh();
          await sleep(10);
          array[j].color = barColor;
          array[j - gap].color = barColor;
          refresh();
          array[j].title = array[j - gap].title;
        }
        array[j].color = yellow;
        refresh();
        await sleep(10);
        array[j].color = barColor;
        refresh();
        array[j].title = temp;
      }
    }
    greyColor(0, array.length - 1, green);
    await sleep(100);
    setRun(true);
    return 0;
  }
  async function heapSort() {
    let n = array.length;
    counter = 0;
    while (counter != Math.floor(array.length / 2)) {
      counter = 0;
      for (let i = Math.floor(n / 2 - 1); i >= 0; i--) {
        do {
          counter++;
          var largest = i;
          let l = 2 * i + 1;
          let r = 2 * i + 2;

          if (l < n && array[l].title > array[largest].title) largest = l;
          if (r < n && array[r].title > array[largest].title) largest = r;

          array[i].color = yellow;
          array[largest].color = yellow;
          refresh();
          await sleep(4);
          array[i].color = barColor;
          array[largest].color = barColor;
          if (largest != i) {
            let swap = array[i].title;
            array[i].title = array[largest].title;
            array[largest].title = swap;
            refresh();
          }
        } while (largest != i);
        refresh();
      }
    }

    const findSecondMax = (i) => {
      let max = 2;
      let secondMax = 1;
      for (let k = 0; k < i; k++) {
        if (array[k].title > secondMax) {
          if (array[k].title > max) {
            max = array[k].title;
          } else {
            secondMax = array[k].title;
          }
        }
      }
      return secondMax;
    };

    // One by one extract an element from heap
    for (let i = n - 1; i > 0; i--) {
      let value = findSecondMax(i);

      for (let k = 0; k < i; k++) {
        if (array[k].title == value) {
          array[k].color = yellow;
          refresh();
          await sleep(10);
          array[k].color = barColor;
          refresh();
          break;
        }
      }

      let temp = array[0].title;
      array[0].title = array[i].title;
      array[i].title = temp;
      array[0].color = yellow;
      array[i].color = yellow;
      refresh();
      await sleep(10);
      array[0].color = barColor;
      array[i].color = green;
      refresh();
      heapify(i, 0);
    }

    array[0].color = green;
    refresh();
    setRun(true);
  }

  async function manageSearches(key) {
    if (run == true) {
      setRun(false);
      greyColor(0, array.length - 1, barColor);
      await sleep(100);
      if (key == 1) {
        bubbleSort();
      } else if (key == 2) {
        insertionSort();
      } else if (key == 3) {
        combSort();
      } else if (key == 4) {
        shellSort();
      } else if (key == 5) {
        heapSort();
      }
    }
  }

  return (
    <View style={styles.header}>
      <View style={styles.half}>
        <Text style={styles.title}>Sorting Algorithms Visualizer</Text>
      </View>
      <View style={styles.half}>
        <View style={styles.slider}>
          <Slider
            value={slider}
            onValueChange={changeHandler}
            minimumValue={min}
            maximumValue={max}
            //step={2}
            thumbTintColor="#ececec"
            disabled={!run}
          />
        </View>
      </View>
      <View style={styles.rightSide}>
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => manageSearches(1)}
        >
          <Text style={styles.optionTitle}>Bubble Sort</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => manageSearches(2)}
        >
          <Text style={styles.optionTitle}>Insertion Sort</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => manageSearches(3)}
        >
          <Text style={styles.optionTitle}>Comb Sort</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => manageSearches(5)}
        >
          <Text style={styles.optionTitle}>Heap Sort</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    height: "8%",
    padding: 5,
    paddingHorizontal: 20,
    backgroundColor: header,
    alignItems: "center",
  },
  half: {
    flex: 1,
    flexDirection: "row",
    margin: 10,
  },
  rightSide: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
  title: {
    flex: 1,
    color: plain,
    fontSize: 20,
    fontWeight: "bold",
  },
  optionContainer: {
    flexDirection: "row",
    flex: 1,
    margin: 5,
    borderRadius: 10,
    backgroundColor: plain,
  },
  optionTitle: {
    flex: 1,
    padding: 5,
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    color: header,
  },
});
