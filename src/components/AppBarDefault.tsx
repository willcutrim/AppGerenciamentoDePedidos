import { Box, Center, HStack, Heading, Icon, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
    title: string;
    icon: string;
    onpress: () => void;
}

export function AppBarDefault({ title, icon, onpress }: Props) {
    return (

        <HStack
            bg="#265C4B"
            h={124}
            borderBottomRightRadius={14}
            borderBottomLeftRadius={14}
            shadow='5'
            pt={6}
            pb={5}
            px={8}
            mb={4}
            alignItems="center"
            
            safeArea
        >
           <Box>
                <TouchableOpacity onPress={onpress}>
                    <Icon
                        as={MaterialIcons}
                        name={icon}
                        color="#FFFFFF"
                        size={7}
                    />
                </TouchableOpacity>
            </Box> 
            {/* GAMBIARRA MALUCA PARA CENTRALIZAR O TITULO E DEIXAR O ICON ENCOSTADO NA ESQUERDA KKKKKKK*/}
            
            <Box flex={1}>

            </Box>

            <Heading color="white">{title}</Heading>

            <Box flex={1}>

            </Box>

            

        </HStack>


    )
}