import { createNativeStackNavigator, NativeStackNavigationProp  } from '@react-navigation/native-stack';

import { Produtos } from '../screens/Produtos'
import { Carrinho } from '../screens/Carrinho'
import { SignIn } from '../screens/SignIn';


type AppRoutes = {
    produtos: undefined;
    carrinho: undefined;
    signin: undefined;
}

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>;

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes(){
    return(
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen
                name='signin'
                component={SignIn}
            />
            <Screen
                name='produtos'
                component={Produtos}
            />
            <Screen
                name='carrinho'
                component={Carrinho}
            />
        </Navigator>
    );
}