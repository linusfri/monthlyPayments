import { View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { base } from '../styles/index';
import HomeScreen from '../data/types/screens/Home';
import AddPersonForm from '../components/custom/AddPersonForm';
// import usePeopleFacade from '../store/facades/usePeopleFacade';
import usePeopleStore from '../store/usePeopleStore';
import NavButton from '../components/shared/NavButton';
import AddedPeople from '../components/intermediate/AddedPeople';

export default function Home({ navigation }: HomeScreen) {
    // const { people, deletePerson, addPerson } = usePeopleFacade();
    const { people, deletePerson, addPerson } = usePeopleStore();

    function isEnoughPeople() {
        if (people.length >= 2) return true;

        showMessage({
            message: 'At least two people',
            description: 'You need to add at least two people',
            type: 'warning'
        });

        return false;
    }

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={base.styles.home}
            keyboardShouldPersistTaps='always'
        >
            <AddPersonForm people={people} addPerson={addPerson} />

            <View style={base.styles.margin12LR}>
                <NavButton
                    navigation={navigation}
                    route='Löneformulär'
                    text={'Continue'}
                    guard={isEnoughPeople}
                />
            </View>

            <AddedPeople people={people} deletePerson={deletePerson} />
        </KeyboardAwareScrollView>
    );
}