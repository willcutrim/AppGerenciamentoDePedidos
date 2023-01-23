import { Heading, Box, Icon, HStack } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons';

import { TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { storageUserGet } from '../storage/storageUser';
import { UserDTO } from '../dtos/UserDTO';

import { useAuth } from '../hooks/useAuth';

type Props = {
    title: string;
    icon: string;
    onpress: () => void;
}

export function AppBar({ title, icon ,onpress }: Props){
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<UserDTO>();
    const { signOut } = useAuth();

    async function logOut(){
        try {

            setIsLoading(true);

            await signOut();
            
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    async function nameUser(){
        try {
	        const name = await storageUserGet();

            setUser(name);
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        nameUser();
    }, [])

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
            <TouchableOpacity onPress={onpress}>
                <Icon
                    as={MaterialIcons}
                    name="logout"
                    color="#FFFFFF"
                    size={7}
                    onPress={logOut}
                />
            </TouchableOpacity>

            <Heading color="white">{title} - {user?.username}</Heading>

            <TouchableOpacity onPress={onpress}>
                <Icon
                as={MaterialIcons}
                name={icon}
                color="#FFFFFF"
                size={7}
                />
            </TouchableOpacity>
        </HStack>
    );
}