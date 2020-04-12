import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('reciper.db');

export const createCategoryTable = () =>
  new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY, title TEXT NOT NULL, color TEXT NOT NULL);',
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

export const insertCategory = (category) =>
  new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO categories (title, color) VALUES (?, ?);',
        [category.title, category.color],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

export const updateCategory = (id, category) =>
  new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE categories SET title=?, color=? WHERE id=?;',
        [category.title, category.color, id],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

export const deleteCategory = (id) =>
  new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM categories WHERE id=?',
        [id],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

export const fetchCategories = () =>
  new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM categories;',
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
