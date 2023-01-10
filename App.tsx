import { NativeBaseProvider, StatusBar } from "native-base";
import { Routes } from "./src/routes";

export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <Routes/>
    </NativeBaseProvider>
  );
}
