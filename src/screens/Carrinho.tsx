import { FlatList, VStack, Text, Center, Box, HStack, Heading } from "native-base";
import { AppBar } from "../components/AppBar";

import { useEffect, useState } from "react";

import { ProdutoDTO } from "../dtos/ProdutosDTO";
import { CardPedido } from "../components/CardPedido";
import { Loading } from "../components/Loading";
import { PEDIDOS_COLLETION } from "../storage/storageConfig";

import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../routes/app.routes";
import { storagePedidoDelete } from "../storage/pedidos/pedidoDelete";
import { ButtonB } from "../components/Button";
import { LoadingSmall } from "../components/LoadingSmall";
import { api } from "../services/api";
import { useAuth } from '../hooks/useAuth';



export function Carrinho() {

    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation<AppNavigatorRoutesProps>();
    const [pedido, setPedido] = useState<ProdutoDTO[]>([])
    const [valorTotal, setValorTotal] = useState<string>();
    const { user } = useAuth();
    const { getItem, setItem } = useAsyncStorage(PEDIDOS_COLLETION);

    async function finishRequest() {
        try {
            const data = {
                usuario: user.username,
                nome_do_cliente: "gabigol",
                valor_da_compra: valorTotal,
                pedidos: pedido.map((pedido) => pedido.id),
                numero_da_mesa: [
                    3
                ]
            }
            
            const response = await api.post('pedidos-create/', [data])
            
            if (response.status === 201) {
                cleanItems()
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
                // console.log(typeof Number(pedidos[key]['valor_do_produto']))
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
            <AppBar title="Carrinho" onpress={handleNavigatio} icon="arrow-back" />
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
            <HStack justifyContent="space-around" alignItems='center' h={100} w="full" bg="#D9D9D9" mb={4} mt={2}>
                <Text fontWeight="bold" fontSize={18}>MESA 3</Text>
                {isLoading ? <LoadingSmall /> :
                    <Text fontWeight="bold" fontSize={18}>TOTAL: {valorTotal}</Text>
                }
            </HStack>
            <Box mr={5} ml={5}>
                <ButtonB
                    title="Fechar pedido"
                    onPress={finishRequest}
                    largura="full"
                    altura={12}

                />
            </Box>
        </VStack>

    );
}