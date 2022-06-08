import { rootNavigation, rootParamList } from '../rootNavigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Person from '../../interfaces/Person';

type SalaryForm = {
    persons: Array<Person>,
    setPersons: React.Dispatch<React.SetStateAction<Array<Person>>>,
    navigation: NativeStackNavigationProp<rootParamList>
}

export default SalaryForm;
