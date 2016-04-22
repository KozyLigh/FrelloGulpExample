/**
 * Created by kozy on 22/04/16.
 */

//taski
var gulp=require('gulp');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var flatten = require('gulp-flatten');
var webserver = require('gulp-webserver');
var ngAnnotate = require('gulp-ng-annotate');

//script tasks
gulp.task('scripts',function(){
    gulp.src(['src/assets/js/Frello.js','src/assets/js/*.js'])
        .pipe(concat('Frello.js'))
        .pipe(ngAnnotate())
        .pipe(gulp.dest('dist/asests/js'))
        .pipe(notify('JS is comipled'));
});

gulp.task('move',function(){

gulp.src(['src/index.html']).pipe(gulp.dest('dist')).pipe(notify('Moved index.html'));

gulp.src(['!./src/index.html','src/**/*.html']).pipe(flatten()).pipe(gulp.dest('dist/templates')).pipe(notify('Moved templates'));

});

gulp.task('moveBower',function(){
    gulp.src(['bower_components/**/*.js']).pipe(gulp.dest('dist/assets/js')).pipe(notify('Moved bower JS components to dist/assets/js'));
    gulp.src(['bower_components/**/*.css']).pipe(gulp.dest('dist/assets/css')).pipe(notify('Moved bower CSS components to dist/assets/css'));
});

gulp.task('serve',function(){

    gulp.src('.').pipe(webserver({
        port:48080,
        livereload:true,
        open: 'http://localhost:48080/dist/'
    }));

});

gulp.task('watch',['serve'],function(){

    gulp.start(['scripts','move','moveBower']);
    gulp.watch(['src/**/*.js'],['scripts']);
    gulp.watch(['src/**/*.html'],['move']);
    gulp.watch(['bower_components/**/*.js'],['moveBower']);
    gulp.watch(['bower_components/**/*.css'],['moveBower']);

});