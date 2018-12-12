module.exports = {
    extends: ['airbnb-base', 'plugin:prettier/recommended'],
    plugins: ['cucumber'],
    rules: {
        'cucumber/async-then': 2,
        'cucumber/no-arrow-functions': 2,
        'cucumber/no-restricted-tags': 2,
        'import/no-extraneous-dependencies': [
            2,
            {
                devDependencies: ['tutorial/test/**'],
            },
        ],
        'func-names': 0,
        'prefer-arrow-callback': 0,
    },
};
