const API_URL = 'API_URL';

const DEFAULT_HEIGHT = 500;
const DEFAULT_WITH = 600;
const defaultPickerOptions = {
  cropping: true,
  height: DEFAULT_HEIGHT,
  width: DEFAULT_WITH,
  freeStyleCropEnabled: true,
  enableRotationGesture: true,
};

const defaultSettings = {
  lang: ['eng', 'nep', 'hin'],
  vibration: false,
  languages: ['English', 'Nepali', 'Hindi'],
};

export {defaultPickerOptions, API_URL, defaultSettings};
