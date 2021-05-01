import React, {useContext, useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import {t} from 'react-native-tailwindcss';
import {Card, Header, HeaderBox} from '../components';
import {AppContext} from '../context';

const History = ({navigation: {navigate}}) => {
  const {
    state: {histories},
  } = useContext(AppContext);
  useEffect(() => {}, [histories]);
  return (
    <View style={[t.flex1]}>
      <HeaderBox>
        <Header
          icon="arrow-back"
          onLeftPress={() => navigate('Home')}
          title="Scan History"
        />
      </HeaderBox>
      <ScrollView>
        {histories.map(history => (
          <View key={history.id} style={[t.p2]}>
            <Card history={history} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default History;
