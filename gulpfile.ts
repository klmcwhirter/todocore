/*--------------------------------------------------------------------------*/

import {Gulpclass, SequenceTask, Task} from "gulpclass/Decorators";

let del = require("del");
let gulp = require("gulp");
let gulpDotnet = require('gulp-dotnet');
let gulpSourcemaps = require("gulp-sourcemaps");
let gulpTypings = require("gulp-typings");

var gulpTypescript = require('gulp-typescript');
var tsProject = gulpTypescript.createProject('./src/tsconfig.json');

var proc = require('child_process');
var gulpUtil = require('gulp-util');

var destDir = './dist';

/*--------------------------------------------------------------------------*/

@Gulpclass()
export class Gulpfile {
    /*-----------------------------------------------------------------------*/

    @Task('help')
    help(cb: Function) {
        const taskList = Object.keys(gulp.tasks)
            .filter(taskName => !taskName.startsWith(':'))
            .filter(taskName => !taskName.startsWith('ci:'))
            .filter(taskName => taskName != 'default')
            .sort();

        console.log(`\nHere's a list of supported tasks:\n   `, taskList.join('\n    '));
        console.log(`\nYou're probably looking for "clean" or "build".\n\n`);
    }

   @SequenceTask()
   default() {
        return ["help"];
    }

    /*-----------------------------------------------------------------------*/

    @Task('build:dotnet')
    buildDotnet(cb: Function) {
        return this.dotnetBuild('todocore.UnitTests', cb);
    }

    @Task('build:dotnet:update', ['build:dotnet'])
    buildDotnetUpdate(cb: Function) {
        return this.dotnetUpdate('todocore', cb);
    }

    @Task('build:vendor:typings')
    buildVendorTypings(cb: Function) {
        return gulp.src('./typings.json')
        .pipe(gulpTypings());
    }

    @Task('build:app:ts')
    buildAppTs(cb: Function) {
        var tsResult = tsProject.src('./src/**/*.ts')
        .pipe(gulpSourcemaps.init())
        .pipe(gulpTypescript(tsProject));

        return tsResult.js
        .pipe(gulpSourcemaps.write())
        .pipe(gulp.dest(destDir));
    }

    @Task('build:app', ['copy:app', 'build:app:ts'])
    buildApp(cb: Function) {
    }

   @SequenceTask('build')
   build() {
        return ['build:vendor:typings', ['build:app', 'build:dotnet:update']];
    }

    /*-----------------------------------------------------------------------*/

    @Task('clean:app')
    cleanApp(cb: Function) {
        return del([destDir],  {
            dryRun: false
        }, cb).then(function (paths) {
            console.log('Deleted files and folders:\n', paths.join('\n'));
        }).catch(function (err) {
            console.log('Delete failed: ' + err);
        });
    }

    @Task('clean:dotnet')
    cleanDotnet(cb: Function) {
        return del([
            './todocore/bin',
            './todocore/obj',
            './todocore.UnitTests/bin',
            './todocore.UnitTests/obj'
        ], {
            dryRun: false
        }, cb).then(function (paths) {
            console.log('Deleted files and folders:\n', paths.join('\n'));
        }).catch(function (err) {
            console.log('Delete failed: ' + err);
        });
    }

   @SequenceTask('clean')
   clean() {
        return ['clean:app', 'clean:dotnet'];
    }

    /*-----------------------------------------------------------------------*/


    @Task('copy:css')
    copyCss(cb: Function) {
        return gulp.src('src/**/*.css')
        .pipe(gulp.dest(destDir));
    }

    @Task('copy:html')
    copyHtml(cb: Function) {
        return gulp.src('src/**/*.html')
        .pipe(gulp.dest(destDir));
    }

    @Task('copy:vendor')
    copyVendor(cb: Function) {
        return gulp.src('node_modules/**/*')
        .pipe(gulp.dest(destDir + '/vendor'));
    }


   @SequenceTask('copy:app')
   copyApp() {
        return ['copy:css', 'copy:html', 'copy:vendor'];
    }

    /*-----------------------------------------------------------------------*/

 dotnetUpdate(project, done) {
  proc.exec('dotnet ef database update', {
    cwd: './' + project
  }, function (err, stdout, stderr) {
    if (err) {
      gulpUtil.log('dotnetUpdate: Error', err, stderr);
    } else {
      gulpUtil.log('dotnetUpdate:', stdout);
    }
    done && done();
  });
}

 dotnetBuild(project, done) {
  proc.exec('dotnet build ' + project, {
    cwd: './'
  }, function (err, stdout, stderr) {
    if (err) {
      gulpUtil.log('dotnetBuild: Failed', err);
    } else {
      gulpUtil.log('dotnetBuild:', stdout);
    }
    done && done();
  });
}

    /*-----------------------------------------------------------------------*/


}
