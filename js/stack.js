$(function () {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    collect.hambuger();
    collect.mbLnb();
    collect.pcLnb();
    collect.playSwiper();
    collect.part1Init();
    collect.enjoyAnimation(); //페이지 로드시 스크롤되어 있는 상태면 애니메이션 실행
    collect.scrollEvent();
    collect.addQuick();
    collect.quickMenu();
    collect.pageTop();
    collect.mbMenuAreaPcHide();
});

$(window).on('load', function () {
  ScrollTrigger.refresh(); //gsap ScrollTrigger 버벅임 해결
});

$(window).on('scroll', function() {
    collect.scrollEvent();
    collect.quickMenuClose();
});

$(window).on('resize', function() {
    collect.addQuick();
    collect.mbMenuAreaPcHide();
});


let collect = { 

    // 햄버거 버튼 클릭 시 메뉴 열기
    hambuger : function() {
        $('.hambugerMenu').on('click', function() {
            if($(this).hasClass('active')) { //닫기
                collect.mbMenuAreaClose();
            }
            else { //열기
                collect.mbMenuAreaOpen();
            };
        });
    },

    // 메뉴 닫기
    mbMenuAreaClose : function() {
        $('.hambugerMenu').removeClass('active').attr('aria-label', '메뉴 열기');
        gsap.to('#mbMenuArea, #mbMenuArea .topArea', {
            right:'-100%', duration: 0.3
        });
        $('.mbDim').stop().fadeOut(300);
        $('body').css({'overflow': ''});
    },

    // 메뉴 열기
    mbMenuAreaOpen : function() {
        $('.hambugerMenu').addClass('active').attr('aria-label', '메뉴 닫기');
        gsap.to('#mbMenuArea, #mbMenuArea .topArea', {
            right: 0, duration: 0.3
        });
        $('.mbDim').stop().fadeIn(300);
        $('body').css({'overflow': 'hidden'}); // 스크롤바 없애기
    },

    // pc화면에서 mbMenuArea 닫기
    mbMenuAreaPcHide : function() {
        if ($(window).width() > 1023) {
            $('.mbDim').hide();
            collect.mbMenuAreaClose();
        }
    },

    // mbGnb 하위 메뉴 열기
    mbLnb : function() {
        $('#mbGnb').on('click', 'li.depth1', function() {
            $(this).addClass('active').siblings().removeClass('active');
            $(this).find('ul.depth2').show();
            $(this).siblings().find('ul.depth2').hide();
        });
    },

    pcLnb : function() {
        // pcGnb 하위 메뉴 열기
        $('#pcGnb').on('mouseenter', function() {
            $(this).addClass('active')
            .find('.depth2').stop().slideDown(200);
            $('.pcGnbBg').stop().animate({ height: 500 }, 200);
            $('.headerDim').stop().fadeIn(300);
        });

        // pcGnb 하위 메뉴 닫기
        $('header').on('mouseleave', function() {
            $(this).removeClass('active')
            .find('.depth2').stop().slideUp(200);
            $('.pcGnbBg').stop().animate({ height: 0 }, 200);
            $('.headerDim').stop().fadeOut(300);
        });

        // pcGnb 메뉴&하위 메뉴 클릭시 스타일링
        $('#pcGnb > ul > li .depth1 , #pcGnb .depth2 li a').on('click', function () {
            $('#pcGnb > ul > li .depth1').removeClass('active');
            $(this)
            .closest('#pcGnb > ul > li')
            .children('.depth1')
            .addClass('active');
        });
    },

    // .part1 playSwiper slide
    playSwiper : function() {
        // 원본 슬라이드 7->14개
        $('.playSwiper .swiper-wrapper').append($('.playSwiper .swiper-slide').clone()); //loopAdditionalSlides옵션 대신 적용하여 버그 해결
        const realSlideLeng = $('.playSwiper .swiper-slide').length; //14

        // 슬라이드 번호 부여 (아이콘 적용)
        const slides = $('.playSwiper .swiper-slide'); //여기서 초기화 해야 복제한 슬라이드까지 캐싱할 수 있음

        slides.each(function (idx, el) {
            $(this).addClass(`slide${idx+1}`);
        });

        // 스와이퍼 초기화
        var playSwiper = new Swiper(".playSwiper", {
            slidesPerView: 'auto',
            centeredSlides: true,
            loop: true,
            simulateTouch: false,
            speed: 500,
            autoplay: {
                delay: 1500,
                disableOnInteraction: false,
            },
            spaceBetween: 30,
            breakpoints: {
                768: {
                    spaceBetween: 50,
                }
            },
            on: {
                init: function () {
                    // 페이지 첫 로드시 첫 슬라이드 트랜지션 효과 없음
                    const slide1 = $('.playSwiper .slide1');
                    slide1.addClass('notrans');
                    setTimeout(function () {
                        slide1.removeClass('notrans');
                    }, 100);
                },
                slideChange: function () {
                    let currentIdx = this.realIndex;
                    let backColorNum = currentIdx + 1;
                    const part1 = $('.part1');
                    const mockup = part1.find('.mockup');

                    // .part1 배경 색 변경
                    for(let i=1; i<=realSlideLeng; i++) {
                        part1.removeClass(`color${i}`);
                    }
                    part1.addClass('color'+backColorNum); //1~14

                    // .list li 색 적용
                    mockup.find('.list li').removeClass('active');
                    if (currentIdx<3) {
                        mockup.find('.list1').addClass('active');
                    } else if (currentIdx<7) {
                        mockup.find('.list2').addClass('active');
                    } else if (currentIdx<11) {
                        mockup.find('.list3').addClass('active');
                    } else if (currentIdx<12) {
                        mockup.find('.list4').addClass('active');
                    } else {
                        mockup.find('.list5').addClass('active');
                    };
                }
            }
        });
    },

    // enjoy part 애니메이션 (part1제외)
    enjoyAnimation : function() {
        const part = $('.part');

        part.each(function (idx) {
            const $this = $(this);
            const changeImg = $this.find('.changeImg');
            const moveImg = $this.find('.move img');

            ScrollTrigger.create({
                trigger: this,
                once: true, // 트리거 한 번만 실행
                // scrub: true, //scrollTrigger에서 많이 씀 부드러워짐. But duration 의미 없어짐
                start: "top 35%", //part요소가 뷰포트 35% 지점에 오면
                onEnter: () => { //실행
                    switch(idx) {
                        case 1: //part2
                            const tl2 = gsap.timeline();
                            tl2.to(changeImg.find('.imgRotate'), {
                                rotate: -360,
                                duration : 2.2,
                                ease : 'cubic-bezier(.36, -.06, .16, .93)',
                                delay : .2
                            })
                            .to(changeImg.find('.imgWin'), {
                                opacity : 1,
                                duration: .3,
                                ease : 'power1.inOut'
                            });
                            break;
                        case 2: //part3
                            gsap.to(changeImg.find('img'),{
                                opacity:1,
                                duration:.7,
                                ease:'power1.inOut',
                                delay:.4, //전체 애니메이션 딜레이 시간
                                stagger : .4 //각 요소 애니메이션의 시작 시점 사이 간격//요소 각각에 적용하면 안되고 전체 요소 묶음에 적용시켜야 함
                            });
                            break;
                        case 3: //part4
                            gsap.to(changeImg.find('img:not(.imgChange1)'),{
                                x : 0,
                                duration: .6,
                                ease: 'cubic-bezier(.07,.04,.5,1.01)',
                                delay: 1.4,
                                stagger: 1.8
                            });
                            break;
                        case 4: //part5
                            const tl5 = gsap.timeline();
                            tl5.to(changeImg.find('.imgChange1'), {
                                right : '50%',
                                x : '50%',
                                duration : .7,
                                ease : 'power1.inOut'
                            }, .2)
                            .to(changeImg.find('.imgChange2'), {
                                left : 0,
                                duration : .7,
                                ease : 'power1.inOut'
                            }, .2)
                            .to(changeImg.find('.imgChange3'), {
                                opacity : 1,
                                duration: .4,
                                ease : 'power1.inOut'
                            }, .9);
                            break;
                        case 5: //part6
                            const tl6 = gsap.timeline();
                            tl6.to(moveImg, {
                                x : '-110%',
                                duration : .64,
                                ease : 'power1.inOut'
                            }, .2)
                            .to(moveImg, {
                                x: '-110%',
                                duration: .96,
                                ease: 'none' // 유지 구간은 easing 없이 고정
                            })
                            .to(moveImg, {
                                x : '-220%',
                                duration : .64,
                                ease : 'power1.inOut'
                            })
                            .to(moveImg, {
                                x: '-220%',
                                duration: .96,
                                ease: 'none'
                            });
                            break;
                        case 6: //part7
                            gsap.to(changeImg.find('.imgChange1'),{
                                y : '-78.25%',
                                duration: 3,
                                ease: 'cubic-bezier(.36, -.06, .16, .93)',
                                delay: .2,
                            });
                            break;
                    };

                    // gsap 대신 active로 애니메이션 주기 (원본 방식)
                    // if(idx === 0) return; //part1 제외
                    // part.eq(idx).find('.imgBox').addClass('active');
                }
            });
        });
    },

    // part1 등장
    part1Init : function() {
        $('.part1 .inner').addClass('on');
    },

    // 사이드바 조정
    scrollEvent : function() {
        const winH = $(window).height();
        const winY = $(window).scrollTop();
        const quickNav = $('.quickNav');
        const pageTop = $('.pageTop');

        if (winY>winH) {
            quickNav.addClass('withPageTop'); //.quickNav padding-bottom 값 수정
            pageTop.fadeIn(); //.pageTop 보이기
        }
        else {
            quickNav.removeClass('withPageTop');
            pageTop.fadeOut();
        }
    },

    // quickMenu()에서 쓰일 .mbQuick
    addQuick : function() {
        const quickMenu = $('.quickNav .quickMenu');

        if($(window).width() > 1007) { //스크롤바 17px 제외
            quickMenu.removeClass('mbQuick');
        } 
        else{
            quickMenu.addClass('mbQuick');
        };
	},

    // .quickMenu 열고 닫기
    quickMenu : function() {
        const quickNav = $('.quickNav');
        //.quickBtn 클릭시 .quickMenu 열고 닫기
        quickNav.find('.quickBtn').on('click', function () {
            quickNav.find('.quickMenu').stop().slideToggle(200);
        });
        collect.quickMenuClose();
    },

    // .quickMenu 열려있는 상태면 닫기
    quickMenuClose : function() {
        const quickMenu = $('.quickNav .quickMenu');
        if(quickMenu.is(':visible')&&quickMenu.hasClass('mbQuick')) { // :visible은 스크롤시 slideUp 버그 차단
            quickMenu.slideUp(200);
        };
    },

    // 페이지 최상단 이동
    pageTop : function() {
        $('.pageTop').on('click', function () {
            gsap.to(window, { scrollTo: { y: 0 }, duration: 0.3 });
        });
    }

};