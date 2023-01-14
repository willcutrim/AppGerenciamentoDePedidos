import { Input as NativeBaseInput, FormControl, IInputProps} from "native-base";

type Props = IInputProps & {
    placeholder: string;
};



export function Input({ placeholder, ...rest }: Props){
    return (
        <FormControl mb={4}>
            <NativeBaseInput
                bg="gray.300"
                h={46}
                borderWidth={0}
                fontSize={16}
                color="gray.700"
                placeholderTextColor="gray.300"
                placeholder={placeholder}
                _focus={{
                    bg: "gray.3s00",
                    borderWidth: 1,
                    borderColor: "green.500"
                }}
                {...rest}
            />
        </FormControl>
    );
}