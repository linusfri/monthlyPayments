import Person from '../../interfaces/Person';

type SalaryForm = {
    persons: Array<Person>
    setPersons: React.Dispatch<React.SetStateAction<Array<Person>>>
}

export default SalaryForm;
