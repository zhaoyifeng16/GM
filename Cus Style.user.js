// ==UserScript==
// @name Cus Style
// @description style
// @author zyf
// @version 1.0.1
// @grant GM_addStyle
// @grant GM_getValue
// @grant GM_setValue
// @run-at document-start

// @include http*

// ==/UserScript==


//购物狂
let gwkcss = `
.bigshow.board-bigshow,
#broadcast,
.float-ad-right,
.float-ad-left,
.wanneng-19lou{
    display: none !important;
}
`;
//boss
let bosscss = `

#filter-box.show-top{
    position: static;
}
.job-list *,.jobs-list *{
    color:#ccc !important;
    font-size:12px !important;
    background: #fff !important;
}
/*chat图标*/
.search-job-list-wrap .job-primary .icon-chat,
.jobs-from-system .job-list-wrap .jobs-list li .info-publis img{
display:none;
}
.btn{
    border: 1px #fff solid;
    background: #fff;
}
/*compony logo*/
.search-job-list-wrap .job-primary .info-company .company-logo,
.jobs-from-system .job-list-wrap .jobs-list li .info-company .company-text img{
display:none;
}

/*详情页上部*/
.smallbanner{
    position: static;
}
.job-banner{
    background: #fff;
}
.job-banner *{
    color:#f1f1f1 !important;
    font-size:12px !important;
}
.job-banner .name{
    font-size:12px !important;
}
.detail-box .job-op .btn-container .btn{
height:20px;
line-height:20px;
}

/*详情*/
.detail-op img{
    opacity:.1;
    filter: grayscale(1);
}
.detail-op *{
    color:#f1f1f1 !important;
    font-size:12px !important;
}

/*描述*/
.job-sec .text{
    color:#ccc !important;
    font-size:12px !important;
}
.job-sec h3{
    color:#ccc !important;
    font-size:12px !important;
    font-weight:400;
    background: none;
}
::selection{
    color:#777 !important;
    background: #f1f1f1;
}
.search-job-list-wrap{
    background: #fff;
}
.sider,.job-sider{
    opacity:.1;
}

`;

let fk = `
.nav_area{
    background-color: #fffcf5;
}
.home_banner_area{
    background: none;
    background-color: #fffbf2;
}
`
let _3dm = `
.a_h,
#note,
.a_cn+div,
.a_f,
.a_pt{
    display: none !important;
}

`
let baiduMap = `
.c-line-clamp2{
    -webkit-line-clamp: unset !important;
}
`

let ditiezu = `
.content>div:nth-of-type(2){
    display: none !important;
}
iframe{
    display: none !important;
}
`

let yunzhonggexiaoshuo = `
[class*='ad'],[id*='ad']{
    display: none !important;
}
body{
padding:0 !important;
}
`

const CSS_LIST = [
    {url:"cqmmgo", css:gwkcss},
    {url:"zhipin", css:bosscss},
    {url:"mettew", css:fk},
    {url:"3dmgame", css:_3dm},
    {url:"map.baidu", css:baiduMap},
    {url:"ditiezu.com", css:ditiezu},
    {url:"yunzhonggexiaoshuo.com", css:yunzhonggexiaoshuo},
]

function CssMatch(){
    let url = window.location.href;
    let matchItem = CSS_LIST.find(item=>{
        return url.includes(item.url)
    })

    console.log("match url ----",matchItem.url)
    return matchItem.css
}
(function() {

    let css = CssMatch()

    if (typeof GM_addStyle !== "undefined") {
        GM_addStyle(css);
    } else {
        let styleNode = document.createElement("style");
        styleNode.appendChild(document.createTextNode(css));
        (document.querySelector("head") || document.documentElement).appendChild(styleNode);
    }
})();


