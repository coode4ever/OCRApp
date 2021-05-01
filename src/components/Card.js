import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {t} from 'react-native-tailwindcss';
import TextTruncate from 'react-native-text-truncate';

const Card = ({history}) => {
  const {navigate} = useNavigation();
  const {output, date, name, id} = history;
  return (
    <TouchableOpacity
      onPress={() =>
        navigate('Preview', {
          output,
          name,
          id,
          isPreview: true,
        })
      }
      style={[t.bgWhite, t.shadow2xl, t.p2]}>
      <TextTruncate numberOfLines={2}>
        <Text style={[t.fontCustomMedium, t.textBlack, t.textBase]}>
          {output}
        </Text>
      </TextTruncate>
      <Text style={[t.fontCustomRegular, t.textBlack, t.mY2]}>{date}</Text>
    </TouchableOpacity>
  );
};

export default Card;
