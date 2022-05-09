import * as React from 'react';
import { Image, FlatList } from 'react-native';

import { Text, View} from '../../components/Themed';
import { RootTabScreenProps } from '../../types';
import styles from './styles';
import categories from '../../assets/data/categories';
import HomeCategory from '../../components/HomeCatagory';

const firstCategory = categories.items[0];

const HomeScreen= () => {
  return (
    <View style={styles.container}>
        {/* List of categories */}
        <FlatList
            data = {categories.items}
            renderItem={ ({item}) => <HomeCategory category={item} />}
        />
    </View>
  );
}

export default HomeScreen;
