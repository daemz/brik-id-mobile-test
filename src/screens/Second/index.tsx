import {useHeader} from '@hooks';
import {HomeParamList} from '@navigators/Home';
import {useRoute} from '@react-navigation/native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import styles from './styles';

export type SecondScreenRouteProp = RouteProp<HomeParamList, 'Second'>;

const SecondScreen = () => {
  const route = useRoute<SecondScreenRouteProp>();
  const navigation = useNavigation<any>();

  const {shouldShowButton} = route?.params;

  const [shouldRenderButton, setShouldRenderButton] = React.useState<boolean>(
    shouldShowButton || false,
  );

  useHeader({
    title: 'Second Screen',
    variant: 'close',
    // onPressLeft: () => navigation.goBack(),
  });

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View>
          <Text>{'Test Second Screen'}</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default SecondScreen;
