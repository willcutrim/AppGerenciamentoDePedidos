import { VStack, HStack, Heading } from 'native-base'


export function ProdutosAppBar(){
    return (
        <HStack bg="#663399" pt={6} mt={6} pb={5} px={8} alignItems="center" justifyContent="center" safeArea>
            <Heading color="white">AppBar</Heading>
        </HStack>
    );
}