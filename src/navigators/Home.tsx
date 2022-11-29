import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Main from '@screens/Main';
import SecondScreen from '@screens/Second';
import ProductDetail from '@screens/ProductDetail';
import SearchScreen from '@screens/SearchProduct';
import AddProductScreen from '@screens/AddProduct';

export type HomeParamList = {
  Main: undefined;
  Second: {shouldShowButton?: boolean};
  ProductDetail: {id: string};
  Search: undefined;
  AddProduct: undefined;
};

const Stack = createStackNavigator<HomeParamList>();

const HomeNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        title: '',
        headerStyle: {elevation: 0, shadowOpacity: 0, borderBottomWidth: 0},
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="Main"
        component={Main}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Second" component={SecondScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="AddProduct" component={AddProductScreen} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
