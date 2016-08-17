(function(){
    var OSLoaded = function() {
        $(document.body).addClass('os-loaded');
    };

    //TODO use href as id and remember current and change it simply
    //change it automatically in SidebarController
    var OSActivateNav = function(name, path) {
        path = '#' + path;
        var links = $('.sidebar-menu a');
        if (links.length == 0) return;

        $('.sidebar-menu li.active').each(function(){
            $(this).removeClass('active');
        });

        links.each(function(){
            var a = $(this);
            var href = a.attr('href');
            if (href == path) {
                a.parents('li').addClass('active');
            }
        });
    };

    var handleSidebarMenu = function() {
        "use strict";

        $('.sidebar .nav > .has-sub > a').click(function() {
            var target = $(this).next('.sub-menu');
            var otherMenu = '.sidebar .nav > li.has-sub > .sub-menu';

            if ($('.os-sidebar-minified1').length === 0) {
                $(otherMenu).not(target).slideUp(250, function() {
                    $(this).closest('li').removeClass('expand');
                });
                $(target).slideToggle(250, function() {
                    var targetLi = $(this).closest('li');
                    if ($(targetLi).hasClass('expand')) {
                        $(targetLi).removeClass('expand');
                    } else {
                        $(targetLi).addClass('expand');
                    }
                });
            }
        });
        $('.sidebar .nav > .has-sub .sub-menu li.has-sub > a').click(function() {
            if ($('.os-sidebar-minified1').length === 0) {
                var target = $(this).next('.sub-menu');
                $(target).slideToggle(250);
            }
        });


//TODO sidebar minify
        $('.sidebar-minify-btn').click(function() {
           $('.os-container').toggleClass('os-sidebar-minified');
           $('.os-sidebar-minified .sidebar-menu').hover(function() {
               $('.os-container').addClass('os-sidebar-minified-hover');
           }, function() {
               $('.os-container').removeClass('os-sidebar-minified-hover');
           });

        });
    };

    var handleSlimScroll = function() {
        "use strict";
        $('[data-scrollbar="true"]').each(function() {
            generateSlimScroll($(this));
        });
    };
    var generateSlimScroll = function(element) {
        "use strict";
        if ($(element).attr('data-init')) {
            return;
        }
        var dataHeight = $(element).attr('data-height');
        dataHeight = (!dataHeight) ? $(element).height() : dataHeight;
        var dataDistance = $(element).attr('data-distance');
        dataDistance = (!dataDistance) ? '0px' : dataDistance;
        var dataPosition = $(element).attr('data-position');
        dataPosition = (!dataPosition) ? 'right' : dataPosition;

        var scrollBarOption = {
            height: dataHeight,
            alwaysVisible: true,
            distance: dataDistance,
            position: dataPosition
        };
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            $(element).css('height', dataHeight);
            $(element).css('overflow-x','scroll');
        } else {
            $(element).slimScroll(scrollBarOption);
        }
        $(element).attr('data-init', true);
    };


    var OS = {
        initComponent: function() {
            //handleTooltipInit();
            //handlePopoverInit();
            //handlePanelAction();
            //handleSlimScroll();
            //handleScrollToTopButton();
        },
        loadCompleted: OSLoaded,
        initSidebar: function(){
            handleSidebarMenu();
        },
        activateNav: OSActivateNav
    };

    window.OS = OS;
})();