module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ]
  ],
  plugins: [
    ['module.resovler', {
      alias: {
        '@modules': './src/modules',
        '@shared': './src/shared'
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
};
