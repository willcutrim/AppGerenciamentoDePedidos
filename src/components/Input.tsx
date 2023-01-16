import { Input as NativeBaseInput, FormControl, IInputProps} from "native-base";

type Props = IInputProps & {
    placeholder: string;
    errorMessage?: string | null;
};



export function Input({errorMessage = null, isInvalid, placeholder, ...rest }: Props){
    const invalid =  !!errorMessage || isInvalid;
    
    return (
        <FormControl mb={4} isInvalid={invalid}>
            <NativeBaseInput
                bg="gray.300"
                h={46}
                borderWidth={0}
                fontSize={16}
                color="gray.700"
                placeholderTextColor="gray.300"
                placeholder={placeholder}
                isInvalid={invalid}
                _focus={{
                    bg: "gray.3s00",
                    borderWidth: 1,
                    borderColor: "green.500"
                }}
                _invalid={{
                    borderWidth: 2,
                    borderColor: "red.500"
                }}
                {...rest}
            />
            <FormControl.ErrorMessage color="red.500">
                {errorMessage}
            </FormControl.ErrorMessage>
        </FormControl>
    );
}