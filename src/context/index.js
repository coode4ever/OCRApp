import React, {createContext, useEffect, useReducer} from 'react';
import {defaultSettings} from '../helpers';
import {loadData} from '../helpers/storage';
import reducer from '../reducer';

export const AppContext = createContext();
const initialState = {
  settings: defaultSettings,
  histories: [],
};

const Context = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const getStorageData = async () => {
    const settings = await loadData('settings');
    const histories = await loadData('histories');
    dispatch({
      type: 'storage',
      payload: settings || initialState.settings,
      histories: histories || initialState.histories,
    });
  };
  useEffect(() => {
    getStorageData();
  }, []);
  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default Context;
