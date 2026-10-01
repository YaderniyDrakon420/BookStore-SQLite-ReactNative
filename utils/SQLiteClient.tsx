import * as SQLite from "expo-sqlite";

export default class Database {
    static #instance: Database;
    #db: SQLite.SQLiteDatabase | null = null;

    private constructor() {
        this.openDatabase();
    }

    public static get instance(): Database {
        if (!Database.#instance) {
            Database.#instance = new Database();
        }
        return Database.#instance;
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

    public async addBook(id: string, title: string, author: string): Promise<boolean> {
        if (!this.#db) {
            console.error("Помилка при з'єднанні до БД!");
            return false;
        }

        try {
            await this.#db.runAsync(
                "INSERT INTO books (id, title, author) VALUES (?, ?, ?);",
                [id, title, author]
            );
            return true;
        } catch (error) {
            console.error(" Помилка при додаванні книги:", error);
            return false;
        }
    }
}