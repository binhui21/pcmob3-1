import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BlockRGB from "./components/BlockRGB";

function HomeScreen({ navigation }) {
  const [colorArray, setColorArray] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={addColor} title="Add colour" />,
    });
  });

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Button onPress={reset} title="Reset" />,
    });
  });

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("DetailsScreen", { ...item })}
      >
        <BlockRGB red={item.red} green={item.green} blue={item.blue} />
      </TouchableOpacity>
    );
  }

  function addColor() {
    setColorArray([
      {
        red: Math.floor(Math.random() * 256),
        green: Math.floor(Math.random() * 256),
        blue: Math.floor(Math.random() * 256),
        id: `${colorArray.length}`,
      },
      ...colorArray,
    ]);
  }

  function reset() {
    setColorArray([]);
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={colorArray}
        renderItem={renderItem}
        numColumns={4}
      />
    </View>
  );
}

function DetailsScreen({ route }) {
  const { red, green, blue } = route.params;
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: `rgb(${red}, ${green}, ${blue})` },
      ]}
    >
      <View style={{ padding: 30 }}>
        <Text style={styles.detailText}>Red: {red}</Text>
        <Text style={styles.detailText}>Green: {green}</Text>
        <Text style={styles.detailText}>Blue: {blue}</Text>
      </View>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Home",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="DetailsScreen"
          component={DetailsScreen}
          options={{
            title: "Detail",
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "stretch",
  },

  detailText: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
});
