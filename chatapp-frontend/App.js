import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen, ChatScreen } from "./src/screens";
import { SafeAreaProvider } from "react-native-safe-area-context";
import io from "socket.io-client";

const socket = io.connect(
  "https://chat-app-nodejs-socket-sanchit.herokuapp.com/",
  {
    transports: ["websocket"],
    reconnectionAttempts: 15,
  }
);

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Home"
        >
          <Stack.Screen name="Home">
            {(props) => <HomeScreen {...props} socket={socket} />}
          </Stack.Screen>
          <Stack.Screen name="Chat">
            {(props) => <ChatScreen {...props} socket={socket} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
