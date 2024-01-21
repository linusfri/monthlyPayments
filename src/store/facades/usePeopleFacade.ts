import usePeopleStore from '../usePeopleStore';

export default function usePeopleFacade() {
    const {people, addPerson, deletePerson, setPeople, currentActive, setCurrentActive, loading} = usePeopleStore(
        (state) => ({
            people: state.people,
            currentActive: state.currentActive,
            addPerson: state.addPerson,
            deletePerson: state.deletePerson,
            setPeople: state.setPeople,
            setCurrentActive: state.setCurrentActive,
            loading: state.loading
        })
    );

    return {people, addPerson, deletePerson, setPeople, setCurrentActive, currentActive, loading};
}