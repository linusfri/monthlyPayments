import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { useEffect, useState } from 'react';

import { forms, base, typo } from '../../styles/index';
import InputSum from '../shared/InputSum';
import Person from '../../data/interfaces/Person';
import { SalaryBackend } from '../../models/salaryModel';
import ApiClient from '../../server/apiClient';
import {useForm} from 'react-hook-form';
import FormTextInput from '../shared/FormTextInput';

type AddPersonFormProps = {
    people: Person[],
    addPerson: (newPerson: Person) => void
}

type FormFields = {
    name: string,
    salary: string
}

export default function AddPersonForm({people, addPerson}: AddPersonFormProps) {
    const {
        control, 
        handleSubmit,
        setValue,
        getValues,
        formState: {errors, isValid},
    } = useForm({mode: 'onBlur'});

    
    async function evaluate(salary: string) {
        const salaryBackend = new SalaryBackend(new ApiClient());
        
        const res = await salaryBackend.evaluate(salary);

        console.log(res);

        setValue('salary', res);
    }

    function submit(data: any) {
        const newPerson = {
            name: data.name,
            salary: data.salary
        } as Person;

        addPerson(newPerson);

        showMessage({
            message: 'Person added',
            description: `${newPerson.name} was added`,
            type: 'success'
        });

    }

    function validateName(name: string | undefined): boolean {
        if (name == '' || name == undefined) {
            showMessage({
                message: 'No name',
                description: 'You must enter a name',
                type: 'warning'
            });
            return false;
        }

        return true;
    }

    function validateSalary(salary: string | undefined): boolean {
        const salaryRegex = /^(\d+)$|(\d+[-+/*]\d+)+$/;

        if (salary == undefined) return false;

        if (salary.match(salaryRegex)) return true;

        return false;
    }

    return (
        <View style={forms.styles.formContainer}>
            <Text 
                style={[typo.styles.h2, base.styles.margin12TopBottom]}
            >
                Add person
            </Text>
            <FormTextInput 
                name='name'
                label='Name'
                placeholder=''
                rules={{validate: validateName}}
                control={control}
            />
            <FormTextInput 
                name='salary'
                label='Salary'
                placeholder=''
                rules={{validate: validateSalary}}
                control={control}
                action={() => evaluate(getValues().salary)}
            />
            <TouchableOpacity
                style={forms.styles.formButtonExtraPadding}
                onPress={handleSubmit(submit)}
            >
                <Text style={typo.styles.buttonText}>Add person</Text>
            </TouchableOpacity>
        </View>
    );
}
