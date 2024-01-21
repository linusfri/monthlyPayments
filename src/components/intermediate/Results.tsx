import { Text, TextInput, TouchableOpacity } from 'react-native';

import { forms, typo } from '../../styles/index';

type ResultsProps = {
    value: string
    calculate: () => void
}
export default function Results({value, calculate}: ResultsProps) {
    return (
        <>
            <TextInput
                style={[forms.styles.inputAndContainer, forms.styles.formFieldTextCenter, typo.styles.pBold]}
                multiline={true}
                numberOfLines={2}
                editable={false}
                value={value}
            />
            <TouchableOpacity
                style={forms.styles.formButtonExtraPadding}
                onPress={() => {
                    calculate();
                }}
            >
                <Text style={typo.styles.buttonText}>
                    Calculate
                </Text>
            </TouchableOpacity>
        </>
    );
}