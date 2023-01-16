import { Box, Center, Heading, ScrollView, VStack, useToast } from "native-base";
import { Controller, useForm } from 'react-hook-form';

import { Input } from "../components/Input";
import { ButtonB } from "../components/Button";
import { api } from "../services/api";
import { useState } from "react";
import { storageUserSave } from "../storage/storageUser";

type FormDataProps = {
    username: string;
    password: string;
}



export function SignIn(){

    const { control, handleSubmit, formState: {errors} } = useForm<FormDataProps>();
    const [isLoading, setIsLoading ] = useState(false);
    const toast = useToast();

    async function handleSignIn({ username, password }: FormDataProps){
        
        try {
            setIsLoading(true);
            const { data } = await api.post('usuario/api-login/', 
            { 
                username, password 
            });

            if(data.message === "Usuário ou senha inválida."){
                toast.show({
                    title: data.message,
                    placement: "top",
                    bgColor: 'red.500'
                })
            } else {
                await storageUserSave(data.username);
            }
            
        } catch (error) {
            throw error
        }finally {
            setIsLoading(false);
        }
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} bg="#663399">
            <VStack flex={1} px={10} alignItems='center' justifyContent='center'>

                <Box h="50%" w="100%" justifyContent='center' alignItems='center'>
                    <Heading color="white">
                        Merenda Boa
                    </Heading>
                </Box>
                <Box h="50%" w="100%">
                    <Controller
                        control={control}
                        name="username"
                        rules={{
                            required: 'Preencha este campo'
                        }}
                        render={({ field: { onChange } }) =>(
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
                        render={({ field: { onChange } }) =>(
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