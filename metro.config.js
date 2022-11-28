// Learn more https://docs.expo.io/guides/customizing-metro
module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    sourceExts: ["jsx", "js", "ts", "tsx", "cjs", "json"], //add here
  },
};
