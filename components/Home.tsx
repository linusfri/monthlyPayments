import { View, Text,TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { showMessage } from 'react-native-flash-message';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Person from '../interfaces/Person';
import { forms, base, typo } from '../styles/index';
import HomeScreen from '../types/screens/home';
import AddPersonForm from './AddPersonForm';

export default function Home({ navigation, persons, setPersons }:HomeScreen) {
    const [person, setPerson] = useState<Person>({name:'', salary: ''});

    function addPerson(newPerson:Person) {
        if (newPerson.name === '') {
            showMessage({
                message: 'No name',
                description: 'You must enter a name',
                type: 'warning'
            });
            return;
        }

        for (const person of persons) {
            if (person.name === newPerson.name) {
                showMessage({
                    message: 'Name already exists',
                    description: 'A person with that name already exists',
                    type: 'warning'
                });

                return;
            }       
        }

        setPersons([...persons, newPerson]);
        setPerson({name:'', salary: ''});
        showMessage({
            message: 'Person added',
            description: `${newPerson.name} was added`,
            type: 'success'
        });
    }

    function deletePerson(deleteIndex:number) {
        const filteredPersonList = persons.filter((person, index) => {
            if (index === deleteIndex) {
                return false;
            }
            return person;
        });

        setPersons(filteredPersonList);
    }

    const personsToRender = persons.map((person, index) => {
        return (
            <View key={index} style={forms.styles.formPerson}>
                <Text style={typo.styles.personText}>{person.name}</Text>
                <TouchableOpacity 
                    style={base.styles.personBoxButton}
                    onPress={() => {
                        deletePerson(index);
                    }}
                >
                    <Ionicons name='trash' style={base.styles.personBoxIcon}/>
                </TouchableOpacity>
            </View>
        );
    });

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={base.styles.home}
            keyboardShouldPersistTaps='always'
        >
            <AddPersonForm
            person={person}
            setPerson={setPerson}
            addPerson={addPerson}
            />

            <TouchableOpacity
                style={[forms.styles.formButton, base.styles.margin12LR]}
                onPress={() => {
                    if (persons.length < 2) {
                        showMessage({
                            message: 'At least two people',
                            description: 'You need to add at least two people',
                            type: 'warning'
                        });
                        return;
                    }
                    navigation.navigate('Löneformulär');
                }}
            >
                <Text style={typo.styles.buttonText}>Continue</Text>
            </TouchableOpacity>

            <View style={base.styles.personsView}>
                {personsToRender}
            </View>
        </KeyboardAwareScrollView>
    );
}