var gulp = require('gulp');
var runSequence = require('run-sequence');
var packageJson = require('../package.json');
var changed = require('gulp-changed');
var cache = require('gulp-cached');
var plumber = require('gulp-plumber');
var sourcemaps = require("gulp-sourcemaps");
//var babel = require('gulp-babel');
var ts = require('gulp-typescript');
var ngAnnotate = require('gulp-ng-annotate');
var browserSync = require('browser-sync');

var compilerOptions = {
    emitDecoratorMetadata: true,
    experimentalDecorators: true,
    //declaration: true,
    //module: "commonjs",
    module: "system",
    //rootDir: "./app",
    target: "es5",
    //outDir: "dist/",
    moduleResolution: "node",
    noImplicitAny: false,
    removeComments: false,
    sourceMap: true
};

/**
 * Hace el move y build de los js
 */
gulp.task('build', function(callback) {
  return runSequence(['move', 'es6'], callback);
});

/**
 * transpila los js a es5
 */
gulp.task('es6', function () {
  return gulp.src(packageJson.moduleConfig.source, {base:'.'})
    //.pipe(cache('es6'))
    .pipe(plumber())
    .pipe(changed(packageJson.moduleConfig.output, { extension: '.ts' }))
    //.pipe(sourcemaps.init())
    .pipe(ts(compilerOptions))
    //.pipe(ngAnnotate({
    //  sourceMap: true,
    //  gulpWarnings: false
    //}))
    //.pipe(sourcemaps.write("."))
    .pipe(gulp.dest(packageJson.moduleConfig.output))
    .pipe(browserSync.reload({ stream: true }));
});

