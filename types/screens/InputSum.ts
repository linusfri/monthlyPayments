import Person from '../../interfaces/Person';

type InputSum = {
    setPerson: React.Dispatch<React.SetStateAction<Person>>,
    person: Person,
}

export default InputSum;
