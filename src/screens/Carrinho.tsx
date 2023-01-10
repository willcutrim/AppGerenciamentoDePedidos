import { FlatList, VStack, Text, Center, SectionList, Box } from "native-base";
import { AppBar } from "../components/AppBar";
import { CardProduto } from "../components/CardProduto";
import { useEffect, useState } from "react";
import { pedidosGetAll } from "../storage/pedidos/pedidosGetAll";
import { ProdutoDTO } from "../dtos/ProdutosDTO";
import { CardPedido } from "../components/CardPedido";
import { Loading } from "../components/Loading";
import { PEDIDOS_COLLETION } from "../storage/storageConfig";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../routes/app.routes";
import { storagePedidoDelete } from "../storage/pedidos/pedidoDelete";
import { ButtonB } from "../components/Button";


export function Carrinho(){

    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation<AppNavigatorRoutesProps>();
    const [pedido, setPedido] = useState<ProdutoDTO[]>([])

    async function cleanItems(){
        try {
            await storagePedidoDelete();

        } catch (error) {
            throw error;
        }
    }

    function setItemId(){
        console.log(pedido);
    }
    

    async function handleNavigatio(){
        navigation.goBack();
    }

    async function fetchItems(){
        try {
            setIsLoading(true);
            
            const storage =  await AsyncStorage.getItem(PEDIDOS_COLLETION);

            const pedidos = storage ? JSON.parse(storage) : [];

            setPedido(pedidos);
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchItems();
    }, [])

    return (
        <VStack flex={1}>
            <AppBar title="Carrinho" onpress={handleNavigatio}/>
            {
            isLoading ? <Loading/> :
            
            
            <FlatList
                mb={2}
                data={pedido}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <CardPedido
                        data={item}
                        produtoId={item.id}
                        onpress={setItemId}
                    />
                    )}
                    ListEmptyComponent={() => (
                        <Center flex={1}>
                            <Text color="black" textAlign="center" >
                                Não há pedidos
                            </Text>
                        </Center>
                      )}
            />
        }
        <Box alignItems="center">
            <ButtonB
                title="Limpar"
                onPress={cleanItems}
                largura="full"
                altura={12}
            />
        </Box>
        </VStack>
        
    );    
}