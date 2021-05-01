import moment from 'moment';
import React, {useContext, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, Vibration, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import 'react-native-get-random-values';
import ImagePicker from 'react-native-image-crop-picker';
import {t} from 'react-native-tailwindcss';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {v4 as uuidv4} from 'uuid';
import {theme} from '../../tailwind.config';
import {AppContext} from '../context';
import {API_URL, defaultPickerOptions} from '../helpers';
import Spinner from 'react-native-loading-spinner-overlay';
const ICON_SIZE = 25;

const Home = ({navigation: {navigate}}) => {
  const cameraRef = useRef(null);
  const [flash, setFlash] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {state} = useContext(AppContext);
  const recognizeTextFromImage = async path => {
    try {
      setIsLoading(true);
      const {settings} = state;
      const lang = settings.lang;
      const file = {
        name: `Scan ${moment().format('DD-MMM-YYYY, hh:mm A')}`,
        type: path.mime,
        uri: path.path,
      };
      const data = new FormData();
      data.append('lang', lang.join('+'));
      data.append('file', file);
      let res = await fetch(API_URL, {
        method: 'post',
        body: data,
      });
      let responseJson = await res.json();
      const sendData = {
        output: responseJson.output,
        name: `Scan-${moment().format('DD-MMM-YYYY-hh-mm-A')}`,
        date: moment().format('DD-MMM-YYYY'),
        id: uuidv4(),
        isPreview: false,
      };
      settings.vibration ? Vibration.vibrate(400) : null;
      navigate('Preview', sendData);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };
  const recognizeFromPicker = async (options = defaultPickerOptions) => {
    try {
      const image = await ImagePicker.openPicker(options);
      await recognizeTextFromImage(image);
    } catch (err) {
      if (err.message !== 'User cancelled image selection') {
        console.error(err);
      }
    }
  };
  const recognizeFromCamera = async () => {
    try {
      if (cameraRef.current) {
        const options = {quality: 1, base64: false};
        const data = await cameraRef.current.takePictureAsync(options);
        const image = await ImagePicker.openCropper({
          path: data.uri,
          width: 300,
          height: 400,
          ...defaultPickerOptions,
        });
        await recognizeTextFromImage(image);
      }
    } catch (err) {
      if (err.message !== 'User cancelled image selection') {
        console.error(err);
      }
    }
  };
  return (
    <View
      style={[t.flex1, t.flexCol, {backgroundColor: theme.extend.colors.main}]}>
      <Spinner
        visible={isLoading}
        textContent={'Scanning please wait...'}
        textStyle={styles.spinnerTextStyle}
        overlayColor="rgba(0, 0, 0, 0.50)"
      />
      <RNCamera
        ref={cameraRef}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={
          flash
            ? RNCamera.Constants.FlashMode.on
            : RNCamera.Constants.FlashMode.off
        }
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        onGoogleVisionBarcodesDetected={({barcodes}) => {
          console.log(barcodes);
        }}
      />
      <View
        style={[
          t.flex0,
          t.flexRow,
          t.justifyBetween,
          t.alignCenter,
          t.pX10,
          t.pY4,
        ]}>
        <TouchableOpacity
          onPress={() => setFlash(!flash)}
          style={[t.selfCenter]}>
          {flash ? (
            <Icon name="flash-on" size={ICON_SIZE} style={[t.textWhite]} />
          ) : (
            <Icon name="flash-off" size={ICON_SIZE} style={[t.textWhite]} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate('History')}
          style={[t.selfCenter]}>
          <Icon name="history" size={ICON_SIZE} style={[t.textWhite]} />
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            onPress={recognizeFromCamera}
            style={[
              t.roundedFull,
              t.border8,
              t.borderWhite,
              t.w16,
              t.h16,
              t.bgWhite,
              {
                backgroundColor: theme.extend.colors.grey,
              },
            ]}
          />
        </View>
        <TouchableOpacity
          onPress={() => recognizeFromPicker()}
          style={[t.selfCenter]}>
          <Icon name="collections" size={ICON_SIZE} style={[t.textWhite]} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate('Settings')}
          style={[t.selfCenter]}>
          <Icon name="settings" size={ICON_SIZE} style={[t.textWhite]} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  spinnerTextStyle: {
    color: '#FFF',
    fontFamily: theme.extend.fontFamily.customMedium[0],
  },
});
