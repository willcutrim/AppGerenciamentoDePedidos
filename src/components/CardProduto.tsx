import { VStack, Image, Heading, Text, Button, useToast } from 'native-base';
import { ButtonB } from './Button';
import { ProdutoDTO } from '../dtos/ProdutosDTO';
import { api } from '../services/api';
import { useState } from 'react';
import { pedidoCreate } from '../storage/pedidos/pedidosCreate';
import { pedidosGetAll } from '../storage/pedidos/pedidosGetAll';

type Props = {
    data: ProdutoDTO;
    produtoId: string;
}


export function CardProduto({ data, produtoId }: Props){
    const toast = useToast();
    const [pedido, setPedido] = useState<ProdutoDTO[]>([data]);
    const [submiteRegister, setSubmiteRegister] = useState(false);

    async function handleAddPedido(){
        try {
            setSubmiteRegister(true);
            
            // const response = await api.post('pedidos/api-pedidos/', {
                
            // });
            // toast.show({
            //     title: `${id.nome_do_produto} adicionado`,
            //     placement: 'top',
            //     bgColor: 'green.500',
            // })
            
            // await pedidoCreate(data.nome_do_produto);
            const pedidos = await pedidosGetAll();
            console.log(pedidos);
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
        
        <VStack alignItems='center' bg="#663399" m={6} rounded={14}>
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
            />
        </VStack>
        
    );
}