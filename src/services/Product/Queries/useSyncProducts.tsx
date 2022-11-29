import {PRODUCT_LIST} from '@constants/reactQuery.const';
import {useQueries} from 'react-query';
import {fetchProductList} from './useFetchProductList';

const useSyncProducts = () => {
  return useQueries([
    {
      queryKey: [PRODUCT_LIST],
      queryFn: fetchProductList,
      enabled: false,
    },
  ]);
};

export default useSyncProducts;
