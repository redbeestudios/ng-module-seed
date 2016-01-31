/* global module */
module.exports = function (config) {
  'use strict';
  config.set({
    singleRun: false,

    basePath: '.',

    frameworks: ['jspm', 'jasmine'],

    files: [
      'node_modules/babel-core/browser-polyfill.js'
    ],

    jspm: {
      useBundles: true,
      config: 'config.js',
      loadFiles: [
        'test/**/*.spec.js'
      ],
      serveFiles: [
        'app/**/!(*spec).js'
      ]
    },

    proxies: {
      //'/': '/base/dist/',
      '/': '/base/app/',
      '/test/': '/base/test/',
      '/jspm_packages/': '/base/jspm_packages/'

    },

    browsers: ['PhantomJS'],

    preprocessors: {
      'app/**/*.js': ['babel', 'sourcemap','coverage']
    },

    reporters: ['progress', 'junit', 'coverage'],

    logLevel: config.LOG_INFO,

    babelPreprocessor: {

      options: {
        sourceMap: 'inline',
        blacklist: ['useStrict'],
        "optional": [
          "runtime"
        ]
      },
      sourceFileName: function(file) {
        return file.originalPath;
      }
    },

    junitReporter: {
      outputDir: 'reports/junit/',
      outputFile: 'TESTS-xunit.xml'
    },

    coverageReporter: {
      instrumenters: { isparta : require('isparta') },
      instrumenter: {
        'app/**/*.js': 'isparta'
      },

      reporters: [
        {
          type: 'text',
          dir: 'reports/',
          subdir: 'coverage'
          //subdir: normalizationBrowserName
        },
        {
          type: 'lcov',
          dir: 'reports/',
          subdir: 'coverage'
          //subdir: normalizationBrowserName
        }
        /*{
          type: 'html',
          dir: 'reports/',
          subdir: 'coverage'
          //subdir: normalizationBrowserName
        }*/
      ]
    }
  });

  function normalizationBrowserName(browser) {
    return browser.toLowerCase().split(/[ /-]/)[0];
  }
};
