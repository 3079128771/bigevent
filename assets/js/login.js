$(function () {
  // http://big-event-api-t.itheima.net
  // Layer模块
  const laver = layui.Laver;
  // 去登录
  $("#link_login").on("click", function () {
    $(".login-box").show();
    $(".reg-box").hide();
  });
  //   去注册
  $("#link_reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  //   表单验证
  var form = layui.form;
  form.verify({
    // 自定义了一个叫做 pwd 校验规则
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    // 校验两次密码是否一致的规则
    repwd: function (value) {
      // value是确认密码框的值
      // 通过形参拿到的是确认密码框中的内容
      // 还需要拿到密码框中的内容
      // 然后进行一次等于的判断
      // 如果判断失败,则return一个提示消息即可
      var pwd = $(".reg-box [name=password]").val();
      if (pwd !== value) {
        return "两次密码不一致！";
      }
    },
  });
  // 注册功能
  $("#form_reg").on("click", function (e) {
    // 阻止默认提交
    e.preventDefault();
    // 发送ajax
    // 获取到数据
    const data = {
      username: $("#username").val(),
      password: $("#password").val(),
    };
    $.post({
      url: "/api/reguser",
      data,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg("注册成功，请登录");
        // $(".login-box").show();
        // $(".reg-box").hide();
        // 模拟点击事件
        $("#link_login").click();
      },
    });
  });
  // 登录功能
  $("#formLogin").on("submit", function (e) {
    e.preventDefault();
    $.post({
      url: "/api/login",
      data: $("#formLogin").serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg(res.message);
        // 存储token
        localStorage.setItem("token", res.token);
        // 跳转页面
        location.href = "/index.html";
      },
    });
  });
});
