import { View, Text, TextInput, Button, TouchableOpacity, ScrollView, Touchable } from 'react-native';
import { useState } from 'react';
import { showMessage } from 'react-native-flash-message';
import { Ionicons } from '@expo/vector-icons';

import Person from '../interfaces/Person';
import { forms, base, typo } from '../styles/index';
import HomeScreen from '../types/screens/home';
import AddPersonForm from './AddPersonForm';

export default function Home({ navigation, persons, setPersons }:HomeScreen) {
    const [person, setPerson] = useState<Person>({name:'', salary: 0});

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
        showMessage({
            message: 'Person added',
            description: `${newPerson.name} was added`,
            type: 'success'
        });

        setPersons([...persons, newPerson]);

        setPerson({name:'', salary: 0});
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
        <View style={base.styles.centerFlex1}>
            <Text 
                style={[typo.styles.h2, base.styles.padding12LR, base.styles.margin12TopBottom]}
            >
                Add person
            </Text>
            <AddPersonForm
            navigation={navigation}
            person={person}
            persons={persons}
            setPerson={setPerson}
            addPerson={addPerson}
            />
            <ScrollView style={base.styles.personsScrollView}>
                {personsToRender}
            </ScrollView>
        </View>
    );
}