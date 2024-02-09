import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FlashMessage from 'react-native-flash-message';

import { base } from './src/styles/index';
import { rootParamList } from './src/data/types/rootNavigation';
import CalculationScreen from './src/screens/CalculationScreen';
import Header from './src/components/shared/Header';
import Home from './src/screens/HomeScreen';

const Stack = createNativeStackNavigator<rootParamList>();

export default function App() {

  return (
    <SafeAreaView style={base.styles.appMainContainer}>
      <Header/>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name={'Hem'} options={{headerShown: false}}>
            {(screenProps) => <Home {...screenProps} />}
          </Stack.Screen>
          <Stack.Screen name={'Löneformulär'} options={{headerShown: false}}>
            {(screenprops) => <CalculationScreen {...screenprops} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
      <FlashMessage position='top' hideStatusBar={false} style={base.styles.flashMessage}/>
    </SafeAreaView>
  );
}
