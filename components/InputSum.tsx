import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { forms, typo } from '../styles';
import inputSum from '../types/screens/InputSum';
import ApiClient from '../models/apiClient';
import Person from '../interfaces/Person';

export default function InputSum({ entity, setState, stateUpdateFn, atIndex }:inputSum<Person>) {
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
    setState || stateUpdateFn ? (
      <TouchableOpacity
          style={forms.styles.textInputButton}
          onPress={async () => {
              const newEntity = {
                  ...entity,
                  salary: await calculateSalary(entity.salary)
              };

              if (setState) {
                setState(newEntity);
              } else if (stateUpdateFn && atIndex) {
                stateUpdateFn(newEntity, atIndex);
              }
          }}
      >
          <Text style={typo.styles.textInputButtonText}>Sum</Text>
      </TouchableOpacity>
    ): null
  );
}
