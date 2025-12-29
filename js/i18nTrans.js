// i18next 라이브러리+json+jquery 적용 다국어 지원

$(function () {

  i18next.use(i18nextHttpBackend).init({ //json 불러오기(fetch내장)

    lng: 'ko', //기본언어
    fallbackLng: 'ko', //key를 찾았을 때 없으면 나올 디폴트 언어
    debug: false,  
    backend: {loadPath: '../i18n/{{lng}}.json'},
    useDataAttrOptions : true, //data-i18n 속성 사용

  }, function () {

  jqueryI18next.init(i18next, $, { //jquery연결
    tName:'t'
    });

  $('body').localize(); //data-i18n 값 적용

  });

$('.global select').on('change', function() {

  const lang = $(this).find('option:selected').val();

  i18next.changeLanguage(lang, function () { //언어 변경
    $('#mb-menu-area .mb-gnb').hide();

    if (i18next.language=='ko') {
      $('#mb-menu-area .ko_gnb').show();
    }
    else if (i18next.language=='en') {
      $('#mb-menu-area .en_gnb').show();
    }
    else if (i18next.language=='cn') {
      $('#mb-menu-area .en_gnb').show();
    }
    
    $('body').localize();
  });

  });

});