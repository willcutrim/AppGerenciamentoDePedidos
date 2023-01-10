import { Heading, VStack,Text } from "native-base";
import { ButtonB } from "./Button";
import { ProdutoDTO } from "../dtos/ProdutosDTO";
import{ useAsyncStorage } from "@react-native-async-storage/async-storage";
import { PEDIDOS_COLLETION } from "../storage/storageConfig";
import { useState } from "react";


type Props = {
    data: ProdutoDTO;
    onpress?: () => void;
    isLoading?: boolean;
}


export function CardPedido({data, onpress, isLoading}: Props){
    
    return (
        
        <VStack alignItems='center' justifyContent="center" bg="#663399" mr={6} ml={6} mt={6} rounded={14}>
            <VStack alignItems='center' justifyContent="center" m={6}>
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