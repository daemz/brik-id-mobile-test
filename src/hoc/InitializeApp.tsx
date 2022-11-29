/* eslint-disable react-hooks/exhaustive-deps */
/* 
populate your things here before the app starts.

you can even add some more new initializers.
*/

import {setAppLoading} from '../store/App';
import * as React from 'react';
import {useDispatch} from 'react-redux';
import AppInfoInitiator from './AppInfoInitiator';
import ProductInitiator from './ProductInitiator';
import UserInitiator from './UserInitiator';

export interface IInitializeApp {
  children: JSX.Element;
}

const InitializeApp = ({children}: IInitializeApp) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setAppLoading(true));
    // add some listeners here, such as network info listeners or such
  }, []);

  return (
    <AppInfoInitiator>
      <UserInitiator>
        <ProductInitiator>{children}</ProductInitiator>
      </UserInitiator>
    </AppInfoInitiator>
  );
};

export default InitializeApp;
