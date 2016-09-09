var gulp = require('gulp');
var gulpUtil = require('gulp-util');
var gulpDotnet = require('gulp-dotnet');
var proc = require('child_process');
var gulpTypings = require("gulp-typings");
var gulpTypescript = require('gulp-typescript');
var tsProject = gulpTypescript.createProject('./tsconfig.json');
var del = require('del');

function dotnetUpdate(done) {
  proc.exec('dotnet ef database update', function (err, stdout, stderr) {

    if (err) {
      gulpUtil.log(1, 'Restore Error', err);
    } else {
      gulpUtil.log(1, stdout);
    }
    done && done();
  });
}

gulp.task('clean:dotnet', function () {
  return del([
    './bin',
    './obj'
  ]);
});

gulp.task('clean:lib', function () {
  return del([
    './wwwroot/app',
    './wwwroot/lib',
    './wwwroot/app/*.js'
  ]);
});

gulp.task('clean', ['clean:dotnet', 'clean:lib']);

gulp.task('copy:lib', function () {
  return gulp.src('node_modules/**/*')
    .pipe(gulp.dest('./wwwroot/lib'));
});

gulp.task('build:dotnet', function () {
  return gulpDotnet.build();
});

gulp.task('build:dotnet:update', ['build:dotnet'], function () {
  return dotnetUpdate();
});

gulp.task('build:lib:typings', function () {
  return gulp.src('./typings.json')
    .pipe(gulpTypings());
});

gulp.task('build:lib', ['copy:lib', 'build:lib:typings'], function () {
  var tsResult = tsProject.src()
    .pipe(gulpTypescript(tsProject));

  return tsResult.js
    .pipe(gulp.dest('./wwwroot/app'));
});

gulp.task('build', ['build:lib', 'build:dotnet:update']);
