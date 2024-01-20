import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type rootParamList = {
    Hem: undefined,
    'Löneformulär': undefined
}

type rootNavigation = {
    navigation: NativeStackNavigationProp<rootParamList>
}

export { rootNavigation, rootParamList };