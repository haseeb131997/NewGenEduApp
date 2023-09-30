import React from "react";
import AppRoot from "./src";
// import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
    <AppRoot />
  </SafeAreaProvider>
       
  );
};

export default App;