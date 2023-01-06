import { Spinner, Center } from 'native-base';

export function Loading(){
    return (
        <Center flex={1} bg="white">
            <Spinner
                color="#663399"
                size={50}
            />
        </Center>
    );
}