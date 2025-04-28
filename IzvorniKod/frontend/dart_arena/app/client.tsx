import { ChakraProvider, createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const system = createSystem(defaultConfig, defineConfig({
  // isključuje preflight (CSS reset)
  preflight: false,
}));

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      {children}
    </ChakraProvider>
  );
}
