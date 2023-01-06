import { VStack, Image, Heading, Text, Button } from 'native-base';
import { ButtonB } from './Button';
import { ProdutoDTO } from '../dtos/ProdutosDTO';
import { api } from '../services/api';

type Props = {
    data: ProdutoDTO;
}

export function CardProduto({ data}: Props){
    return (
        
        <VStack alignItems='center' bg="#663399" m={6} rounded={14}>
            <Image
                source={{ uri: `${api.defaults.baseURL}${data.photo_do_produto}` }}
                alt="Imagem do lanche"
                w={120}
                h={120}
                resizeMode="center"
            />

            <Heading color="gray.200">{data.nome_do_produto}</Heading>
            <Heading color="gray.200">R$: {data.valor_do_produto}</Heading>

            <Text mb={6} color="gray.200">{data.descricao_do_produto}</Text>

            <ButtonB
                title='Adicionar'
            />
        </VStack>
        
    );
}