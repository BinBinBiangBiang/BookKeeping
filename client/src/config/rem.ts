(function(doc,win) {  // 源码不干扰其他js文件
  var docEl = doc.documentElement; // 拿到的就是html标签（获取页面根节点html）
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  // 判断设备是否支持orientationchange事件，如果支持则使用orientationchange，否则使用resize事件。这用于监听设备方向变化或窗口大小改变事件。
  var recalc = function() { // 计算函数
    var clientWidth = docEl.clientWidth; // 读取到设备宽度
    if(!clientWidth) return;
    docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
  }
  win.addEventListener(resizeEvt, recalc)  // 实时识别设备尺寸变更并重置根字体 不用再人为刷新
  doc.addEventListener('DOMContentLoaded', recalc);
})(document,window)