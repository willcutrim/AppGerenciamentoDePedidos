import { FlatList, Heading, VStack, useToast } from 'native-base'
import { AppBar } from '../components/AppBar';
import { CardProduto } from '../components/CardProduto';
import React, { useEffect, useState } from 'react';
import { ProdutoDTO } from '../dtos/ProdutosDTO';
import { api } from '../services/api';
import { Loading } from '../components/Loading';

import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '../routes/app.routes';

export function Produtos(){
    const toast = useToast();

    const navigation = useNavigation<AppNavigatorRoutesProps>();

    const [produtos, setProdutos] = useState<ProdutoDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    async function handleNavigatio(){
        navigation.navigate('carrinho');
    }

    async function fetchProdutos(){
        try {
            setIsLoading(true);
            const response = await api.get('produtos/api-produtos/');
            setProdutos(response.data);
        } catch (error) {
            toast.show({
                title: 'deu merda',
                placement: 'top',
                bgColor: 'red.500',
            })
        } finally {
            setIsLoading(false);
        }
    }
    
    useEffect(() => {
        fetchProdutos();
    }, [])

    return (
        <VStack flex={1}>
            <AppBar
                title='Produtos'
                onpress={handleNavigatio}
            />

            { isLoading ? <Loading/> :
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
                _contentContainerStyle={{ paddingBottom: 20 }}
            />
            }
        </VStack>
    );
}