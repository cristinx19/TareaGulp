const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass')(require('sass'));
const git = require('gulp-git');

// Tarea para borrar archivos CSS
gulp.task('borrar-css', function () {
  return del(['css/*.css']);
});

// Tarea para compilar Sass a CSS y moverlo a la carpeta 'css'
gulp.task('compilar-sass', function () {
  return gulp.src('sass/*.scss') // Ruta a tus archivos Sass
    .pipe(sass({ implementation: require('dart-sass') }).on('error', sass.logError))
    .pipe(gulp.dest('css'));
});

// Tarea para agregar cambios al área de preparación de Git
gulp.task('git-add', function () {
  return gulp.src('.')
    .pipe(git.add({ maxBuffer: Infinity }));
});

// Tarea para realizar un commit en Git
gulp.task('git-commit', function () {
  return gulp.src('.')
    .pipe(git.commit('Actualizar estilos Sass'));
});

// Tarea para realizar un push a GitHub
gulp.task('git-push', function (cb) {
  git.push('origin', 'main', function (err) {
    if (err) return cb(err);
  });
});

// Tarea predeterminada que ejecuta las tareas 'borrar-css', 'compilar-sass' y las tareas de Git en secuencia
gulp.task('default', gulp.series('borrar-css', 'compilar-sass', 'git-add', 'git-commit', 'git-push'));
