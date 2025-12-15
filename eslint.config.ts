import { defineConfig } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import tsmEslintReact from '@navikt/tsm-eslint-react'

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    ...tsmEslintReact,
    {
        extends: [eslintPluginPrettierRecommended],
        rules: { 'prettier/prettier': 'warn' },
    },
    {
        rules: {
            // Look at enabling this, but it crashes with some react-hook-form internals atm
            'react-hooks/refs': 'off',
            // We're not even using react compiler, why is it complaining?
            'react-hooks/incompatible-library': 'off',
            // This app has a lot of these
            "@typescript-eslint/explicit-function-return-type": "off",
        },
    },
])

export default eslintConfig
