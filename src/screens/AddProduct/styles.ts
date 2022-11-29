import {ImageStyle, StyleSheet, ViewStyle} from 'react-native';
import * as appTheme from '@assets/custom-theme.json';

interface IStyles {
  scroll: ViewStyle;
  container: ViewStyle;
  shadow: ViewStyle;
  itemDetailImage: ImageStyle;
  itemName: ViewStyle;
  productDesc: ViewStyle;
  variantContainer: ViewStyle;
  variantProduct: ViewStyle;
  productSpecTitle: ViewStyle;
}

const styles = StyleSheet.create<IStyles>({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  scroll: {
    flex: 1,
    // flexDirection: 'column',
    backgroundColor: appTheme['color-white'],
    paddingTop: 12,
  },
  itemDetailImage: {
    height: 240,
    resizeMode: 'cover',
  },
  shadow: {
    shadowColor: appTheme['color-black-100'],
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.07,
    shadowRadius: 3.84,
    elevation: 2,
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 2,
    backgroundColor: appTheme['color-white'],
  },
  itemName: {
    flex: 3,
    paddingRight: 16,
  },
  productDesc: {
    padding: 16,
    backgroundColor: 'transparent',
  },
  productSpecTitle: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
  },
  variantContainer: {
    flex: 1,
    marginTop: 16,
    paddingHorizontal: 16,
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  variantProduct: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default styles;
