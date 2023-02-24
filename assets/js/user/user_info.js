$(function () {
  var layer = layui.layer;
  // 表单验证
  var form = layui.form;
  form.verify({
    nickname: function (value) {
      if (value.length > 6 || value.length < 1) {
        return "昵称长度必须在 1 ~ 6 个字符之间!!!";
      }
    },
  });
  //   获取用户信息,数据回显
  getUserInfo();
  function getUserInfo() {
    $.ajax({
      method: "GET",
      url: "/my/userinfo",
      success: function (res) {
        // console.log(res);
        if (res.status !== 0) {
          return layer.msg("获取用户信息失败");
        }
        // layer.msg("获取用户信息成功");
        // $("[name=username]").val(res.data.username);
        // 调用form.val快速赋值
        form.val("formUserInfo", res.data);
      },
    });
  }
  //   重置功能
  $("#btnreset").on("click", function (e) {
    // 阻止默认提交
    e.preventDefault();
    getUserInfo();
  });
  //   监听表单的提交
  $(".layui-form").on("submit", function (e) {
    // 阻止默认行为
    e.preventDefault();
    // 发送ajax请求
    $.ajax({
      method: "POST",
      url: "/my/userinfo",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg(res.message);
        // 调用父页面的函数，父页面不能有入口函数，入口函数相当于闭包的环境
        window.parent.getUserInfo();
      },
    });
  });
});
