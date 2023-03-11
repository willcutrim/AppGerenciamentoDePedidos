import { Heading, Box, Icon, HStack, VStack } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons';

import { TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { UserDTO } from '../dtos/UserDTO';

import { useAuth } from '../hooks/useAuth';
import { Search } from './Search';

type Props = {
    title: string;
    icon: string;
    onpress: () => void;
}

export function AppBar({ title, icon, onpress }: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [userata, setUser] = useState<UserDTO>();
    const { signOut, user } = useAuth();

    async function logOut() {
        try {

            setIsLoading(true);

            await signOut();

        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    async function nameUser() {
        try {
            // const name = await storageUserGet();

            setUser(user);
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        nameUser();
    }, [])

    return (
        <VStack>
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
                justifyContent="space-between"
                safeArea
            >

                <TouchableOpacity onPress={onpress}>
                    <Icon
                        as={MaterialIcons}
                        name="logout"
                        color="#FFFFFF"
                        size={7}
                        onPress={logOut}
                    />
                </TouchableOpacity>

                <Heading color="white">{title}</Heading>

                <TouchableOpacity onPress={onpress}>
                    <Icon
                        as={MaterialIcons}
                        name={icon}
                        color="#FFFFFF"
                        size={7}
                    />
                </TouchableOpacity>
            </HStack>


            <Box position='absolute' top='105' left='63'>
                <Search />
            </Box>

        </VStack>
    );
}