import globals from 'globals'
import pluginJs from '@eslint/js'
import stylisticPlugin from '@stylistic/eslint-plugin'
import stylisticJsPlugin from '@stylistic/eslint-plugin-js'
import importPlugin from 'eslint-plugin-import'
import jsdocPlugin from 'eslint-plugin-jsdoc'
import nodePlugin from 'eslint-plugin-n'
import promisePlugin from 'eslint-plugin-promise'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
// import sonarjsPlugin from "eslint-plugin-sonarjs";

export default [
    { languageOptions: { globals: globals.node } },
    pluginJs.configs.recommended,
    // stylisticPlugin.configs['recommended-flat'],
    importPlugin.flatConfigs.recommended,
    jsdocPlugin.configs['flat/recommended'],
    nodePlugin.configs['flat/recommended-script'],
    promisePlugin.configs['flat/recommended'],
    prettierConfig,
    // sonarjsPlugin.configs.recommended,
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
        settings: {
            jsdoc: {
                mode: 'typescript',
            },
        },
        plugins: {
            stylistic: stylisticPlugin,
            '@stylistic/js': stylisticJsPlugin,
            jsdoc: jsdocPlugin,
            n: nodePlugin,
            promise: promisePlugin,
            prettier: prettierPlugin,
            // sonar: sonarjsPlugin
        },
        rules: {
            indent: [
                'error',
                4,
                {
                    ignoredNodes: ['TemplateLiteral'],
                },
            ],
            camelcase: [
                'error',
                {
                    properties: 'never',
                },
            ],
            'max-params': ['warn', 5],
            'max-depth': ['warn', 4],
            'max-statements': ['warn', 20],
            'linebreak-style': ['warn', 'unix'],
            'class-methods-use-this': 'off',
            'comma-style': ['warn', 'last'],
            'no-mixed-spaces-and-tabs': ['warn'],
            'no-prototype-builtins': 'off',

            'no-return-assign': ['error', 'except-parens'],
            'no-restricted-syntax': [
                'error',
                'ForInStatement',
                'LabeledStatement',
                'WithStatement',
            ],
            'no-unused-vars': [
                'error',
                {
                    ignoreRestSiblings: true,
                    argsIgnorePattern: 'res|next|^err',
                },
            ],
            'prefer-const': [
                'error',
                {
                    destructuring: 'all',
                },
            ],
            'arrow-body-style': ['error', 'as-needed'],
            'no-unused-expressions': [
                'error',
                {
                    allowTaggedTemplates: true,
                },
            ],
            'max-len': [
                'error',
                {
                    code: 120,
                    comments: 80,
                    tabWidth: 4,
                },
            ],
            'no-shadow': [
                'error',
                {
                    hoist: 'all',
                    allow: [
                        'resolve',
                        'reject',
                        'done',
                        'next',
                        'err',
                        'error',
                    ],
                },
            ],
            quotes: [
                'error',
                'single',
                {
                    avoidEscape: true,
                    allowTemplateLiterals: true,
                },
            ],
            'vars-on-top': 'error',
            'block-scoped-var': 'error',
            complexity: [
                'error',
                {
                    max: 20,
                },
            ],
            'consistent-return': 'error',
            'max-classes-per-file': ['error', 1],
            'no-alert': 'error',
            'no-caller': 'error',
            'no-extra-label': 'error',
            'no-labels': [
                'error',
                {
                    allowLoop: false,
                    allowSwitch: false,
                },
            ],
            'no-loop-func': 'error',

            'no-return-await': 'error',
            'no-else-return': [
                'error',
                {
                    allowElseIf: false,
                },
            ],
            'no-multi-assign': ['error'],
            'no-console': 'warn',
            'no-param-reassign': [
                'error',
                {
                    props: true,
                    ignorePropertyModificationsFor: [
                        'acc',
                        'accumulator',
                        'e',
                        'req',
                        'request',
                        'res',
                        'response',
                    ],
                },
            ],
            'no-useless-concat': 'error',
            'no-nested-ternary': 'error',
            radix: 'error',
            'for-direction': 'error',
            'getter-return': [
                'error',
                {
                    allowImplicit: true,
                },
            ],
            'no-await-in-loop': 'error',
            'no-inner-declarations': 'error',
            'no-var': 'error',
            'no-lonely-if': 'error',
            'prefer-arrow-callback': [
                'error',
                {
                    allowNamedFunctions: false,
                    allowUnboundThis: true,
                },
            ],
            'prefer-destructuring': [
                'error',
                {
                    VariableDeclarator: {
                        array: false,
                        object: true,
                    },
                    AssignmentExpression: {
                        array: true,
                        object: false,
                    },
                },
                {
                    enforceForRenamedProperties: false,
                },
            ],
            'prefer-rest-params': 'error',
            'prefer-spread': 'error',
            'prefer-template': 'error',
            'require-yield': 'error',
            'operator-assignment': ['error', 'always'],
            'prefer-object-spread': 'error',
            'no-delete-var': 'error',
            'stylistic/semi': ['error', 'never'],
            'import/prefer-default-export': 'off',
            'import/no-unresolved': [
                'error',
                {
                    caseSensitive: true,
                    ignore: ['\\.ts$'],
                },
            ],
            'import/named': 'error',
            'import/no-named-as-default': 'error',
            'import/no-named-as-default-member': 'error',
            'import/no-mutable-exports': 'error',
            'import/order': [
                'error',
                {
                    groups: [['builtin', 'external', 'internal']],
                },
            ],
            'import/no-self-import': 'error',
            'import/no-cycle': [
                'error',
                {
                    maxDepth: '∞',
                },
            ],
            'import/no-useless-path-segments': [
                'error',
                {
                    commonjs: true,
                },
            ],
            'import/extensions': [
                'error',
                'ignorePackages',
                {
                    js: 'always',
                },
            ],
            'jsdoc/check-access': 'off',
            'jsdoc/check-alignment': 'error',
            'jsdoc/check-examples': 'off',
            'jsdoc/check-indentation': 'error',
            'jsdoc/check-line-alignment': 'off',
            'jsdoc/check-param-names': 'error',
            'jsdoc/check-property-names': 'error',
            'jsdoc/check-syntax': 'off',
            'jsdoc/check-tag-names': 'error',
            'jsdoc/check-types': [
                'error',
                {
                    unifyParentAndChildTypeChecks: true,
                },
            ],
            'jsdoc/check-values': 'error',
            'jsdoc/empty-tags': 'error',
            'jsdoc/implements-on-classes': 'error',
            'jsdoc/match-description': 'off',
            'jsdoc/multiline-blocks': 'error',
            'jsdoc/no-bad-blocks': 'off',
            'jsdoc/no-defaults': 'off',
            'jsdoc/no-missing-syntax': 'off',
            'jsdoc/no-multi-asterisks': 'error',
            'jsdoc/no-restricted-syntax': 'off',
            'jsdoc/no-types': 'off',
            'jsdoc/no-undefined-types': 'error',
            'jsdoc/require-asterisk-prefix': 'off',
            'jsdoc/require-description': 'off',
            'jsdoc/require-description-complete-sentence': 'off',
            'jsdoc/require-example': 'off',
            'jsdoc/require-file-overview': 'off',
            'jsdoc/require-hyphen-before-param-description': 'off',
            'jsdoc/require-jsdoc': 'off',
            'jsdoc/require-param': 'error',
            'jsdoc/require-param-description': 'off',
            'jsdoc/require-param-name': 'error',
            'jsdoc/require-param-type': 'error',
            'jsdoc/require-property': 'error',
            'jsdoc/require-property-description': 'off',
            'jsdoc/require-property-name': 'error',
            'jsdoc/require-property-type': 'error',
            'jsdoc/require-returns': 'error',
            'jsdoc/require-returns-check': 'error',
            'jsdoc/require-returns-description': 'off',
            'jsdoc/require-returns-type': 'error',
            'jsdoc/require-throws': 'off',
            'jsdoc/require-yields': 'error',
            'jsdoc/require-yields-check': 'error',
            'jsdoc/tag-lines': 'error',
            'jsdoc/valid-types': 'warn'
        },
    },
]
