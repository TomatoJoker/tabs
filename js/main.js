$(function () {
    $('.js-select').each(function () {
        $(this).select2({
            width: "100%",
            dropdownParent: $(this).closest(".js-select-container"),
            minimumResultsForSearch: -1,
            placeholder: {
                id: '-1',
                text: 'text'
            }
        });
    });


    let url = document.URL,
        hash = url.substring(url.indexOf("#")),
        tab = '.js-tab',
        tabActive = 'is-active',
        tabWrapper = '.js-tab-wrapper',
        tabContent = $('.js-tab-block'),
        getSpeed = getComputedStyle(document.documentElement).getPropertyValue('--speed'),
        speed = getSpeed.slice(0, getSpeed.length - 2); // tabs

        speed = parseInt(speed);

    function trigerTab(thisTab, fadeIn) {
        $(tab).removeClass(tabActive);
        thisTab.addClass(tabActive);
        tabContent.hide();
        fadeIn.fadeIn(speed * 2); 
        if (thisTab.index() == $(tab + ':last-child').index()) {
            $(tabWrapper).removeClass('verification__active-first');
            $(tabWrapper).addClass('verification__active-last');
        } else if (thisTab.index() == $(tab + ':first-child').index()) {
            $(tabWrapper).removeClass('verification__active-last');
            $(tabWrapper).addClass('verification__active-first');
        }
    }

    $(tab).on('click', function (e) {
        e.preventDefault();
        let href = $(this).find('a').attr('href'); 
        trigerTab($(this), $(href));
        window.history.replaceState("", document.title, window.location.href.replace(location.hash, "") + $(this).find('a')[0].hash);
    }); //tab switching

    $(tab).each(function () {
        if ($(this).find('a').attr('href') == hash && $(this).is(':not(.'+ tabActive +')')) {
            trigerTab($(this), $(hash));
        }
    })

    $('.js-accordion-button').on('click', function() {
        $(this).closest('.js-accordion-parrent').toggleClass('verification__row-open');
        $(this).siblings('.js-accordion-top').slideToggle(speed);
        $(this).siblings('.js-accordion-bottom').slideToggle(speed);
    });
});