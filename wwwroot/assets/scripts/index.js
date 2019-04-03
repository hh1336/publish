
//加载菜单
function GetModel(pid, callback) {
    if (pid === undefined) {
        pid = "";
        $.post("/Home/GetModel", { pid: pid }, function (result) {
            for (var i = 0; i < result.length; i++) {
                var listr = "";
                GetModel(result[i].id, function (da) {
                    listr = da;
                });
                var str = `
                <li>
                    <a href="#tit` + result[i].id + `" data-toggle="collapse" class="collapsed layui-anim layui-anim-upbit" aria-expanded="false"><i class="fa ` + result[i].icon + `"></i> 
                        <span>`+ result[i].name + `</span> 
                        <i class="icon-submenu lnr lnr-chevron-left"></i>
                                <div id="tit`+ result[i].id + `" class="collapse" aria-expanded="false" style="height: 0px;">
                                    <ul class="nav">
                                        `+ listr + `
                                    </ul>
                                </div>
                    </a>
                </li>`;

                $("#headul").append(str);
            }

            //加入模块管理和设置
            var settingTitle = `<li>
                    <a href="#SettingAndManager" data-toggle="collapse" class="collapsed layui-anim layui-anim-upbit" aria-expanded="false"><i class="layui-icon layui-icon-set"></i> 
                        <span>设置与管理</span> 
                        <i class="icon-submenu lnr lnr-chevron-left"></i>
                        <div id="SettingAndManager" class="collapse" aria-expanded="false" style="height: 0px;">
                            <ul class="nav">
                                <li><a href="/recovery/Index" >回收站</a></li>
                                <li><a href="/RotationChartSetting/Index" >轮播图设置</a></li>
                                <li><a href="/ModelManager/Index" >模块管理</a></li>
                                <li><a href="/WebStationSetting/Index" >网站设置</a></li>
                                <li><a href="/UserManager/Index" >用户管理</a></li>
                            </ul>
                        </div>
                    </a>
                </li>`;

            $("#headul").append(settingTitle);

        });
    } else {
        $.ajax({
            url: "/Home/GetModel",
            data: { pid: pid },
            dataType: "json",
            type: "post",
            async: false
        }).done(function (data) {
            var li = "";
            for (var s = 0; s < data.length; s++) {
                li += "<li><a class='cmodel' href='/LatestInformation/Index' data-id='" + data[s].id + "'>" + data[s].name + "</a></li>";
            }
            callback(li);
        });
    }
}

$(document).on("click", ".menupoint", function (e) {
    e.preventDefault();
    var target = $(this).attr("target");
    if (target === "show") {
        $(this).attr("target", "hidden");
        $("#sidebar-nav").addClass("hiddenleftbar").removeClass("showleftbar");
    }
    if (target === "hidden") {
        $(this).attr("target", "show");
        $("#sidebar-nav").addClass("showleftbar").removeClass("hiddenleftbar");
    }

})


$(function () {
    $("#headul").ready(function () {
        GetModel();
    });

    $.post("/Home/GetSession", { key: "username" }, function (result) {
        $("#username").text(result.nickname).prev().attr("src", result.portraitUrl);
    });

    $(document).on("click", ".cmodel", function (e) {
        var key = "ModelId";
        var val = $(this).attr("data-id");
        Common.SetSession(key, val);
    });

});
