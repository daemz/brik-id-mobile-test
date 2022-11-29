import {IAppSliceRedux} from '@appTypes/app.type';
import {EAppStateStatus} from '@appTypes/appState.type';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: IAppSliceRedux = {
  loading: true,
  appState: EAppStateStatus.UNKNOWN,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setAppStateStatus(state, action: PayloadAction<EAppStateStatus>) {
      state.appState = action.payload;
    },
  },
});

export const {setAppLoading, setAppStateStatus} = appSlice.actions;

export default appSlice.reducer;
