# SystemJS + AngularJS for modules.

Seed project for ES6 modules via SystemJS with ES6 syntax using Babel

Based on https://github.com/Swimlane/angular-systemjs-seed


![](http://media.giphy.com/media/EldfH1VJdbrwY/giphy.gif)

This project does:

- ES6 Syntax via Babel with source maps
- ES6 Modules via SystemJS
- Karma / Jasmine unit tests with coverage report
- Gulp

### Install & Run

1. `npm install` to install all dependencies
2. `gulp test` to run karma tests or `gulp tdd` to re-run test on each change
3. `open coverage/chrome/index.html` on terminal

### Tasks
gulp lint
  chequea el codigo javascript y genera un reporte con las correcciones necesarias

gulp production:flow
  prepara el codigo, imagenes, html y estilos y lo deja listo para deployar

gulp release
  genera la distribucion y la publica en el repositorio npm-redbee

gulp watch
  levanta el servidor con la app genereada y queda pendiente de algun cambio

gulp test
  corre los test con karma

gulp tdd
  corre los test con karma y vuelve a correr los test con cada cambio

gulp sonar
  corre SonarRunner y deja el reporte en sonar
