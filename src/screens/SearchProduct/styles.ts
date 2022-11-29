import {ImageStyle, StyleSheet, ViewStyle} from 'react-native';

import * as appTheme from '@assets/custom-theme.json';

interface IStyles {
  sectionContainer: ViewStyle;
  sectionTitle: ViewStyle;
  sectionDescription: ViewStyle;
  highlight: ViewStyle;
  bottomButton: ViewStyle;
  mainTitle: ViewStyle;
  productCardContainer: ViewStyle;
  productCardBody: ViewStyle;
  productCardImage: ImageStyle;
  productCardDescSection: ViewStyle;
  productCardTitle: ViewStyle;
  productCardPrice: ViewStyle;
  productCardCategory: ViewStyle;
  scrollViewContainerStyle: ViewStyle;
  pressableSearchIcon: ViewStyle;
  listContainerStyle: ViewStyle;
}

const styles = StyleSheet.create<IStyles>({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  bottomButton: {
    flex: 1,
    padding: 16,
    alignSelf: 'center',
    margin: 16,
    backgroundColor: appTheme['color-azure'],
  },
  mainTitle: {
    marginTop: 16,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: appTheme['color-brik-black'],
  },
  productCardContainer: {
    justifyContent: 'center',
    elevation: 4,
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0.2,
      height: 0.2,
    },
    shadowRadius: 6,
    padding: 16,
    minHeight: 120,
    borderRadius: 6,
    marginVertical: 6,
  },
  productCardBody: {
    flexDirection: 'row',
  },
  productCardImage: {
    width: 75,
    height: 75,
    borderRadius: 4,
  },
  productCardDescSection: {
    justifyContent: 'space-between',
    paddingLeft: 12,
  },
  productCardTitle: {
    color: appTheme['color-brik-black'],
    fontWeight: 'bold',
    fontSize: 16,
  },
  productCardPrice: {
    color: appTheme['tertiary'],
  },
  productCardCategory: {
    color: appTheme['color-brik-black'],
  },
  scrollViewContainerStyle: {paddingHorizontal: 12},
  pressableSearchIcon: {
    marginRight: 12,
  },
  listContainerStyle: {paddingBottom: 75},
});

export default styles;
