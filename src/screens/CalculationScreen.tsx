import { View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useState } from 'react';

import { SalaryBackend } from '../models/salaryModel';
import salaryForm from '../data/types/screens/SalaryForm';
import Person from '../data/interfaces/Person';
import { forms, base, typo } from '../styles/index';
import InputSum from '../components/shared/InputSum';
import ApiClient from '../server/apiClient';
import usePeopleFacade from '../store/facades/usePeopleFacade';

export default function SalaryForm ({ navigation }: salaryForm) {
    const [totalToPay, setTotalToPay] = useState<string>('');
    const [results, setResults] = useState<string>('');
    const {people, setPeople} = usePeopleFacade();

    function updatePersonSalary(newPerson:Person, listIndex: number) {
        setPeople(people.map((person, index) => {
            if (listIndex === index) {
                return newPerson;
            }
            return person;
        }));
    }

    async function getResults(people: Person[], totalToPay: string) {
        const salaryBackend = new SalaryBackend(new ApiClient());

        const data = await salaryBackend.calculate(people, totalToPay);

        let resultString = '';

        data.forEach((person, index) => {
            /** If we are at last person, remove new line */
            if (index === data.length - 1) {
                resultString += `${person.name}: ${person.to_pay}`;
                return;
            }
            resultString += `${person.name}: ${person.to_pay}\n`;
        });
        setResults(resultString);
    }

    const salaryFields = people.map((person, index) => {
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
                            {
                                ...person, 
                                salary: text
                            },
                            index
                        );
                    }}
                    value={person.salary}
                    keyboardType='phone-pad'
                    />
                    <InputSum entity={person} stateUpdateFn={updatePersonSalary} atIndex={index}/>
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
                    getResults(people, totalToPay);
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