import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { forms, typo } from '../styles';
import inputSum from '../types/screens/InputSum';
import ApiClient from '../models/apiClient';
import Person from '../interfaces/Person';
import { SalaryBackend } from '../models/salaryModel';

export default function InputSum({ entity, setState, stateUpdateFn, atIndex }:inputSum<Person>) {
  async function calculateSalary(salary: string) {
    const salaryBackend = new SalaryBackend(new ApiClient());

    const res = await salaryBackend.evaluate(salary);

    return res;
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
