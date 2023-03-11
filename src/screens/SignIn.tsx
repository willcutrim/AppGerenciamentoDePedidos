import { Box, Heading, ScrollView, VStack, useToast, Image } from "native-base";
import { Controller, useForm } from 'react-hook-form';

import { Input } from "../components/Input";
import { ButtonB } from "../components/Button";

import { useState } from "react";

import LogoSvg from '../assets/logo.png';

import { useAuth } from "../hooks/useAuth";
import { AppError } from "../utils/AppError";
import { storageAuthTokenGet } from "../storage/storageAuthToken";
import { storageUserGet } from "../storage/storageUser";


type FormDataProps = {
    username: string;
    password: string;
}


export function SignIn() {

    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>();
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const toast = useToast();

    async function handleDados (){
        try {
	        const dataToken = await storageAuthTokenGet();
	        const dataUser = await storageUserGet()
	
	        console.log(dataToken.token, dataUser.username);
        } catch (error) {
            return error
        }
    }
    async function handleSignIn({ username, password }: FormDataProps) {
        try {
            setIsLoading(true);
            await login(username, password);
            
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : "Não foi possivel entrar. Tente mais tarde";
            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            });
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    return (
        
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} bg="#265C4B">
            <VStack flex={1} px={10} alignItems='center' justifyContent='center'>

                <Box h="50%" w="100%" justifyContent='center' alignItems='center'>
                    <Image 
                        source={LogoSvg}
                        alt="Logo da marca"
                        resizeMode="contain"
                        position='absolute'
                    />
                </Box>
                <Box h="50%" w="100%">
                    <Controller
                        control={control}
                        name="username"
                        rules={{
                            required: 'Preencha este campo'
                        }}
                        render={({ field: { onChange } }) => (
                            <Input
                                placeholder="Usuário"
                                placeholderTextColor='gray.500'
                                onChangeText={onChange}
                                errorMessage={errors.username?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        rules={{
                            required: 'Preencha este campo'
                        }}
                        render={({ field: { onChange } }) => (
                            <Input
                                placeholder="Senha"
                                placeholderTextColor='gray.500'
                                secureTextEntry
                                onChangeText={onChange}
                                errorMessage={errors.password?.message}
                            />
                        )}
                    />

                    <ButtonB
                        title='Acessar'
                        largura="full"
                        altura={12}
                        onPress={handleSubmit(handleSignIn)}
                        isLoading={isLoading}
                    />

                </Box>
            </VStack>
        </ScrollView>

    );
}