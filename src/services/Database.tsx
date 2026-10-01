import * as SQLite from "expo-sqlite";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export type IBook = {
    id: string;
    title: string;
    author: string;
};

export default class Database {
    static #instance: Database;
    #db: SQLite.SQLiteDatabase | null = null;

    private constructor() {
    }

    public static get instance(): Database {
        if (!Database.#instance) {
            Database.#instance = new Database();
        }

        return Database.#instance;
    }

    public async init() {
        await this.openDatabase();
    }

    private async openDatabase() {
        try {
            this.#db = await SQLite.openDatabaseAsync("books.db");
            console.log("База даних відкрита");
            await this.createTable();
        } catch (error) {
            console.error("Помилка при відкритті БД:", error);
        }
    }

    private async createTable() {
        if (!this.#db) return;

        await this.#db.execAsync(`
          CREATE TABLE IF NOT EXISTS books (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            author TEXT NOT NULL
          );
        `);

        console.log("Таблиця books створена");
    }

    public async addBook(title: string, author: string): Promise<boolean> {
        if (!this.#db) {
            console.error("Помилка: немає з'єднання з БД");
            return false;
        }

        const id = uuidv4();

        try {
            await this.#db.runAsync(
                "INSERT INTO books (id, title, author) VALUES (?, ?, ?);",
                [id, title, author]
            );

            return true;
        } catch (error) {
            console.error("Помилка при додаванні книги:", error);
            return false;
        }
    }

        public async getBooks(): Promise<IBook[]> {
    if (!this.#db) {
        console.error("Помилка: немає з'єднання з БД");
        return [];
    }

    try {
        const books = await this.#db.getAllAsync<IBook>(
            "SELECT * FROM books;"
        );

        return books;
    } catch (error) {
        console.error("Помилка при отриманні книг:", error);
        return [];
    }
}
}