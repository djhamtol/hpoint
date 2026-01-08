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

  mbGnb(); //기본 언어에 맞는 gnb 노출, i18next는 비동기라서 로딩이 완료되면 실행하는 콜백함수 내에서 작동시키기

  });


  const mbGnb = function () {

    $('.mb-gnb').append(`<ul></ul>`);

    i18next.t('gnb', { returnObjects: true }).forEach((menu, idx) => {
      let menuLi = $(
          `<li class="depth1">
          <span>${menu.depth1}</span>
          </li>`
        );

      // $('.mb-gnb > ul').append(
      //   `<li class="depth1">
      //   <span>${menu.depth1}</span>
      //   </li>`
      //   );

      if (menu.children && menu.children.length) {



        const subUl = $(`<ul class="depth2"></ul>`);
        
        menu.children.forEach((sub) => {

          subUl.append(

            `<li><a href="${sub.link}">${sub.depth2}</a></li>`

            );

        })

        menuLi.append(subUl);

      } else {
        menuLi = $(
          `<li class="depth1">
          <a href="${menu.link}">
          <span>${menu.depth1}</span>
          </a>
          </li>`
        );
      }

      $('.mb-gnb > ul').append(menuLi);

    })

  }


  $('.global select').on('change', function() {

    const lang = $(this).find('option:selected').val();

    i18next.changeLanguage(lang, function () { //언어 변경

      $('body').localize();
      
      $('.mb-gnb').empty();

      mbGnb();

    });

  });

});
