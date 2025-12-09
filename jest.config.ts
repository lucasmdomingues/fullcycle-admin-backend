/** @type {import('jest').Config} */
export default {
  testEnvironment: 'node',

  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: false,
            decorators: true
          },
          target: 'es2022',
          transform: {
            useDefineForClassFields: false
          }
        },
        module: {
          type: 'es6'
        }
      }
    ]
  },

  extensionsToTreatAsEsm: ['.ts'],


  transformIgnorePatterns: [
    '/node_modules/(?!uuid)'
  ],

  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^@/(.*)$': '<rootDir>/src/$1'
  },

  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],

  setupFilesAfterEnv: [
    "<rootDir>/src/shared/infra/testing/expect-helpers.ts"
  ],
};
