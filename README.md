# PostCSS Pseudo-Element Colons

[PostCSS](https://github.com/postcss/postcss) plugin to format single or double colon notation on pseudo elements.

Turn `.fancy-style:before {` into `.fancy-style::before {` and vice versa.

### Jump To Section
- [Installation](#installation)
- [Usage](#usage)
  - [postcss-cli](#with-postcss-cli)
  - [node.js](#with-nodejs)
  - [grunt.js](#grunt-with-grunt-postcss)
  - [gulp.js](#gulpjs-with-gulp-postcss)
- [Options](#options)
  - [Defaults](#default-options)
  - [selectors](#selectors)
  - [colon-notation](#colon-notation)
- [Examples](#examples)
  - [Enforced Double Colon](#enforced-double-colon)
  - [Enforced Single Colon](#enforced-single-colon)

---

## Installation

```
$ npm install postcss-pseudo-element-colons --save-dev
```
*Note:  This plugin is for [PostCSS](https://github.com/postcss/postcss).*

## Usage

### With postcss-cli

```shell
$ postcss --use postcss-pseudo-element-colons style.css
```

### With Node.js:
```js
var fs           = require( 'fs' ),
    postcss      = require( 'postcss' ),
    pseudoColons = require( 'postcss-pseudo-element-colons' );

const
  options = {
    "selectors": [
        "before",
        "after",
        "first-letter",
        "first-line"
    ],
    "colon-notation": "single"
  };

fs.readFile( 'style.css', ( err, css ) => {
  postcss( [pseudoColons( options )] )
    .process( css, {
      from: 'style.css',
      to: '/style.css'
    }).then( result => {
      fs.writeFile( 'style.css', result.css,
        ( err ) => {
          if ( err ) throw err;
        });
    }).catch( ( err ) => {
      console.log( err );
    });
});
```

### Grunt with [grunt-postcss](https://github.com/nDmitry/grunt-postcss/)

Running default options:

```js
module.exports = function( grunt ) {
  grunt.initConfig({
    postcss: {
      options: {
        processors: [
          require( 'postcss-pseudo-element-colons' )
        ]
      },
      dist: {
        src: 'src/style.css',
        dest: 'dist/style.css'
      }
    }
  });

  grunt.loadNpmTasks( 'grunt-postcss' );
};
```

Running custom options:

```js
module.exports = function( grunt ) {
  grunt.initConfig({
    postcss: {
      options: {
        processors: [
          require( 'postcss-pseudo-element-colons' )({
            "selectors": [
                "before",
                "after"
            ],
            "colon-notation": "single"
          })
        ]
      },
      dist: {
        src: 'src/style.css',
        dest: 'dist/style.css'
      }
    }
  });

  grunt.loadNpmTasks( 'grunt-postcss' );
};
```

### Gulp.js with [gulp-postcss](https://github.com/postcss/gulp-postcss)

```js
var gulp         = require( 'gulp' );
var postcss      = require( 'gulp-postcss' );
var pseudoColons = require( 'postcss-pseudo-element-colons' );

const
  options = {
    "selectors": [
        "before",
        "after",
        "first-letter",
        "first-line"
    ],
    "colon-notation": "single"
  };

gulp.task( 'postcss', function(){
	gulp.src( 'src/style.css' )
		.pipe( postcss( [ pseudoColons( options ) ] ) )
		.pipe( gulp.dest( 'dist' ) );
});
```

## Options

### Default Options:

```json
{
  "selectors": [
      "before",
      "after",
      "first-letter",
      "first-line"
  ],
  "colon-notation": "double"
}
```

### selectors

Accepts array of pseudo-elements which should have single or double colon syntax enforced in stylesheet.

Defaults to `["before", "after", "first-letter", "first-line"]`.

### colon-notation

Accepts `"single"` or  `"double"` for the psudeo-element's colon notation.

`"single"` produces syntax like: `.fancy-style:before {`

`"double"` produces syntax like `.fancy-style::before {`


## Examples

### Enforced Double Colon

Before enforcing the double colon [option](#options) ( default ):

```css
.fancy-style:first-line {
  font-variant: small-caps;
}
.fancy-style:before, .fancy-style::after {
  content: "";
}
.fancy-style:first-letter {
  color: blue;
}
```

After running the PostCSS plugin:

```css
.fancy-style::first-line {
  font-variant: small-caps;
}
.fancy-style::before, .fancy-style::after {
  content: "";
}
.fancy-style::first-letter {
  color: blue;
}
```

### Enforced Single Colon

Before enforcing the single colon [option](#options):

```css
.fancy-style::first-line {
  font-variant: small-caps;
}
.fancy-style::before, .fancy-style:after {
  content: "";
}
.fancy-style::first-letter {
  color: blue;
}
```

After running the PostCSS plugin:

```css
.fancy-style:first-line {
  font-variant: small-caps;
}
.fancy-style:before, .fancy-style:after {
  content: "";
}
.fancy-style:first-letter {
  color: blue;
}
```