import { FlatList, VStack, Text, Center, Box, HStack, Heading, Select, CheckIcon, Input, useToast } from "native-base";


import { useEffect, useState } from "react";

import { ProdutoDTO } from "../dtos/ProdutosDTO";
import { CardPedido } from "../components/CardPedido";
import { Loading } from "../components/Loading";
import { PEDIDOS_COLLETION } from "../storage/storageConfig";
import { Controller, useForm } from 'react-hook-form';
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../routes/app.routes";
import { storagePedidoDelete } from "../storage/pedidos/pedidoDelete";
import { ButtonB } from "../components/Button";
import { LoadingSmall } from "../components/LoadingSmall";
import { api } from "../services/api";
import { useAuth } from '../hooks/useAuth';
import { AppBarDefault } from "../components/AppBarDefault";
import { InputNameClient } from "../components/InputNameClient";



export function Carrinho() {
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation<AppNavigatorRoutesProps>();
    const [pedido, setPedido] = useState<ProdutoDTO[]>([])
    const [valorTotal, setValorTotal] = useState<string>();
    const [mesa, setMesa] = useState('');
    const [name, setName] = useState("");
    const { user } = useAuth();
    const { getItem, setItem } = useAsyncStorage(PEDIDOS_COLLETION);

    async function finishRequest(name: string) {
        try {
            const data = {
                usuario: user.username,
                nome_do_cliente: name,
                valor_da_compra: valorTotal,
                pedidos: pedido.map((pedido) => pedido.id),
                numero_da_mesa: mesa
            }
            
            const response = await api.post('pedidos-create/', [data])
            
            if (response.status === 201) {
                cleanItems()
                toast.show({
                    title: 'Pedido feito com sucesso.',
                    placement: 'top',
                    bgColor: 'green.500',
                })
                handleNavigatio()
            } else {
                console.log('deu merda');
            }
        } catch (error) {
            console.log(error)
        }
        
    }


    async function calc() {
        try {
            setIsLoading(true)
            const storage = await getItem();
            const pedidos = storage ? JSON.parse(storage) : [];
            let sum = 0;
            for (const key in pedidos) {

                sum += Number(pedidos[key]['valor_do_produto']);
                
            }
            const valor = sum.toFixed(2)
            setValorTotal(valor)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    async function cleanItems() {
        try {
            setIsLoading(true);
            await storagePedidoDelete();
            const response = await getItem();
            const previousData = response ? JSON.parse(response) : [];

            setPedido(previousData);

        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    }
    async function handleRemoveItem(uid: string) {
        try {
            setIsLoading(true);


            const response = await getItem();
            const previousData = response ? JSON.parse(response) : [];

            const data = previousData.filter((item: ProdutoDTO) => item.uid !== uid);
            setItem(JSON.stringify(data));
            setPedido(data);
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }

    }
    function handleName(name: string) {
        setName(name)
        console.log(name, mesa);
    }
    async function handleNavigatio() {
        navigation.goBack();
    }

    async function fetchItems() {
        try {
            setIsLoading(true);

            const storage = await getItem();

            const pedidos = storage ? JSON.parse(storage) : [];

            setPedido(pedidos);
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        calc();
    }, [pedido])

    useEffect(() => {
        fetchItems();
    }, [])

    return (
        <VStack flex={1}>
            <AppBarDefault title="Carrinho" onpress={handleNavigatio} icon="arrow-back"/>
            {
                isLoading ? <Loading /> :
                    <FlatList
                        data={pedido}
                        keyExtractor={item => item.uid}
                        renderItem={({ item }) => (
                            <CardPedido
                                data={item}
                                onpress={() => handleRemoveItem(item.uid)}
                            />
                        )}
                        ListEmptyComponent={() => (
                            <Center flex={1}>
                                <Text color="black" textAlign="center" >
                                    Não há pedidos
                                </Text>
                            </Center>
                        )}
                        _contentContainerStyle={{ paddingBottom: 8 }}
                    />
            }
                    
            <HStack justifyContent="space-around" alignItems='center' h={110} w="full" bg='#D9D9D9' mb={1} mt={1}>
                <VStack>
                    <Input
                        onChangeText={setName}
                        bg="#F0F0F0"
                        h={42}
                        w={122}
                        borderWidth={1}
                        fontSize={12}
                        rounded={4}
                        color="gray.700"
                        placeholderTextColor="#969696"
                        placeholder='Nome'
                        _focus={{
                            bg: "gray.3s00",
                            borderWidth: 1,
                            borderColor: "green.500"
                        }}
                        _invalid={{
                            borderWidth: 2,
                            borderColor: "red.500"
                        }}
                    />
                    <Select 
                        selectedValue={mesa} 
                        minWidth="100"
                        accessibilityLabel="Mesa" 
                        placeholder="Mesa"
                        borderWidth={1}
                        borderColor='gray.500'
                        bg="#D9D9D9"
                        _selectedItem={{
                            bg: 'teal.100',
                            endIcon: <CheckIcon size="5"/>
                        }} mt={1} onValueChange={itemValue => setMesa(itemValue)}>
                        
                        <Select.Item label="Mesa 1" value='1' />
                        <Select.Item label="Mesa 2" value='2' />
                        <Select.Item label="Mesa 3" value='3' />
                        <Select.Item label="Mesa 4" value='4' />
                        <Select.Item label="Mesa 5" value='5' />
                        <Select.Item label="Mesa 6" value='6' />
                        <Select.Item label="Mesa 7" value='7' />
                    </Select>
                </VStack>
                {isLoading ? <LoadingSmall /> :
                    <Text fontWeight="bold" fontSize={18}>TOTAL: {valorTotal}</Text>
                }
            </HStack>
            <Box mr={5} ml={5}>
                <ButtonB
                    title="Fechar pedido"
                    onPress={() => finishRequest(name)}
                    largura="full"
                    altura={12}
                />
            </Box>
        </VStack>

    );
}