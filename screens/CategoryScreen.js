import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import RenderCategory from '../components/RenderCategory';

const CategoryScreen = () => {
  const categories = [
    { id: 1, title: 'light', color: 'red' },
    { id: 2, title: 'heavy', color: 'blue' },
    { id: 3, title: 'vegan', color: 'white' },
  ];
  return (
    <ScrollView contentContainerStyle={styles.categories}>
      {categories.map((category) => (
        <RenderCategory key={category.id} item={category} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export const categoryScreenOptions = {
  headerTitle: 'Categories',
};

export default CategoryScreen;
