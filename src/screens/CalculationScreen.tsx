import { Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';

import { SalaryBackend } from '../models/salaryModel';
import usePeopleFacade from '../store/facades/usePeopleFacade';
import ApiClient from '../server/apiClient';
import { forms, base, typo } from '../styles/index';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { rootParamList } from '../data/types/rootNavigation';
import SalaryFields from '../components/intermediate/SalaryFields';
import Results from '../components/intermediate/Results';
import NavButton from '../components/shared/NavButton';
import FormTextInput from '../components/shared/FormTextInput';

type CalculationScreenProps = {
    navigation: NativeStackNavigationProp<rootParamList>,
}

export default function SalaryForm ({ navigation }: CalculationScreenProps) {
    const {
        control, 
        handleSubmit,
        setValue,
    } = useForm({ mode: 'onBlur' });

    const [results, setResults] = useState<string>('');
    const {people, setPeople} = usePeopleFacade();

    async function getResults(formData: FieldValues) {
        const salaryBackend = new SalaryBackend(new ApiClient());
        const totalToPay = formData.totalToPay;
    
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
            <SalaryFields people={people} setPeople={setPeople} control={control} setValue={setValue} />

            <FormTextInput
                name='totalToPay'
                control={control}
                label='Total to pay'
            />

            <Text style={typo.styles.label}>Results</Text>
            <Results value={results} calculate={handleSubmit(getResults)}/>

            <NavButton navigation={navigation} route='Hem' text='Go back'/>
        </KeyboardAwareScrollView>
    );
}