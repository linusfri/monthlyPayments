import { Text, TouchableOpacity } from 'react-native';
import { forms, typo } from '../../styles/index';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';

type NavButtonProps<T extends ParamListBase> = {
    navigation: NativeStackNavigationProp<T>
    route: string
    text: string
};

export default function NavButton<T extends ParamListBase>({ navigation, text, route }: NavButtonProps<T>) {
    return (
        <TouchableOpacity
            style={forms.styles.formButton}
            onPress={() => {
                navigation.navigate(route as any); //TODO, TYPE CORRECTLY
            }}
        >
            <Text style={typo.styles.buttonText}>
                {text}
            </Text>
        </TouchableOpacity>
    );
}


