import { View, Text, TouchableOpacity } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import { forms, base, typo } from '../../styles/index';
import Person from '../../data/interfaces/Person';
import { SalaryBackend } from '../../models/salaryModel';
import ApiClient from '../../server/apiClient';
import { useForm, FieldValues } from 'react-hook-form';
import FormTextInput from '../shared/FormTextInput';
import { useEffect } from 'react';

type AddPersonFormProps = {
    people: Person[],
    addPerson: (newPerson: Person) => void
}

export default function AddPersonForm({ addPerson }: AddPersonFormProps) {
    const {
        control, 
        handleSubmit,
        setValue,
        getValues,
        reset,
        formState
    } = useForm({mode: 'onBlur'});

    useEffect(() => {
        reset();
    }, [formState.isSubmitSuccessful]);

    async function evaluate(salary: string) {
        const salaryBackend = new SalaryBackend(new ApiClient());
        
        const res = await salaryBackend.evaluate(salary);

        setValue('salary', res);
    }

    function submit(data: FieldValues) {
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

        if (salary == undefined || salary == '' || !salary.match(salaryRegex)) {
            showMessage({
                message: 'No Salary',
                description: 'You must enter a salary',
                type: 'warning'
            });

            return false;
        }

        return true;
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
                onPress={handleSubmit((data) => {
                    submit(data);
                })}
            >
                <Text style={typo.styles.buttonText}>Add person</Text>
            </TouchableOpacity>
        </View>
    );
}
