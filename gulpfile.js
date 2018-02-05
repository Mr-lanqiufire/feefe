var gulp=require('gulp');
// 压缩html
var htmlmin=require('gulp-htmlmin');
// 编译less
var less=require('gulp-less');
// 压缩CSS
var minifyCss=require('gulp-minify-css');
// 压缩js
var uglify=require('gulp-uglify');
// 检测浏览器刷新
var browserSync=require('browser-sync').create();
// 任务:压缩html
gulp.task('html',function(){
	gulp.src('index.html')
	.pipe(htmlmin({
		collapseWhitespace:true,
		removeContents:true
	}))
	.pipe(gulp.dest('dist/'))
	.pipe(browserSync.stream());

	gulp.src('page/**/*.html')
	.pipe(htmlmin({
		collapseWhitespace:true,
		removeContents:true
	}))
	.pipe(gulp.dest('dist/page/'))
	.pipe(browserSync.stream());
})
// 任务:编译less,压缩CSS
gulp.task("less",function(){
	gulp.src('less/**/*.less')
	.pipe(less())
	.pipe(minifyCss())
	.pipe(gulp.dest('dist/css'))
	.pipe(browserSync.stream());
})

// 任务:压缩js
gulp.task('js',function(){
	gulp.src('js/**/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'))
	.pipe(browserSync.stream());
})
// 任务：移动图片
gulp.task('img',function(){
	gulp.src('images/**/*.*')
	.pipe(gulp.dest('dist/images'))
	.pipe(browserSync.stream());
})
// 任务：检测文件变动
gulp.task('watch',function(){
	gulp.watch(["index.html","page/**/*.html"],['html'])
	gulp.watch('less/**/*.less',['less'])
	gulp.watch('js/**/*.js',['js'])
	gulp.watch('images/**/*.*',['img'])
})
// 任务：浏览器自动刷新
gulp.task('browser-sync',function(){
	browserSync.init({
		port:8888,
		server:{
			baseDir:'dist/'
		}
	});
})

// 任务：移动项目需要的框架到dist中
gulp.task('lib',function(){
	gulp.src('node_modules/jquery/dist/**/*.*')
	.pipe(gulp.dest('dist/lib/jquery'));
	gulp.src('node_modules/bootstrap/dist/**/*.*')
	.pipe(gulp.dest('dist/lib/bootstrap'));
})