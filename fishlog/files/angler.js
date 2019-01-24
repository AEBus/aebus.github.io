
var RANKING_MAX = 10;

//	タッチイベント→マウス
function touch2mouse(e){
	if (e.type.match(/^touch.*/)){
		$(e.target).on("mousedown mouseup mousemove");
		e.button = (e.originalEvent.touches.length == 1 ? 0 : 2);
		if (e.originalEvent.touches.length > 0){
			e.clientX = e.originalEvent.touches[0].clientX;
			e.clientY = e.originalEvent.touches[0].clientY;
			e.pageX = e.originalEvent.touches[0].pageX;
			e.pageY = e.originalEvent.touches[0].pageY;
		}
	}
}

//	マップスクロール
function map_adjust(map, x, y){
	x = Math.max(0, Math.min(map.find(".map_base").width()  - map.width(), x));
	y = Math.max(0, Math.min(map.find(".map_base").height() - map.height(), y));
	map.find(".map_image")
		.scrollLeft(x)
		.scrollTop(y);
	$("#map_info").css({
		x: x,
		y: y,
	});
}

//	Local Storage
function local_storage(key){
	this.key = key;
	try {
		this.val = JSON.parse(localStorage.getItem(this.key));
	} catch(id){
		this.val = null;
	}
	this.set = function(val){
		try {
			localStorage.setItem(this.key, JSON.stringify(this.val = val));
			return true;
		} catch(id){
			this.val = null;
			return false;
		}
	}
	this.get = function(){
		try {
			return this.val = JSON.parse(localStorage.getItem(this.key));
		} catch(id){
			return null;
		}
	}
	this.delete = function(){
		try {
			localStorage.removeItem(this.key);
			this.val = this.get();
		} catch(id){
			return null;
		}
	}
}

//	クッキー
function set_cookie(param){
	$.post(root_path+"cookie.php", param);
}

//	ポップアップ位置補正
function adjust_popup(dom){
	dom.show();
	var off = dom.offset();
	off.top = Math.min(Math.max(off.top, Math.max(window.scrollY, $("#header").outerHeight())), window.scrollY + window.innerHeight - dom.outerHeight());
	dom.offset(off);
}

//	固定クラス位置補正
function adjust_stay_class(){
	var top = $(document).scrollTop();
	$(".stay").each(function(idx, e){
		var pos = $(e).parent().offset();
		$(e).css("y", Math.max(0, top - pos.top));
	});
}

//	テーブル開閉
function toggle_table(target, no_toggle){
	var body = $(target).parents("tbody").next("tbody");
	if (!no_toggle)
		$(target).toggleClass("close")
	if ($(target).hasClass("close"))
		body.hide();
	else
		body.show();
}

//	コメント取得
var comment_offset = 0;
function get_comment(){
	var dom = $(".comment_list");
	if (dom.length == 0) return;
	var param = {
		offset: comment_offset,
		limit: parseInt(dom.attr("limit")),
		type: parseInt(dom.attr("type")),
		item: parseInt(dom.attr("item")),
	};
	$.ajax(root_path+"comment.php", {
		data: param,
		dataType: "json",
		success: function(rsl, status, data){
			$(".comment_continue").remove();
			if (typeof data.responseJSON.msg != "undefined")
				dom.append(data.responseJSON.msg);
			else if (data.responseJSON.comment){
				for(var i in data.responseJSON.comment){
					var c = data.responseJSON.comment[i];
					var info = "<span class='comment_info'>"+(c.link ? c.link+" - " : "")+c.nickname+"&nbsp;"+c.date+"&nbsp;"+c.admin+"</span><br>";
					var comment = $("<div class='comment'></div>").appendTo(dom).html(c.comment).prepend(info);
				}
				if (data.responseJSON.comment.length == param.limit)
					$("<div class='comment_continue'><br><a>"+more_comment+"</a></div>").appendTo(dom).find("a").bind("click", function(){
						get_comment();
						return false;
					});
				comment_offset += data.responseJSON.comment.length;
			}
	} });
}

