const { src, dest, series } = require('gulp');
const clean = require('gulp-clean');
const sass = require('gulp-sass')(require('sass'));
const git = require('simple-git');
const cleanCSS = require('gulp-clean-css');

function compilar_Sass(cb) {
    const archivosSCSS = ['./sass/estilos.scss', './sass/estilos1.scss', './sass/estilos2.scss', './sass/estilos3.scss', './sass/estilos4.scss'];
    return src(archivosSCSS)
    .pipe(sass())
    .pipe(dest('css'));
}

function limpiar_Estilos(cb) {
    return src('./css/*', { read: false, allowEmpty: false })
    .pipe(clean());
}

function comprimir_CSS(cb) {
    const archivosCSS = ['./css/estilos.css', './css/estilos1.css', './css/estilos2.css', './css/estilos3.css', './css/estilos4.css'];
    return src(archivosCSS)
    .pipe(cleanCSS())
    .pipe(dest('css'));
}

function subir_GitHub(cb) {
  git()
    .add('.')
    .commit('Subir a GitHub')
    .push('origin', 'main', function (err) {
      if (err) {
        console.error(err);
        cb(err);
      } else {
        cb();
      }
    });
}

exports.limpiarEstilos = limpiar_Estilos;
exports.compilarSass = compilar_Sass;
exports.comprimirCSS = comprimir_CSS;
exports.subirGitHub = subir_GitHub;

exports.default = series(limpiar_Estilos, compilar_Sass, comprimir_CSS, subir_GitHub);