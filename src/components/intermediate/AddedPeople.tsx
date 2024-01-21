import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { forms, base, typo } from '../../styles/index';

import Person from '../../data/interfaces/Person';

type AddedPeopleProps = {
    people: Person[]
    deletePerson: (index: number) => void,
}

export default function AddedPeople({people, deletePerson}: AddedPeopleProps) {

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

    return (
        <View style={base.styles.peopleView}>
            {peopleToRender}
        </View>
    );
}