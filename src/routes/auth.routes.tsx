import { createNativeStackNavigator, NativeStackNavigationProp  } from '@react-navigation/native-stack';

import { SignIn } from '../screens/SignIn';




type AuthRoutes = {
    signin: undefined;
}

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes(){
    return(
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen
                name='signin'
                component={SignIn}
                options={{ headerShown: false }}
            />
        </Navigator>
    );
}