import { IApiProductListResponse } from '@appTypes/api.type';
import {IProduct} from '@appTypes/product.type';
import {PRODUCT_LIST} from '@constants/reactQuery.const';
import {APIClient} from '@utils/api';
import {useQuery} from 'react-query';

interface IOptions {
  enabled: boolean;
}

export const fetchProductList = async (): Promise<Array<IProduct>> => {
  try {
    const response: IApiProductListResponse = await APIClient.get('products');

    return response?.data;
  } catch (err: any) {
    console.error(
      'services/User/Queries/useFetchProductList',
      'fetchProductList',
      err.data || err.response?.data || err.response || err,
    );

    throw err;
  }
};

const useFetchProductList = (options: IOptions = {enabled: true}) => {
  return useQuery<Array<IProduct>, Error>(
    PRODUCT_LIST,
    async () => {
      const response = await fetchProductList();
      if (!response) {
        throw new Error('fetchProductList failed');
      }

      return response;
    },
    {...options},
  );
};

export default useFetchProductList;
