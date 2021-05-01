import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {t} from 'react-native-tailwindcss';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Header = ({icon, title, onLeftPress}) => {
  return (
    <View style={[t.flex, t.flexRow, t.justifyBetween]}>
      <TouchableOpacity onPress={onLeftPress}>
        <Icon name={icon} size={25} style={t.textWhite} />
      </TouchableOpacity>
      <Text style={[t.fontCustomMedium, t.textXl, t.textWhite]}>{title}</Text>
      <Text />
    </View>
  );
};

export default Header;
