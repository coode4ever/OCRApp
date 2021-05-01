import React, {useContext, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {t} from 'react-native-tailwindcss';
import {Header, HeaderBox} from '../components';
import Textarea from 'react-native-textarea';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {AppContext} from '../context';
import Toast from 'react-native-tiny-toast';
import {saveData} from '../helpers/storage';

const ICON_SIZE = 22;

const Edit = ({route, navigation: {navigate, goBack}}) => {
  const {output, name, id} = route.params || {};
  const [textarea, setTextArea] = useState(output);
  const {state, dispatch} = useContext(AppContext);
  const {histories} = state;
  const handleDone = async () => {
    try {
      const selectHistory = histories.find(history => history.id === id);

      const filterHistories = histories.filter(history => history.id !== id);
      const changeHistory = {...selectHistory, output: textarea};
      const sendData = [changeHistory, ...filterHistories];
      await saveData('histories', sendData);
      dispatch({
        type: 'history',
        payload: sendData,
      });
      navigate('Preview', changeHistory);
      Toast.show('Text edited successfully');
    } catch (error) {}
  };
  return (
    <View style={[t.flex1, t.justifyBetween]}>
      <HeaderBox>
        <Header title={name} onLeftPress={() => goBack()} icon="arrow-back" />
      </HeaderBox>
      <ScrollView>
        <View style={[t.p4]}>
          <Textarea
            containerStyle={[t.flex1, t.wFull, t.hFull]}
            style={[t.fontCustomRegular, t.textBase, t.textBlack]}
            onChangeText={text => setTextArea(text)}
            defaultValue={textarea}
            underlineColorAndroid={'transparent'}
          />
        </View>
      </ScrollView>
      <HeaderBox>
        <View style={[t.justifyCenter, t.flexRow]}>
          <TouchableOpacity
            style={[t.bgWhite, t.roundedFull, t.p3]}
            onPress={handleDone}>
            <Icon
              size={ICON_SIZE}
              style={[t.textBlack, t.selfCenter]}
              name="done"
            />
          </TouchableOpacity>
        </View>
      </HeaderBox>
    </View>
  );
};

export default Edit;
