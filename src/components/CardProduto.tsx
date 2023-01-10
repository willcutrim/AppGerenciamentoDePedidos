import { VStack, Image, Heading, Text, Button, useToast } from 'native-base';
import { ButtonB } from './Button';
import { ProdutoDTO } from '../dtos/ProdutosDTO'
import { api } from '../services/api';
import { useState } from 'react';

import uuid from "react-native-uuid"

import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { PEDIDOS_COLLETION } from '../storage/storageConfig';

const id = uuid.v4();
type Props = {
    data: ProdutoDTO;
    onpress?: () => void;
    
}


export function CardProduto({ data, onpress }: Props){
    const toast = useToast();
    const [submiteRegister, setSubmiteRegister] = useState(false);

    const { getItem, setItem } = useAsyncStorage(PEDIDOS_COLLETION);

    async function handleAddPedido(){
        const uid = uuid.v4();
        try {
            setSubmiteRegister(true);
            
            const newData ={
                uid,
                id: data.id,
                descricao_do_produto: data.descricao_do_produto,
                nome_do_produto: data.nome_do_produto,
                photo_do_produto: data.photo_do_produto,
                valor_do_produto: data.valor_do_produto,
                categoria: data.categoria
            }

            const response = await getItem();
            const rersponseData = response ? JSON.parse(response) : [];
            
            const dados = JSON.stringify([...rersponseData, newData])
            // console.log(newData);
            await setItem(dados);
            
            toast.show({
                title: `Produto adicionado`,
                placement: 'top',
                bgColor: 'green.500',
            })
            
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