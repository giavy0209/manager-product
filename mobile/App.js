import * as React from 'react';
import {StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
  return (
    <View style={{width:'100%',height:'100%', paddingTop: 20}}>
      <WebView
      source={{ uri: 'https://quanlyhang.kechuyengame.com' }}
      />
    </View>
  );
}
