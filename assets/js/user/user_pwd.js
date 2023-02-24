$(function () {
  var form = layui.form;
  var layer = layui.layer;
  form.verify({
    // 密码框验证规则
    pwd: function (value) {
      if (value.length < 6 || value.length > 12) {
        return "密码长度在6到12位，且不能有空格";
      }
    },
    // 新密码验证规则
    samePwd: function (value) {
      if (value === $("#oldPwd").val()) {
        return "新日密码不能相同";
      }
    },
    // 确认密码验证规则
    repwd: function (value) {
      if (value !== $("#newPwd").val()) {
        return "两次密码不一致";
      }
    },
  });
  //   实现重置密码
  $(".layui-form").on("submit", function (e) {
    // 阻止默认提交
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/updatepwd",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg(res.message);
        // 模拟点击重置
        // $("#btnreset").click();
        // 跳转页面
        localStorage.removeItem("token");
        // 有瑕疵，只能在主题内容框显示login页面
        // location.href = "/login.html";
        // 上一行相当于window.location.href = "/login.html";
        // 父与子之间页面直接的关系
        parent.location.href = "/login.html";
        // 最外层的
        // top.location.href = "/login.html";
      },
    });
  });
});
