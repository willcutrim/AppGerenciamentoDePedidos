import { Heading, VStack,Text } from "native-base";
import { ButtonB } from "./Button";
import { ProdutoDTO } from "../dtos/ProdutosDTO";


type Props = {
    data: ProdutoDTO;
    produtoId?: string | any;
    onpress?: () => void;
}


export function CardPedido({data, produtoId, onpress}: Props){
    // async function handleItem(){
    //     console.log(`dados: ${data}`);
    // }

    // useEffect(() => {
    //     handleItem();
    // }, [])
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
                />
            </VStack>
        </VStack>
    );
}