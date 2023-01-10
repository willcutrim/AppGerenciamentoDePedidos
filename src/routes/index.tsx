import { Box } from 'native-base';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { AppRoutes } from './app.routes';


export function Routes(){
    return(
        <Box flex={1} bg='white'>
            <NavigationContainer>
                <AppRoutes/>
            </NavigationContainer>
        </Box>
    );
} 