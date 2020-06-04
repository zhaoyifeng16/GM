// ==UserScript==
// @name         swagger-tool
// @version      1.0
// @description  swagger复制、展开
// @author       zhaoyifeng
// @include      */swagger-ui.html
// @require      https://cdn.jsdelivr.net/npm/toastify-js@1.8.0/src/toastify.min.js
// @grant        GM_addStyle
// @grant        GM.setClipboard
// ==/UserScript==

// 是否已经展开
let isExpand = false;

(async function () {
	'use strict';

	//$("#header").after("<div id='my-tool'></div>")
	addCss()
	addOutCss("https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css")
	createSwitch()
	createCopy()

})();

// 创建复制按钮
function createCopy() {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve()
			let $line = $(".endpoint .heading h3")
			// 创建复制按钮
			let $btn_copy = $('<span style="color:red; font-size:12px; cursor: pointer" class="copy">复制</span>')
			$line.append($btn_copy)
			$(".copy").click(function () {
				let content = $(this).prev().find("a").text();
				GM.setClipboard(content)
				Toastify({
					text: "复制成功 " + content,
					backgroundColor: "rgb(15, 52, 67)",
					className: "info",
				}).showToast();
			})
		}, 100)
	})
}

// 展开全部
function expandAll() {
	console.log("全部展开")
	const list = document.querySelector('#resources')
	const items = list.children;
	[...items].forEach(li => {
		li.classList.add('active')
		li.querySelector('ul.endpoints').style.display = 'block'
	})
}

// 合并全部
function collapse() {
	const list = document.querySelector('#resources')
	const items = list.children;
	[...items].forEach(li => {
		li.classList.remove('active')
		li.querySelector('ul.endpoints').style.display = 'none'
	})
}

// 创建展开合并开关
function createSwitch() {
	let el = `
        <div id='switch'>
            <div class="switch-wrap">
                <span></span>
            </div>
        </div>`
	$("body").prepend(el)

	$(".switch-wrap").click(function () {
		if ($(this).hasClass("active")) { // 关闭状态
			$(this).removeClass("active");
		} else {
			$(this).addClass("active");
		}
		isExpand = !isExpand
		isExpand ? expandAll() : collapse()
	})
}

function addCss() {
	GM_addStyle(`
        #switch{
            position:fixed;
            bottom:10px;
            right:10px
        }
        .switch-wrap{
            position: relative;
            display: inline-block;
            width: 52px;
            height: 32px;
            border: 1px solid #DFDFDF;
            outline: none;
            border-radius: 16px;
            box-sizing: border-box;
            background: #FFFFFF;
            cursor: pointer;
            transition: border-color .3s,background-color .3s;
            vertical-align: middle;
            }
            .switch-wrap span{
            position: absolute;
            top: 0;
            left: 0;
            transition: transform 0.3s;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            box-shadow: 0 1px 3px rgba(0,0,0,0.4);
            background-color: #fff;
            }
            .switch-wrap.active{
            border-color: #33DB70;
            background-color: #33DB70;
            }
            .switch-wrap.active span{
            transform: translateX(20px);
        }
    `)
}
function addOutCss(href) {
	var head = document.querySelector('head')
	var link = document.createElement('link')
	link.href = href + ''
	link.rel = 'stylesheet'
	link.type = 'text/css'
	head.appendChild(link)
}
