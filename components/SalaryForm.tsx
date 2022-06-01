import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useState } from 'react';

import salaryModel from '../models/salaryModel';
import { forms, base, typo } from '../styles/index';

export default function SalaryForm () {
    const [totalToPay, setTotalToPay] = useState<string>('');
    const [results, setResults] = useState<string>('');
    const [salaries, setSalaries] = useState<string[]>(['', '']);

    function updateSalariesByIndex(listIndex:number, newSalary:string) {
        setSalaries(salaries.map((salary, index) => {
            if (listIndex === index) {
                return newSalary;
            }
            return salary;
        }));
    }

    return (
        <KeyboardAwareScrollView contentContainerStyle={base.styles.formContainer}>
            <Text style={typo.styles.label}>Person one salary</Text>
            <TextInput
            multiline={true}
            style={[forms.styles.input, forms.styles.formFieldCenter]}
            onChangeText={(text:string) => {
                updateSalariesByIndex(0, text);
            }}
            value={salaries[0]}
            keyboardType='numeric'
            />

            <Text style={typo.styles.label}>Person two salary</Text>
            <TextInput
            multiline={true}
            onChangeText={(text:string) => {
                updateSalariesByIndex(1, text);
            }}
            value={salaries[1]}
            style={[forms.styles.input, forms.styles.formFieldCenter]}
            keyboardType='numeric'
            />

            <Text style={typo.styles.label}>Total to pay</Text>
            <TextInput
            multiline={true}
            style={[forms.styles.input, forms.styles.formFieldCenter]}
            keyboardType='phone-pad'
            onChangeText={(text:string) => {
                setTotalToPay(text);
            }}
            value={totalToPay}
            />

            <Text style={typo.styles.label}>Results</Text>
            <TextInput
            style={[forms.styles.input, forms.styles.formFieldCenter, typo.styles.pBold]}
            multiline={true}
            numberOfLines={2}
            editable={false}
            value={results}
            />
            <TouchableOpacity
                style={forms.styles.formButton}
                onPress={() => {
                    setResults(salaryModel.calculate(salaries, totalToPay));
                }}
            >
                <Text style={typo.styles.buttonText}>
                    Calculate
                </Text>
            </TouchableOpacity>
      </KeyboardAwareScrollView>
    );
}