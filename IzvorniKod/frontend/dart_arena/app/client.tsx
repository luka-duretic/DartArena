import { ChakraProvider, createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  preflight: false, // CSS reset aktivan
    globalCss: {
      "html, body": {
        margin: "inherit",        // Resetuje marginu
        padding: "inherit",       // Resetuje padding
        fontFamily: "inherit", // Koristi tvoj font
      },
      "*": {
        boxSizing: "border-box", // Osigurava box-sizing za sve elemente
      },
    },
});

const system = createSystem(defaultConfig, config);

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      {children}
    </ChakraProvider>
  );
}
