
var WB = new WebsiteBlocker();
var is_bg_executed = false;

chrome.extension.getBackgroundPage().getUrl(function(tab) {
    is_bg_executed = true;
    $('#popup-body article').hide();
//    console.log(tab);

    if (tab && tab.url) {
//        console.log(WB.checkUrl(null, tab.url.href, true));
        if (WB.checkUrl(null, tab.url.href, true)) {
            $('#block-already').show();
        }
        else {
            $('#tmp-hostname').val(tab.url.hostname).end().focus();
            $('#block-ok').show();
        }
    }
    else {
        $('#block-ng').show();
    }
});

setTimeout(function() {
    if (!is_bg_executed) {
        $('#block-ng').show();
    }
}, 3000);

$(window).load(function() {
    Controller.popupPage();
    i18n(function(){ $('#container').show(); });
});

$('.options').click(function() {
    check2go(chrome.extension.getURL('options.html'), false);
});

$('#blockthis').click(function() {
    var domain, time1, time2, times = [];
    domain = $('#tmp-hostname').val();
    time1  = $('#tmp-time-start').val().replace(':', '');
    time2  = $('#tmp-time-end').val().replace(':', '');

    if (time1 && time2) {
        times = [time1 + '-' + time2];
    }

    Controller.addBlockData(domain, times);

    alert('Save!');

    chrome.extension.getBackgroundPage().checkCurrentTab();
});

$('[i18n="options"]').css('display', ls.get('flag-option_page_link') ? 'none' : 'inline-block');
$('#each_function_controler').css('display', ls.get('flag-popup_page_control') ? 'none' : 'inline-block');

