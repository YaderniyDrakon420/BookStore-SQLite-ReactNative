import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Database, { IBook } from "../services/Database";

const BookListScreen = () => {
  const [books, setBooks] = useState<Array<IBook>>([]);

  const loadBooks = async () => {
    try {
      const db = Database.instance;

      await db.init();

      const booksFromDB = await db.getBooks();

      setBooks(booksFromDB);
    } catch (error) {
      console.error("Ошибка при загрузке книг:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadBooks();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Список книг</Text>

      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Text style={styles.bookTitle}>{item.title}</Text>

            <Text style={styles.bookAuthor}>
              Автор: {item.author}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  bookItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bookAuthor: {
    fontSize: 16,
    color: "gray",
  },
});

export default BookListScreen;