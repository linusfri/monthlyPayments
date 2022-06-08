import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import { forms, typo } from '../styles/index';
import PersonForm from '../types/screens/AddPersonForm';

export default function AddPersonForm({setPerson, person, addPerson }:PersonForm) {
    return (
        <View style={forms.styles.personFormContainer}>
            <Text>Person name</Text>
            <TextInput
                style={[forms.styles.input, forms.styles.formFieldCenter]}
                onChangeText={(text:string) => {
                    setPerson({...person, name: text});
                }}
                value={person.name || ''}
            />
    
            <Text>Person salary</Text>
            <TextInput
                style={[forms.styles.input, forms.styles.formFieldCenter]}
                onChangeText={(text:string) => {
                    setPerson({...person, salary: isNaN(parseFloat(text)) ? 0 : parseFloat(text)});
                }}
                value={person.salary?.toString()}
                keyboardType={'phone-pad'}
            />
            <TouchableOpacity
                style={forms.styles.formButtonExtraPadding}
                onPress={() => {
                    addPerson(person);
                }}
            >
                <Text style={typo.styles.buttonText}>Add person</Text>
            </TouchableOpacity>
        </View>
    );
}
