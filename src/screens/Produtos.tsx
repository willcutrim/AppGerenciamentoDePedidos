import { Box, FlatList, Heading, VStack, useToast } from 'native-base'
import { AppBar } from '../components/AppBar';
import { CardProduto } from '../components/CardProduto';
import React, { useCallback, useEffect, useState } from 'react';
import { ProdutoDTO } from '../dtos/ProdutosDTO';
import { api } from '../services/api';
import { Loading } from '../components/Loading';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '../routes/app.routes';

import { useAuth } from '../hooks/useAuth';
import { AppError } from '../utils/AppError';
import { TokensDTO } from '../dtos/TokensDTO';

export function Produtos(){
    const toast = useToast();

    const navigation = useNavigation<AppNavigatorRoutesProps>();
    
    const [produtos, setProdutos] = useState<ProdutoDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);


    function handleNavigatio(){
        navigation.navigate('carrinho');
    }
   
    async function fetchProdutos(){
        try {
            setIsLoading(true);

            const { data } = await api.get('produtos/api-produtos/');

            setProdutos(data);
        } catch (error) {
            
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi pissivel caregar os produtos.'
            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500',
            })

        
        } finally {
            setIsLoading(false);
        }
    }

    useFocusEffect(useCallback(() => {
        fetchProdutos();
    }, []));
    

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