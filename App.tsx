import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import FlashMessage from 'react-native-flash-message';

import { base } from './styles/index';
import { rootParamList } from './types/rootNavigation';
import SalaryForm from './components/SalaryForm';
import Header from './components/Header';
import Person from './interfaces/Person';
import Home from './components/Home';

const Stack = createNativeStackNavigator<rootParamList>();

export default function App() {
  const [persons, setPersons] = useState<Array<Person>>([]);

  return (
    <SafeAreaView style={base.styles.appMainContainer}>
      <Header/>
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen 
            name={'Hem'}
            options={{headerShown: false}}
          >
            {(screenProps) => <Home {...screenProps} persons={persons} setPersons={setPersons}/>}
          </Stack.Screen>
          <Stack.Screen name={'Löneformulär'} options={{headerShown: false}}>
            {(screenprops) => <SalaryForm {...screenprops} persons={persons} setPersons={setPersons}/>}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
      <FlashMessage position='top' hideStatusBar={false} style={base.styles.flashMessage}/>
    </SafeAreaView>
  );
}
