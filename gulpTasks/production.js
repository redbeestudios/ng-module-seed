var gulp = require('gulp');
var packageJson = require('../package.json');
var release = false;
var jspm = require('jspm');
var plumber = require('gulp-plumber');
var runSequence = require('run-sequence');
var replace = require('gulp-replace-task');

/**
 * Production flow
 */
gulp.task('build-release', function(callback) {
  return runSequence('move', callback);
});

/**
 * @Deprecated
 * Production flow
 */
gulp.task('bundle-sfx', function() {
  var jsMainPath =  packageJson.moduleConfig.output+packageJson.moduleConfig.mainJs;
  if (release) {
    jsMainPath = packageJson.moduleConfig.output+packageJson.main;
  }
  return jspm.bundleSFX(jsMainPath, packageJson.moduleConfig.output+'build.js',
    { runtime: false }
  );
});

/**
 * Production flow
 */
gulp.task('production:bundle', function() {
  var deps = packageJson.jspm.dependencies;

  var moduleList = packageJson.moduleConfig.output + packageJson.main + ' + ' + Object.keys(deps).join(' + ');

  console.log('dependencias '+moduleList)

  return jspm.bundle(moduleList, packageJson.moduleConfig.output + 'bundle.js',
    { mangle: false, minify:false, sourceMaps: true, inject: false }).then(function() {
    console.log('Bundled');
  });

});

gulp.task('production:move', function() {
  return gulp.src(['./jspm_packages/system.js'],{base:'.'})
    .pipe(plumber())
    .pipe(gulp.dest(packageJson.moduleConfig.output));
});

gulp.task('production:replace', function() {

  return gulp.src(packageJson.moduleConfig.output+'index.html')
    .pipe(replace({
      usePrefix:false,
      patterns: [
        {
          match: '<!-- <script src="bundle.js"></script> -->',
          replacement: '<script src="bundle.js?bust={{date}}"></script>'
        },
        {
          match: '{{date}}',
          replacement: Math.round(new Date() / 1000)
        }
      ]
    }))
    .pipe(gulp.dest(packageJson.moduleConfig.output));
});

gulp.task('production:flow', function() {

  return runSequence(
    'clean',
    ['move', 'production:move'],
    ['sass', 'html'],
    'production:bundle',
    'production:replace'
  );

});

/**
 * Minifica las funestes
 */
gulp.task('minify', function() {
  return gulp.src(packageJson.moduleConfig.output+'/**/*.js')
    .pipe(cache('minify'))
    .pipe(plumber())
    .pipe(ngAnnotate())
    .pipe(stripCode
    ({
      start_comment: "start-to-remove-release",
      end_comment: "end-to-remove-release"
    })
  )
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest('dist'));
});
