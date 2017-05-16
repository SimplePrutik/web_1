var gulp = require('gulp'),
    sass = require('gulp-sass'),
    livereload = require('gulp-livereload');

gulp.task('sass', function() {
    return gulp.src('app/sass/**/*.sass')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(livereload());
})

gulp.task('watch', function(){
	livereload.listen();
    gulp.watch('app/sass/**/*.sass', ['sass']);
})