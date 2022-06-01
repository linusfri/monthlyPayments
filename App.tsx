import { StatusBar } from 'expo-status-bar';
import { View, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


import { forms, base } from './styles/index';
import SalaryForm from './components/SalaryForm';
import Header from './components/Header';

export default function App() {
  return (
    <SafeAreaView style={base.styles.appMainContainer}>
      <Header/>
      <View style={base.styles.container}>
        <View style={base.styles.formContainer}>
          <SalaryForm />
        </View>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
