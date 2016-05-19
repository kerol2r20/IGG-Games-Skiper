// ==UserScript==
// @name         IGG-Games/MPC-G Skiper
// @namespace    https://github.com/kerol2r20
// @version      0.1
// @description  Skip wating AD page in IGG games download link
// @author       Yu-Hsin Lu
// @include      http://igg-games.com/*
// @include      http://www.mpc-g.com/*
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.2.3/jquery.min.js
// @grant       unsafeWindow
// ==/UserScript==

(function() {
    'use strict';
    var pat = /.*xurl=(s?:.*)/i;
    $("a").each(function() {
        var url=$(this).attr('href');
        var xx = decodeURIComponent(url);
        var result = pat.exec(xx);
        if(result!==null){
            $(this).attr('href','http'+result[1]);
        }
    });
    $("form[name*='download']").each(function() {
        // $("this > input[name='downloadLink']").attr('value');
        var url = $(this).children("input[name='downloadLink']").attr('value');
        $(this).children("a").attr('href',url);
    });
})();