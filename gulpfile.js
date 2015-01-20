// gulp
var gulp = require('gulp'),

// plugins
    connect = require('gulp-connect'),
    jshint = require('gulp-jshint'),
    jscs = require('gulp-jscs'),
    notify = require('gulp-notify'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    clean = require('gulp-clean');

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
    console.log('ok');
    gulp.src(['app/js/**/*.js', '!./app/bower_components/**'])
        .pipe(jscs())
        .pipe(notify({
            title: 'JSCS',
            message: 'JSCS Passed. Let it fly!'
        }));
});
gulp.task('clean', function() {
    gulp.src('./dist/*')
        .pipe(clean({force: true}));
});

gulp.task('minify-css', function() {
    var opts = {comments: true, spare: true};
    gulp.src(['./app/**/*.css', '!./app/bower_components/**'])
        .pipe(minifyCSS(opts))
        .pipe(gulp.dest('./dist/'))
});
gulp.task('minify-js', function() {
    gulp.src(['./app/**/*.js', '!./app/bower_components/**'])
        .pipe(uglify({
            // inSourceMap:
            // outSourceMap: "app.js.map"
        }))
        .pipe(gulp.dest('./dist/'))
});
gulp.task('copy-bower-components', function() {
    gulp.src('./app/bower_components/**')
        .pipe(gulp.dest('dist/bower_components'));
});
gulp.task('copy-html-files', function() {
    gulp.src('./app/**/*.html')
        .pipe(gulp.dest('dist/'));
});
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


// default task
gulp.task('default',
    ['lint', 'jscs', 'connect']
);
// build task
gulp.task('build',
    ['lint', 'jscs', 'minify-css', 'minify-js', 'copy-html-files', 'copy-bower-components', 'connectDist']
);



// Handle the error
function errorHandler(error) {
    console.log(error.toString());
    this.emit('end');
}