//	天候取得／投稿
function update_weather(param){
	if (param === undefined) param = {};
	$.ajax(root_path+"weather.php", {
		data: param,
		type: "post",
		complete: function(data, status, xhr){
			if (typeof data.responseJSON == "undefined")
				console.log(data.responseText);
			else{
				$("#etime_hour").text(data.responseJSON.hour);
				$("#etime_minute").text(data.responseJSON.minute);
				$("#left_etime_hour").text(data.responseJSON.left_hour);
				$("#left_etime_minute").text(data.responseJSON.left_minute);
				$("#weather_list").find(".skywatcher_time").each(function(idx, e){
					var t = data.responseJSON.time + idx - 1;
					$(e).text(("0"+(t % 3 * 8)).substr(-2)).attr("time", t);
					$(".skywatcher_list").each(function(_idx, e){ $(e).find(".skywatcher_report").eq(idx).attr("time", t); });
				});
				$(".skywatcher_report").children().empty();
				for(var i in data.responseJSON.weather){
					var w = data.responseJSON.weather[i];
					$(".skywatcher_list[area="+w.area+"]").find(".skywatcher_report[time="+w.time+"]").children().append($("<li weather='"+w.weather+"'></li>").append(w.html).append("<span class='report_num'> ("+w.count+")</span>"));
			}
		}
	} });
}

//	探検手帳
var adventure_complete = new local_storage("adventure_complete");
function update_adventure(){
	$(".adv_timezone").text("");
	$.ajax(root_path+"adventure.php", {
		data: {
			rid: RID
		},
		complete: function(data, status, xhr){
			if (typeof data.responseJSON == "undefined")
				console.log(data.responseText);
			else{
				var d = data.responseJSON.available;
				$(".available").removeClass("available");
				for(var i in d)
					$(".adventure_thumb[no="+i+"] .adv_timezone").text(d[i].timezone[0]+"-"+d[i].timezone[1])[d[i].available ? "addClass" : "removeClass"]("available");
			}
	} });
}

//	エオルゼア時刻取得
function get_et(){
	var now = new Date();
	var epock = Date.UTC(2010, 6, 12, 0, 0, 0) - 9 * 60 * 60 * 1000;
	return parseInt((parseInt((now.getTime() - epock) / 1000) - 90000) * (1440 / 70));
}

//	エオルゼア時刻更新
function update_etime(){
	var et = get_et();
	var el = 3600 * 8 - (et % (3600 * 8));
	$("#etime_hour").text(("0"+Math.floor((et % (3600*24)) / 3600)).substr(-2));
	$("#etime_minute").text(("0"+Math.floor((et % 3600) / 60)).substr(-2));
	$("#left_etime_hour").text(("0"+Math.floor(el / 3600)).substr(-2));
	$("#left_etime_minute").text(("0"+Math.ceil((el % 3600) / 60)).substr(-2));
	$("#etime_next_update").text(next_skywatcher_call ? Math.round((next_skywatcher_call - et) / 60) : "");
	return { et: et, el: el };
}

//	天気予報取得
var next_skywatcher_call = 0;
function update_skywatcher(img_only){

	//	時刻更新
	var rsl = update_etime();
	var et = rsl.et, el = rsl.el;

	//	天候更新
	if (next_skywatcher_call !== null && et >= next_skywatcher_call){
		next_skywatcher_call = null;
		$.ajax(root_path+"skywatcher.php", { data: { rid: RID, name: img_only ? 0 : 1 }, complete: function(data, status, xhr){
			if (data.responseJSON.msg)
				alert(data.responseJSON.msg);
			else if (typeof data.responseJSON.hour != "undefined"){
				var interval = (parseInt(data.responseJSON.hour / 8) * 8 + 24 - 8) % 24;
				$(".skywatcher_time").each(function(index, e){
					$(e).text(("0"+interval).substr(-2));
					interval = (interval + 8) % 24;
				});
				$(".skywatcher_report").empty();
				var tc = [0, 0, 0, 0], tmax = $(".skywatcher_list").length;
				for(var i in data.responseJSON.data){
					var d = data.responseJSON.data[i];
					$dom = $("<span />").append(d.html);
					$dom.attr("title", $dom.text()).appendTo($(".skywatcher_list[area="+d.area+"]").children(".skywatcher_report:eq("+(d.time + 1)+")"));
					if (d.time >= 0) tc[d.time]++;
				}
				var nt;
				if (tc[3] == tmax)
					nt = 99999;
				else if (tc[2] == tmax)
					nt = 2400;
				else if (tc[1] == tmax)
					nt = 600;
				else
					nt = 200;
				next_skywatcher_call = et + Math.min(nt, el + Math.ceil(Math.random() * 100));

			}
		} });
	}
}

