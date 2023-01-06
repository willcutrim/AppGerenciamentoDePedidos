import { Heading, Box } from 'native-base'

type Props = {
    title: string;
}

export function ProdutosAppBar({ title}: Props){
    return (
        <Box 
            bg="#663399" 
            pt={6} 
            pb={5} 
            px={8} 
            alignItems="center" 
            justifyContent="center" 
            safeArea
        >
            <Heading color="white">{title}</Heading>
        </Box>
    );
}