import { View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

import salaryModel from '../models/salaryModel';
import salaryForm from '../types/screens/salaryForm';
import Person from '../interfaces/Person';
import { forms, base, typo } from '../styles/index';
import InputSumSalaryForm from './InputSumSalaryForm';

export default function SalaryForm ({ navigation, persons, setPersons }:salaryForm) {
    const [totalToPay, setTotalToPay] = useState<string>('');
    const [results, setResults] = useState<string>('');

    function updatePersonSalary(listIndex:number, newPerson:Person) {
        setPersons(persons.map((person, index) => {
            if (listIndex === index) {
                return newPerson;
            }
            return person;
        }));
    }

    const salaryFields = persons.map((person, index) => {
        return (
            <View key={index}>
                <Text style={typo.styles.label}>{person.name}</Text>
                <View style={forms.styles.inputContainer}>
                    <TextInput
                    multiline={true}
                    onSubmitEditing={Keyboard.dismiss}
                    style={forms.styles.input}
                    onChangeText={(text:string) => {
                        updatePersonSalary(
                            index,
                            {
                                ...person, 
                                salary: text
                            }
                        );
                    }}
                    value={person.salary}
                    keyboardType='phone-pad'
                    />
                    <InputSumSalaryForm person={person} updatePersonSalary={updatePersonSalary} index={index}/>
                </View>
            </View>
        );
    });

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={forms.styles.formContainer}
            keyboardShouldPersistTaps='always'
            >
            <Text style={[typo.styles.h2, base.styles.margin12TopBottom]}>Calculation</Text>

            {salaryFields}

            <Text style={typo.styles.label}>Total to pay</Text>
            <View style={forms.styles.inputContainer}>
                <TextInput
                multiline={true}
                style={forms.styles.input}
                keyboardType='phone-pad'
                onChangeText={(text:string) => {
                    setTotalToPay(text);
                }}
                placeholder={'Fyll i totalsumman att betala'}
                value={totalToPay}
                />
            </View>

            <Text style={typo.styles.label}>Results</Text>
            <TextInput
                style={[forms.styles.inputAndContainer, forms.styles.formFieldTextCenter, typo.styles.pBold]}
                multiline={true}
                numberOfLines={2}
                editable={false}
                value={results}
            />
            <TouchableOpacity
                style={forms.styles.formButtonExtraPadding}
                onPress={() => {
                    setResults(salaryModel.calculate(persons, totalToPay));
                }}
            >
                <Text style={typo.styles.buttonText}>
                    Calculate
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={forms.styles.formButton}
                onPress={() => {
                    navigation.navigate('Hem');
                }}
            >
                <Text style={typo.styles.buttonText}>
                    Go back
                </Text>
            </TouchableOpacity>
      </KeyboardAwareScrollView>
    );
}