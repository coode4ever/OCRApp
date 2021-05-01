import React, {useContext, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {t} from 'react-native-tailwindcss';
import Toast from 'react-native-tiny-toast';
import Icon from 'react-native-vector-icons/Ionicons';
import {languages} from '../../languages';
import {Header, HeaderBox} from '../components';
import {AppContext} from '../context';
import {defaultSettings} from '../helpers';
import {saveData} from '../helpers/storage';

const Language = ({navigation: {goBack}}) => {
  const [lang, setLang] = useState(defaultSettings.lang);
  const {state, dispatch} = useContext(AppContext);
  const handleChangeLang = async value => {
    if (lang.includes(value[1])) {
      if (lang.length < 2) {
        Toast.show('You must selected 1 language');
        return;
      }
      const tempLang = lang.filter(l => l !== value[1]);
      const temLanguage = state.settings.languages.filter(l => l !== value[0]);
      const settings = {
        ...state.settings,
        lang: tempLang,
        languages: temLanguage,
      };
      await saveData('settings', settings);
      dispatch({
        type: 'settings',
        payload: settings,
      });
      setLang(tempLang);
    } else {
      console.log(lang, state.settings.languages);
      const tempLang = [value[1], ...lang];
      const tempLanguages = [value[0], ...state.settings.languages];
      const settings = {
        ...state.settings,
        lang: tempLang.slice(0, 3),
        languages: tempLanguages.slice(0, 3),
      };
      await saveData('settings', settings);
      dispatch({
        type: 'settings',
        payload: settings,
      });
      setLang(tempLang.slice(0, 3));
    }
    Toast.show('Languages changed successfully');
  };

  useState(() => {
    setLang(state.settings.lang);
  }, []);
  return (
    <View>
      <HeaderBox>
        <Header
          icon="arrow-back"
          title="Select Language"
          onLeftPress={() => goBack()}
        />
      </HeaderBox>
      <Text style={[t.textText, t.fontCustomRegular, t.p4]}>
        You can select upto 3 language
      </Text>
      <ScrollView>
        <View style={[t.bgWhite, t.p4]}>
          {Object.entries(languages).map((key, value) => {
            return (
              <TouchableOpacity
                key={value}
                onPress={() => handleChangeLang(key)}
                style={[
                  t.flex,
                  t.flexRow,
                  t.justifyBetween,
                  t.pY4,
                  t.borderGray200,
                  t.borderB2,
                ]}>
                <View
                  style={[
                    t.flex,
                    t.flexRow,
                    t.justifyBetween,
                    t.alignCenter,
                    t.justifyCenter,
                  ]}>
                  <Text
                    style={[t.fontCustomMedium, t.mL1, t.textLg, t.textBlack]}>
                    {key[0]}
                  </Text>
                </View>
                {lang.includes(key[1]) && (
                  <Icon size={25} style={t.textMain} name="checkmark" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Language;
