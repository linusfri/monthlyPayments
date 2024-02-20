import { Text, TextInput, View} from 'react-native';
import { TextInputProps } from 'react-native';

import { forms, typo } from '../../styles/index';
import FormInputAction from './FormInputAction';
import { Controller, Control, RegisterOptions, FieldValues, FieldErrors } from 'react-hook-form';

type FormTextInputProps = {
    name: string,
    label: string,
    control: Control<FieldValues>,
    errors?: FieldErrors<FieldValues>,
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
        errors,
        placeholder,
        rules,
        action, 
        extStateUpdate,
        ...props
    }: FormTextInputProps
) {
    function e(): boolean {
        if (errors == null) return false;

        return Object.keys(errors).includes(name);
    }

    function e_message(): string {
        if (errors == null) return '';

        const fieldName = Object.keys(errors).find((field) => {
            return field == name;
        });

        if (fieldName == null) return '';
    
        return errors[fieldName]?.message as string;
    }

    return (
        <Controller        
            control={control}
            name={name}
            rules={rules ? rules : {}}
            render={({field: {onChange, value}}) => (
            <>
                {
                    label ? <Text style={typo.styles.label}>{label}</Text> :
                    null
                }  
                <View style={forms.styles.inputContainer}>
                    <TextInput
                        style={[forms.styles.input, e() && forms.styles.error]}
                        placeholder={e() ? e_message() : placeholder}           
                        value={value}            
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