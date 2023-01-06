import { Button as ButtonNativeBase, IButtonProps, Text } from 'native-base';

type Props = IButtonProps &{
    title: string,
    variant?: "solid" | "outline"
}


export function ButtonB({title, variant = "solid", ...rest}: Props){
    return(
        <ButtonNativeBase 
            w={32}
            h={12}
            bg={ variant === "outline" ? "transparent" : "green.700" }
            borderWidth={ variant === "outline" ? 1 : 0}
            borderColor="green.500"
            rounded={8}
            _pressed={{
                bg: variant === "outline" ? "gray.500" : "green.500"
            }}
            {...rest}
            mb={6}
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