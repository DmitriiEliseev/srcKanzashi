const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const less = require('gulp-less');


const files = [
    './src/js/**/scripts.js',
	'./src/js/**/1_scripts.js',
	'./src/js/**/2_scripts.js',
	'./src/js/**/3_scripts.js',
	'./src/js/**/4_scripts.js',
	'./src/js/**/5_scripts.js',
	'./src/js/**/6_scripts.js',
	'./src/js/**/7_scripts.js',
	'./src/js/**/8_scripts.js',
	'./src/js/**/9_scripts.js',
	'./src/js/**/10_scripts.js'
];

gulp.task('css', function(){

	gulp.src('./src/**/*.css')
		.pipe(sourcemaps.init())
		.pipe(concat('styles.css'))
		.pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .on('error', console.error.bind(console))
        .pipe(cleanCSS({
			level: 2
		}))
        .pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./res/css'))
		.pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('css-watch', ['browserSync'], function(){
	gulp.watch('./src/**/*.css', ['css'])
});

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: './src'
        }
    });
});

gulp.task('js', function(){

	gulp.src(files)
		.pipe(sourcemaps.init())
		.pipe(concat('scripts.js'))
		.pipe(babel({
            presets: ['env']
        }))
        .on('error', console.error.bind(console))
        .pipe(uglify({
        	toplevel: true
        }))
        .pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./res/js'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('js-watch', ['browserSync'], function(){
	gulp.watch('./src/js/**/*.js', ['js']);
});

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: './src'
        }
    });
});


gulp.task('less', function(){

	gulp.src('./src/styles.less')
		.pipe(sourcemaps.init())
        .pipe(less())
		.pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .on('error', console.error.bind(console))
        .pipe(cleanCSS({
			level: 2
		}))
        .pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./res/css'))
		.pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('less-watch', ['browserSync'], function(){
	gulp.watch('./src/less/**/*.less', ['less'])
});

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: './src'
        }
    });
});
