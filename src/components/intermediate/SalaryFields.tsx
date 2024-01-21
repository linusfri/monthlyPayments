import { View, Text, TextInput, Keyboard } from 'react-native';

import { SalaryBackend } from '../../models/salaryModel';
import { forms, typo } from '../../styles/index';
import InputSum from '../../components/shared/InputSum';
import ApiClient from '../../server/apiClient';
import Person from '../../data/interfaces/Person';

type SalaryFieldsProps = {
    people: Person[],
    setPeople: (people: Person[]) => void
}
export default function SalaryFields({people, setPeople}: SalaryFieldsProps) {

    function updatePersonSalary(newPerson:Person, listIndex: number) {
        setPeople(people.map((person, index) => {
            if (listIndex === index) return newPerson;

            return person;
        }));
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
                    <InputSum onClick={async () => {
                        const updatedPerson = {
                            ...person,
                            salary: await new SalaryBackend(new ApiClient()).evaluate(person.salary)
                        };

                        updatePersonSalary(updatedPerson, index);
                    }}/>
                </View>
            </View>
        );
    });

    return (
        <>
            {salaryFields}
        </>
    );
}