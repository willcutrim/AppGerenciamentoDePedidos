import { VStack, Image, Heading, Text, Button, useToast } from 'native-base';
import { ButtonB } from './Button';
import { ProdutoDTO } from '../dtos/ProdutosDTO';
import { api } from '../services/api';
import { useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { PEDIDOS_COLLETION } from '../storage/storageConfig';
import { storagePedidoDelete } from '../storage/pedidos/pedidoDelete';
import { pedidoCreate } from '../storage/pedidos/pedidosCreate';

type Props = {
    data: ProdutoDTO;
    onpress?: () => void;
}


export function CardProduto({ data, onpress }: Props){
    const toast = useToast();
    const [pedido, setPedido] = useState<ProdutoDTO[]>([]);
    const [submiteRegister, setSubmiteRegister] = useState(false);

    async function handleAddPedido(){
        try {
            setSubmiteRegister(true);
            
            // const response = await api.post('pedidos/api-pedidos/', {
                
            // });
            
            const response = await AsyncStorage.getItem(PEDIDOS_COLLETION);
            const rersponseData = response ? JSON.parse(response) : [];
            
            const dados = JSON.stringify([...rersponseData, data])
            
            await AsyncStorage.setItem(PEDIDOS_COLLETION, dados);
            
            toast.show({
                title: `dicionado`,
                placement: 'top',
                bgColor: 'green.500',
                
            })
            
            console.log(dados);
        } catch (error) {

            toast.show({
                title: `${error}`,
                placement: 'top',
                bgColor: 'red.500',
            })
        }finally {
            setSubmiteRegister(false);
        }
    }

    return (
        
        <VStack alignItems='center' justifyContent="center" bg="#663399" mr={6} ml={6} mt={6} rounded={14}>
            <Image
                source={{ uri: `${api.defaults.baseURL}${data.photo_do_produto}` }}
                alt="Imagem do lanche"
                w={130}
                h={120}
                resizeMode="center"
                mt={2}
            />

            <Heading color="gray.200">{data.nome_do_produto}</Heading>
            <Heading color="gray.200">R$: {data.valor_do_produto}</Heading>

            <Text mb={6} color="gray.200">{data.descricao_do_produto}</Text>

            <ButtonB
                title='Adicionar'
                onPress={handleAddPedido}
                isLoading={submiteRegister}
                largura={32}
                altura={12}
            />
        </VStack>
        
    );
}