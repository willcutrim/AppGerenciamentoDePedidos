import { Heading, Box, Icon, HStack } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons';

import { TouchableOpacity } from 'react-native';

type Props = {
    title: string;
    onpress: () => void;
}

export function AppBar({ title, onpress }: Props){
    return (
        <HStack 
            bg="#663399" 
            pt={6} 
            pb={5} 
            px={8} 
            alignItems="center" 
            justifyContent="space-between"
            safeArea
        >
            <Heading color="white">{title}</Heading>

            <TouchableOpacity onPress={onpress}>
                <Icon
                as={MaterialIcons}
                name="shopping-cart"
                color="#FFFFFF"
                size={7}
                />
            </TouchableOpacity>
        </HStack>
    );
}