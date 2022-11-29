/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react-hooks/exhaustive-deps */
/* 
This initiator populates anything related to product, including listeners too.
*/

import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useFetchUserById} from '@services/User';
import {ITokenData, IUser} from '@appTypes/user.type';
import {setTokenData, setUserDetail} from '../store/User';
import {RootState} from '@store/index';

export interface IUserInitiator {
  children?: JSX.Element;
}

const UserInitiator = ({children}: IUserInitiator) => {
  const dispatch = useDispatch();

  const {userDetail} = useSelector((state: RootState) => state?.user);

  const {refetch: refetchUser} = useFetchUserById('1', {
    enabled: false,
  });

  const fetchUserData = async (): Promise<any> => {
    try {
      const {data} = await refetchUser();

      return data;
    } catch (err) {
      console.error('error fetchUserData: ', err);
      throw err;
    }
  };

  React.useEffect(() => {
    (async () => {
      if (!Boolean(userDetail)) {
        const userData = await fetchUserData();
        const user: IUser = {
          id: userData?.id,
          name: userData?.name,
          username: userData?.username,
          address: userData?.address,
          email: userData?.email,
          gender: userData?.gender,
          phone_number: userData?.phone_number,
        };
        const token: ITokenData = {
          access_token: userData?.access_token,
          reset_token: userData?.reset_token,
        };
        dispatch(setUserDetail(user));
        dispatch(setTokenData(token));
      }
    })();
  }, []);

  return children;
};

export default UserInitiator;
