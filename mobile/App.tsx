import { THEME } from './src/styles/theme';
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto'
import { NativeBaseProvider, StatusBar } from "native-base";

import { Loading } from './src/components/loading';
import { SignIn } from './src/screens/SignIn';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_500Medium, Roboto_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="tranasparent"
        translucent
      />
      {
        fontsLoaded ? <Loading /> : <SignIn />
      }
    </NativeBaseProvider>
  );
}