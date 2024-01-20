import { create } from 'zustand';
import Person from '../data/interfaces/Person';

type State = {
    people: Person[],
    loading: boolean
}

type Action = {
    addPerson: (newPerson: Person) => void,
    deletePerson: (deleteIndex: number) => void,
    setPeople: (newPeople: Person[]) => void
}

type StateAndAction = State & Action;

const usePeopleStore = create<StateAndAction>((set) => ({
    people: [],
    addPerson: (newPerson) => set((state) => ({people: [newPerson, ...state.people]})),
    deletePerson: (deleteIndex) => set((state) => ({
        people: state.people.filter((person, index) => index !== deleteIndex),
    })),
    setPeople: (newPeople) => set(() => ({people: [...newPeople]})),
    loading: false
}));

export default usePeopleStore;