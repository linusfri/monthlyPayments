
import { View, TextInput } from 'react-native';
import { forms } from '../../styles/index';
import { Dispatch, SetStateAction } from 'react';

type InputTotalProps = {
    setValue: Dispatch<SetStateAction<string>>,
    value: string
}
export default function InputTotal({setValue, value}: InputTotalProps) {
    return (
        <View style={forms.styles.inputContainer}>
            <TextInput
            multiline={true}
            style={forms.styles.input}
            keyboardType='phone-pad'
            onChangeText={(text:string) => {
                setValue(text);
            }}
            placeholder={'Fyll i totalsumman att betala'}
            value={value}
            />
        </View>
    );
}