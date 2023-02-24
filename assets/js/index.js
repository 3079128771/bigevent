var layer = layui.layer;
// 获取用户信息
getUserInfo();
function getUserInfo() {
  $.ajax({
    method: "GET",
    url: "/my/userinfo",
    // headers配置请求头带上token身份认证
    //   在请求拦截器里面写了
    //   headers: {
    //     Authorization: localStorage.getItem("token"),
    //   },
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg("获取用户信息失败");
      }
      // layer.msg("获取用户信息成功");
      //    调用渲染函数，传入res.data
      renderAvatar(res.data);
    },
    // 不论成功和失败都会执行这个回调函数
    complete: function (res) {
      // console.log(res);
      // 服务器响应的数据在responseJSON
      if (
        res.responseJSON.status === 1 &&
        res.responseJSON.message === "身份认证失败！"
      ) {
        // 强制清空token
        localStorage.removeItem("token");
        // 强制跳转到登录页
        location.href = "/login.html";
      }
    },
  });
}
// 渲染用户信息（昵称+头像）
function renderAvatar(user) {
  console.log(user);
  // 获取用户名称
  let name = user.nickname || user.username;
  // 渲染到html
  $("#welcome").html(`欢迎&nbsp;&nbsp;${name}`);
  // 判断是否有头像
  if (user.user_pic !== null) {
    // 有图片，渲染图片
    $(".layui-nav-img").attr("src", user.user_pic).show();
    $(".text-avatar").hide();
  } else {
    // 没有图片,渲染文字
    $(".layui-nav-img").hide();
    const first = name[0].toUpperCase();
    $(".text-avatar").html(first).show();
  }
}
// 用户退出功能
$("#loginout").on("click", function (e) {
  // 阻止默认提交
  e.preventDefault();
  // 弹出询问弹出框
  layer.confirm("确认退出吗?", { icon: 3, title: "提示" }, function (index) {
    // 清除token
    localStorage.removeItem("token");
    // 跳转到login页面
    location.href = "/login.html";
    // 点击取消，关闭弹出框
    layer.close(index);
  });
});
