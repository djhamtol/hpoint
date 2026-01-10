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

    // mbGnb depth2 열기
    $('#mbMenuArea #mbGnb').on('click', 'li.depth1', function(){

        $(this).addClass('active').siblings().removeClass('active');

        $(this).find('ul.depth2').show();
        
        $(this).siblings().find('ul.depth2').hide();

    });
    
});