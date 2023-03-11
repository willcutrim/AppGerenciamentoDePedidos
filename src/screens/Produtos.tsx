import { Box, Center, FlatList, HStack, Heading, VStack, useToast } from 'native-base'
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
import { Categorias } from '../components/Categorias';

export function Produtos() {
    const toast = useToast();
    const columns = 2;
    const navigation = useNavigation<AppNavigatorRoutesProps>();

    const [produtos, setProdutos] = useState<ProdutoDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoria, setCategoria] = useState([])
    const [categoriaSelected, setCategoriaSelected] = useState(1)

    async function handleCategoriaSelected(){
        try {
            setIsLoading(true)
            const response = await api.get(`produtos/api-produtos/bycategoria/${categoriaSelected}`)
            
            setProdutos(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    async function fetchCategoria() {
        try {
            const response = await api.get('produtos/api-categoria')
            setCategoria(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    function handleNavigatio() {
        navigation.navigate('carrinho');
    }

    async function fetchProdutos() {
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

    useEffect(() => {
        fetchCategoria();
    }, [])

    useFocusEffect(useCallback(() => {
        handleCategoriaSelected();
    }, [categoriaSelected]));



    return (
        <VStack flex={1}>
            <AppBar
                title='Produtos'
                onpress={handleNavigatio}
                icon="shopping-cart"
            />
            <Box mt={4} p={2}>
                <Heading>Categorias</Heading>
                <FlatList
                    data={categoria}
                    keyExtractor={item => item['id']}
                    renderItem={({ item }) => (
                        <Categorias
                            isActive={categoriaSelected === item['id']}
                            categoria={item['nome_da_categoria']}
                            onPress={() => setCategoriaSelected(item['id'])}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    minH={12}
                    maxH={20}
                />
            </Box>
            {isLoading ? <Loading /> :
                <FlatList
                    data={produtos}
                    keyExtractor={item => item.id}
                    numColumns={columns}
                    renderItem={({ item }) => (
                        <HStack flex={1} justifyContent='center'>
                            <CardProduto
                                data={item}
                            />
                        </HStack>
                    )}
                    horizontal={false}
                    ListEmptyComponent={(
                        <Box flex={1} alignItems="center" mt={8}>
                            <Heading>
                                Vazio
                            </Heading>
                        </Box>
                    )}
                    showsHorizontalScrollIndicator={false}
                    _contentContainerStyle={{ paddingBottom: 16 }}


                />
            }
        </VStack>
    );
}