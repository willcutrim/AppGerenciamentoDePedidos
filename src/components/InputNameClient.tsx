import { Input as NativeBaseInput, FormControl } from "native-base";

type ValueInputProps = {
    name?: string
}

export function InputNameClient({ name }: ValueInputProps){
    return (
        <FormControl>
            <NativeBaseInput
                value={name}
                bg="#F0F0F0"
                h={42}
                w={122}
                borderWidth={1}
                fontSize={12}
                rounded={4}
                color="gray.700"
                placeholderTextColor="#969696"
                placeholder='Nome'
                _focus={{
                    bg: "gray.3s00",
                    borderWidth: 1,
                    borderColor: "green.500"
                }}
                _invalid={{
                    borderWidth: 2,
                    borderColor: "red.500"
                }}
            
            />
        </FormControl>
    );
}