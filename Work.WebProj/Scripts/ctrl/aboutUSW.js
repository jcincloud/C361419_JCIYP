$(document).ready(function () {
    $('.subnav .subnav6').click(function () {
        //window.open("../../Content/images/AboutUs/Senator/Senator.html", "new", "width=900, height=520");
        //openWin('../../Content/images/AboutUs/Senator/Senator11.html','ActivitiesDetail','900','520');
        PopupCenter('../../Content/images/AboutUs/Senator/Senator.html','new','900','510');  
        return false;
    });
});

//開啟新視窗 置中功能--------------------------------

//-- 雙螢幕ok
function PopupCenter(url, title, w, h) {
    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    // Puts focus on the newWindow
    if (window.focus) {
        newWindow.focus();
    }
}//======

//-- NoUse
// function openWin(URL,winName,winWidth,winHeight){
// 	var intTop,intLeft
// 	intTop=(screen.availheight-winHeight)/2
// 	intLeft=(screen.availwidth-winWidth)/2
// 	window.open(URL,winName,'top='+intTop+',left='+intLeft+',width='+winWidth+',height='+winHeight+',resizable=yes,scrollbars=yes,status=yes')
// }
//==============================================