var dom={
    $:function(selector){
        return document.querySelector(selector);
    },
    $$:function(selector){
        return document.querySelectorAll(selector);
    }
};
var fadeObj={
    flashNode:dom.$('#flash'),
    aLeftNode:dom.$('#flash_left'),
    aRightNode:dom.$('#flash_right'),
    spanNodes:dom.$$('#flash .flash_btn span'),
    liNodes:dom.$$('#flash li'),
    fadeOne:null,
    flashEnterLeaveFun:function(e){
        var _this=this;
        var event=window.event || e;
        //console.log(event.type);
        if(event.type=='mouseenter'){
            _this.aLeftNode.style.display='block';
            _this.aRightNode.style.display='block';
            clearInterval(_this.autoDo);
        }else{
            _this.aLeftNode.style.display='none';
            _this.aRightNode.style.display='none';
            _this.autoDo=window.setInterval(function(){
                _this.aRightClickFun();
            },3000);
        }
    },
    fadeFun:function(curPos,oldPos,num){//num表示动画过程变化的值
        var _this=this;
        window.clearTimeout(_this.fadeOne);
        for(var i=0;i<_this.liNodes.length;i++){//除了curPos,oldPos的li对象直接结束动画
            if(i!=curPos && i!=oldPos){
                _this.liNodes[i].style.opacity=0;
                _this.liNodes[i].style.filter="alpha(opacity=0)";
                _this.liNodes[i].style.display='none';
            }
        }

        if(num==0){//动画开始的时候
            _this.spanNodes[curPos].className="current";
            _this.spanNodes[oldPos].className="block";
            _this.liNodes[curPos].style.opacity=0;
            _this.liNodes[curPos].style.filter="alpha(opacity=0)";
            _this.liNodes[curPos].style.display='block';
        }
        num+=5;
        if(num<=100){//动画中
            //淡入
            _this.liNodes[curPos].style.opacity=num/100;
            _this.liNodes[curPos].style.filter="alpha(opacity="+num+")";
            //淡出
            _this.liNodes[oldPos].style.opacity=(100-num)/100;
            _this.liNodes[oldPos].style.filter="alpha(opacity="+(100-num)+")";
            _this.fadeOne=window.setTimeout(function(){
                _this.fadeFun(curPos,oldPos,num);
            },20);
        }
        else{//动画结束
            this.liNodes[oldPos].style.display="none";
        }
    },
    btnSliderFun:function(){
        var _this=this;
        for(var i=0;i<_this.spanNodes.length;i++){
            _this.spanNodes[i].index=i;
            _this.spanNodes[i].onmouseenter=function(){
                if(this.className=="current")
                {
                    return;
                }
                var curPos=this.index;
                var oldPos;
                for(var i=0;i<_this.spanNodes.length;i++){
                    if(_this.spanNodes[i].className=='current'){
                        oldPos=i;
                        break;
                    }
                }

                _this.fadeFun(curPos,oldPos,0);
            };
        }
    },
    aLeftClickFun:function(){
        var _this=this;
        var oldPos;
        var lastPos=_this.spanNodes.length-1;//最后一个位置
        for(var i=0;i<_this.spanNodes.length;i++){
            if(_this.spanNodes[i].className=="current"){
                oldPos=i;
                break;//跳出循环
            }   
        }
        var curPos=oldPos==0?lastPos:oldPos-1; 

        _this.fadeFun(curPos,oldPos,0);
    },
    aRightClickFun:function(){
        var _this=this;
        var oldPos;
        var lastPos=_this.spanNodes.length-1;//最后一个位置
        for(var i=0;i<_this.spanNodes.length;i++){
            if(_this.spanNodes[i].className=="current"){
                oldPos=i;
                break;//跳出循环
            }   
        }
        var curPos=oldPos==lastPos?0:oldPos+1;

        _this.fadeFun(curPos,oldPos,0);
    },
    init:function(){
        var _this=this;
        _this.flashNode.onmouseenter=function(e){
            _this.flashEnterLeaveFun(e);
        };
        _this.flashNode.onmouseleave=function(e){
            _this.flashEnterLeaveFun(e);
        };

        _this.btnSliderFun();

        _this.aLeftNode.onclick=function(){
            _this.aLeftClickFun();
        }

        _this.aRightNode.onclick=function(){
            _this.aRightClickFun();
        }

        _this.autoDo=window.setInterval(function(){
            _this.aRightClickFun();
        },3000);
    }
};

fadeObj.init();


/*球*/
$(".circle_main li").mouseenter(function(){
	if($(this).hasClass("circle_cur"))
	 return;
	var oldPos=$(".circle_cur").index();
	$(this).addClass("circle_cur").stop().animate({width:"502px"},500);
	$(".circle_main li").eq(oldPos).removeClass("circle_cur").stop().animate({width:"167px"},500);
});

/*about*/
$(".aboutus-main-left").mouseenter(function(){
	$(this).find("img").stop().animate({width:"550px",height:"300px",margin:"-15px 0 0 -15px"},400);
	$(this).find("p").stop().animate({top:"0px"},400);
});
$(".aboutus-main-left").mouseleave(function(){
	$(this).find("img").stop().animate({width:"491px",height:"241px",margin:"0 0 0 0"},400);
	$(this).find("p").stop().animate({top:"241px"},400);
});



var liW=138;
$('.firend_btnli1').click(function(){
	$('.firend_link li:first').animate({marginLeft:-liW+'px'},200,function(){
		   $('.firend_link ul').append($(this));
		   $(this).css('margin-left','0px');
	 });
});
$('.firend_btnli2').click(function(){
	$('.firend_link li:last').css('margin-left',-liW+'px');
	$('.firend_link ul').prepend($('.firend_link li:last'));
	$('.firend_link li:first').animate({marginLeft:'0px'},200);
});



















