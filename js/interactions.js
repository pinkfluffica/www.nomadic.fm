(function($){

    $(".detail-wrapper").each(function(){
        var $container = $(this);
        var $trigger = $container.find(".detail-header, .detail-sub-header");
        var $header = $container.find(".detail-header");
        var $content = $container.find(".detail-main");
        var miliseconds = 300;
        $trigger.on("click", function(){
            is_open = $content.is(":visible");
            $container.toggleClass('opened');
            if(is_open){
                // Close it
                $content.slideUp(miliseconds * 2, function(){
                    $header.slideDown(miliseconds);
                });
            } else {
                // Open it
                $header.slideUp(miliseconds, function(){
                    $content.slideDown(miliseconds * 2);
                });
            }

        });
    });

    var $narrowNav = $("ul.nav-narrow");
    var $narrowNavTrigger = $("a.nav-narrow");
    $narrowNavTrigger.click(function(e) {
        e.preventDefault();
        $narrowNav.slideToggle(500);
    });
    
    
    // sort out banner text centering
    function resizeBanner(){
        var bannerWrap = $(".banner-wrap");
        bannerWrap.height('auto');
        bannerWrap.height(bannerWrap.height());
    }
    $(window).on('load resize', resizeBanner);



})(jQuery);


// $(document).ready(function() {
//     setInterval(function() {
//         var activePhrase = $("span.phrases span.active");
//         var nextPhrase = activePhrase.next();
//         if (activePhrase.next().length == 0) {
//             nextPhrase = $("span.phrases span").first();
//         }   
// activePhrase.removeClass("active");
//         nextPhrase.addClass("active");
//     }, 4000);
// });

// <h1>Learning That <span class="phrases orange"><span class="active">Drives Innovation</span><span>Empowers Change</span><span>Connects Teams</span><span>Engages Leaders</span></span></h1>

// /*Front Page Header / Javascript*/

// span.phrases span {
//     -webkit-transition: display 2s ease;
//     display: none;
// }
// span.phrases span.active {
//     display: inline;
// }
