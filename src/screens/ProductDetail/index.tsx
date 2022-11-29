import {globalStyle} from '@assets/global.styles';
import {Layout, Text} from '@components';
import {SPECIFICATION_TITLE} from '@constants/dummy.const';
import {PRODUCT_DETAIL} from '@constants/screenName.const';
import {useHeader} from '@hooks';
import {HomeParamList} from '@navigators/Home';
import {useRoute} from '@react-navigation/native';
import {RouteProp} from '@react-navigation/native';
import {useFetchProductById} from '@services/Product';
import {ProductPrice} from '@components';
import * as React from 'react';
import {ActivityIndicator, Image, SafeAreaView, ScrollView} from 'react-native';
import styles from './styles';

export type ProductDetailScreenRouteProp = RouteProp<
  HomeParamList,
  'ProductDetail'
>;

interface IVariantProduct {
  title: string;
  variantValue?: string;
  variantCurrency?: 'cm' | 'm' | 'kg';
}

const ProductDetail = () => {
  const route = useRoute<ProductDetailScreenRouteProp>();
  // const navigation = useNavigation<any>();
  const {id} = route?.params;

  const {data: productDetail, isLoading} = useFetchProductById(id, {
    enabled: true,
  });

  useHeader({
    title: PRODUCT_DETAIL,
    variant: 'close',
  });

  const ProductVariant = ({
    title,
    variantValue,
    variantCurrency = 'm',
  }: IVariantProduct) => {
    return (
      <Layout style={styles.variantProduct}>
        <Text variant="body2">{title}</Text>
        <Text variant="body1">{`${variantValue} ${variantCurrency}`}</Text>
      </Layout>
    );
  };

  return (
    <>
      <SafeAreaView style={globalStyle.safeAreaContainer}>
        {isLoading ? (
          <ActivityIndicator size={'large'} />
        ) : (
          <ScrollView
            style={styles.scroll}
            showsVerticalScrollIndicator={false}>
            <Image
              style={styles.itemDetailImage}
              source={{
                uri: productDetail?.image,
              }}
            />
            <Layout style={styles.shadow}>
              <Layout style={styles.itemName}>
                <Text variant="headline3" flex={1}>
                  {productDetail?.name}
                </Text>
                <Text variant="headline5" status="hint">
                  {productDetail?.categoryName}
                </Text>
              </Layout>
              <ProductPrice priceText={productDetail?.price} />
            </Layout>
            <Layout style={styles.productDesc}>
              <Text variant="body2">{productDetail?.description}</Text>
              <Text marginTop={16} variant="body2">
                {`SKU: ${productDetail?.sku}`}
              </Text>
            </Layout>
            <Layout style={styles.productSpecTitle}>
              <Text variant="body1" flex={1}>
                {SPECIFICATION_TITLE}
              </Text>
              <Layout style={globalStyle.dividerLine} />
            </Layout>
            <Layout style={styles.variantContainer}>
              <ProductVariant
                title="Weight"
                variantValue={productDetail?.weight.toString()}
                variantCurrency={'kg'}
              />
              <ProductVariant
                title="Width"
                variantValue={productDetail?.width.toString()}
              />
              <ProductVariant
                title="Length"
                variantValue={productDetail?.length.toString()}
              />
              <ProductVariant
                title="Height"
                variantValue={productDetail?.height.toString()}
              />
            </Layout>
          </ScrollView>
        )}
      </SafeAreaView>
    </>
  );
};

export default ProductDetail;
