// gulp
var gulp = require('gulp'),

// plugins
    connect = require('gulp-connect'),
    jshint = require('gulp-jshint'),
    jscs = require('gulp-jscs'),
    notify = require('gulp-notify'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    minifyHTML = require('gulp-minify-html'),
    clean = require('gulp-clean'),
    browserify = require('gulp-browserify'),
    usemin = require('gulp-usemin'),
    concat = require('gulp-concat'),
    rev = require('gulp-rev'),
    gulpif = require('gulp-if'),
    livereload = require('gulp-livereload'),
    watch = require('gulp-watch');

// tasks
gulp.task('lint', function() {
    gulp.src(['./app/**/*.js', '!./app/bower_components/**'])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(notify({
            title: 'Lint',
            message: 'Lint Passed.  All up to standards!'
        }));
});
// Style Task
gulp.task('jscs', function() {
    gulp.src(['app/js/**/*.js', '!./app/bower_components/**'])
        .pipe(jscs())
        .pipe(notify({
            title: 'JSCS',
            message: 'JSCS Passed. All up to standards!'
        }));
});
// cleans the distribution folder
gulp.task('clean', function(cb) {
    gulp.src('./dist/*')
        .pipe(clean({force: true})).on('error', errorHandler);
    cb()
});
// cleans the build folder
gulp.task('clean-build', function() {
    gulp.src('./build/*')
        .pipe(clean({force: true}));
});
// TODO leave task for now
gulp.task('minify-css', function() {
    var opts = {comments: true, spare: true};
    gulp.src(['./app/**/*.css', '!./app/bower_components/**'])
        .pipe(minifyCSS(opts))
        .pipe(gulp.dest('./dist/'))
});
//
gulp.task('copy-partial-html-files', ['usemin'], function(cb) {
    gulp.src('./app/**/partials/*.html')
        .pipe(gulp.dest('dist/'));
    cb()
});
// browserify
gulp.task('browserify', function() {
    gulp.src(['app/js/main.js'])
        .pipe(browserify({
            insertGlobals: true,
            debug: true
        }))
        .pipe(concat('bundled.js'))
        .pipe(gulp.dest('./app/js'))
});

/**
 * CONNECTION
 */
gulp.task('connect', function() {
    connect.server({
        root: 'app/',
        port: 8888,
        livereload: true
    });
});
gulp.task('connectDist', function() {
    connect.server({
        root: 'dist/',
        port: 8001,
        livereload: true
    });
});
// need to add {maxListeners: 999},
gulp.task('usemin', ['clean'],  function(cb) {

    var condition = 'app.js';

    return gulp.src('./app/**/*.html')
        .pipe(usemin({
            css: [minifyCSS()],
            html: [minifyHTML({empty: true})]
        }))
        .pipe(gulpif(condition, uglify()))
        .pipe(gulp.dest('dist/'));
    cb()
});

// testing uglify
gulp.task('compress', function() {
    gulp.src('app/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('test'))
});

// Watch Files For Changes
// Note use the maxListeners to avoid error - `possible EventEmitter memory leak detected`
gulp.task('watch', function() {
    gulp.watch('app/js/**/*.js', {maxListeners: 999}, ['lint', 'jscs', 'build']);
});

// necessary to create a pipe to launch the relaod
gulp.task('watch-build', function() {
    watch('dist/').pipe(connect.reload()).pipe(notify({
        title: 'Reloaded',
        message: '`Connect` Server has been reloaded!'
    }));
});

// default task
gulp.task('default',
    ['lint', 'jscs', 'connect', 'watch', 'watch-build']
);
// build task
// TODO a bit hackey need a better way of moving the partials
gulp.task('build',
    ['clean', 'usemin', 'copy-partial-html-files']
);

// Handle errors
function errorHandler(error) {
    console.log(error.toString());
    this.emit('end');
}
