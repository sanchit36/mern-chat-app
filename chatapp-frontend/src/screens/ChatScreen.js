import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import Message from "../components/Message";
import { toDecrypt, toEncrypt } from "../aes";

const Chat = ({ route, socket }) => {
  const { username, roomname } = route.params;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    socket.on("message", (data) => {
      //decypt the message
      const ans = toDecrypt(data.text, data.username);
      let temp = messages;
      temp.push({ ...data, text: ans });
      setMessages([...temp]);
    });
  }, [socket]);

  const sendData = () => {
    if (text !== "") {
      // encrypt the message here
      const ans = toEncrypt(text);
      socket.emit("chat", ans);
      setText("");
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.bar}>
          <Text style={styles.roomname}>{roomname}</Text>
        </View>
        <View style={styles.chatContainer}>
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <Message
                  me={item.username === username}
                  username={item.username}
                  text={item.text}
                />
              );
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            value={text}
            onChangeText={setText}
            style={styles.input}
            placeholder="Type your message..."
            autoCapitalize="none"
            autoCorrect={false}
            selectionColor={COLORS.grey}
            placeholderTextColor={COLORS.lightGray}
          />
          <TouchableOpacity style={styles.button} onPress={sendData}>
            <Ionicons name="send" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: COLORS.background,
  },
  bar: {
    height: 50,
    backgroundColor: COLORS.red,
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  chatContainer: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  inputContainer: {
    padding: 15,
    flexDirection: "row",
  },
  roomname: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.white,
  },
  input: {
    height: 50,
    flex: 8,
    backgroundColor: "#404450",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    padding: 10,
    fontSize: 16,
    color: COLORS.white,
  },
  button: {
    flex: 2,
    backgroundColor: COLORS.yellow,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
});

export default Chat;
