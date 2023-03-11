import { Text, IPressableProps, Pressable } from "native-base";
import Hamburger from '../assets/hamburger.png';


type Props = IPressableProps & {
    categoria: string;
    isActive: boolean;
}

export function Categorias({ categoria, isActive, ...rest }: Props) {
    return (
        <Pressable
            
            h={10}
            m={1}
            p={2}
            bg={isActive ? '#265C4B' : '#D9D9D9'}
            rounded={16}
            justifyContent='center'
            alignItems='center'
            overflow="hidden"
            isPressed={isActive}
            borderWidth={1}
            borderColor='gray.500:alpha.50'
            _pressed={{
                borderColor: "gray.500",
                borderWidth: 1
            }}
            {...rest}
        >
            {/* <HStack justifyContent='center' alignItems='center' space={1}>
                <Box w={30} h={30} background='#FFFFFF' rounded={100} justifyContent='center'>
                    <Image
                        source={Hamburger}
                        alt='imagem da categoria'
                        h={4}
                        w={8}
                    />
                </Box>
            </HStack> */}
            <Text
                // color={isActive ? '#265C4B' : '#D9D9D9'}
                color={isActive ? '#D9D9D9' : '#265C4B'}
                textTransform="uppercase"
                fontSize='xs'
                fontWeight="bold"
            >
                {categoria}
            </Text>
        </Pressable>
    );
}