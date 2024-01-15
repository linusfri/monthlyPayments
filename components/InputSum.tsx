import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { forms, typo } from '../styles';
import inputSum from '../types/screens/InputSum';
import ApiClient from '../models/apiClient';

export default function InputSum({ person, setPerson }:inputSum) {
  async function calculateSalary(salary: string) {
    const apiClient = new ApiClient();
    
    let res = null;

    try {
      res = await apiClient.request('POST', '/monthly-pay/evaluate', JSON.stringify(salary));
    } catch {
      return salary;
    }

    return res.data.amount.toString();
  }
  return (
    <TouchableOpacity
        style={forms.styles.textInputButton}
        onPress={async () => {
            const newPerson = {
                ...person,
                salary: await calculateSalary(person.salary)
            };

            setPerson(newPerson);
        }}
    >
        <Text style={typo.styles.textInputButtonText}>Sum</Text>
    </TouchableOpacity>
  );
}
