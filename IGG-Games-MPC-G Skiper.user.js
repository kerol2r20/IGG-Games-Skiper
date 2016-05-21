// ==UserScript==
// @name         IGG-Games/MPC-G Skiper
// @namespace    https://greasyfork.org/zh-TW/scripts/19802-igg-games-mpc-g-skiper 
// @version      1.0
// @description  Skip wating AD page in IGG games download link
// @author       Yu-Hsin Lu
// @include      http://igg-games.com/*
// @include      http://www.mpc-g.com/*
// @exclude      http://igg-games.com/
// @exclude      http://igg-games.com/*/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.2.3/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/1.5.10/clipboard.min.js
// @grant        unsafeWindow
// ==/UserScript==

(function() {
    var pat = /.*xurl=(s?:.*)/i;
    var MegaPat= /https:\/\/mega.*/i;
    var GooglePat= /https:\/\/docs\.google.*/i;
    var MegaURL = "";
    var GoogleURL = "";

    // IGG Session
    $("a").each(function() {
        var url=$(this).attr('href');
        var xx = decodeURIComponent(url);
        var result = pat.exec(xx);
        if(result!==null){
            var resultURL = 'http'+result[1];
            var MegaQuery = MegaPat.exec(resultURL);
            var GoogleQuery = GooglePat.exec(resultURL);
            if(MegaQuery!==null) MegaURL += MegaQuery[0] +'\n';
            if(GoogleQuery!==null) GoogleURL += GoogleQuery[0] +'\n';
            $(this).attr('href',resultURL);
        }
    });
    new Clipboard('.btn');
    $("div.kk-star-ratings").prepend('<div id="Quickcopy" style="position: absolute; width: 200px;height: 80px;left:140px;"></div>');
    $("#Quickcopy").append('<button class="btn" id="Mega"></button>');
    $("#Quickcopy").append('<button class="btn" id="Google"></button>');
    $("#Mega").attr('data-clipboard-text',MegaURL).css('background','url(https://4.ggpht-cache.qoo-app.com/b3xcDImNhXLh4ui_3ass5KoXE5-FeCmGQMA_w7dG1wQrZz3YLNFc1qeQI3GhvK8MXHI=w300)').css('background-size','100% 100%').css('height','40px').css('width','40px').css('outline','none');
    $("#Google").attr('data-clipboard-text',GoogleURL).css('background','url(http://www.google.com/drive/images/drive/logo-drive.png)').css('background-size','100% 100%').css('height','40px').css('width','40px');

    // MPC-G Session
    $("form[name*='download']").each(function() {
        // $("this > input[name='downloadLink']").attr('value');
        var url = $(this).children("input[name='downloadLink']").attr('value');
        $(this).children("a").attr('href',url);
        $(this).children("a").attr('target',"_blank");
    });
})();