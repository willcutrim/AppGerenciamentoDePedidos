import { Button as ButtonNativeBase, IButtonProps, Text } from 'native-base';

type Props = IButtonProps &{
    title: string,
    variant?: "solid" | "outline",
    altura: number,
    largura?: number | "full"
}


export function ButtonB({title, altura, largura, variant = "solid", ...rest}: Props){
    return(
        <ButtonNativeBase
            
            w={largura}
            h={altura} 
            bg={ variant === "outline" ? "transparent" : "green.700" }
            borderWidth={ variant === "outline" ? 1 : 0}
            borderColor="green.500"
            rounded={8}
            _pressed={{
                bg: variant === "outline" ? "gray.500" : "green.500"
            }}
            mb={1}
            {...rest}
        >

            <Text 
                color={ variant === "outline" ? "green.500" : "white" } 
                fontFamily="heading" 
                fontSize="sm"
            >
                {title}
            </Text>
        </ButtonNativeBase>
    );
}