import Clipboard from '@react-native-community/clipboard';
import React, {useContext, useEffect} from 'react';
import {
  PermissionsAndroid,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import {t} from 'react-native-tailwindcss';
import Toast from 'react-native-tiny-toast';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RNFetchBlob from 'rn-fetch-blob';
import {Header, HeaderBox} from '../components';
import {AppContext} from '../context';
import {saveData} from '../helpers/storage';

const android = RNFetchBlob.android;

const ICON_SIZE = 22;

const Preview = ({route, navigation: {navigate, goBack}}) => {
  const {output, name, id, isPreview} = route.params || {};
  const {state, dispatch} = useContext(AppContext);
  const {histories} = state;

  const copyToClipboard = () => {
    Clipboard.setString(output);
    Toast.show('Copy to clipboard');
  };
  const shareContent = async () => {
    const options = {
      title: 'Share via',
      message: output,
    };
    await Share.open(options);
  };

  const createPDF = async () => {
    try {
      let options = {
        html: `<p>${output}</p>`,
        fileName: `${name}`,
        directory: 'Download',
      };
      const pdfFile = await RNHTMLtoPDF.convert(options);
      android.actionViewIntent(pdfFile.filePath, 'application/pdf');
    } catch (err) {
      console.warn(err);
    }
  };

  const saveDataInStorage = async () => {
    try {
      const data = [route.params, ...histories];
      await saveData('histories', data);
      dispatch({
        type: 'history',
        payload: data,
      });
    } catch (error) {}
  };

  const handleDelete = async historyId => {
    try {
      const filterHistories = histories.filter(
        history => history.id !== historyId,
      );
      await saveData('histories', filterHistories);
      dispatch({
        type: 'history',
        payload: filterHistories,
      });
      navigate('History');
      Toast.show('History deleted successfully');
    } catch (error) {}
  };

  useEffect(() => {
    if (!isPreview) {
      saveDataInStorage();
    }
  }, []);

  console.log(name);

  return (
    <View style={[t.flex1, t.justifyBetween]}>
      <HeaderBox>
        <Header title={name} onLeftPress={() => goBack()} icon="arrow-back" />
      </HeaderBox>
      <ScrollView>
        <View style={[t.p4]}>
          <Text style={[t.fontCustomRegular, t.textBase, t.textBlack]}>
            {output}
          </Text>
        </View>
      </ScrollView>

      <HeaderBox>
        <View style={[t.justifyBetween, t.flexRow, t.pX4, t.mT2]}>
          <TouchableOpacity
            style={[t.bgWhite, t.roundedFull, t.p3]}
            onPress={() =>
              navigate('Edit', {
                name,
                id,
                output,
              })
            }>
            <Icon
              size={ICON_SIZE}
              style={[t.textBlack, t.selfCenter]}
              name="edit"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[t.bgWhite, t.roundedFull, t.p3]}
            onPress={shareContent}>
            <Icon
              size={ICON_SIZE}
              style={[t.textBlack, t.selfCenter]}
              name="share"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[t.bgWhite, t.roundedFull, t.p3]}
            onPress={createPDF}>
            <Icon
              size={ICON_SIZE}
              style={[t.textBlack, t.selfCenter]}
              name="file-download"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[t.bgWhite, t.roundedFull, t.p3]}
            onPress={copyToClipboard}>
            <Icon
              size={ICON_SIZE}
              style={[t.textBlack, t.selfCenter]}
              name="content-copy"
            />
          </TouchableOpacity>
          {isPreview && (
            <TouchableOpacity
              style={[t.bgWhite, t.roundedFull, t.p3]}
              onPress={() => handleDelete(id)}>
              <Icon
                size={ICON_SIZE}
                style={[t.textBlack, t.selfCenter]}
                name="delete"
              />
            </TouchableOpacity>
          )}
        </View>
      </HeaderBox>
    </View>
  );
};

export default Preview;
