import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true,
});

const saveData = (key, data) =>
  storage.save({
    key,
    data,
    expires: null,
  });

const loadData = key =>
  storage
    .load({
      key,
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      switch (err.name) {
        case 'NotFoundError':
          saveData(key, null);
          break;
      }
    });

const removeData = key =>
  storage.remove({
    key,
  });

export {saveData, loadData, removeData};
