module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // ... other configs, if any
    [
      'module-resolver',
      {
        extensions: [
          '.ios.js',
          '.android.js',
          '.ios.jsx',
          '.android.jsx',
          '.js',
          '.jsx',
          '.json',
          '.ts',
          '.tsx',
        ],
        root: ['.'],
        alias: {
          '@src': './src',
          '@assets': './src/assets',
          '@common': './src/common',
          '@redux': './src/redux',
          '@utilities': './src/utilities',
          '@screens': './src/screens',
          '@pages': './src/screens/pages',
        },
      },
    ],
    'react-native-reanimated/plugin',
    // ... other configs, if any
  ],
};
