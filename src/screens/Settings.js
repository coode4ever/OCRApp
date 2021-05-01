import React, {useContext, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, Linking} from 'react-native';
import Share from 'react-native-share';
import {t} from 'react-native-tailwindcss';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ToggleSwitch from 'toggle-switch-react-native';
import {theme} from '../../tailwind.config';
import {Header, HeaderBox} from '../components';
import {AppContext} from '../context';
import {saveData} from '../helpers/storage';

const Settings = ({navigation: {navigate}}) => {
  const [vibration, setVibration] = useState(false);
  const {state, dispatch} = useContext(AppContext);
  const handleVibration = async isOn => {
    const payload = {
      ...state.settings,
      vibration: isOn,
    };
    dispatch({
      type: 'settings',
      payload,
    });
    setVibration(isOn);
    await saveData('settings', payload);
  };

  const openURL = () => {
    Linking.openURL(
      'https://www.privacypolicygenerator.info/live.php?token=WZiGNtY21NgedmaJwy1JGQ8EXpoSoeoC',
    ).catch(err => console.error('An error occurred', err));
  };
  const shareContent = async () => {
    const options = {
      title: 'Share via',
      message:
        'https://play.google.com/store/apps/details?id=com.code4ever.loksewaapp',
    };
    await Share.open(options);
  };

  useEffect(() => {
    const {settings} = state;
    setVibration(settings.vibration);
  }, []);
  const [first, second, third] = state.settings.languages;
  return (
    <View>
      <HeaderBox>
        <Header
          icon="arrow-back"
          title="Settings"
          onLeftPress={() => navigate('Home')}
        />
      </HeaderBox>
      <View style={[t.pY3]}>
        <TouchableOpacity
          onPress={() => navigate('Language')}
          style={[t.bgWhite, t.p4, t.borderGray200, t.borderB2]}>
          <View style={[t.flexCol]}>
            <View style={[t.flexRow]}>
              <Icon
                size={25}
                style={[t.justifyCenter, t.selfCenter]}
                name="language"
              />
              <Text
                style={[
                  t.justifyCenter,
                  t.selfCenter,
                  t.mX2,
                  t.textBase,
                  t.fontCustomMedium,
                  t.textGray700,
                ]}>
                Change Language
              </Text>
            </View>
            <Text style={[t.fontCustomRegular, t.textSm, t.textMain]}>
              {first && `${first} `}
              {second && `| ${second} `}
              {third && `| ${third} `}
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={[
            t.flexRow,
            t.bgWhite,
            t.justifyBetween,
            t.flexGrow,
            t.p4,
            t.borderGray200,
            t.borderB2,
          ]}>
          <View style={[t.flexRow]}>
            <Icon
              size={25}
              style={[t.justifyCenter, t.selfCenter]}
              name="vibration"
            />
            <Text
              style={[
                t.justifyCenter,
                t.selfCenter,
                t.mX2,
                t.textBase,
                t.fontCustomMedium,
                t.textGray700,
              ]}>
              Scanning Vibration
            </Text>
          </View>
          <ToggleSwitch
            isOn={vibration}
            onColor={theme.extend.colors.main}
            offColor={theme.extend.colors.grey}
            size="medium"
            onToggle={handleVibration}
          />
        </View>
        <View
          style={[
            t.flexRow,
            t.bgWhite,
            t.justifyBetween,
            t.flexGrow,
            t.p4,
            t.borderGray200,
            t.borderB2,
          ]}>
          <TouchableOpacity onPress={shareContent} style={[t.flexRow]}>
            <Icon
              size={25}
              style={[t.justifyCenter, t.selfCenter]}
              name="thumb-up"
            />
            <Text
              style={[
                t.justifyCenter,
                t.selfCenter,
                t.mX2,
                t.textBase,
                t.fontCustomMedium,
                t.textGray700,
              ]}>
              Recommend this app
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={openURL}
          style={[
            t.flexRow,
            t.bgWhite,
            t.justifyBetween,
            t.flexGrow,
            t.p4,
            t.borderGray200,
            t.borderB2,
          ]}>
          <View style={[t.flexRow]}>
            <Icon
              size={25}
              style={[t.justifyCenter, t.selfCenter]}
              name="privacy-tip"
            />
            <Text
              style={[
                t.justifyCenter,
                t.selfCenter,
                t.mX2,
                t.textBase,
                t.fontCustomMedium,
                t.textGray700,
              ]}>
              Privacy policy
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;
