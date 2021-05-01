import React from 'react';
import {View} from 'react-native';
import {t} from 'react-native-tailwindcss';
import {theme} from '../../tailwind.config';

const HeaderBox = ({children}) => {
  return (
    <View
      style={[t.shadow2xl, t.p4, {backgroundColor: theme.extend.colors.main}]}>
      {children}
    </View>
  );
};

export default HeaderBox;
