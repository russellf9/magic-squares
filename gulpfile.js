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
    livereload = require('gulp-livereload');

// tasks
gulp.task('lint', function() {
    gulp.src(['./app/**/*.js', '!./app/bower_components/**'])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(notify({
            title: 'Lint',
            message: 'Lint Passed. Let it fly!'
        }));
});
// Style Task
gulp.task('jscs', function() {
    gulp.src(['app/js/**/*.js', '!./app/bower_components/**'])
        .pipe(jscs())
        .pipe(notify({
            title: 'JSCS',
            message: 'JSCS Passed. Let it fly!'
        }));
});
// cleans the distribution folder
gulp.task('clean', function() {
    gulp.src('./dist/*')
        .pipe(clean({force: true}));
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
gulp.task('copy-partial-html-files', function() {
    gulp.src('./app/**/partials/*.html')
        .pipe(gulp.dest('dist/'));
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
        port: 8888
    });
});
gulp.task('connectDist', function() {
    connect.server({
        root: 'dist/',
        port: 9999
    });
});


// TODO work out if we can require the `clean` task to be completed first
gulp.task('usemin', ['clean'], function() {
    return gulp.src('./app/**/*.html')
        .pipe(usemin({
            css: [minifyCSS()],
            // html: [minifyHTML({empty: true})], // ! for the time being don't minify HTML
            js: [uglify()]
        }))
        .pipe(gulp.dest('dist/'));
});

// Watch Files For Changes
// TODO - need to get the build task working here
gulp.task('watch', function() {
    gulp.watch('app/js/**/*.js', ['lint', 'jscs']);
});

gulp.task('refresh', function() {
    livereload.changed('http://localhost:8888/');
    console.log('LiveReload is triggered');
});


// default task
gulp.task('default',
    ['lint', 'jscs', 'watch', 'connect']
);
// build task
// TODO a bit hackey need a better way of moving the partials
gulp.task('build',
    ['lint', 'jscs', 'usemin', 'copy-partial-html-files', 'connectDist']
);



// Handle errors
function errorHandler(error) {
    console.log(error.toString());
    this.emit('end');
}
