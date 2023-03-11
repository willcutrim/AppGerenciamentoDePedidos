import { Input as NativeBaseInput, FormControl } from "native-base";



export function Search(){
    return (
        <FormControl>
            <NativeBaseInput
                bg="#F0F0F0"
                h={42}
                w={286}
                borderWidth={1}
                fontSize={16}
                rounded={4}
                color="gray.700"
                placeholderTextColor="#969696"
                placeholder='Pesquisar'
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