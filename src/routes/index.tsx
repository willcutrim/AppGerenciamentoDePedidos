import { Box } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './app.routes';
import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { storageUserGet } from '../storage/storageUser';
import { AuthRoutes } from './auth.routes';
import { Loading } from '../components/Loading';

import { useAuth } from '../hooks/useAuth';


export function Routes() {

  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();


  async function routesAuth() {
    try {
      setIsLoading(true);

      await storageUserGet();

    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    routesAuth();
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <Box flex={1} bg='gray.700'>
      <NavigationContainer>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
} 