import { createNativeStackNavigator, NativeStackNavigationProp  } from '@react-navigation/native-stack';

import { SignIn } from '../screens/SignIn';




type AppRoutes = {
    signin: undefined;
}

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>;

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes(){
    return(
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen
                name='signin'
                component={SignIn}
            />
        </Navigator>
    );
}