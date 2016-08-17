/**
 * gulp启动文件
 */
var gulp = require('gulp'), //gulp主体
    connect = require('gulp-connect'), //web服务
    modRewrite = require('connect-modrewrite'), //api路由转发 处理跨域问题
    gulpSequence = require('gulp-sequence'); //控制gulp执行任务的顺序


gulp.task('webserver', function() {
    connect.server({
        root: 'app',
        livereload: false,
        port: 8080,
        middleware: function(connect, opt) {
            return [modRewrite([
                // '^/test_api/(.*)$ http://192.168.200.54:8080/$1 [P]',
                '^/test_api/(.*)$ http://192.168.200.47:8080/$1 [P]',
                '^/api/(.*)$ http://121.199.18.4/api/$1 [P]'

            ])];
        }
    });
});

gulp.task('default', ['webserver']);