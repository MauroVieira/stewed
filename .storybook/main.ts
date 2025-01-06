import { mergeConfig, type InlineConfig } from "vite";
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../packages/**/*.mdx",
    "../packages/**/*.stories.@(ts|tsx)",
    "../src/**/*.stories.@(ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions"
  ],
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      // Speeds up Storybook build time
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false
      },
      // Makes union prop types like variant and size appear as select controls
      shouldExtractLiteralValuesFromEnum: true,
      // Makes string and boolean types that can be undefined appear as inputs and switches
      shouldRemoveUndefinedFromOptional: true,
      propFilter: () => true
    }
  },
  core: {
    builder: "@storybook/builder-vite"
  },
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  docs: {
    autodocs: "tag"
  },
  async viteFinal(config: InlineConfig): InlineConfig {
    config.plugins = config.plugins!.filter((plugin) => plugin!.name !== "vite:dts");
    const newConfig: InlineConfig = mergeConfig(config, {
      build: {
        chunkSizeWarningLimit: 1800
      }
    });

    return newConfig;
  }
};

export default config;
