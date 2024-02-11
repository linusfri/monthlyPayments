import { Keyboard } from 'react-native';
import { Control, FieldValues, UseFormSetValue } from 'react-hook-form';

import { SalaryBackend } from '../../models/salaryModel';
import ApiClient from '../../server/apiClient';
import Person from '../../data/interfaces/Person';
import FormTextInput from '../shared/FormTextInput';
import { useEffect } from 'react';

type SalaryFieldsProps = {
    people: Person[],
    setPeople: (people: Person[]) => void,
    control: Control<any>
    setValue?: UseFormSetValue<FieldValues>
}
export default function SalaryFields({people, setPeople, control, setValue}: SalaryFieldsProps) {
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
                control={control}
                extStateUpdate={(text) => {
                    updatePersonSalary(
                        {
                            ...person,
                            salary: text
                        },
                        index
                    );
                }}
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