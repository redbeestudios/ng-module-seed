var gulp = require('gulp');
var browserSync = require('browser-sync');
var packageJson = require('../package.json');

/**
 * Compila y levanta browserSync
 */
gulp.task('serve', ['compile'], function (done) {
  return browserSync({
    open: false,
    port: packageJson.moduleConfig.port,
    server: {
      baseDir: ['.'],
      routes: {
        '/styles':'dist/styles'
      },
      middleware: function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }
  }, done);
});
