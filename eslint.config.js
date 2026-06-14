import { eslint } from '@siberiacancode/eslint';

export default eslint({
  typescript: true,
  react: true,
  tailwind: {
    settings: {
      entryPoint: 'src/app/styles/globals.css',
      detectComponentClasses: true
    }
  },
  ignores: ['src/generated/']
});
