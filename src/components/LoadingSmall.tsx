import { Spinner, Center } from 'native-base';


export function LoadingSmall(){
    return (
        <Center bg='#D9D9D9' h={25} w={25}>
            <Spinner
                color="#663399"
                size={25}
            />
        </Center>
    );
}