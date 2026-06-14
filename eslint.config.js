import { eslint } from '@siberiacancode/eslint';

export default eslint(
  {
    typescript: true,
    react: true,
    tailwind: {
      settings: {
        entryPoint: 'src/app/styles/globals.css',
        detectComponentClasses: true
      }
    },
    ignores: ['generated']
  },
  {
    name: 'juniors-bootcamp-tester/router',
    files: ['src/routes/**/*.tsx'],
    ignores: ['src/routes/**/-*/**'],
    rules: {
      'siberiacancode/function-component-definition': 'off'
    }
  }
);
