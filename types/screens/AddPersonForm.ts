import Person from '../../interfaces/Person';

type PersonForm = {
    setPerson: React.Dispatch<React.SetStateAction<Person>>,
    person: Person,
    addPerson: (person:Person) => void | undefined
}

export default PersonForm;
