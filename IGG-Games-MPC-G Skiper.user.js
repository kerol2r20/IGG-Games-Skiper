// ==UserScript==
// @name         IGG-Games/MPC-G Skiper
// @namespace    https://github.com/kerol2r20
// @version      0.1
// @description  Skip wating AD page in IGG games download link
// @author       Yu-Hsin Lu
// @include      http://igg-games.com/*
// @include      http://www.mpc-g.com/*
// @exclude      http://igg-games.com/
// @exclude      http://igg-games.com/*/*
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.2.3/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/1.5.10/clipboard.min.js
// @grant       unsafeWindow
// ==/UserScript==

(function() {
    var pat = /.*xurl=(s?:.*)/i;
    var MegaPat= /https:\/\/mega.*/i;
    var MegaURL = "";
    $("a").each(function() {
        var url=$(this).attr('href');
        var xx = decodeURIComponent(url);
        var result = pat.exec(xx);
        if(result!==null){
            var resultURL = 'http'+result[1];
            var MegaQuery = MegaPat.exec(resultURL);
            if(MegaQuery!==null) {
                MegaURL += MegaQuery[0] +'\n';
            }
            $(this).attr('href',resultURL);
        }
    });
    new Clipboard('.btn');
    $("body").append('<div style="position: absolute; width: 80px;height: 80px;left:90px;top:90px;"> <button class="btn" id="Mega"> Mega </button> </div>');
    $("#Mega").attr('data-clipboard-text',MegaURL);
    $("form[name*='download']").each(function() {
        // $("this > input[name='downloadLink']").attr('value');
        var url = $(this).children("input[name='downloadLink']").attr('value');
        $(this).children("a").attr('href',url);
        $(this).children("a").attr('target',"_blank");
    });
})();