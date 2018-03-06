var gulp = require('gulp');
// var webpack = require('webpack')
var webpack = require('webpack-stream');
var browserSync = require('browser-sync').create();

// gulp.task('default', ['browser-sync', 'webpack-build']);
gulp.task('default', ['browser-sync']);


// 静态服务器
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }        
    });

    gulp.watch('./test/*.js').on('change', browserSync.reload)
    gulp.watch('./test/*.css').on('change', browserSync.reload)
    gulp.watch('./test/*.html').on('change', browserSync.reload)
    gulp.watch('./src/*.js').on('change', browserSync.reload)
});

// 打包
// gulp.task('webpack-build', function() {
//     var config = require('./webpack.config.js');
//     return gulp.src('src/entry.js')
//         .pipe(webpack(config))
//         .pipe(gulp.dest('dist/'));
// });
