import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import FlashMessage from 'react-native-flash-message';

import { base } from './src/styles/index';
import { rootParamList } from './src/data/types/rootNavigation';
import SalaryForm from './src/components/SalaryForm';
import Header from './src/components/Header';
import Person from './src/data/interfaces/Person';
import Home from './src/components/Home';

const Stack = createNativeStackNavigator<rootParamList>();

export default function App() {
  const [persons, setPeople] = useState<Array<Person>>([]);
  const [person, setPerson] = useState<Person>({name:'', salary: ''});

  return (
    <SafeAreaView style={base.styles.appMainContainer}>
      <Header/>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name={'Hem'}
            options={{headerShown: false}}
          >
            {(screenProps) =>
              <Home 
                {...screenProps}
                people={persons}
                setPeople={setPeople}
                person={person}
                setPerson={setPerson}
              />
            }
          </Stack.Screen>
          <Stack.Screen name={'Löneformulär'} options={{headerShown: false}}>
            {(screenprops) => 
              <SalaryForm
                {...screenprops}
                persons={persons}
                setPersons={setPeople}
              />
            }
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
      <FlashMessage position='top' hideStatusBar={false} style={base.styles.flashMessage}/>
    </SafeAreaView>
  );
}
