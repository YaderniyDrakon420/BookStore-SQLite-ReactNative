import { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Alert,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import AddBookScreen from "./src/books/AddBookScreen";
import BookListScreen from "./src/books/BookListScreen";
import Database from "./utils/SQLiteClient";

const Drawer = createDrawerNavigator();
export interface IBook {
  title: string;
  author: string;
}

export default function App() {

  useEffect(() => {
        Database.instance;
    }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Список книг">
        <Drawer.Screen name="Список книг" component={BookListScreen} />
        <Drawer.Screen name="Добавить книгу" component={AddBookScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

// 📌 Стили
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  bookItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" },
  bookTitle: { fontSize: 18, fontWeight: "bold" },
  bookAuthor: { fontSize: 16, color: "gray" },
});