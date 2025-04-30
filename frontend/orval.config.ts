module.exports = {
  todo: {
    input: {
      target: "../docs/open-api/generated/bundled-openapi.yaml",
    },
    output: {
      mode: "tags-split",
      client: "fetch",
      target: "./src/libs/orval/fetcher",
      schemas: "./src/libs/orval/schemas",
      fileExtension: ".fetcher.ts",
      baseUrl: "https://example.com",
    },
    hooks: {
      afterAllFilesWrite: "biome format --write libs/orval",
    },
  },
  todoZod: {
    input: {
      target: "../docs/open-api/generated/bundled-openapi.yaml",
    },
    output: {
      mode: "tags-split",
      client: "zod",
      target: "./src/libs/orval/schemas",
      fileExtension: ".zod.ts",
    },
    hooks: {
      afterAllFilesWrite: "biome format --write libs/orval",
    },
  },
};
