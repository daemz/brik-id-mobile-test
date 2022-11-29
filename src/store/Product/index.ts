import {IProduct, IProductSliceRedux} from '@appTypes/product.type';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: IProductSliceRedux = {
  products: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<IProduct[]>) {
      state.products = action.payload;
    },
  },
});

export const {setProducts} = productSlice.actions;

export default productSlice.reducer;
