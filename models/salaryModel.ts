import expEval from 'expression-eval';
import Person from '../interfaces/Person';

class SalaryModel {
    static MATH_REGEX = /^(\d+)$|(\d+[-+/*]\d+)+$/;

    static calculateObj(persons:Person[], totalToPay: string) {
        if (!SalaryModel.personsSalariesCorrect(persons)) {
            return 'One or more salaries are in the wrong format';
        }
        if (!SalaryModel.totalToPayCorrect(totalToPay)) {
            return 'Total sum to pay is in the wrong format';
        }

        const totalToPayParsed = expEval.parse(totalToPay);
        const totalToPayNumber:number = expEval.eval(totalToPayParsed, this);
        const intSalariesList:Array<number> = persons.map((person:Person) => {
            const parsedSalary = expEval.parse(person.salary);
            const salaryInt = expEval.eval(parsedSalary, person);

            return salaryInt;
        });
        const sumSalaries:number = intSalariesList.reduce((prev, curr) => prev + curr);

        if (totalToPayNumber < 0) {
            return('Total sum to pay cannot be less than 0');
        }

        if (sumSalaries < totalToPayNumber) {
            return 'You cannot pay';
        }

        let returnString = '';

        intSalariesList.map((salary, index) => {
            const toPay:number = +((salary / sumSalaries) * totalToPayNumber).toFixed(2);

            returnString += `${persons[index].name}: ${toPay}\n`;
        });
        return returnString.trimEnd();
    }

    private static personsSalariesCorrect(persons:Array<Person>) {
        for (const person of persons) {
            if (!(person.salary.match(SalaryModel.MATH_REGEX))) {
                return false;
            }

            const parsedSalary = expEval.parse(person.salary);
            const salaryInt = expEval.eval(parsedSalary, person);

            if (salaryInt < 0) {
                return false;
            }
        }
        return true;
    }

    private static totalToPayCorrect(totalToPay:string) {
        if (!(totalToPay.match(SalaryModel.MATH_REGEX))) {
            return false;
        }
        return true;
    }

    static sumSalaryReturnText(salary: string) {
        if (!(salary.match(SalaryModel.MATH_REGEX))) {
            return salary;
        }
        const parsedSalary = expEval.parse(salary);
        const salaryInt:number = expEval.eval(parsedSalary, this);

        return salaryInt.toString();
    }
}
export default SalaryModel;