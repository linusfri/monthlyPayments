import {Text, TextInput, View} from 'react-native';

import { forms, typo } from '../../styles/index';
import InputSum from '../shared/InputSum';
import {Controller, Control, RegisterOptions} from 'react-hook-form';

type FormTextInputProps = {
    name: string,
    label: string,
    placeholder: string,
    rules?: Omit<RegisterOptions<any, string>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'> | undefined,
    control: Control<any>,
    action?: () => void | Promise<void>
}

export default function FormTextInput({name, label, placeholder, rules, control, action}: FormTextInputProps) {
    return (
        <Controller        
         control={control}        
         name={name}
         rules={rules ? rules : {}}  
         render={({field: {onChange, value, onBlur}}) => (
            <>
                {
                    label ? <Text style={typo.styles.label}>{label}</Text> :
                    <Text style={typo.styles.label}>Person name</Text>
                }  
                <View style={forms.styles.inputContainer}>
                    <TextInput
                        style={forms.styles.input}
                        placeholder={placeholder}           
                        value={value}            
                        onBlur={onBlur}            
                        onChangeText={value => onChange(value)}          
                    />
                    {action && <InputSum onClick={action}/>}
                </View>
            </>
        )} 
      />    
    );
}