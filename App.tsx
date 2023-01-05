import { NativeBaseProvider, Box } from "native-base";

export default function App() {
  return (
    <NativeBaseProvider>
      <Box 
      justifyContent='center'
      alignItems='center'
      flex={1}
      >
        Vai da certo!
      </Box>
    </NativeBaseProvider>
  );
}
