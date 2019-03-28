// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

class Common {
    //根据key获取Session值
    static GetSession(key, callback) {
        $.ajax({
            url: "/Home/GetSessionValue",
            type: "post",
            dataType: "json",
            data: { key: key },
            async: false
        }).done((value) => {
            callback(value);
        });
    }
    //设置session的值
    static SetSession(key, val) {
        $.post("/Home/SetSession", { key: key, value: val });
    }

    //转换时间
    static ToDateTime(time) {
        var d = new Date(time);
        var year = d.getFullYear();
        var month = d.getMonth();
        month++;
        var day = d.getDate();
        month = month < 10 ? "0" + month : month;
        day = day < 10 ? "0" + day : day;
        var h = d.getHours();
        var mm = d.getMinutes();
        var s = d.getSeconds();
        return year + "年" + month + "月" + day + "日 " + h + ":" + mm + ":" + s;
    }

    //自定义弹框（回调函数如果带有参数，则只能传入匿名函数）
    static alert(title, msg, yescallback, endcallback, width) {
        //当没有传入回调函数时
        if (yescallback === undefined && endcallback === undefined) {
            yescallback = function (index, layero) {
                layer.close(index);
            };
        }

        if (yescallback !== undefined && endcallback === undefined) {//当传入一个回调函数时
            endcallback = function () {
            };
        }

        var index = layer.open({
            title: title,
            content: msg,
            shadeClose: true,
            area: width === undefined ? 'auto' : width,
            closeBtn: "2",
            btn: ["确定", "取消"],
            btn1: yescallback,
            btn2: endcallback
        });

        return index;
    }

}


//封装模态框
var appModal = function (obj) {//初始获取模态框
    this.model = $("#myModal");
    this.mtitle = $("#myModalLabel");
    this.mbody = $(".modal-body");
    this.yescallback = $("#modalsub");
    this.endcallback = $("#modalend");
    this.mWidth = $(".modal-dialog");
    this.clear();

    //实例化时需要传入参数将模态框进行初始化
    if (obj !== undefined) this.init(obj);

};

appModal.prototype = {
    //弹出模态框
    open: function (obj) {
        if (obj !== undefined) {
            if (obj.width !== undefined) this.mWidth.css("width", obj.width);
        }

        this.model.modal("show");
    },
    //关闭模态框
    close: function () {
        this.model.modal("hide");
    },
    init: function (obj) {
        var dom = this;
        //模态框的标题
        this.mtitle.text(obj.title);
        //发送一个ajax请求，将子页面渲染到模态框中
        if (obj.url !== undefined) {
            $.ajax({
                url: obj.url,
                dataType: "html",
                type: "post",
                data: obj.data === undefined ? {} : obj.data,
                async: false
            }).done(function (result) {
                if (obj.callback !== undefined) obj.callback(result);

                dom.mbody.html(result);

            });
        }

        if (obj.body !== undefined) {
            dom.mbody.html(obj.body);
        }

        if (obj.yes !== undefined) {
            dom.yescallback.click(obj.yes);
        }

        if (obj.end !== undefined) {
            dom.endcallback.click(obj.end);
        }
        if (obj.width !== undefined) {
            dom.mWidth.css("width", obj.width);
        }


    },
    //清空模态框内容
    clear: function () {
        this.mtitle.text("标题");
        this.mbody.html("");
        this.yescallback.unbind();
        this.endcallback.unbind();
    }
};

