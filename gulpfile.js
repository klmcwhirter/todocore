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
  return del(['./bin/**', './obj/**'], {
    dryRun: false
  }).then(function (paths) {
    console.log('Deleted files and folders:\n', paths.join('\n'));
  }).catch(function (err) {
    console.log('Delete failed: ' + err);
  });
});

gulp.task('clean:vendor', function () {
  return del(['./wwwroot/**'], {
    dryRun: false
  }).then(function (paths) {
    console.log('Deleted files and folders:\n', paths.join('\n'));
  }).catch(function (err) {
    console.log('Delete failed: ' + err);
  });
});

gulp.task('clean', ['clean:dotnet', 'clean:vendor']);

gulp.task('copy:vendor', function () {
  return gulp.src('node_modules/**/*')
    .pipe(gulp.dest('./wwwroot/vendor'));
});

gulp.task('default', ['help']);

gulp.task('help', function () {
  const taskList = Object.keys(gulp.tasks)
    .filter(taskName => !taskName.startsWith(':'))
    .filter(taskName => !taskName.startsWith('ci:'))
    .filter(taskName => taskName != 'default')
    .sort();

  console.log(`\nHere's a list of supported tasks:\n   `, taskList.join('\n    '));
  console.log(`\nYou're probably looking for "clean" or "build".\n\n`);
});

gulp.task('build:dotnet', function () {
  return gulpDotnet.build();
});

gulp.task('build:dotnet:update', ['build:dotnet'], function () {
  return dotnetUpdate();
});

gulp.task('build:vendor:typings', function () {
  return gulp.src('./typings.json')
    .pipe(gulpTypings());
});

gulp.task('build:app', ['copy:css', 'copy:html', 'copy:vendor'], function () {
  var tsResult = tsProject.src()
    .pipe(gulpTypescript(tsProject));

  return tsResult.js
    .pipe(gulp.dest('./wwwroot'));
});

gulp.task('build', ['build:vendor:typings', 'build:app', 'build:dotnet:update']);

gulp.task('clean:app', function () {
  return del([
    './wwwroot',
  ]);
});

gulp.task('clean:dotnet', function () {
  return del([
    './bin',
    './obj'
  ]);
});

gulp.task('clean', ['clean:dotnet', 'clean:app']);

gulp.task('copy:html', function () {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('./wwwroot'));
});

gulp.task('copy:vendor', function () {
  return gulp.src('node_modules/**/*')
    .pipe(gulp.dest('./wwwroot/vendor'));
});

gulp.task('copy:css', function () {
  return gulp.src('src/**/*.css')
    .pipe(gulp.dest('./wwwroot'));
});
