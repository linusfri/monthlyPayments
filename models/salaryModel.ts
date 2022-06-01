import { NativeModules, Platform } from 'react-native';
import expEval from 'expression-eval';

class SalaryModel {
    static calculateOld(p1Salary:string, p2Salary:string, totalToPay:string) {
        if (p1Salary.length === 0 || p2Salary.length === 0 || totalToPay.length === 0) {
            return('Please fill in all the fields');
        }

        const totalToPayParsed = expEval.parse(totalToPay);

        const p1SalaryInt = parseInt(p1Salary);
        const p2SalaryInt = parseInt(p2Salary);
        const totalToPayInt = expEval.eval(totalToPayParsed, this);

        if ((p1SalaryInt + p2SalaryInt) < totalToPayInt) {
            return('You cannot pay!');
        }

        const p1Pay = (totalToPayInt * p1SalaryInt) / (p2SalaryInt + p1SalaryInt);
        const p2Pay = totalToPayInt - p1Pay;


        return (`Person 1: ${p1Pay.toFixed(0)}\nPerson 2: ${p2Pay.toFixed(0)}`);
    }

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

    static getUserLocale() {
        const deviceLang = Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0]
        : NativeModules.I18nManager.localeIdentifier;
        
        return deviceLang;
    }
}
export default SalaryModel;