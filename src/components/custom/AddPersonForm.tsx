import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import { forms, base, typo } from '../../styles/index';
import PersonForm from '../../data/types/screens/AddPersonForm';
import InputSum from '../shared/InputSum';

export default function AddPersonForm({setPerson, person, addPerson }:PersonForm) {
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
                onChangeText={(text:string) => {
                    setPerson({...person, name: text});
                }}
                value={person.name}
            />
    
            <Text style={typo.styles.label}>Person salary</Text>
            <View style={forms.styles.inputContainer}>
                <TextInput
                    style={forms.styles.input}
                    onChangeText={(text:string) => {
                        setPerson({...person, salary: text});
                    }}
                    value={person.salary}
                    keyboardType={'phone-pad'}
                />
                <InputSum entity={person} setState={setPerson}/>
            </View>
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
