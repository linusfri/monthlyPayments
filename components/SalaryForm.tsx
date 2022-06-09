import { View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

import salaryModel from '../models/salaryModel';
import salaryForm from '../types/screens/salaryForm';
import Person from '../interfaces/Person';
import { forms, base, typo } from '../styles/index';
import InputSum from './InputSum';

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
                    value={person.salary.toString() || ''}
                    keyboardType='phone-pad'
                    />
                </View>
            </View>
        );
    });

    return (
        <KeyboardAwareScrollView contentContainerStyle={forms.styles.formContainer}>
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
                value={totalToPay}
                />
            </View>

            <Text style={typo.styles.label}>Results</Text>
            <TextInput
            style={[forms.styles.inputAndContainer, forms.styles.formFieldCenter, typo.styles.pBold]}
            multiline={true}
            numberOfLines={2}
            editable={false}
            value={results}
            />
            <TouchableOpacity
                style={forms.styles.formButtonExtraPadding}
                onPress={() => {
                    setResults(salaryModel.calculateObj(persons, totalToPay));
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