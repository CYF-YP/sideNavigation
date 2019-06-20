// ;防止跟其他js压缩时报错
; (function (window, document) {
    // 开启严格模式
    "use strict";

    function navigation(options) {
        var self = this;
        if (!options) {
            throw new Error("请传入配置参数");
        }
        self = Object.assign(self, options);
        self.container = document.querySelector(self.container) || document.querySelectorAll(self.container);

        self.onActive(self.container);
        self.onScroll(self.container, window);
    };

    // 原型链上提供方法
    navigation.prototype = {
        // a标签点击事件
        onActive: function (ele) {
            $(ele).find('a').on('click', function () {
                $(this).addClass('linkActive').siblings().removeClass('linkActive');
            });
        },
        // a标签滑动事件
        onScroll: function (ele, window) {
            $(window).scroll(function () {
                var top = $(window).scrollTop();
                if ($($(ele).children(":first").attr('href')).offset().top > top) {
                    // 淡出效果隐藏元素
                    // $(ele).fadeOut(1000);
                    $(ele).hide();
                    return;
                } else {
                    // 淡入效果显示元素
                    // $(ele).fadeIn();
                    $(ele).show();
                }
                var temlist = [];
                var i = 1;
                while (i <= $(ele).find('a').length) {
                    if (temlist.length >= $(ele).find('a').length) {
                        break;
                    }
                    temlist.push($($($(ele).find('a')[i - 1]).attr('href')).offset().top);
                    i++;
                }
                temlist.map(function (value, index) {
                    if (value <= top) {
                        if (temlist[index + 1] > top || index == temlist.length - 1) {
                            $($(ele).find('a')[index]).addClass('linkActive').siblings().removeClass('linkActive');
                        }
                    }
                });
            });
        }
    };

    // 兼容CommonJs规范
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = navigation;
    };

    // 兼容AMD/CMD规范
    if (typeof define === 'function') define(function () {
        return navigation;
    });

    // 注册全局变量,兼容使用script标签引入插件
    window.navigation = navigation;
})(window, document);