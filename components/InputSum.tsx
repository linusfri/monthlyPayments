import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import { forms, typo } from '../styles';
import inputSum from '../types/screens/InputSum';
import SalaryModel from '../models/salaryModel';

export default function InputSum({ person, setPerson }:inputSum) {
  return (
    <TouchableOpacity
        style={forms.styles.textInputButton}
        onPress={() => {
            const newPerson = {
                ...person,
                salary: SalaryModel.sumSalaryReturnText(person.salary)
            };

            setPerson(newPerson);
        }}
    >
        <Text style={typo.styles.textInputButtonText}>Sum</Text>
    </TouchableOpacity>
  );
}
