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
  RefreshControl,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@store/index';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import styles from './styles';
import {useHeader} from '@hooks';
import {globalStyle} from '@assets/global.styles';
import {IProduct} from '@appTypes/product.type';
import {PlusIconFill, SearchIcon} from '@assets/Icons';
import {MAIN_TITLE} from '@constants/dummy.const';
import * as appTheme from '@assets/custom-theme.json';
import {KLONTONG_ONLINE} from '@constants/screenName.const';
import {Layout} from '@components';
import {useSyncProducts} from '@services/Product';
import {setProducts} from '../../store/Product';
import _ from 'lodash';
import {setAppLoading} from '../../store/App';

export const _renderPressableSearchIcon = (navigation: any) => (
  <Pressable
    style={styles.pressableSearchIcon}
    onPress={() => navigation.navigate('Search')}>
    <SearchIcon />
  </Pressable>
);

const pageNumberLimit = 10;

const Main = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const syncProducts = useSyncProducts();
  const isFocused = useIsFocused();

  const {
    isLoading: isLoadingProducts,
    isFetching: isFetchingProducts,
    refetch: refetchProducts,
  } = syncProducts[0];

  const {tokenData, userDetail} = useSelector(
    (state: RootState) => state?.user,
  );
  const {loading} = useSelector((state: RootState) => state?.app);

  const {products} = useSelector((state: RootState) => state?.product);

  console.info('tokenData: ', tokenData);
  console.info('userDetail: ', userDetail);

  const currentDataLoaded = React.useRef(10);
  const [paginatedProducts, setPaginatedProducts] = React.useState<IProduct[]>(
    [],
  );
  const currentPage = React.useRef(1);
  const [loadingPagination, setLoadingPagination] = React.useState(false);

  const isLoading = isLoadingProducts;

  const isFetching = isFetchingProducts;

  const isRefresh = !isLoading && isFetching;

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
    title: KLONTONG_ONLINE,
    showHeaderLeft: false,
    headerRight: _renderPressableSearchIcon(navigation),
  });

  const nextPage = React.useCallback(() => {
    const next = currentPage.current + 1;
    const nextDataShouldBeFetched = currentDataLoaded.current + pageNumberLimit;

    if (nextDataShouldBeFetched <= 100) {
      setLoadingPagination(true);

      // const nextData = products.slice(
      const nextData = products.slice(
        currentDataLoaded.current,
        nextDataShouldBeFetched,
      );

      setPaginatedProducts(prevState => {
        return prevState.concat(nextData);
      });

      currentDataLoaded.current = nextDataShouldBeFetched;
      currentPage.current = next;
      setLoadingPagination(false);
    }
  }, [
    // products?.length,
    products,
  ]);

  const Heading = () => {
    return (
      <Layout style={styles.headingContainer}>
        <Text style={styles.mainTitle}>{MAIN_TITLE}</Text>
        {!!tokenData?.access_token && (
          <Pressable
            style={styles.addProduct}
            onPress={() => {
              navigation.navigate('AddProduct');
            }}>
            <PlusIconFill />
          </Pressable>
        )}
      </Layout>
    );
  };

  const onRefresh = async () => {
    const {data} = await refetchProducts();

    if (!isLoading) {
      dispatch(setProducts(data));
      dispatch(setAppLoading(isLoading));
    }
  };

  React.useEffect(() => {
    if (isFocused) {
      onRefresh();
    }
  }, [isFocused]);

  React.useEffect(() => {
    if (products?.length > 0) {
      const copiedProducts = products.slice(0, currentDataLoaded.current);
      setPaginatedProducts(prevState => {
        return prevState.concat(copiedProducts);
      });
    }

    return () => {
      // currentDataLoaded.current = 10;
      // currentPage.current = 1;
    };
  }, [products?.length]);

  return (
    <SafeAreaView style={globalStyle.safeAreaContainer}>
      <StatusBar
        backgroundColor={appTheme['color-brik-black']}
        barStyle={'light-content'}
      />
      <View style={styles.scrollViewContainerStyle}>
        <Heading />
        {loading ? (
          <ActivityIndicator size={'large'} />
        ) : (
          <FlatList
            refreshControl={
              <RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />
            }
            data={paginatedProducts}
            extraData={paginatedProducts}
            renderItem={({item}) => _renderProductCard(item)}
            contentContainerStyle={styles.listContainerStyle}
            keyExtractor={(item, index) => item.toString() + index.toString()}
            onEndReached={() => {
              nextPage();
            }}
            maxToRenderPerBatch={20}
            showsVerticalScrollIndicator={false}
            scrollEnabled
            nestedScrollEnabled
            ListFooterComponent={() => {
              if (loadingPagination) {
                return <ActivityIndicator size={'small'} />;
              } else {
                return null;
              }
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Main;
