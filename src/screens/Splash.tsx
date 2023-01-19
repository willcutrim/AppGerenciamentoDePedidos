import { Box } from "native-base";
import { storageAuthTokenGet } from "../storage/storageAuthToken";
import { storageUserGet } from "../storage/storageUser";
import { UserDTO } from "../dtos/UserDTO";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../routes/app.routes";
import { AuthNavigatorRoutesProps } from "../routes/auth.routes";





export function Splash(){
    const [user, setUser] = useState<UserDTO>();
    
    const navigation = useNavigation<AppNavigatorRoutesProps>();
    const navLogin  = useNavigation<AuthNavigatorRoutesProps>();

    async function handleNavigatio() {
        navigation.navigate('produtos');
    }

    async function authLogin(){
        try {
            const dados_user = await storageUserGet();
            const token = await storageAuthTokenGet();
    
            setUser(dados_user)
        } catch (error) {
            
        }
    }

    return (
        <Box>
            <>
                {
                    user?.id ? navigation.navigate('produtos') : navLogin.navigate('signin')

                }
            </>
        </Box>
    );
}