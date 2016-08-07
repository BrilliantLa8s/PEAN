app.config(function($mdThemingProvider) {
  var themes;
  themes = {
    theme1: '#C1676F',
    theme2: '#DF8797',
    theme3: '#EDBEC8',
    theme4: '#94B7BB',
    theme5: '#ACC6C9',
    theme6: '#C6B170',
    theme7: '#E2D1A6'
  };
  angular.forEach(themes, function(theme, key) {
    return $mdThemingProvider.definePalette(key, {
      '50': theme,
      '100': theme,
      '200': theme,
      '300': theme,
      '400': theme,
      '500': theme,
      '600': theme,
      '700': theme,
      '800': theme,
      '900': theme,
      'A100': theme,
      'A200': theme,
      'A400': theme,
      'A700': theme,
      'contrastDefaultColor': 'light'
    });
  });
  $mdThemingProvider.definePalette('white', {
    '50': '#fff',
    '100': '#fff',
    '200': '#fff',
    '300': '#fff',
    '400': '#fff',
    '500': '#fff',
    '600': '#fff',
    '700': '#fff',
    '800': '#fff',
    '900': '#fff',
    'A100': '#fff',
    'A200': '#fff',
    'A400': '#fff',
    'A700': '#fff',
    'contrastDefaultColor': 'dark'
  });
  return $mdThemingProvider.theme('default').primaryPalette('white').accentPalette('theme2').warnPalette('theme6');
});
