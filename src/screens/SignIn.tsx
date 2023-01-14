import { Box, Center, Heading, ScrollView, VStack } from "native-base";
import { Input } from "../components/Input";
import { ButtonB } from "../components/Button";


export function SignIn(){
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} bg="#663399">
            <VStack flex={1} px={10} alignItems='center' justifyContent='center'>

                <Box h="50%" w="100%" justifyContent='center' alignItems='center'>
                    <Heading color="white">
                        Merenda Boa
                    </Heading>
                </Box>
                <Box h="50%" w="100%">
                    <Input
                        placeholder="Usuário"
                        placeholderTextColor='gray.500'
                        />
                    <Input
                        placeholder="Senha"
                        placeholderTextColor='gray.500'
                        secureTextEntry
                        />
                    <ButtonB
                        title='Acessar'
                        largura="full"
                        altura={12}
                    />
                </Box>
            </VStack>
        </ScrollView>
    );
}