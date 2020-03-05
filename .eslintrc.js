module.exports = {
    root: true,
    env: {
        es6: true,
        node: true,
        browser: true
    },
    extends: ["plugin:prettier/recommended"],
    rules: {
        "no-debugger": ["error"],
        "no-compare-neg-zero": ["error"],
        "no-constant-condition": ["error"],
        "no-control-regex": ["error"],
        "no-dupe-args": "error",
        "no-dupe-keys": "error",
        "no-dupe-else-if": "error",
        "no-duplicate-case": "error",
        "no-empty-character-class": ["error"],
        "no-ex-assign": ["error"],
        "no-extra-semi": ["error"],
        "no-func-assign": ["error"],
        "no-inner-declarations": ["error"],
        "no-invalid-regexp": ["error"],
        "no-irregular-whitespace": ["error"],
        "no-obj-calls": ["error"],
        "no-regex-spaces": ["error"],
        "no-sparse-arrays": ["error"],
        "no-unsafe-finally": ["error"],
        "no-unsafe-negation": ["error"],
        "use-isnan": ["error"],
        "no-lonely-if": "error",
        "no-dupe-class-members": "error",
        "no-unreachable": "error",
        "valid-typeof": "error",
        "no-console": "warn",
        "no-cond-assign": ["error", "except-parens"],
        "no-param-reassign": "error",
        "no-return-assign": "error",
        "no-useless-escape": "error",
        "vars-on-top": "error",
        camelcase: [
            2,
            {
                properties: "never"
            }
        ],
        "line-comment-position": [
            "error",
            {
                position: "above"
            }
        ],
        "linebreak-style": ["error", "unix"],
        "max-depth": ["error", 4],
        "max-nested-callbacks": ["error", 3],
        "max-statements-per-line": [
            "error",
            {
                max: 1
            }
        ],
        "new-cap": "error",
        "newline-after-var": ["error", "always"],
        "newline-before-return": "error",
        "no-inline-comments": "error",
        "no-ternary": "error",
        "no-undef": "error",
        "no-underscore-dangle": "error",
        "no-unused-vars": [
            "warn",
            {
                vars: "all",
                args: "after-used"
            }
        ],
        "one-var": ["error", "never"],
        "operator-assignment": ["error", "always"],
        "spaced-comment": ["error", "always"],
        "require-jsdoc": [
            "error",
            {
                require: {
                    FunctionDeclaration: true,
                    MethodDefinition: true,
                    ClassDeclaration: true,
                    FunctionExpression: true
                }
            }
        ],
        "valid-jsdoc": [
            "error",
            {
                prefer: {
                    arg: "param",
                    argument: "param",
                    class: "constructor",
                    return: "return",
                    virtual: "abstract"
                },
                preferType: {
                    Boolean: "boolean",
                    Number: "number",
                    Object: "object",
                    String: "string"
                },
                requireReturn: false,
                matchDescription: ".+",
                requireParamDescription: false,
                requireReturnDescription: false
            }
        ],
        "prettier/prettier": ["error"]
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
