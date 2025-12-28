$(document).ready(function () {
console.log(location.href);
console.log(i18nextHttpBackend);
console.log(document.baseURI);


  i18next
    .use(i18nextHttpBackend)
    .init({
      lng: 'en',
      fallbackLng: 'en',
      backend: {
         loadPath:'/{{lng}}.json'
      }
    }, function () {

      jqueryI18next.init(i18next, $, {
        useOptionsAttr: true
      });

      $('body').localize();
      console.log('t(title):', i18next.t('login1'));
    });

  $('#sel-lang').on('change', function () {
    const chosenLng = this.value;

    i18next.changeLanguage(chosenLng, function () {
      $('body').localize();
    });
  });

});
