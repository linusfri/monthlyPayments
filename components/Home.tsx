import { View, Text,TouchableOpacity } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Person from '../interfaces/Person';
import { forms, base, typo } from '../styles/index';
import HomeScreen from '../types/screens/home';
import AddPersonForm from './AddPersonForm';
import { useEffect } from 'react';
import ApiClient from '../models/apiClient';

export default function Home({ navigation, person, setPerson, people, setPeople }: HomeScreen) {
    function addPerson(newPerson:Person) {
        if (newPerson.name === '') {
            showMessage({
                message: 'No name',
                description: 'You must enter a name',
                type: 'warning'
            });
            return;
        }

        for (const person of people) {
            if (person.name === newPerson.name) {
                showMessage({
                    message: 'Name already exists',
                    description: 'A person with that name already exists',
                    type: 'warning'
                });

                return;
            }       
        }

        setPeople([...people, newPerson]);
        setPerson({name:'', salary: ''});
        showMessage({
            message: 'Person added',
            description: `${newPerson.name} was added`,
            type: 'success'
        });
    }

    function deletePerson(deleteIndex:number) {
        const filteredPersonList = people.filter((person, index) => {
            if (index === deleteIndex) {
                return false;
            }
            return person;
        });

        setPeople(filteredPersonList);
    }

    const peopleToRender = people.map((person, index) => {
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

    useEffect(() => {
        // const apiClient = new ApiClient();
        console.log(process.env.EXPO_PUBLIC_API_URL);
    }, []);

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
                    if (people.length < 2) {
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

            <View style={base.styles.peopleView}>
                {peopleToRender}
            </View>
        </KeyboardAwareScrollView>
    );
}