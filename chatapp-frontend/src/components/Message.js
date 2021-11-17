import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { COLORS } from "../constants";

const Message = ({ me, username, text }) => {
  return (
    <View
      style={[styles.message, me ? styles.messageLeft : styles.messageRight]}
    >
      <Text
        style={[
          styles.messageText,
          me ? styles.messageTextLeft : styles.messageTextRight,
        ]}
      >
        {text}
      </Text>
      <Text
        style={[
          styles.messageUserName,
          me ? styles.messageUserNameLeft : styles.messageUserNameRight,
        ]}
      >
        {username}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  message: {
    marginBottom: 8,
    maxWidth: 220,
    marginLeft: 0,
  },
  messageLeft: {
    alignSelf: "flex-start",
  },
  messageRight: {
    alignSelf: "flex-end",
  },
  messageText: {
    fontSize: 16,
    fontWeight: "300",
    borderRadius: 10,
    padding: 16,
  },
  messageTextLeft: {
    color: "#b4b6be",
    backgroundColor: "#250202",
    textAlign: "left",
  },
  messageTextRight: {
    color: COLORS.white,
    backgroundColor: COLORS.red,
    textAlign: "right",
  },
  messageUserName: {
    color: "#b4b6be",
    fontSize: 12,
    paddingLeft: 8,
    fontWeight: "200",
  },
  messageUserNameLeft: {
    textAlign: "left",
  },
  messageUserNameRight: {
    textAlign: "right",
  },
});

export default Message;
