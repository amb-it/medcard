var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync');

gulp.task('less', function(){
    return gulp.src('src/*.less')
        .pipe(less())
        .pipe(gulp.dest('css/'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('watch', ['browserSync', 'less'], function() {
    gulp.watch('src/*.less', ['less']);
    gulp.watch('*.html', browserSync.reload)
    gulp.watch('js/*.js', browserSync.reload)
});

gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: './'
        },
    });
});