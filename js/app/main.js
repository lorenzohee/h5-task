/**
 * Created by Administrator on 2016/6/23.
 */
define(['zepto', 'handlebars', 'underscore'], function($, Handlebars, _){
    var task = {
        pageIndex: 1,
        startPosition: {},
        endPosition:{},
        deltaX: 0,
        deltaY: 0,
        moveLength: 0
    };
    task.init = function(){
        var that = this;
        that.taskBannerInit();
        that.taskItemsInit();
        that.screenListener();
    };

    task.screenListener = function(){
        var that = this;
        $(".content").bind('touchstart', function(e){
            var touch = e.touches[0];
            that.startPosition = {
                x: touch.pageX,
                y: touch.pageY
            }
            that.deltaX = 0;
        }) .bind('touchmove', function(e){
            var touch = e.touches[0];
            that.endPosition = {
                x: touch.pageX,
                y: touch.pageY
            };

            that.deltaX = that.endPosition.x - that.startPosition.x;
            that.deltaY = that.endPosition.y - that.startPosition.y;
            that.moveLength = Math.sqrt(Math.pow(Math.abs(that.deltaX), 2) + Math.pow(Math.abs(that.deltaY), 2));
        }).bind('touchend', function(e){
            if(that.deltaX < 0 && Math.abs(that.deltaX)>100) { // 向左划动
                if(that.pageIndex==3){
                    that.pageIndex = 1;
                }else {
                    that.pageIndex += 1;
                }
                that.taskBannerInit();
            } else if (that.deltaX > 0 && Math.abs(that.deltaX)>100) { // 向右划动
                if(that.pageIndex==1){
                    that.pageIndex = 3;
                }else {
                    that.pageIndex -= 1;
                }
                that.taskBannerInit();
            }
        });
    }
    task.taskBannerInit = function(){
        var that = this;
        $.get("js/mockdata/task.json?pageNum="+that.pageIndex+'&time='+new Date(), function(result){
            var taskMine = Handlebars.compile($('#task-mine').html());
            $('.task_subtitle').empty().html(taskMine(result));
            $('.task_subtitle table tr td').removeClass('active');
            $('.task_subtitle table tr td:nth-child('+that.pageIndex+')').addClass('active');
        });
        return that;
    };
    task.taskItemsInit = function(){
        var that = this;
        $.get("js/mockdata/taskitems.json", function(result){
            var handlerbarTemp = Handlebars.compile($('#task-items').html());

            //注册一个比较大小的Helper,判断v1是否大于v2
            Handlebars.registerHelper("compare",function(v1,v2,options){
                if(v1>=v2){
                    //满足添加继续执行
                    return options.fn(this);
                }else{
                    //不满足条件执行{{else}}部分
                    return options.inverse(this);
                }
            });
            $('.task-content').empty().after(handlerbarTemp(result));
            that.taskItemListener();
            that.taskSubmitListener();
        });
        return that;
    };
    task.taskItemListener = function(){
        $('.task_item_title').off('tap').on('tap', function(){
            var contentDom = $(this).parent().find('.task_item_content');
            if(contentDom.hasClass('hide')){
                contentDom.removeClass('hide');
                $(this).find('.fa').removeClass('fa-chevron-down').addClass('fa-chevron-up');
            }else {
                contentDom.addClass('hide');
                $(this).find('.fa').removeClass('fa-chevron-up').addClass('fa-chevron-down');
            }
        })
    };
    task.taskSubmitListener = function(){
        $('.enabled').off('tap').on('tap', function(){
            alert('领取成功！');
        })
    }
    return task;
})