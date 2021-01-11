// JavaScript Document
/*动态判断手机分辨率适配
(function (doc, win) {
          var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
              var clientWidth = docEl.clientWidth;
              if (!clientWidth) return;
              docEl.style.fontSize = 16 * (clientWidth / 320) + 'px';
            };

          if (!doc.addEventListener) return;
          win.addEventListener(resizeEvt, recalc, false);
          doc.addEventListener('DOMContentLoaded', recalc, false);
        })(document, window);
*/



//服务控制端  是否点击成功
var status = false;

var ws;
function initSocket() {
	if (window.ReconnectingWebSocket) {
		ws = new ReconnectingWebSocket('ws://47.95.35.97:80');
		ws.onopen = function (e) {
			console.log("连接服务器成功");
			var item = {};
			item.type = "regist";
			item.server = "server2010701";
			item.value = "";
			item.order = [];
		}
		ws.onclose = function (e) {
			console.log("服务器关闭");
		}
		ws.onerror = function () {
			console.log("连接出错");
		}

		ws.onmessage = function (e) {
			console.log(e)
			status = true;
			var item = JSON.stringify(e.data);
			if (item.status === "1") {
				status = true;
			}
		}
	}
}

function sendMessage() {
	var item = {};
	item.type = "order";
	item.server = "server2010701";
	item.value = "";
	item.order = [];
	console.log(1);
	var jObj = {
		page: "发送了一条信息",
		showImg: 'zt_report'
	};
	item.order.push(jObj)
	ws.send(JSON.stringify(item));
}

$(document).ready(function () {
	jQuery(function () {
		//使用id选择器;例如:tab对象->tr->td对象.
		$(".post_m p,.post_m_l p").each(function (i) {
			//获取td当前对象的文本,如果长度大于25;
			if ($(this).text().length > 40) {
				//给td设置title属性,并且设置td的完整值.给title属性.
				$(this).attr("title", $(this).text());
				//获取td的值,进行截取。赋值给text变量保存.
				var text = $(this).text().substring(0, 40) + "...";
				//重新为td赋值;
				$(this).text(text);
			}
		});
	});
	//返回
	$(".return,.home").click(function () {
		history.back(-1);
	});
	//弹出子菜单
	$(".navbtn").click(function () {
		$(".navcenter,.reveal-modal-bg").fadeIn();
	});
	//分享弹窗
	$(".fx_bth").click(function () {
		$(".modal_img,.reveal-modal-bg").fadeIn(500);
	});
	$(".reveal-modal-bg,.closed").click(function () {
		$(".modal_img,.reveal-modal-bg").fadeOut(500);
		$(".navcenter").fadeOut(500);
	});
});