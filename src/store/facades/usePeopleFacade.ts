import usePeopleStore from '../usePeopleStore';

export default function usePeopleFacade() {
    const {people, addPerson, deletePerson, setPeople, loading} = usePeopleStore(
        (state) => ({
            people: state.people,
            addPerson: state.addPerson,
            deletePerson: state.deletePerson,
            setPeople: state.setPeople,
            loading: state.loading
        })
    );

    return {people, addPerson, deletePerson, setPeople, loading};
}