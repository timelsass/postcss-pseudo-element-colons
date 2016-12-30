const postcss = require( 'postcss' );

module.exports = postcss.plugin( 'postcss-pseudo-element-colons', ( options ) => {

  options = options || {};

  const
    selectors = options.selectors || [
      'before',
      'after',
      'first-letter',
      'first-line'
    ],
    notationOption = options['colon-notation'] || 'double',
    notation = notationOption === 'double' ? '::' : ':',
    replacements = new RegExp( '(?:|:):(' + selectors.join('|') + ')', 'gi' );

  return ( css ) => {
    css.walkRules( ( rule ) => {
      rule.selector = rule.selector.replace( replacements, notation + '$1' );
    });
  }
});