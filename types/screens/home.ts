import { rootNavigation, rootParamList } from '../rootNavigation'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Person from '../../interfaces/Person';

type HomeScreen = {
    navigation: NativeStackNavigationProp<rootParamList>,
    persons: Array<Person>
    setPersons: React.Dispatch<React.SetStateAction<Array<Person>>>
    setPerson: React.Dispatch<React.SetStateAction<Person>>
    person: Person
}

export default HomeScreen;
