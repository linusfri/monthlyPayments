import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { useState } from 'react';

import { forms, base, typo } from '../../styles/index';
import InputSum from '../shared/InputSum';
import Person from '../../data/interfaces/Person';
import { SalaryBackend } from '../../models/salaryModel';
import usePeopleFacade from '../../store/facades/usePeopleFacade';
import ApiClient from '../../server/apiClient';

export default function AddPersonForm() {
    const { people, addPerson } = usePeopleFacade();
    const [name, setName] = useState<string>('');
    const [salary, setSalary] = useState<string>('');

    async function evaluate(salary: string) {
        const salaryBackend = new SalaryBackend(new ApiClient());
    
        const res = await salaryBackend.evaluate(salary);

        setSalary(res);
    }

    function validateAndAdd() {
        const newPerson = {
            name,
            salary
        } as Person;

        if (newPerson.name === '') {
            showMessage({
                message: 'No name',
                description: 'You must enter a name',
                type: 'warning'
            });
            return;
        }

        for (const person of people) {
            if (person.name === newPerson.name) {
                showMessage({
                    message: 'Name already exists',
                    description: 'A person with that name already exists',
                    type: 'warning'
                });
    
                return;
            }       
        }

        addPerson(newPerson);

        setName('');
        setSalary('');
    }

    return (
        <View style={forms.styles.formContainer}>
            <Text 
                style={[typo.styles.h2, base.styles.margin12TopBottom]}
            >
                Add person
            </Text>
            <Text style={typo.styles.label}>Person name</Text>
            <TextInput
                style={forms.styles.inputAndContainer}
                onChangeText={(text) => setName(text)}
                value={name}
            />
    
            <Text style={typo.styles.label}>Person salary</Text>
            <View style={forms.styles.inputContainer}>
                <TextInput
                    style={forms.styles.input}
                    keyboardType={'phone-pad'}
                    onChangeText={(text) => setSalary(text)}
                    value={salary}
                />
                <InputSum onClick={() => evaluate(salary)}/>
            </View>
            <TouchableOpacity
                style={forms.styles.formButtonExtraPadding}
                onPress={validateAndAdd}
            >
                <Text style={typo.styles.buttonText}>Add person</Text>
            </TouchableOpacity>
        </View>
    );
}
