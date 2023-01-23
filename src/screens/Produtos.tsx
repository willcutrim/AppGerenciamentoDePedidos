import { Box, FlatList, Heading, VStack, useToast } from 'native-base'
import { AppBar } from '../components/AppBar';
import { CardProduto } from '../components/CardProduto';
import React, { useEffect, useState } from 'react';
import { ProdutoDTO } from '../dtos/ProdutosDTO';
import { api } from '../services/api';
import { Loading } from '../components/Loading';

import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '../routes/app.routes';
import { storageAuthTokenGet } from '../storage/storageAuthToken';
import { TokensDTO } from '../dtos/TokensDTO';
import { useAuth } from '../hooks/useAuth';

export function Produtos(){
    const toast = useToast();

    const navigation = useNavigation<AppNavigatorRoutesProps>();
    
    const [produtos, setProdutos] = useState<ProdutoDTO[]>([]);
    const { tokens } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    function handleNavigatio(){
        navigation.navigate('carrinho');
    }
    
    async function fetchProdutos(){
        try {
            setIsLoading(true);            

            let config = {
                headers:{
                    'Authorization': `Bearer ${tokens?.token}`
                }
            }
            const { data } = await api.get('produtos/api-produtos/', config);
            setProdutos(data);
            
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
                icon="shopping-cart"
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
                    <Box flex={1} alignItems="center" mt={8}>
                        <Heading>
                            Vazio
                        </Heading>
                    </Box>
                )}
                _contentContainerStyle={{ paddingBottom: 20 }}
                
            />
            }
        </VStack>
    );
}