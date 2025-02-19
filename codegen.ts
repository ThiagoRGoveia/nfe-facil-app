import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:4000/graphql",
  documents: ["src/graphql/**/*.ts"],
  generates: {
    "./src/graphql/generated/": {
      preset: "client-preset",
      config: {
        enumsAsTypes: true,
        futureProofEnums: true,
      },
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
};

export default config;
