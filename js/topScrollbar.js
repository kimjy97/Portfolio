/* PrognRoll | https://mburakerman.github.io/prognroll/ | @mburakerman | License: MIT */
(function ($) {
    $.fn.prognroll = function (options) {

        var settings = $.extend({
            height: 4, // progress bar height
            color: "#50bcb6", // progress bar background color
            custom: false // if you make it true, you can add your custom div and see it's scroll progress on the page
        }, options);

        return this.each(function () {
            if ($(this).data('prognroll')) {
                return false;
            }
            $(this).data('prognroll', true);

            var $span = $("<span>", {
                class: "bar"
            });
            $("body").prepend($span);

            $span.css({
                position: "fixed",
                top: 0,
                left: 0,
                width: 0,
                height: settings.height,
                backgroundColor: settings.color,
                zIndex: 9999999
            });

            if (settings.custom === false) {

                $(window).scroll(function (e) {
                    e.preventDefault();
                    var windowScrollTop = $(window).scrollTop();
                    var windowHeight = $(window).outerHeight();
                    var bodyHeight = $(document).height();

                    var total = (windowScrollTop / (bodyHeight - windowHeight)) * 100;

                    $(".bar").css("width", total + "%", "transition", "200ms ease");
                });

            } else {

                $(this).scroll(function (e) {
                    e.preventDefault();
                    var customScrollTop = $(this).scrollTop();
                    var customHeight = $(this).outerHeight();
                    var customScrollHeight = $(this).prop("scrollHeight");

                    var total = (customScrollTop / (customScrollHeight - customHeight)) * 100;

                    $(".bar").css("width", total + "%", "transition", "200ms ease");
                });

            }

            // get scroll position on on page load 
            var windowScrollTop = $(window).scrollTop();
            var windowHeight = $(window).outerHeight();
            var bodyHeight = $("body").outerHeight();

            var total = (windowScrollTop / (bodyHeight - windowHeight)) * 100;
            $(".bar").css("width", total + "%", "transition", "200ms ease");

        });
    };
})(jQuery);

$(function () {
    $("body").prognroll({
        height: 3,
        color: "rgb(135,100,255)" //주황 : #fe8705
    });
    $(".content").prognroll({
        custom: true
    });
    let d = 0;
    let a = 2.5;
    let delt = 0
    $(".past_wrap").mousewheel(function (event, delta) {
        d = (delta * 30);
        delt = delta;
        a = 2.5;
        event.preventDefault();
    });
    setInterval(() => {
        let sl = $(".past_wrap").scrollLeft();
        $(".past_wrap").scrollLeft(sl - d);

        if (delt == -1) {
            if (d < 0) {
                a += 0.00001;
                d += a;
            } else {
                d = 0;
            }
        }
        if (delt == 1) {
            if (d > 0) {
                a += 0.00001;
                d -= a;
            } else {
                d = 0;
            }
        }
    }, 10);
});