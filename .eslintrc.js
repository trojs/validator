module.exports = {
    root: true,
    env: {
        es6: true,
        node: true,
        browser: true
    },
    extends: ['@hckrnews/eslint-config'],
    rules: {
        'import/prefer-default-export': 'off',
        'no-prototype-builtins': 'off',
        'class-methods-use-this': 'off'
    },
    parserOptions: {
        sourceType: "module",
        parser: "babel-eslint",
        babelOptions: {
            configFile: "babel.config.js",
        }
    },
    overrides: [
        {
            files: [
                "**/__tests__/*.{j,t}s?(x)",
                "**/tests/unit/**/*.spec.{j,t}s?(x)"
            ],
            env: {
                jest: true
            }
        }
    ]
};
