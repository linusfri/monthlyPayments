import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Person from '../interfaces/Person';

type rootParamList = {
    Hem: undefined,
    'Löneformulär': undefined
}

type rootNavigation = {
    navigation: NativeStackNavigationProp<rootParamList>
}

export { rootNavigation, rootParamList };