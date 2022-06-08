import { NativeModules, Platform } from 'react-native';
import expEval from 'expression-eval';
import Person from '../interfaces/Person';

class SalaryModel {
    static calculate(salaries:string[], totalToPay:string) {
        const totalToPayRegex = /^(\d+)$|(\d+[-+/*]\d+)+$/;
        const salaryRegex = /^(\d+)$/;
        
        if (!(totalToPay.match(totalToPayRegex))) {
            return('Wrong total to pay format');
        }
        for (const salary of salaries) {
            if (salary.length <= 0 || !(salary.match(salaryRegex))) {
                return('One or more salaries are in the wrong format');
            }
        }

        const totalToPayParsed = expEval.parse(totalToPay);
        const totalToPayNumber:number = expEval.eval(totalToPayParsed, this);
        const intSalariesList:Array<number> = salaries.map((salary:string) => {
            return parseInt(salary);
        });
        const sumSalaries:number = intSalariesList.reduce((prev, curr) => prev + curr);

        if (sumSalaries < totalToPayNumber) {
            return 'You cannot pay';
        }

        let returnString = '';
        intSalariesList.map((salary, index) => {
            const toPay:number = +((salary / sumSalaries) * totalToPayNumber).toFixed(2);
            returnString += `Person ${index + 1}: ${toPay}\n`;
        });
        return returnString.trimEnd();
    }

    static calculateObj(persons:Person[], totalToPay: string) {
        const totalToPayRegex = /^(\d+)$|(\d+[-+/*]\d+)+$/;
        const salaryRegex = /^(\d+)$/;

        const totalToPayParsed = expEval.parse(totalToPay);
        const totalToPayNumber:number = expEval.eval(totalToPayParsed, this);
        const intSalariesList:Array<number> = persons.map((person:Person) => {
            return person.salary;
        });
        const sumSalaries:number = intSalariesList.reduce((prev, curr) => prev + curr);
        
        if (!(totalToPay.match(totalToPayRegex))) {
            return('Wrong total to pay format');
        }

        if (totalToPayNumber < 0) {
            return('Total sum to pay cannot be less than 0');
        }

        for (const person of persons) {
            if (person.salary < 0 || !(person.salary.toString().match(salaryRegex))) {
                return('One or more salaries are in the wrong format');
            }
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

    static getUserLocale() {
        const deviceLang = Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0]
        : NativeModules.I18nManager.localeIdentifier;
        
        return deviceLang;
    }
}
export default SalaryModel;