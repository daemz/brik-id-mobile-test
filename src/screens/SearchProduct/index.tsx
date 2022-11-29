/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Sample React Native Main
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';

import {useSelector} from 'react-redux';
import {RootState} from '@store/index';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import {useHeader} from '@hooks';
import {globalStyle} from '@assets/global.styles';
import {IProduct} from '@appTypes/product.type';
import * as appTheme from '@assets/custom-theme.json';
import {SEARCH_PRODUCT} from '@constants/screenName.const';
import {Layout} from '@components';
import {SearchBar} from '@components';

const SearchScreen = () => {
  const navigation = useNavigation<any>();

  const {products} = useSelector((state: RootState) => state?.product);

  const [searchResult, setSearchResult] = React.useState<IProduct[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [searchText, setSearchText] = React.useState('');

  const _renderProductCard = (data: IProduct): JSX.Element => {
    const {id, name, image, price, categoryName} = data;

    return (
      <Pressable
        onPress={() => {
          navigation.navigate('ProductDetail', {id});
        }}
        style={styles.productCardContainer}>
        <View style={styles.productCardBody}>
          <Image source={{uri: image}} style={styles.productCardImage} />
          <View style={styles.productCardDescSection}>
            <Text style={styles.productCardTitle}>{name}</Text>
            <Text style={styles.productCardCategory}>{categoryName}</Text>
            <Text style={styles.productCardPrice}>{`$${price}`}</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  useHeader({
    title: SEARCH_PRODUCT,
    variant: 'close',
  });

  const onChangeText = (text: string) => {
    if (text === '') {
      setSearchResult([]);
    }
    setSearchText(text);
  };

  const onSubmitSearch = () => {
    setLoading(true);
    const findData = products?.filter(item => {
      return item?.name?.toLowerCase()?.includes(searchText?.toLowerCase());
    });

    setSearchResult(findData);
    setLoading(false);
  };

  const onClearSearchResult = () => {
    setSearchText('');
    setSearchResult([]);
  };

  return (
    <SafeAreaView style={globalStyle.safeAreaContainer}>
      <StatusBar
        backgroundColor={appTheme['color-brik-black']}
        barStyle={'light-content'}
      />
      <View style={styles.scrollViewContainerStyle}>
        <Layout>
          <SearchBar
            value={searchText}
            placeholder="Search our product"
            onChangeText={onChangeText}
            onSubmit={onSubmitSearch}
            onClearButton={onClearSearchResult}
          />
        </Layout>
        {loading ? (
          <ActivityIndicator size={'large'} />
        ) : (
          <FlatList
            data={searchResult}
            extraData={searchResult}
            renderItem={({item}) => _renderProductCard(item)}
            contentContainerStyle={styles.listContainerStyle}
            keyExtractor={(item, index) =>
              item.id.toString() + index.toString()
            }
            nestedScrollEnabled
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;
