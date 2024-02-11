import { Text, TextInput, View} from 'react-native';
import { TextInputProps } from 'react-native';

import { forms, typo } from '../../styles/index';
import FormInputAction from './FormInputAction';
import { Controller, Control, RegisterOptions, FieldValues } from 'react-hook-form';

type FormTextInputProps = {
    name: string,
    label: string,
    control: Control<FieldValues>,
    placeholder?: string,
    rules?: Omit<RegisterOptions<any, string>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'> | undefined,
    action?: () => void | Promise<void>,
    extStateUpdate?: (fieldVal: string) => void | Promise<void>
} & Partial<TextInputProps>

export default function FormTextInput(
    {
        name,
        label,
        control,
        placeholder,
        rules,
        action, 
        extStateUpdate,
        ...props
    }: FormTextInputProps
) {
    return (
        <Controller        
            control={control}
            name={name}
            rules={rules ? rules : {}}
            render={({field: {onChange, value, onBlur}}) => (
            <>
                {
                    label ? <Text style={typo.styles.label}>{label}</Text> :
                    null
                }  
                <View style={forms.styles.inputContainer}>
                    <TextInput
                        style={forms.styles.input}
                        placeholder={placeholder}           
                        value={value}            
                        onBlur={onBlur}
                        onChangeText={value => {
                            onChange(value);

                            if (extStateUpdate) {
                                extStateUpdate(value);
                            }
                        }}
                        {...props}
                    />
                    {action && <FormInputAction onClick={action} label='Sum'/>}
                </View>
            </>
        )} 
      />    
    );
}