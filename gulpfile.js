var gulp = require('gulp');
var browserSync = require('browser-sync').create();

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
});
