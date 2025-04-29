module.exports = {
  todoApi: {
    input: {
      target: "../docs/open-api/generated/bundled-openapi.yaml",
    },
    output: {
      client: "zod",
      mode: "tags-split",
      target: "./src/libs/orval",
    },
    hooks: {
      afterAllFilesWrite: "biome format --write libs/orval/generated/zod",
    },
  },
};
