import { View, Text, TouchableOpacity } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { forms, base, typo } from '../styles/index';
import HomeScreen from '../data/types/screens/Home';
import AddPersonForm from '../components/custom/AddPersonForm';
import usePeopleFacade from '../store/facades/usePeopleFacade';

export default function Home({ navigation }: HomeScreen) {
    const { people, deletePerson } = usePeopleFacade();

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
        <KeyboardAwareScrollView
            contentContainerStyle={base.styles.home}
            keyboardShouldPersistTaps='always'
        >
            <AddPersonForm />

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