//	時刻表更新
function update_timezone_pos(){
	var et = get_et();
	var h = parseInt((et % (3600*24)) / 3600);
	var m = parseInt((et % 3600) / 60);
	$(".timezone_clock").text(("0"+h).substr(-2)+":"+("0"+m).substr(-2));
	$(".timezone").each(function(idx, e){
		$(e).find(".tz_now_pos").appendTo($(e).find(".tz_hour").eq(h)).css("left", (100 * m / 60)+"%").show();
	});
}

$(function(){
	var book_focus = 0;

	//	フォーム
	if (!local_mode)
		$("#form_search select").change(function(e){ $(e.currentTarget).siblings("select").val("0"); });
	$("button#reset").click(function(e){ $(e.currentTarget).siblings("select").val("0"); return false; });
	$(".refresh").click(function(e){ $(this).parents("form").submit(); });

	//	魚類図鑑
	$("#book").on("click", "a[no]", function(){
		var no = parseInt($(this).attr("no"));
		if (book_focus != no){
			$("#book_guide").children().hide().filter("#e"+no).show();
			$(".grid a").removeClass("focus");
			$(this).addClass("focus");
			book_focus = no;
			return false;
		}
	});

	//	探検手帳
	$("#adventure").on("click", "a[no]", function(e){
		var no = parseInt($(e.currentTarget).attr("no"));

		//	チェック
		if (e.ctrlKey && adventure_complete){
			var ac = adventure_complete.get();
			if (!ac) ac = [];
			if ($(e.currentTarget).parent().toggleClass("complete").hasClass("complete")){
				if (ac.indexOf(no) < 0)
					ac.push(no);
			}else{
				var idx = ac.indexOf(no);
				if (idx >= 0)
					ac.splice(idx, 1);
			}
			adventure_complete.set(ac);
			return false;
		}

		$("#adventure_guide").children("table").hide().filter("#e"+no).show().find(".flexslider").flexslider({
			animation: "slide",
			itemWidth: 100,
			maxItems: 2,
			minItems: 1,
			controlNav: false,
			directionNav: false,
		});
		$(".grid a").removeClass("focus");
		$(this).addClass("focus");
		return false;
	});
	$(".sight_icon").on("click", ".i_key", function(e){
		$("#adventure").removeClass("show_picture");
		set_cookie({ show_adventure_picture: 0 });
	});
	$(".sight_icon").on("click", ".i_picture", function(e){
		$("#adventure").addClass("show_picture");
		set_cookie({ show_adventure_picture: 1 });
	});
	if ($("#adventure").length > 0){
		update_adventure();
		setInterval(function(){
			update_adventure();
		}, 60000);
	}
	var ac = adventure_complete.get();
	if (Array.isArray(ac) && ac.length > 0)
		for(var i in ac)
			$(".adventure_thumb[no="+ac[i]+"]").parent().addClass("complete");

	//	マップ操作
	$(".map_movable").on("mousedown touchstart", function(e){
		if (!$(this).data("drag")){
			$(".map_movable").removeClass("map_movable_active");
			touch2mouse(e);
			var img = $(e.currentTarget).find(".map_image").get(0);
			$(this)
				.data("drag", true)
				.data("x", e.clientX)
				.data("y", e.clientY)
				.data("scrLeft", img.scrollLeft)
				.data("scrTop", img.scrollTop)
				.css("cursor", "move")
				.addClass("map_movable_active");
		}
		$("#map_info").fadeOut(200);
		$(".map_pos:visible").fadeOut(200);
		$(".ss_popup").transition({
			scale: 0,
			opacity: 0,
			duration: 500,
			easing: "easeOutExpo",
			queue: false,
		}).on("mousedown touchstart", "a", function(e){
			e.stopPropagation();
		});

		return false;
	}).data("info", false);
	$(".map_frame").on("mousemove touchmove", function(e){
		touch2mouse(e);
		var pos = $(e.currentTarget).offset();
		var img = $(e.currentTarget).find(".map_image").get(0);
		var grid = 1024 / parseFloat($(e.currentTarget).attr("grid"));
		pos.left = Math.floor(e.pageX - pos.left);
		pos.top  = Math.floor(e.pageY - pos.top);
		$("#guide_pos").html("x:<font class='lime'>"+(img.scrollLeft + pos.left)+"</font> y:<font class='lime'>"+(img.scrollTop  + pos.top )+"</font>");
		var e = $(e.currentTarget);
		e.find(".map_pos_x").text(parseInt((img.scrollLeft + pos.left) / grid) + 1);
		e.find(".map_pos_y").text(parseInt((img.scrollTop  + pos.top ) / grid) + 1);
		if ($(".map_movable_active").length == 0)
			e.find(".map_pos").css({ left: pos.left, top: pos.top - 40, x: "-50%" }).show();
	}).on("mouseleave touchend", function(e){
		$("#guide_pos").empty();
		$(".map_pos:visible").fadeOut(500);
	}).on("contextmenu", function(e){
		return false;
	});
	$(".map_home").on("mousedown touchstart", function(e){
		$(e.currentTarget).hide();
		var map = $(e.currentTarget).parents(".map_frame");
		map_adjust(map, map.attr("x") - map.width() / 2, map.attr("y") - map.height() / 2, true);
	}).on("mousemove touchmove", function(e){
		$(".map_pos:visible").fadeOut(500);
		return false;
	});
	$(".map_info").on("mousemove touchmove", function(e){
		$(".map_pos").fadeOut(500);
		return false;
	});
	$(".point").each(function(){
		$(this).css({
			left: parseInt($(this).attr("x")) - 10,
			top:  parseInt($(this).attr("y")) - 10,
		});
	});
	$(".ss_popup").each(function(){
		$(this).css({
			left: "-="+($(this).width() / 2 + 10),
			top: "+=10",
		});
	});
	$("#select_area").on("change", function(e){
		$(e.currentTarget).parents("form").submit();
	});
	$("#select_region").on("change", function(e){
		$(e.currentTarget).parents("form").submit();
	});
	$("a[spot].symbol").on("click touchstart", function(e){
		var map = $(e.currentTarget).parents(".map_image");
		var i = 0;
		$("#map_info").css({
			x: map.get(0).scrollLeft,
			y: map.get(0).scrollTop,
		}).fadeIn(200).children("div").hide().filter("[spot="+$(this).attr("spot")+"]").show();
		$("#map").data("info", true);
		$(".ss_popup").transition({
			scale: 0,
			opacity: 0,
			duration: 500,
			easing: "easeOutExpo",
			queue: false,
		});
		$(this).siblings(".ss_popup").show().transition({
			scale: 1,
			opacity: 1,
			duration: 500,
			easing: "easeOutExpo",
			queue: false,
		}).find("a").each(function(){
			$(this).css({
				backgroundImage: "url("+$(this).attr("href")+")",
				backgroundSize: "cover",
			});
		});
		return false;
	});
	$("a[adventure].symbol").on("click touchstart", function(e){
		var map = $(e.currentTarget).parents(".map_image");
		var i = 0;
		$("#map_info").css({
			x: map.get(0).scrollLeft,
			y: map.get(0).scrollTop,
		}).fadeIn(200).children("div").hide().filter("[adventure="+$(this).attr("adventure")+"]").show();
		$("#map").data("info", true);
		return false;
	});
	$(".map_frame").on("mousedown touchstart", ".map_fishing", function(e){
		$(e.delegateTarget).toggleClass("fish_off");
		set_cookie({ point_fishing_off: $(e.delegateTarget).hasClass("fish_off") ? 1 : 0 });
		return false;
	});
	$(".map_frame").on("mousedown touchstart", ".map_adventure", function(e){
		$(e.delegateTarget).toggleClass("adventure_off");
		set_cookie({ point_adventure_off: $(e.delegateTarget).hasClass("adventure_off") ? 1 : 0 });
		return false;
	});
	if (typeof adventure_id == "number" && adventure_id > 0)
		$("#adventure .grid a[no="+adventure_id+"]").click();


	$(document).on("mousemove touchmove", function(e){
		touch2mouse(e);
		var map = $(".map_movable_active");
		if (map.data("drag")){
			map.find(".map_home:not(:visible)").fadeIn(200);
			map_adjust(map, map.data("scrLeft") + map.data("x") - e.clientX, map.data("scrTop")  + map.data("y") - e.clientY);
		}
	}).on("mouseup touchend", function(e){
		$(".map_movable_active")
			.data("drag", false)
			.css("cursor", "auto")
			.removeClass("map_movable_active");
	});
	$(".fancy a").fancybox({
		closeClick: true,
		openEffect: "elastic",
		closeEffect: "elastic",
		openSpeed: 200,
		closeSpeed: 200,
		helpers: {
			title: {
				type: "inside",
			},
		},
	});
	var userAgent = window.navigator.userAgent.toLowerCase();	//	IEは9までpointer-eventsに未対応
	if (userAgent.indexOf("msie") != -1)
		$(".map_cover").hide();

	//	ポップアップ
	$(".mark").on("mouseenter", function(e){
		$(".note").hide();
		var note = $(this).find(".note");
		if (note.length > 0)
			adjust_popup(note);
	}).on("mouseleave", function(e){
		$(this).find(".note").fadeOut(200);
	})

	//	トップへ移動
	$("#to_top")
		.hide().data("visible", false)
		.on("click touchstart", function(e){
			$(navigator.userAgent.search(/webkit/i) < 0 ? 'html' : 'body').animate({ scrollTop: 0 }, 200, "swing");
		});
	$(document).scroll(function(e){
		var now = ($(this).scrollTop() >= $(window).height());
		if (now != $(this).data("visible")){
			$(this).data("visible", now);
			if (now)
				$("#to_top").show().animate({ "opacity": 1, "dutration": 500, "easing": "easeOutExpo", "queue": false });
			else
				$("#to_top").animate({ "opacity": 0, "dutration": 500, "easing": "easeOutExpo", "queue": false, "complete": function(){ $(this).hide(); } });
		}
		adjust_stay_class();
		$(".map_pos").hide();
	});

	//	ニックネーム
	$("#clear_nickname").click(function(e){
		$("#nickname").val("").change();
	});
	$("#regist_nickname").click(function(e){
		if ($("#nickname").val() == "")
			return confirm("ニックネームを消して匿名になりますか？");
	});

	//	登録URL
	$("#url_token").each(function(){
		$(this).text(this.href);
	});

	//	ページ直接入力
	$("#page_direct").click(function(e){
		$(this).siblings(".edit_page").slideToggle(200, "easeOutExpo", function(){
			$(this).children("input").focus();
		});
	});
	$("#page_go").click(function(e){
		$("#page_form").submit();
	});

	//	ダウンロード
	$("#agree").change(function(e){
		if ($(this).is(":checked"))
			$("#download").slideDown();
		else
			$("#download").slideUp();
	});

	//	タイマー（古ぼけた地図、再コメント）
	var update_timer = function(e){
		var now = new Date();
		var limit = $(e).attr("limit");
		var timer = Math.max(0, limit - parseInt(now.getTime() / 1000));
		var left = timer;
		var msg;
		if ($(e).hasClass("format")){
			msg = timer % 60 + "秒";
			timer = parseInt(timer / 60);
			if (timer > 0){
				msg = timer % 60 + "分 " + msg;
				timer = parseInt(timer / 60);
				if (timer > 0)
					msg = timer + "時間 " + msg;
			}
		}else
			msg = timer + "";
		$(e).text(msg);
		return left;
	};
	$(".timer").each(function(idx, e){
		setInterval(function(){
			if (update_timer(e) == 0 && $(e).hasClass("comment_timer")){
				$(".comment_interval").hide();
				$(".comment_form").show();
			}
		}, 1000);
		update_timer(e);
	});

	//	管理人用簡易登録
	$(".easy_post").click(function(e){
		$("[name=spot]").val($("[name=edit_spot]").val());
		$("[name=fish]").val(parseInt($(this).attr("fish")));
		$("[name=bait]").val(parseInt($(this).attr("bait")));
	});

	//	釣果統計グラフ
	$("canvas.piechart").each(function(idx, e){
		$(e).attr({ width: 48, height: 48 });
		var ctx = e.getContext('2d');
		var v = parseFloat($(e).attr("value"));
		var img = new Image();
		img.src = $(e).attr("src");
		img.onload = function(){
			var canvas = document.createElement("canvas");
			$(canvas).attr({ width: 40, height: 40 });
			var _ctx = canvas.getContext('2d');
			_ctx.drawImage(img, 0, 0);
			_ctx.beginPath();
			_ctx.fillStyle = "rgba(0,0,0,.7)";
			_ctx.moveTo(20, 20);
			_ctx.arc(20, 20, 32, (v-25)/100*Math.PI*2, 270/180*Math.PI, false);
			_ctx.closePath();
			_ctx.fill();
			ctx.drawImage(canvas, 0, 0);
		};
	});

	//	お気に入りショートカット
	$(".shortcut").click(function(e){
		var name = $(this).attr("name");
		var param = { shortcut: new Object() };
		if (!name) return;
		param['shortcut'][name] = $(this).toggleClass("on").hasClass("on") ? $(this).attr("value") : "";
		set_cookie(param);
	});

	//	時刻表
	$(".toggle_timetable").click(function(e){
		$.ajax(root_path+"toggle_tt.php", {
			data: {
				fish: $(e.currentTarget).attr("data-fish"),
			},
			type: "post",
			complete: function(data, status, xhr){
				if (typeof data.responseJSON == "undefined")
					console.log(data.responseText);
				else{

console.log(data.responseJSON);

					$(e.currentTarget).toggleClass("on");
				}
			},
			dataType: "json",
		});
	});

	//	テーブル開閉
	$(".toggle").on("click touchstart", function(e){
		toggle_table(e.currentTarget);
		var cookie = $(this).attr("cookie");
		if (cookie){
			var param = {};
			param[cookie] = $(this).hasClass("close") ? 1 : 0;
			set_cookie(param);
		}
	});
	$(".toggle[cookie].close").each(function(idx, e){
		toggle_table(e, true);
	});

	//	ランキング
	$(".ranking[fish]").each(function(idx, e){
		$(e).find(".myrank").html("<img src='"+root_path+"img/loading2.png' class='turn'>");
		$.ajax(root_path+"ranking.php", {
			data: {
				fish: parseInt($(this).attr("fish"))
			},
			complete: function(data, status, xhr){
				data = data.responseJSON;
				var myrank = $(e).find(".myrank").empty();
				if (data['you'] > 0)
					myrank.append("<span class='rank rank"+data['you']+"'>"+data['you']+"</span>");
				$(e).find(".note").each(function(_idx, _e){
					var rank = $("<table></table>").appendTo($(this));
					var me = parseInt(data['you']);
					var you = "<font color='lime'>&nbsp;(You)</font>";
					var unknown = "<font color='#a0a0a0'>"+anonymous+"</font>";
					for(var i = 0; i < Math.min(data['list'].length, RANKING_MAX); i++){
						var nickname = data['list'][i]['nickname'];
						if (!nickname) nickname = unknown;
						if (i + 1 == me) nickname += you;
						if (i == 0) $(e).parents("tr").find(".top_ranker").html(nickname);
						rank.append("<tr><td><span class='rank rank"+(i + 1)+"'>"+(i + 1)+"</span></td><td><span class='ilm'>"+data['list'][i]['ilm']+"</span></td><td>"+nickname+"</td></tr>");
					}
					if (me > RANKING_MAX){
						var nickname = data['list'][me - 1]['nickname'];
						if (!nickname) nickname = unknown;
						nickname += you;
						rank.append("<tr><td colspan='3'><hr></td></ty><tr><td><span class='rank rank"+me+"'>"+me+"</span></td><td><span class='ilm'>"+data['list'][me - 1]['ilm']+"</span></td><td>"+nickname+"</td></tr>");
				}
			});
		} });
	});

	//	時間帯グラフ
	$(".tz_bar").css({ transform: "scale(1, 0)" }).transition({ transform: "scale(1, 1)" }, 1000, "easeOutExpo");

	//	遅延読み込み
	$(".lazy").lazyload();

	//	コメント
	$(".confirm").click(function(e){
			return confirm(msg_confirm);
	});
	$(".comment_form input:radio").on("change", function(e){
		if ($(e.currentTarget).val() == 0)
			$(".comment_form input[name=nickname]").focus();
	});
	$(".comment_form input[name=nickname]").on("change", function(e){
		$(".comment_form input[name=angler]").val(['0']);
	});
	$(".comment_form").on("submit", function(e){
		var comment = $(this).find("input[name=comment]");
		if (!comment.val()){
			comment.focus();
			return false;
		}
		return confirm(msg_confirm);
	});
	$(".toggle_original_text").change(function(e){
		$(".comment_translate,.comment_origin").toggle();
	});
	get_comment();

	//	言語
	$("#language").on("click", "thead", function(e){
		$(e.delegateTarget).toggleClass("close");
		return false;
	});
	$("body").on("click", function(e){
		$("#language").addClass("close");
	});

	//	分解開閉
	$(".desynthesized_list").on("click", ".desynthesized_fish_open,.desynthesized_fish_close", function(e){
		$(e.currentTarget).parents(".desynthesized_fish").hide().siblings(".desynthesized_fish").show();
		return false;
	});

	//	時間帯
	if ($(".timezone").length > 0){
		update_timezone_pos();
		setInterval(function(){
			update_timezone_pos();
		}, 4000);
	}
	if ($(".eorzea_time").length > 0){
		update_etime();
		setInterval(function(){
			update_etime();
		}, 2000);
	}


	//	天気予報
	if ($("#skywatcher_list").length > 0){

		//	天候名
		var wn = !localStorage || (localStorage.getItem("weather_name") !== "false");
		$("#skywatcher_list")[wn ? "removeClass" : "addClass"]("img_only");
		$("#skywatcher_weather_name")
			.prop("checked", wn)
			.change(function(e){
				$("#skywatcher_list")[(wn = $(e.currentTarget).prop("checked")) ? "removeClass" : "addClass"]("img_only");
				if (localStorage)
					localStorage.setItem("weather_name", wn);
			});
		update_skywatcher();
		setInterval(function(){
			update_skywatcher();
		}, 2000);
	}

	//	Twitter通知
	$("#skywatcher_notify_twitter").click(function(e){




	});


	//	天候
	if ($("#weather_list").length > 0){

		//	更新
		update_weather();
		setInterval(update_weather, 5000);

		//	投稿
		$("#weather_list").on("click", "a", function(e){
			e.stopPropagation();
		}).on("click", ".skywatcher_report:not(.skywatcher_past)", function(e){
			var _e = $(e.currentTarget);
			var pos = _e.position();
			$("#weather_report").html(_e.html());
			$("#weather_area").empty().text(_e.siblings("td:first").text()).attr("area", _e.parent().attr("area"));
			$("#weather_time").empty().text($(".skywatcher_time[time="+_e.attr("time")+"]").text()).attr("time", _e.attr("time"));
			$("#weather_select").css({ right: 0, top: pos.top + _e.height() * 1.5 }).find("[weather]").removeClass("checked").end().show();
			return false;
		});
		$("#weather_select").on("click", "li[weather]", function(e){
			$("#weather_post").find("[weather="+$(e.currentTarget).attr("weather")+"]").addClass("checked").siblings().removeClass("checked");
			$(e.delegateTarget).find("button[name=ok]").prop("disabled", false);
			return false;
		}).on("click", "button[name=ok]", function(e){
			var param = {
				time: $("#weather_time").attr("time"),
				area: $("#weather_area").attr("area"),
				weather: $("#weather_select").find("li.checked").attr("weather"),
			};
			if (param.weather)
				update_weather(param);
			$(e.delegateTarget).hide();
			return false;
		}).on("click", "button[name=cancel]", function(e){
			$(e.delegateTarget).hide();
			return false;
		}).on("click", function(e){
			return false;
		});
	}


});

