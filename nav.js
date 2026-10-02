// 各頁共用的頁籤列，插在頁面最上方
(function () {
    var PAGES = [
        ['index.html', '首頁'],
        ['角色招募表.html', '角色招募表'],
        ['角色成長率一覽.html', '角色成長率'],
        ['角色特技與魔法.html', '特技與魔法'],
        ['兵種一覽.html', '兵種'],
        ['騎乘動物一覽.html', '騎乘動物']
    ];
    var here = decodeURIComponent(location.pathname.split('/').pop()) || 'index.html';
    var css = document.createElement('style');
    css.textContent =
        '#fe-nav { position: sticky; top: 0; z-index: 50; display: flex; flex-wrap: wrap; gap: 4px; margin: -16px -16px 12px; padding: 8px 16px 0;'
        + ' background: #2b3a55; font-family: "Microsoft JhengHei", "Noto Sans TC", sans-serif; }'
        + '#fe-nav a { padding: 6px 14px; border-radius: 6px 6px 0 0; color: #d6def0; text-decoration: none; font-size: 14px; white-space: nowrap; }'
        + '#fe-nav a:hover { background: #3b4d70; color: #fff; }'
        + '#fe-nav a.on { background: #f4f5f7; color: #222; font-weight: bold; }'
        // 表頭凍結：取消表格外框的捲動，讓表頭黏在頁籤列下方（改由整頁左右捲動）
        + '#fe-nav { left: 0; }'
        + '.wrap { overflow: visible !important; }'
        + 'thead th { position: sticky !important; top: var(--fe-nav-h, 39px) !important; z-index: 20 !important; box-shadow: 0 1px 0 rgba(0,0,0,.15); }';
    document.head.appendChild(css);
    var nav = document.createElement('nav');
    nav.id = 'fe-nav';
    nav.innerHTML = PAGES.map(function (p) {
        return '<a href="' + p[0] + '"' + (p[0] === here ? ' class="on"' : '') + '>' + p[1] + '</a>';
    }).join('');
    document.body.insertBefore(nav, document.body.firstChild);
    // 頁籤列換行時高度會變，表頭要跟著往下
    function setNavH() {
        document.documentElement.style.setProperty('--fe-nav-h', nav.offsetHeight + 'px');
    }
    setNavH();
    window.addEventListener('resize', setNavH);

    // 鍵盤左右鍵切換上一頁／下一頁頁籤（頭尾相接），輸入框打字時不作用
    document.addEventListener('keydown', function (ev) {
        if (ev.key !== 'ArrowLeft' && ev.key !== 'ArrowRight') { return; }
        if (ev.altKey || ev.ctrlKey || ev.metaKey || ev.shiftKey) { return; }
        var t = ev.target;
        if (t.isContentEditable || /^(TEXTAREA|SELECT)$/.test(t.tagName)) { return; }
        if (t.tagName === 'INPUT' && /^(checkbox|radio|button)$/.test(t.type) === false) { return; }
        var i = PAGES.map(function (p) { return p[0]; }).indexOf(here);
        if (i < 0) { i = 0; }
        var n = (i + (ev.key === 'ArrowRight' ? 1 : -1) + PAGES.length) % PAGES.length;
        ev.preventDefault();
        location.href = PAGES[n][0];
    });
})();
