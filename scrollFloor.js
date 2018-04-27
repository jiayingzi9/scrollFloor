;(function () {
    var defaults={
        "control1": ".lift-nav", 						  //侧栏电梯的容器
        "control2": ".jf-lift",                           //需要遍历的电梯的父元素
        "Backtop":".jf-top",
        "target": [".t1",".t2",".t3",".t4",".t5",".t6"], //监听的内容，注意一定要从小到大输入
        "current": "jf-current",
    };
    var _function={
        init:function () {
            _function.LiftEffect.call(this);
        },
        LiftEffect:function () {
            //创建一个数组
            var array=[];
            for(var i =0; i<this.element.target.length;i++){
                //获取dom区域距离顶部的偏移px
                var t = $(this.element.target[i]).offset().top;
                //放到数组
                array.push(t);
            };
            var _element=this.element;//重新保存指向
            function Selected(index){
                //滚动的时候控制颜色
                $(_element.control2).children().eq(index).addClass(_element.current).siblings().removeClass(_element.current);
            }
            $(window).on("scroll",Check);
            function Check(){
                //滚动条位置
                var wst = $(window).scrollTop();
                //当滚动条位置大于等于dom区域的高度就淡入
                // if(wst >= $(_element.target[0]).offset().top-100){
                //     $(_element.control1).fadeIn(500);
                // }else{
                //     $(_element.control1).fadeOut(500);
                // }
                var key =0;
                var flag = true;
                //array--dom区域距离顶部的偏移px
                for(var i =0; i<array.length; i++){
                    //就是每循环一次就加1
                    key++;
                    if(flag){
                        if(wst >= array[array.length-key]-300){
                            var index = array.length-key;
                            flag = false;
                        }else{
                            flag=true;
                        }
                    }
                }
                //左侧导航控制颜色
                Selected(index);
            };
            $(this.element.control2).children().on("click",function(){
                //off() 方法通常用于移除通过 on() 方法添加的事件处理程序
                $(window).off("scroll");
                var index = $(this).index();
                //左侧导航控制颜色
                Selected(index);
                var flag = true;
                for(var i =0; i<array.length; i++){
                    if(flag){
                        if(index == i){
                            $("html,body").stop().animate({
                                "scrollTop": array[i]-50
                            },500,function(){
                                $(window).on("scroll",Check);
                            });
                            flag = false;
                        }else{
                            flag=true;
                        }

                    }
                }

            });
            //返回顶部
            $(this.element.Backtop).on("click",function () {
                $('body,html').animate({
                    "scrollTop":0,
                },500)
            });
            //判断是否滚动到最底部
            $(window).scroll(function(){
                var scrollTop = $(this).scrollTop();
                var scrollHeight = $(document).height();
                var windowHeight = $(this).height();
                if(scrollTop + windowHeight == scrollHeight){
                    //左侧导航控制颜色
                    var index = $(this).index();
                    Selected(index);
                }
            });
        },
    }
    var scrollFloor=function (element) {
      this.element=$.extend({},defaults,element);
        _function.init.call(this);
    };
    scrollFloor.prototype={

    };
    window.JF ? window.JF['scrollFloor']=scrollFloor : window.scrollFloor=scrollFloor;
})();