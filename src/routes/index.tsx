import { Box, useTheme } from 'native-base';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { AppRoutes } from './app.routes';

import { useEffect, useState } from 'react';
import { storageUserGet } from '../storage/storageUser';
import { AuthRoutes } from './auth.routes';
import { Loading } from '../components/Loading';

export function Routes(){

    const [ user, setUser ] = useState();
    const [isLoading, setIsLoading] = useState(true);

    async function routesAuth(){
        try {
          setIsLoading(true);
          
          const data = await storageUserGet();
          
          setUser(data);
        } catch (error) {
          throw error;
        } finally{
          setIsLoading(false)
        }
      }
    
    useEffect(() => {
        routesAuth();
      }, [])

    if(isLoading){
        return <Loading/>
    }
    return(
        <Box flex={1} bg='gray.700'>
            <NavigationContainer>
                { user ? <AppRoutes/> : <AuthRoutes/>}
            </NavigationContainer>
        </Box>
    );
} 