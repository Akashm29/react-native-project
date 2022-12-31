import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Alert, Button, StyleSheet, Text, View, Image } from "react-native";
import { TextInput } from "react-native-paper";
import React, { useEffect, useState } from "react";

function HomeScreen({ navigation, route }) {
  const [count,setCount] = useState(0)
  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title={`title ${count}`}
          color={"#000"}
          onPress={() => alert("This is a button")}
        />
      ),
    });
  }, [navigation,count]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="Create post"
        onPress={() => navigation.navigate("CreatePost")}
      />
      <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
      <Text style={{ margin: 10 }}>Counter {count}</Text>
      <Button
        title="Done"
        onPress={() => {
          navigation.setOptions({
            title: "Updated",
          });
        }}
      />
      <Button
        title="Done"
        onPress={() => setCount(count + 1)}
      />
    </View>
  );
}

function CreatePostScreen({ navigation, route }) {
  const [postText, setPostText] = React.useState("");

  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: "white" }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Done"
        onPress={() => {
          // Pass and merge params back to home screen
          navigation.navigate({
            name: "Home",
            params: { post: postText },
            merge: true,
          });
        }}
      />
    </>
  );
}

function DetailsScreen({ navigation, route }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      {/* <Text>{JSON.stringify(itemId)}</Text> */}
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push("Details")}
      />
      <Button
        title="Go to Home"
        onPress={() =>
          navigation.setParams({
            query: "someText",
          })
        }
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

function LogoTitle() {
  return (
    <Image
      style={{ width: 20, height: 20 }}
      source={{ uri: "https://picsum.photos/20/20" }}
    />
  );
}

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initalRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: (props) => <LogoTitle {...props} />,
            headerRight: (props) => (
              <Button
                title="title"
                color={"#000"}
                onPress={() => alert("This is a button")}
              />
            ),
          }}
        />
        <Stack.Screen name="CreatePost" component={CreatePostScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
