import { NativeBaseProvider, StatusBar } from "native-base";
import { Routes } from "./src/routes";
import { AuthContextProvider } from "./src/contexts/AuthContext";

export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <AuthContextProvider>
        <Routes/>

      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
