$(document).ready(function(){
	/*复制第一张图片  .clone() jquery中用于复制元素的方法*/
	var firstA = $(".banner a").first().clone();
	/*复制最后一张图片  .clone() jquery中用于复制元素的方法*/
	var lastA = $(".banner a").last().clone();
	/*将第一张复制的元素插入到最后一个元素的后面*/
	$(".banner a").last().after($(firstA));
	/*将最后一张复制的元素插入到第一个元素的前面*/
	$(".banner a").first().before($(lastA));
	/*轮播图的数量*/
	var aNum = $(".banner a").length;
	/*单张图片的宽度*/
	var aWidth = $(".banner a").width();
	/*设置图片外层盒子的宽度*/
	var bannerWidth =$(".banner").width(aNum * aWidth);
	/*全局变量*/
	var i = 1;
	/*时间变量*/
	var timer = "";
	/*图片偏移量*/
	var count = 1;
	// 移动的时间
	var moveTime = 500
	/*轮播盒子的初始位置*/
	$(".banner").css({'left':-aWidth+'px'});

	/*向左移动方法开始*/
	function moveLeft(){
		/*偏移距离*/
		count = (i % aNum + 1) * aWidth;
		if(i == (aNum-2)){
			$(".banner").stop().animate({left:-count+'px'},moveTime,function(){
				$(".banner").css('left',-aWidth+'px');

			});
			$(".index ul li").eq(0).addClass("on").siblings().removeClass("on");
			i=1;
		}else{
			$(".banner").stop().animate({left:-count+'px'},moveTime,function(){

			});
			$(".index ul li").eq(i).addClass("on").siblings().removeClass("on");
			i++;
		}
	}
	/*向右移动*/
	function moveRight(){
		count = (i % aNum) * aWidth;
		if(i == 1){
			$(".banner").stop().animate({left:0+'px'},moveTime,function(){
				$(".banner").css({'left':-count * (aNum-2)+'px'});
				// flag=false;
			});
			$(".index ul li").eq(aNum-3).addClass("on").siblings().removeClass("on");
			i=aNum-2;
		}else{
			$(".banner").stop().animate({left:-count+aWidth+'px'},moveTime,function(){
				// flag=false;
			});
			$(".index ul li").eq(i-2).addClass("on").siblings().removeClass("on");
			i--;
		}
	}
	timer = setInterval(moveLeft,3000);
	/*当鼠标移入盒子时的动作*/
	$(".box").mouseenter(function(){
		clearInterval(timer);
		$(".arrow").fadeIn(1000);
	});
	/*当鼠标移出盒子时的动作*/
	$(".box").mouseleave(function(){
		timer = setInterval(moveLeft,3000);
		$(".arrow").fadeOut(1000);
	});
	/*当点击左右箭头时的动作*/
	$(".box .right").click(function(){
		moveLeft();
	});
	$(".box .left").click(function(){
		moveRight();
	});
	/*当点击小按钮时的动作*/
	$(".index li").click(function(){
		$(".index li").removeClass("on");
		$(this).addClass("on");
		i=$(this).index();
		moveLeft();
	})
})