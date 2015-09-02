var gulp = require('gulp'),
    selenium = require('selenium-standalone'),
    nightwatch = require('gulp-nightwatch'),
    plumber = require('gulp-plumber'),
    connect = require('gulp-connect');

function errorLog(error){
  console.error.bind(error);
  this.emit('end');
}

var args = process.argv.slice(2);
var seleniumUrl;

if (args.length > 1){
  seleniumUrl = args[1].replace('-', '');
}

gulp.task('selenium-connect', function (done) {

  if (!seleniumUrl){

    selenium.install({
      logger: function (message) { }
    }, function (err) {
      if (err) return done(err);

      selenium.start(function (err, child) {
        if (err) return done(err);
        selenium.child = child;
        done();
      });
    });

  } else {

    done();

  }

});

gulp.task('server', ['selenium-connect'], function() {
  connect.server();
});

gulp.task('tests', ['server'], function() {
  return gulp.src('')
    .pipe(nightwatch({
    }))
    .on('error', errorLog);
});

gulp.task('selenium-disconnect', ['tests'], function () {

  connect.serverClose();

  if (!seleniumUrl){
    selenium.child.kill();
  }

});


gulp.task('e2e', ['selenium-disconnect']);


