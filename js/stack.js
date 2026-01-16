$(function () {
    
    // 햄버거 버튼
    $('header .mbHdUtils .hambugerMenu').on('click', function(){
        
        if($(this).hasClass('active')) { //닫기

            $(this).removeClass('active').attr('aria-label', '메뉴 열기');

            gsap.to('#mbMenuArea, #mbMenuArea .topArea', {
                right:'-100%', duration: 0.3
            });

        }

        else { //열기

            $(this).addClass('active').attr('aria-label', '메뉴 닫기');

            gsap.to('#mbMenuArea, #mbMenuArea .topArea', {
                right: 0, duration: 0.3
            });

        }

    });

    // mbGnb 하위 메뉴 열기
    $('#mbGnb').on('click', 'li.depth1', function(){

        $(this).addClass('active').siblings().removeClass('active');

        $(this).find('ul.depth2').show();
        
        $(this).siblings().find('ul.depth2').hide();

    });

    // pcGnb 하위 메뉴 열기
    $('#pcGnb').on('mouseenter', function(){

        $(this).addClass('active')
        .find('.depth2').stop().slideDown(200);

        $('.pcGnbBg').stop().animate({ height: 500 }, 200);

        $('.headerDim').stop().fadeIn(200);

    });

    // pcGnb 하위 메뉴 닫기
    $('header').on('mouseleave', function(){

        $(this).removeClass('active')
        .find('.depth2').stop().slideUp(200);

        $('.pcGnbBg').stop().animate({ height: 0 }, 200);

        $('.headerDim').stop().fadeOut(200);
        
    });

    // pcGnb 메뉴&하위 메뉴 클릭시 스타일링
    $('#pcGnb > ul > li .depth1 , #pcGnb .depth2 li a').on('click', function () {

        $('#pcGnb > ul > li .depth1').removeClass('active');

        $(this)
        .closest('#pcGnb > ul > li')
        .children('.depth1')
        .addClass('active');

    });

});