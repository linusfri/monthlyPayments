import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import { forms, typo } from '../styles';
import inputSumSalaryForm from '../types/screens/InputSumSalaryForm';
import SalaryModel from '../models/salaryModel';

export default function InputSumSalaryForm({ updatePersonSalary, person, index }:inputSumSalaryForm) {
  return (
    <TouchableOpacity
        style={forms.styles.textInputButton}
        onPress={() => {
            const newPerson = {
                ...person,
                salary: SalaryModel.sumSalaryReturnText(person.salary)
            };

            updatePersonSalary(index, newPerson);
        }}
    >
        <Text style={typo.styles.textInputButtonText}>Sum</Text>
    </TouchableOpacity>
  );
}
