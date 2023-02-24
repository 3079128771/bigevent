// 封装请求拦截器
$.ajaxPrefilter(function (options) {
  options.url = `http://big-event-api-t.itheima.net${options.url}`;
  // 统一配置权限的接口，设置请求头，添加Authorization身份认证字段
  if (options.url.indexOf("/my/") !== -1) {
    options.headers = {
      Authorization: localStorage.getItem("token") || "",
    };
  }
});
