import { rootNavigation, rootParamList } from '../rootNavigation'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Person from '../../interfaces/Person';

type PersonForm = {
    navigation: NativeStackNavigationProp<rootParamList>,
    persons: Array<Person>
    setPerson: React.Dispatch<React.SetStateAction<Person>>,
    person: Person,
    addPerson: (person:Person) => void | undefined
}

export default PersonForm;
