import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useState } from "react";
import Database from "../services/Database";


const AddBookScreen = ({ navigation }: any) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const saveBook = async () => {
    if (!title || !author) {
        Alert.alert("Ошибка", "Введите название и автора книги");
        return;
    }

    try {
        const db = Database.instance;

        await db.init();

        const success = await db.addBook(title, author);

        if (success) {
            setTitle("");
            setAuthor("");

            Alert.alert("Успех", "Книга добавлена!");
            console.log("Книга добавлена")
            navigation.navigate("Список книг");
        }
    } catch (error) {
        console.error("Ошибка при сохранении книги", error);
    }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Добавить книгу</Text>

      <TextInput
        style={styles.input}
        placeholder="Название книги"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Автор"
        value={author}
        onChangeText={setAuthor}
      />

      <Button title="Сохранить" onPress={saveBook} />
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
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
});

export default AddBookScreen;