//	全リソース読み込み後の処理
$(window).load(function(){
	$(".popup_msg").delay(1000).slideDown(500, "easeOutExpo");
	$(".close_popup_msg").click(function(e){ $(this).parents(".popup_msg").slideUp(500, "easeOutExpo"); });
	$(".spot_info .flexslider").flexslider({
		animation: "slide",
		itemWidth: 80,
		maxItems: 3,
		minItems: 1,
		controlNav: false,
		directionNav: false,
	});
	$(".fish_info .flexslider").flexslider({
		animation: "slide",
		itemWidth: 80,
		maxItems: 1,
		minItems: 1,
		controlNav: false,
		directionNav: false,
	});
	$(".aquarium_list .flexslider").flexslider({
		animation: "slide",
		itemWidth: 80,
		maxItems: 3,
		minItems: 1,
		controlNav: false,
		directionNav: false,
	});

	//	マップ表示
	$("canvas.map_base").each(function(idx, e){
		var ctx = e.getContext('2d');
		var img = new Image();
		img.src = $(e).attr("src");
		img.onload = function(){
			var canvas = document.createElement("canvas");
			$(canvas).attr({ width: 1024, height: 1024 });
			var _ctx = canvas.getContext('2d');
			var landmark = landmark_list[$(e).attr("area")];
			var icon = [], dfd = [];
			_ctx.drawImage(img, 0, 0, 1024, 1024);
			for(var i in landmark){
				var lm = landmark[i];
				if (lm.radius){
					var grad = _ctx.createRadialGradient(lm.x, lm.y, 0, lm.x, lm.y, lm.radius);
					grad.addColorStop( 0, 'rgba(128,255,255, 0)');
					grad.addColorStop(.9, 'rgba(128,255,255,.3)');
					grad.addColorStop( 1, lm.radius >= 60 ? 'rgba(128,255,255,0)' : 'rgba(64,128,128,0)');
					_ctx.beginPath();
					_ctx.fillStyle = grad;
					_ctx.arc(lm.x, lm.y, lm.radius, 0, Math.PI*2, false);
					_ctx.fill();
				}
				if (lm.icon){
					icon[i] = new Image();
					dfd[i] = new $.Deferred();
					icon[i].src = "/img/"+lm.icon+".png";
					icon[i].__index = i;
					icon[i].__icon_x = lm.x;
					icon[i].__icon_y = lm.y;
					icon[i].onload = function(){
						_ctx.drawImage(this, this.__icon_x - this.width / 2, this.__icon_y - this.height / 2);
						dfd[this.__index].resolve();
					}
					icon[i].onerror = function(){
						dfd[this.__index].reject();
					}
				}
			}
			$.when.apply($, dfd).always(function(){
				for(var i in landmark){	//	ラベルは最後
					var lm = landmark[i];
					if (lm.name_pos != undefined && lm.name){
						var x = lm.x;
						var y = lm.y + 4;
						switch(lm.name_pos){
							case 1:	x -= 16; _ctx.textAlign = "right";	break;
							case 2:	y -= 28; _ctx.textAlign = "center";	break;
							case 3:	x += 16; _ctx.textAlign = "left";		break;
							case 4:	y += 28; _ctx.textAlign = "center";	break;
						}
						_ctx.shadowColor = "#000";
						_ctx.shadowBlur = 1;
						_ctx.font = "12px 'serif'";
						_ctx.fillStyle = "#000";
						_ctx.fillText(lm.name, x + 1, y);
						_ctx.fillText(lm.name, x, y + 1);
						_ctx.fillText(lm.name, x - 1, y);
						_ctx.fillText(lm.name, x, y - 1);
						_ctx.fillStyle = "#fff";
						_ctx.fillText(lm.name, x, y);
						_ctx.shadowBlur = 0;
					}
				}
				ctx.drawImage(canvas, 0, 0);
				var map = $(e).parents(".map_frame");
				map_adjust(map, map.attr("x") - map.width() / 2, map.attr("y") - map.height() / 2);
				$(e).parents(".map_image").css("opacity", 1);
			});
		};
	});

	//	フッキング情報位置調整
	$(".hooktime").each(function(idx, _e){
		var posx = [];
		$(_e).children("[lt]").each(function(idx, e){
			var p = $(e).position();
			posx.unshift({ sec: $(e).attr("lt"), shift: 0, right: p.left + $(e).outerWidth(), bottom: p.top + $(e).outerHeight(), e:e });
		});
		$.each(posx, function(idx, e){
			var spos = $(_e).children(".lt").find("td").eq(e.sec).position();
			var shift = Math.min(e.shift, spos.left - e.right);
			for(var i in posx)
				posx[i].shift = shift;
			$(e.e).css("left", e.shift);
			var x = e.right + e.shift;
			var dim = { left: x - 12, top: e.bottom, width: Math.max(1, spos.left - x + 12), height: spos.top - e.bottom };
			$("<div></div>").addClass("ht_slash").appendTo($(_e)).css(dim);	//	斜線
		});
	});

	//	震度グラフ
	$(".tug_graph").each(function(idx, e){
		var graph_color = {
			 6: "00f",
			 7: "04c",
			 8: "084",
			 9: "0c0",
			10: "ac0",
			11: "f60",
			12: "f00",
			13: "800",
		};
		var d = JSON.parse($(e).attr("data-value")), i;
		if (!d) return;
		var rad = 100;
		var ctx = e.getContext('2d');
		var arc = 45 * Math.PI / 180;
		for(i in graph_color)
			if (d[i]){
				ctx.fillStyle = "#"+graph_color[i];
				ctx.beginPath();
				ctx.moveTo(rad, rad);
				ctx.arc(rad, rad, rad * d[i], (i - 8) * arc, (i - 8 + 1) * arc, false);
				ctx.closePath();
				ctx.fill();
			}
	});

});

