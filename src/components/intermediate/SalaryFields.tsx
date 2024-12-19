import { useEffect } from 'react';
import { Keyboard } from 'react-native';
import { Control, FieldValues, UseFormSetValue, FieldErrors } from 'react-hook-form';

import { SalaryBackend } from '../../models/salaryModel';
import ApiClient from '../../server/apiClient';
import Person from '../../data/interfaces/Person';
import FormTextInput from '../shared/FormTextInput';
import { SALARY_REGEX } from '../../constants/constants';

type SalaryFieldsProps = {
    people: Person[],
    setPeople: (people: Person[]) => void,
    control: Control<any>
    errors: FieldErrors<FieldValues>,
    setValue?: UseFormSetValue<FieldValues>
}
export default function SalaryFields({people, setPeople, control, errors, setValue}: SalaryFieldsProps) {
    useEffect(() => {
        people.forEach((person) => {
            setValue ? setValue(`${person.name}-salary`, person.salary) : null;
        });
    }, []);

    function updatePersonSalary(newPerson:Person, listIndex: number) {
        setPeople(people.map((person, index) => {
            if (listIndex === index) return newPerson;

            return person;
        }));
    }

    const salaryFields = people.map((person, index) => {
        return (
            <FormTextInput
                key={index}
                name={`${person.name}-salary`}
                label={`${person.name}`}
                onSubmitEditing={Keyboard.dismiss}
                keyboardType='phone-pad'
                rules={{
                    pattern: SALARY_REGEX,
                    required: {
                        value: true,
                        message: 'Enter salary'
                    },
                    onChange: (event) => {
                        updatePersonSalary(
                            {
                                ...person,
                                salary: event.target.value
                            },
                            index
                        );
                    }
                }}
                errors={errors}
                control={control}
                action={async () => {
                    const updatedSalary = await new SalaryBackend(new ApiClient()).evaluate(person.salary);
                    const updatedPerson = {
                        ...person,
                        salary: updatedSalary
                    };

                    updatePersonSalary(updatedPerson, index);

                    setValue ? setValue(`${person.name}-salary`, updatedSalary) : null;
                }}
            />
        );
    });

    return (
        <>
            {salaryFields}
        </>
    );
}