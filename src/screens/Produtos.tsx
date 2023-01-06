import { FlatList, Heading, VStack, useToast } from 'native-base'
import { ProdutosAppBar } from '../components/AppBar';
import { CardProduto } from '../components/CardProduto';
import { useEffect, useState } from 'react';
import { ProdutoDTO } from '../dtos/ProdutosDTO';
import { api } from '../services/api';

export function Produtos(){
    const toast = useToast();

    const [produtos, setProdutos] = useState<ProdutoDTO[]>([]);
    const [] = useState();

    async function fetchProdutos(){
        try {
            const response = await api.get('produtos/api-produtos/');
            setProdutos(response.data);
        } catch (error) {
            toast.show({
                title: 'deu merda',
                placement: 'top',
                bgColor: 'red.500',
            })
        }
    }
    useEffect(() => {
        fetchProdutos();
    }, [])

    return (
        <VStack flex={1}>
            <ProdutosAppBar
                title='Produtos'
            />

            <FlatList
                data={produtos}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <CardProduto
                        data={item}
                    />
                    
                )}
                ListEmptyComponent={(
                    <Heading flex={1} justifyContent="center" alignItems='center'>
                        Vazio
                    </Heading>
                )}
            />
        </VStack>
    );
}