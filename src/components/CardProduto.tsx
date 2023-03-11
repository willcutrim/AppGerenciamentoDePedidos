import { VStack, Image, Heading, Text, Button, useToast, HStack, Box, Icon } from 'native-base';
import { ProdutoDTO } from '../dtos/ProdutosDTO'
import { api } from '../services/api';
import { MaterialIcons } from '@expo/vector-icons';
import uuid from "react-native-uuid"
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { PEDIDOS_COLLETION } from '../storage/storageConfig';



const id = uuid.v4();
type Props = {
    data: ProdutoDTO;
    onpress?: () => void;

}


export function CardProduto({ data, onpress }: Props) {
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

        
        <VStack bg="#D9D9D9:alpha.50" mt={13} pt={2} w='176' h='210' rounded="md" alignItems='center' borderWidth={1} borderColor='#D9D9D9'>
            <Box h='110' p={4} bg="#007566" rounded='md' alignItems='center' justifyContent='center'>
                <Image
                    source={{ uri: `${api.defaults.baseURL}${data.photo_do_produto}` }}
                    alt="hamburger"
                    h={90}
                    w={115}
                />
            </Box>

            <VStack flex={1} justifyContent='space-evenly'>
                <Box>
                    <Heading fontSize={20} lineHeight={24}>{data.nome_do_produto}</Heading>
                    <Heading fontSize={14} color='#969696' lineHeight={17}>{data.descricao_do_produto}</Heading>
                </Box>

                <HStack justifyContent='space-around' alignItems='center' w={140}>
                    <Box flex={1}>

                        <Heading fontSize={14} lineHeight={17} fontWeight='700'>R$ {data.valor_do_produto}</Heading>
                    </Box>
                    <TouchableOpacity onPress={handleAddPedido}>
                        <Icon
                            as={MaterialIcons}
                            name="add-circle"
                            color="#265C4B"
                            size={7}
                            onPress={handleAddPedido}
                        />
                        
                    </TouchableOpacity>
                </HStack>
            </VStack>
        </VStack>
        


        /* <Image
            source={{ uri: `${api.defaults.baseURL}${data.photo_do_produto}` }}
            alt="Imagem do lanche"
            w={130}
            h={120}
            resizeMode="center"
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
        /> */


    );
}