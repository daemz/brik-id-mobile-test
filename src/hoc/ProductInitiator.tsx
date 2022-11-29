/* eslint-disable react-hooks/exhaustive-deps */
/* 
This initiator populates anything related to product, including listeners too.
*/

import * as _ from 'lodash';
import * as React from 'react';
import {useDispatch} from 'react-redux';
import {useFetchProductList, useSyncProducts} from '@services/Product';
import {setProducts} from '../store/Product';
import {IApiProductListResponse} from '@appTypes/api.type';
import {setAppLoading} from '../store/App';
import {useQueryClient} from 'react-query';
import {PRODUCT_LIST} from '@constants/reactQuery.const';
import {IProduct} from '@appTypes/product.type';

export interface IAppInfoInitiator {
  children?: JSX.Element;
}

const ProductInitiator = ({children}: IAppInfoInitiator) => {
  const dispatch = useDispatch();
  const syncProducts = useSyncProducts();

  const {
    data: productDatas,
    isLoading: isLoadingProducts,
    isFetching: isFetchingProducts,
    refetch: refetchProducts,
  } = syncProducts[0];

  const isLoading = isLoadingProducts;

  const isFetching = isFetchingProducts;

  const isRefresh = !isLoading && isFetching;

  const sortData = (data: IProduct[], iteratee: keyof IProduct) => {
    return _.sortBy(data, item => {
      return item[iteratee];
    });
  };

  const fetchProductList = async (): Promise<any> => {
    try {
      const {data} = await refetchProducts();

      if (!isRefresh) {
        return data;
      }
    } catch (err) {
      console.error('error fetchUserData: ', err);
      throw err;
    }
  };

  React.useEffect(() => {
    (async () => {
      console.log('cached data: ', productDatas?.length);
      // const {data} = await fetchProductList();
      // // const sortedData = sortData(data, 'name');
      // // dispatch(setProducts(sortedData));
      // if (isRefresh) {
      //   dispatch(setProducts(data));
      //   dispatch(setAppLoading(isRefresh));
      // }
    })();
  }, [productDatas]);

  return children;
};

export default ProductInitiator;
