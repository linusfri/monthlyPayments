import { Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useState } from 'react';

import { SalaryBackend } from '../models/salaryModel';
import salaryForm from '../data/types/screens/SalaryForm';
import Person from '../data/interfaces/Person';
import { forms, base, typo } from '../styles/index';
import ApiClient from '../server/apiClient';
import usePeopleFacade from '../store/facades/usePeopleFacade';
import SalaryFields from '../components/intermediate/SalaryFields';
import InputTotal from '../components/shared/InputTotal';
import Results from '../components/intermediate/Results';
import NavButton from '../components/shared/NavButton';

export default function SalaryForm ({ navigation }: salaryForm) {
    const [totalToPay, setTotalToPay] = useState<string>('');
    const [results, setResults] = useState<string>('');
    const {people, setPeople} = usePeopleFacade();

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

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={forms.styles.formContainer}
            keyboardShouldPersistTaps='always'
            >
            <Text style={[typo.styles.h2, base.styles.margin12TopBottom]}>Calculation</Text>
            <SalaryFields people={people} setPeople={setPeople} />

            <Text style={typo.styles.label}>Total to pay</Text>
            <InputTotal value={totalToPay} setValue={setTotalToPay}/>

            <Text style={typo.styles.label}>Results</Text>
            <Results value={results} calculate={() => getResults(people, totalToPay)}/>

            <NavButton navigation={navigation} route='Hem' text='Go back'/>
      </KeyboardAwareScrollView>
    );
}