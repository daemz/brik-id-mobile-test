import {IApiUserResponse} from '@appTypes/api.type';
import {IUser} from '@appTypes/user.type';
import {USER_DATA_BY_ID} from '@constants/reactQuery.const';
import {APIClient} from '@utils/api';
import {useQuery} from 'react-query';

interface IOptions {
  enabled: boolean;
}

export const fetchUserById = async (id: string): Promise<IUser> => {
  try {
    const response: IApiUserResponse = await APIClient.get('users', `${id}`);

    return response?.data;
  } catch (err: any) {
    console.error(
      'services/User/Queries/useFetchUserById',
      'fetchUserById',
      err.data || err.response?.data || err.response || err,
    );

    throw err;
  }
};

const useFetchUserById = (id: string, options: IOptions = {enabled: true}) => {
  return useQuery<IUser, Error>(
    USER_DATA_BY_ID,
    async () => {
      const response = await fetchUserById(id);
      if (!response) {
        throw new Error('fetchUserById failed');
      }

      return response;
    },
    {...options},
  );
};

export default useFetchUserById;
