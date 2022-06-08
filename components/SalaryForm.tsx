import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useState, useEffect } from 'react';

import salaryModel from '../models/salaryModel';
import salaryForm from '../types/screens/salaryForm';
import Person from '../interfaces/Person';
import { forms, base, typo } from '../styles/index';

export default function SalaryFormCp ({ persons, setPersons }:salaryForm) {
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
                <TextInput
                multiline={true}
                style={[forms.styles.input, forms.styles.formFieldCenter]}
                onChangeText={(text:string) => {
                    updatePersonSalary(
                        index,
                        {
                            ...person, 
                            salary: isNaN(parseFloat(text)) ? 0 : parseFloat(text)
                        }
                    );
                }}
                value={person.salary.toString() || ''}
                keyboardType='numeric'
                />
            </View>
        );
    });

    return (
        <KeyboardAwareScrollView contentContainerStyle={forms.styles.salaryFormContainer}>
            {salaryFields}

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
                    // setResults(salaryModel.calculate(salaries, totalToPay));
                    setResults(salaryModel.calculateObj(persons, totalToPay));
                }}
            >
                <Text style={typo.styles.buttonText}>
                    Calculate
                </Text>
            </TouchableOpacity>
      </KeyboardAwareScrollView>
    );
}