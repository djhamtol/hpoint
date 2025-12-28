$(function () {

  i18next.use(i18nextHttpBackend).init({

    lng: 'ko',
    fallbackLng: 'ko',
    debug: true,
    backend: {loadPath: '../i18n/{{lng}}.json'},
    useDataAttrOptions : true,

  }, function () {

  jqueryI18next.init(i18next, $, {
    tName:'t'
    });

  $('body').localize();

  });

$('.global select').on('change', function() {

  const lang = $(this).find('option:selected').val();

  i18next.changeLanguage(lang, function () {
    $('body').localize();

  });

  });

});