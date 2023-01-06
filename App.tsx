import { NativeBaseProvider, StatusBar } from "native-base";
import { Produtos } from "./src/screens/Produtos";

export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <Produtos/>
    </NativeBaseProvider>
  );
}
