/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import {Text, Pressable, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {globalStyle} from '@assets/global.styles';
import {CloseIcon} from '@assets/Icons';
import {BACK_BUTTON_TEXT} from '@constants/dummy.const';

interface IHeader {
  title?: string | React.ReactElement;
  onPressLeft?: () => void;
  headerRight?: React.ReactElement;
  variant?: 'back' | 'close';
  showHeaderLeft?: boolean;
  deps?: React.DependencyList;
}

interface IHeaderLeft {
  onBack?: () => void;
  variant?: 'back' | 'close';
}

export const BrikIcon = () => (
  <View style={globalStyle.brikLogo}>
    <Text style={globalStyle.brikLogoText}>BRIK</Text>
  </View>
);

export const HeaderLeft = ({onBack, variant}: IHeaderLeft) => {
  if (variant === 'back') {
    return (
      <Pressable style={globalStyle.headerLeftButton} onPress={onBack}>
        <Text>{BACK_BUTTON_TEXT}</Text>
      </Pressable>
    );
  }
  return (
    <Pressable style={globalStyle.backButton} onPress={onBack}>
      <CloseIcon />
    </Pressable>
  );
};

const useHeader = ({
  title,
  onPressLeft,
  headerRight,
  variant = 'back',
  showHeaderLeft = true,
  deps = [],
}: IHeader) => {
  const navigation = useNavigation<any>();

  const titleText = title
    ? typeof title === 'string'
      ? title.toUpperCase()
      : title
    : '';

  const onBack = (): void => {
    onPressLeft ? onPressLeft() : navigation.goBack();
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: titleText,
      headerStyle: globalStyle.headerStyle,
      headerTitleStyle: globalStyle.headerTitleStyle,
      headerTitleAlign: 'center',
      headerLeft: () =>
        showHeaderLeft ? (
          <HeaderLeft variant={variant} onBack={onBack} />
        ) : (
          <BrikIcon />
        ),
      headerRight: () => headerRight,
    });
  }, [...deps]);
};

export default useHeader;
