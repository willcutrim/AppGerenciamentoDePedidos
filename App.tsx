import { NativeBaseProvider } from "native-base";
import { Produtos } from "./src/screens/Produtos";

export default function App() {
  return (
    <NativeBaseProvider>
      <Produtos/>
    </NativeBaseProvider>
  );
}
