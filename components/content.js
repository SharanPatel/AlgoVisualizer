import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Card from "./card";
import { Dimensions } from "react-native";

const screenHeight = Math.round(0.82 * Dimensions.get("window").height - 20);
const arrayLength = 500;

export default function Content({ array }) {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      flex: 1,
    },
    column: {
      flex: 1,
    },
    card: {
      margin: 5,
      borderColor: "#000000",
      borderWidth: 1,
      backgroundColor: "#fff",
    },
    cardComponent: {
      textAlign: "center",
      padding: 5,
      margin: 5,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={array}
          renderItem={({ item }) => (
            <View
              style={{
                margin: 5,
                borderColor: "#000000",
                borderWidth: 1,
                backgroundColor: item.color,
              }}
            >
              <Text style={styles.cardComponent}>{item.title} </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}
