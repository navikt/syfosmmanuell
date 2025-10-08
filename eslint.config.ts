import { defineConfig } from 'eslint/config'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
    baseDirectory: import.meta.dirname,
})

const eslintConfig = defineConfig([
    ...compat.extends('@navikt/teamsykmelding', 'next/core-web-vitals', 'next/typescript'),
    {
        rules: { '@typescript-eslint/explicit-function-return-type': 'off' },
    },
])

export default eslintConfig
