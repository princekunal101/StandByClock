/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import SlideNavigator from './src/navigations/SlideNavigator';

function App() {

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} hidden={true} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {

  return (
    <View style={styles.container}>
      <SlideNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default App;
