import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants";

const Home = ({ navigation, socket }) => {
  const [username, setUsername] = useState("");
  const [roomname, setRoomname] = useState("");

  const sendData = () => {
    socket.emit("joinRoom", { username, roomname });
    navigation.navigate("Chat", { username, roomname });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setUsername("");
      setRoomname("");
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.title}>Welcome to Chat App</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
          autoCapitalize="none"
          autoCorrect={false}
          selectionColor={COLORS.grey}
          placeholderTextColor={COLORS.lightGray}
        />
        <TextInput
          style={styles.input}
          value={roomname}
          onChangeText={setRoomname}
          placeholder="Roomname"
          autoCapitalize="none"
          autoCorrect={false}
          selectionColor={COLORS.grey}
          placeholderTextColor={COLORS.lightGray}
        />
        {username && roomname ? (
          <TouchableOpacity style={styles.button} onPress={sendData}>
            <Text style={[styles.text]}>Join Room</Text>
          </TouchableOpacity>
        ) : null}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 30,
    justifyContent: "space-evenly",
    flexDirection: "column",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.white,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#404450",
    borderWidth: 0,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    color: COLORS.white,
  },
  button: {
    paddingVertical: 8,
    width: "100%",
    backgroundColor: COLORS.yellow,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.white,
  },
});

export default Home;
