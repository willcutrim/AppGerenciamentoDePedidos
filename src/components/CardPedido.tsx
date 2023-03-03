import { Heading, VStack, Text, Image } from "native-base";
import { ButtonB } from "./Button";
import { ProdutoDTO } from "../dtos/ProdutosDTO";
import { api } from "../services/api";


type Props = {
    data: ProdutoDTO;
    onpress?: () => void;
    isLoading?: boolean;
}


export function CardPedido({data, onpress, isLoading}: Props){
    
    return (
        
        <VStack alignItems='center' justifyContent="center" bg="#663399" mr={6} ml={6} mt={6} rounded={14}>
            <VStack alignItems='center' justifyContent="center" m={6}>
                <Image
                    source={{ uri: `${api.defaults.baseURL}${data.photo_do_produto}` }}
                    alt="Imagem do lanche"
                    w={130}
                    h={120}
                    resizeMode="center"
                    mt={2}
                />
                <Heading color="gray.200">{data.nome_do_produto}</Heading>
                <Text color="gray.200">{data.descricao_do_produto}</Text>
                <ButtonB
                    title='deletar'
                    onPress={onpress}
                    largura={32}
                    altura={12}
                    isLoading={isLoading}
                />
            </VStack>
        </VStack>
    );
}