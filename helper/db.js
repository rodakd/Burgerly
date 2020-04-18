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

export const createRecipeTable = () =>
  new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS recipes (id INTEGER PRIMARY KEY, title TEXT NOT NULL, image TEXT, duration INTEGER NOT NULL, difficulty INTEGER NOT NULL, calories INTEGER NOT NULL, ingredients TEXT NOT NULL, steps TEXT NOT NULL);',
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

export const insertRecipe = (recipe) =>
  new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO recipes (title, image, duration, difficulty, calories, ingredients, steps) VALUES (?, ?, ?, ?, ?, ?, ?);',
        [
          recipe.title,
          recipe.image,
          recipe.duration,
          recipe.difficulty,
          recipe.calories,
          recipe.ingredients,
          recipe.steps,
        ],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

export const updateCategory = (category) =>
  new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE categories SET title=?, color=? WHERE id=?;',
        [category.title, category.color, category.id],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

export const updateRecipe = (recipe) =>
  new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE recipes SET title=?, image=?, duration=?, difficulty=?, calories=?, ingredients=?, steps=? WHERE id=?;',
        [
          recipe.title,
          recipe.image,
          recipe.duration,
          recipe.difficulty,
          recipe.calories,
          recipe.ingredients,
          recipe.steps,
          recipe.id,
        ],
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

export const deleteRecipe = (id) =>
  new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM recipes WHERE id=?',
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

export const fetchRecipes = () =>
  new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM recipes;',
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
