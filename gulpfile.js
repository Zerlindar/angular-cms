/**
 * Created by Administrator on 2016/2/21.
 */
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate'),
    ngMin = require('gulp-ngmin'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    //sass = require('gulp-sass'),
    less = require('gulp-less'),
    minifycss = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps'),
    //livereload = require('gulp-livereload'),
    open = require('gulp-open'),
    stripDebug = require('gulp-strip-debug'),
    clean = require('gulp-clean'),
    postcss      = require('gulp-postcss'),
  autoprefixer = require('gulp-autoprefixer');
const config={
  JS_WATCH:['./assets/js/*.js','./module/*/*.js'],
  SASS_WATCH:['./assets/sass/*.scss','./module/*/*.scss'],
  LESS_WATCH:['./assets/less/*.less','./module/*/*.less', './assets/less/*.css'],
  JS_CLEAN: ["dist/*.js"],
  CSS_CLEAN: ["dist/*.css"],
  JS_PATH:[
    'bower_components/moment/moment.js',
    'bower_components/moment/locale/zh-cn.js',
    'bower_components/angular/angular.js',
    'bower_components/angular-ui-router/release/angular-ui-router.js',
    'bower_components/alertifyjs/dist/js/ngAlertify.js'
  ],
  CSS_PATH:[
    'bower_components/alertifyjs/dist/css/alertify.css',
  ]
}

//帮助
gulp.task('help',function(){

    console.log('	gulp			    文件变动监控打包');

    console.log('	gulp help			gulp参数说明');

    console.log('	gulp sass			编译sass');

    console.log('	gulp sass-min			编译压缩sass');

})
//插件相关打包压缩->固定插件执行一次
gulp.task('min',function(){
  gulp.src(config.JS_PATH)
    .pipe(uglify({outSourceMap:false}))
    .pipe(stripDebug())  //console
    .pipe(uglify({outSourceMap:false}))
    .pipe(concat('plugin.min.js'))
    .pipe(gulp.dest('./dist'));
  gulp.src(config.CSS_PATH)
    .pipe(sourcemaps.init())
    .pipe(concat('plugin.min.css'))
    .pipe(minifycss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist'))

})

//生产环境输出
gulp.task('p',['angular-min', 'less-min']);
//默认开发环境
gulp.task('default',['watch-angular', 'watch-less']);
//监视编译angular
gulp.task('watch-angular',function(){
  console.log("编译js中...")
    gulp.watch(config.JS_WATCH,['angular'])
})

//监视less
gulp.task('watch-less',function(){
  gulp.watch(config.LESS_WATCH,['less']);
})

//less编译，普通版（未压缩）
gulp.task('less',function(){
  gulp.src(config.LESS_WATCH)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'Android >= 4.0'],
    }))
    .pipe(gulp.dest('./src/css'))
    .pipe(concat('production.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist'))
})
//less编译，压缩版
gulp.task('less-min',function(){
  gulp.src(config.LESS_WATCH)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(gulp.dest('./src/css'))
    .pipe(minifycss())
    .pipe(concat('production.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist'))
})
//angular 编译-合并
gulp.task('angular',function(){
    gulp.src(config.JS_WATCH)
        .pipe(ngAnnotate())
        .pipe(concat('production.js'))
        .pipe(gulp.dest('./dist'))
})
//angular 编译合并压缩
gulp.task('angular-min',function(){
    gulp.src(config.JS_WATCH)
        .pipe(ngAnnotate())
        .pipe(ngMin({dynamic:false}))
        .pipe(stripDebug())  //console
        .pipe(uglify({outSourceMap:false}))
        .pipe(concat('production.min.js'))
        .pipe(gulp.dest('./dist'))
  console.log("编译js结束.")

})
gulp.task("clean-js", function(){
  gulp.src(config.JS_CLEAN)
    .pipe(clean());
})
gulp.task("clean-css", function(){
  gulp.src(config.CSS_CLEAN)
    .pipe(clean());
})

////监视sass
//gulp.task('watch-sass',function(){
//    gulp.watch(config.SASS_WATCH,['sass']);
//})
////sass编译，普通版（未压缩）
//gulp.task('sass',function(){
//    gulp.src(config.SASS_WATCH)
//        .pipe(sourcemaps.init())
//        .pipe(sass().on('error', sass.logError))
//        .pipe(gulp.dest('./src/css'))
//        .pipe(concat('myCms.css'))
//        .pipe(sourcemaps.write())
//        .pipe(gulp.dest('./dist'))
//})
////sass编译，压缩版
//gulp.task('sass-min',function(){
//  gulp.src(config.SASS_WATCH)
//    .pipe(sass().on('error', sass.logError))
//    .pipe(gulp.dest('./src/css'))
//    .pipe(concat('myCms.min.css'))
//    .pipe(gulp.dest('./dist'))
//    .pipe(minifycss())
//})
