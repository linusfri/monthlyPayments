import Person from '../../interfaces/Person';
import { rootParamList } from '../rootNavigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type HomeScreen = {
    navigation: NativeStackNavigationProp<rootParamList>,
    person: Person,
    people: Person[],
    setPeople: React.Dispatch<React.SetStateAction<Person[]>>,
    setPerson: React.Dispatch<React.SetStateAction<Person>>
}

export default HomeScreen;
