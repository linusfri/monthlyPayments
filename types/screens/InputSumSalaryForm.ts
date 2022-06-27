import Person from '../../interfaces/Person';

type InputSumSalaryForm = {
    updatePersonSalary: (listIndex:number, person:Person) => void
    person: Person,
    index: number
}

export default InputSumSalaryForm;
