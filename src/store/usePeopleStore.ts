import { create } from 'zustand';
import Person from '../data/interfaces/Person';

type State = {
    people: Person[]
    loading: boolean
    currentActive: Person | null
}

type Action = {
    addPerson: (newPerson: Person) => void
    deletePerson: (deleteIndex: number) => void
    setPeople: (people: Person[]) => void
    setCurrentActive: (person: Person) => void
}

type StateAndAction = State & Action;

const usePeopleStore = create<StateAndAction>((set) => ({
    people: [],
    currentActive: null,
    addPerson: (newPerson) => set((state) => ({people: [newPerson, ...state.people]})),
    deletePerson: (deleteIndex) => set((state) => ({
        people: state.people.filter((person, index) => index !== deleteIndex),
    })),
    setPeople: (people) => set(() => ({people: [...people]})),
    setCurrentActive: (person) => set(() => ({currentActive: person})),
    loading: false
}));

export default usePeopleStore;