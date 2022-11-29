import {IProduct} from '@appTypes/product.type';
import {globalStyle} from '@assets/global.styles';
import {Layout, Text} from '@components';
import {SPECIFICATION_TITLE} from '@constants/dummy.const';
import {ADD_PRODUCT} from '@constants/screenName.const';
import {useNavigation} from '@react-navigation/native';
import {useAddProduct} from '@services/Product';
import {getRandomString} from '@utils/common';
import {BrikButton} from '@components';
import {FormInput} from '@components';
import * as React from 'react';
import {Alert, SafeAreaView, ScrollView} from 'react-native';
import styles from './styles';
import {HeaderLeft} from '@hooks/useHeader';

const AddProductScreen = () => {
  const navigation = useNavigation<any>();

  const {mutateAsync: mutateAddProduct} = useAddProduct();

  const [data, setData] = React.useState<IProduct>({
    id: Math.random().toString(),
    name: '',
    CategoryId: getRandomString(30),
    categoryName: '',
    description: '',
    height: 1,
    width: 1,
    length: 1,
    price: '0',
    sku: '',
    weight: 1,
    image: 'https://loremflickr.com/640/480/food',
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const onChangeText = (text: string, destination: keyof IProduct) => {
    console.log('text: ', text);
    console.log('destination: ', destination);

    setData({
      ...data,
      [destination]: text,
    });
  };

  const onSubmit = async () => {
    console.log('data: ', data);

    setIsLoading(true);
    await mutateAddProduct(data);

    Alert.alert(
      'Data Successfully Added!',
      'Press OK to get back to previous page',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ],
    );
    setIsLoading(false);
  };

  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: ADD_PRODUCT,
      headerStyle: globalStyle.headerStyle,
      headerTitleStyle: globalStyle.headerTitleStyle,
      headerTitleAlign: 'center',
      headerLeft: () => (
        <HeaderLeft variant={'close'} onBack={() => navigation.goBack()} />
      ),
      headerRight: () => (
        <BrikButton onLoading={isLoading} value="OK" onPress={onSubmit} />
      ),
    });
  }, [data, isLoading, navigation]);

  return (
    <>
      <SafeAreaView style={globalStyle.safeAreaContainer}>
        <ScrollView style={styles.scroll}>
          <FormInput
            value={data?.name}
            label="Product Name"
            onChangeText={text => {
              // onChangeText(text, 'name');
              setData({
                ...data,
                name: text,
              });
            }}
            placeholder="Input Product Name"
          />
          <FormInput
            value={data?.description}
            label="Description"
            onChangeText={text => {
              onChangeText(text, 'description');
              // setData({
              //   ...data,
              //   description: text,
              // });
            }}
            placeholder="Input Product Description"
          />
          <FormInput
            value={data?.categoryName}
            label="Category"
            onChangeText={text => {
              onChangeText(text, 'categoryName');
              // setData({
              //   ...data,
              //   categoryName: text,
              // });
            }}
            placeholder="Input Product Category"
          />
          <FormInput
            value={data?.price}
            label="Price"
            onChangeText={text => {
              onChangeText(text, 'price');
              // setData({
              //   ...data,
              //   price: text,
              // });
            }}
            placeholder="Input Product Price"
            keyboardType="numeric"
          />
          <FormInput
            value={data?.sku}
            label="SKU"
            onChangeText={text => {
              onChangeText(text, 'sku');
              // setData({
              //   ...data,
              //   sku: text,
              // });
            }}
            placeholder="Input Product SKU"
          />
          <Layout style={styles.productSpecTitle}>
            <Text variant="body1" flex={1}>
              {SPECIFICATION_TITLE}
            </Text>
            <Layout style={globalStyle.dividerLine} />
          </Layout>
          <FormInput
            value={data?.weight.toString()}
            label="Product Weight"
            onChangeText={text => {
              onChangeText(text, 'weight');
              // setData({
              //   ...data,
              //   weight: parseFloat(text),
              // });
            }}
            placeholder="Product weight in kg"
            keyboardType="numeric"
          />
          <FormInput
            value={data?.width.toString()}
            label="Product Width"
            onChangeText={text => {
              onChangeText(text, 'width');
              // setData({
              //   ...data,
              //   width: parseFloat(text),
              // });
            }}
            placeholder="Product width in meter"
            keyboardType="numeric"
          />
          <FormInput
            value={data?.length.toString()}
            label="Product Length"
            onChangeText={text => {
              onChangeText(text, 'length');
              // setData({
              //   ...data,
              //   length: parseFloat(text),
              // });
            }}
            placeholder="Product length in meter"
            keyboardType="numeric"
          />
          <FormInput
            value={data?.height.toString()}
            label="Product Height"
            onChangeText={text => {
              onChangeText(text, 'height');
              // setData({
              //   ...data,
              //   height: parseFloat(text),
              // });
            }}
            placeholder="Product height in meter"
            keyboardType="numeric"
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default AddProductScreen;
