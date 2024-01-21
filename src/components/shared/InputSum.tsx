import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { forms, typo } from '../../styles';

type InputSumProps_ = {
  onClick: () => void
}

export default function InputSum({onClick}: InputSumProps_) {

  return (
      <TouchableOpacity
          style={forms.styles.textInputButton}
          onPress={async () => {
            onClick();
          }}
      >
          <Text style={typo.styles.textInputButtonText}>Sum</Text>
      </TouchableOpacity>
  );
}
