import { Heading, VStack, Text, Image, HStack, Box, Icon } from "native-base";
import { TouchableOpacity } from 'react-native';
import { ProdutoDTO } from "../dtos/ProdutosDTO";
import { api } from "../services/api";
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
    data: ProdutoDTO;
    onpress?: () => void;
    isLoading?: boolean;
}


export function CardPedido({ data, onpress, isLoading }: Props) {

    return (

        <VStack justifyContent="center" bg="#D9D9D9" mr={4} ml={4} mb={4} rounded={7} h={90} shadow="2">
            <HStack>
                <Box bg="#663399" m={15} shadow="5" borderRadius={5} h={75} w={75} justifyContent="center" alignItems="center">
                    <Image
                        source={{ uri: `${api.defaults.baseURL}${data.photo_do_produto}` }}
                        alt="Imagem do lanche"
                        w={65}
                        h={60}
                        resizeMode="center"
                        mt={2}
                        mb={2}
                    />
                </Box>
                <VStack justifyContent="center">
                    <Heading color="#3E3E3E" >{data.nome_do_produto}</Heading>
                    <Text color="#3E3E3E">{data.descricao_do_produto}</Text>
                    <Text color="#3E3E3E">Valor Uni. {data.valor_do_produto}</Text>
                </VStack>

                <Box flex={1} justifyContent="center" alignItems='flex-end' mr={4}>
                    <TouchableOpacity onPress={onpress}>
                        <Icon
                            as={MaterialIcons}
                            name="delete"
                            color="#DC3737"
                            size={7}
                            onPress={onpress}
                        />
                    </TouchableOpacity>
                </Box>
            </HStack>
        </VStack>
    );
}