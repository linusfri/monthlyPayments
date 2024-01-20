import Person from '../../src/data/interfaces/Person';

type PersonForm = {
    setPerson: React.Dispatch<React.SetStateAction<Person>>,
    person: Person,
    addPerson: (person:Person) => void | undefined
}

export default PersonForm;
