$(function () {
  //   获取用户信息,数据回显
  //   getUser();
  //   function getUser() {
  //     $.ajax({
  //       method: "GET",
  //       url: "/my/userinfo",
  //       success: function (res) {
  //         console.log(res);
  //         if (res.status !== 0) {
  //           return layer.msg("获取用户信息失败");
  //         }
  //         layer.msg("获取用户信息成功");
  //         // console.log(res.data.user_pic);
  //         $("#image").attr("src", res.data.user_pic);
  //       },
  //     });
  //   }

  var layer = layui.layer;
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $("#image");
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // aspectRatio: 1 / 2,
    // 指定预览区域
    preview: ".img-preview",
  };

  // 1.3 创建裁剪区域
  $image.cropper(options);
  //   弹出文件选择框
  $("#choseImg").on("click", function () {
    $("#file").click();
  });
  //   更改图片，给文件绑定change事件
  $("#file").on("change", function (e) {
    // 判断有没有选择到图片
    if (e.target.files.length === 0) {
      return layer.msg("请选择图片");
    }
    //1 获取到当前图片
    let file = e.target.files[0];
    //2 根据选择的文件，创建 URT 地址
    var newImgURL = URL.createObjectURL(file);
    //3 创建重新选择的图片的裁剪区域
    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", newImgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });
  //   点击确定按钮，上传图片
  $("#uploadImg").on("click", function () {
    // 要拿到用户裁剪之后的头像
    var dataURL = $image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
      })
      .toDataURL("image/png");
    // 调用接口，把头像上传到服务器
    $.ajax({
      method: "POST",
      url: "/my/update/avatar",
      data: {
        avatar: dataURL,
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("更换头像失败！");
        }
        layer.msg("更换头像成功！");
        window.parent.getUserInfo();
      },
    });
  });
});
