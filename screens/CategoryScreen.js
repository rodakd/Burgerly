import React from 'react';
import { FlatList } from 'react-native';
import renderCategory from '../components/renderCategory';

const CategoryScreen = () => {
  const categories = [
    { id: 1, title: 'light' },
    { id: 2, title: 'heavy' },
    { id: 3, title: 'vegan' },
  ];
  return (
    <FlatList
      data={categories}
      renderItem={renderCategory}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
    />
  );
};

export default CategoryScreen;
