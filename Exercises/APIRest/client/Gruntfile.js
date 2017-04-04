const grunt = require('grunt');
const path = require('path');
const del = require('del');

grunt.loadNpmTasks('grunt-exec');
grunt.loadNpmTasks('grunt-contrib-htmlmin');
grunt.loadNpmTasks('grunt-contrib-compress');
grunt.loadNpmTasks('grunt-size-report');

const { config, distDir } = require('./config');

grunt.initConfig({
  htmlmin: {
    dist: {
      options: {
        removeComments: true,
        collapseWhitespace: true
      },
      expand: true,
      cwd: path.resolve(__dirname, config.distDir),
      dest: path.resolve(__dirname, config.distDir),
      src: [path.join('templates', '*.html'), 'index.html']
    }
  },
  compress: {
    main: {
      options: {
        mode: 'gzip',
        level: 9
      },
      files: [
        // Each of the files in the src/ folder will be output to
        // the dist/ folder each with the extension .gz.js
        {expand: true, src: [
          path.join(path.resolve(__dirname, config.distDir, distDir.jsDir), '*.js')], ext: '.gz.js'}
      ]
    }
  },
  size_report: {
    your_target: {
      files: {
        list: [path.join(path.resolve(__dirname, config.distDir, distDir.jsDir), '*.js')]
      }
    }
  },
  exec: {
    prodstart: {
      cmd: 'babel-node server.js'
    },
    minify: {
      cmd: 'grunt uglify'
    },
    'prod-webpack': {
      cmd: 'node ./node_modules/webpack/bin/webpack --optimize-minimize -p'
    },
    'webpack-dev-server': {
      cmd: `webpack-dev-server --port ${config.devPort} --compress` // --progress
    }
  }
});

grunt.task.registerTask('delete', function () {
  const done = this.async();
  console.log('1. Deleting files');

  del([`${path.resolve(__dirname, config.distDir, '**')}`]).then(() => {
    done();
  });
});

/** DEVELOPMENT **/
grunt.task.registerTask('developmentEnv', function () {
  process.env.NODE_ENV = 'development';
});

grunt.task.registerTask('dev', ['developmentEnv', 'exec:webpack-dev-server']);

/** PRODUCTION **/
grunt.task.registerTask('productionEnv', function () {
  process.env.NODE_ENV = 'production';
});

grunt.task.registerTask('prod-webpack', ['exec:prod-webpack']);

grunt.task.registerTask('minify', ['exec:minify']);

grunt.task.registerTask('prodstart', ['exec:prodstart']);

grunt.task.registerTask('prod', ['delete', 'productionEnv', 'prod-webpack', 'compress', 'htmlmin', 'size_report', 'prodstart']);
