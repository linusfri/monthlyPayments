import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { forms, typo } from '../../styles';

type FormInputActionProps = {
  label: string,
  onClick: () => void
}

export default function FormInputAction({onClick, label}: FormInputActionProps) {

  return (
      <TouchableOpacity
          style={forms.styles.textInputButton}
          onPress={async () => {
            onClick();
          }}
      >
          <Text style={typo.styles.textInputButtonText}>{label}</Text>
      </TouchableOpacity>
  );
}
