import { rootNavigation, rootParamList } from '../rootNavigation'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Person from '../../interfaces/Person';

type HomeScreen = {
    navigation: NativeStackNavigationProp<rootParamList>,
    persons: Array<Person>
    setPersons: React.Dispatch<React.SetStateAction<Array<Person>>>
}

export default HomeScreen;
