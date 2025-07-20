// 新的数据结构示例
// === 数据源统一为 window.copyData ===
window.copyData = {
    electronics: {
        title: "电子产品",
        items: [
            { zh: "全新智能手机，性能强劲，拍照清晰！", en: "Brand new smartphone with powerful performance and crystal clear photos!", ja: "高性能で写真が鮮明な最新スマートフォン！" },
            { zh: "超长续航，快速充电", en: "Ultra-long battery life with fast charging", ja: "超長持ちバッテリーと急速充電" },
            { zh: "游戏体验流畅，多任务处理无压力", en: "Smooth gaming experience, seamless multitasking", ja: "ゲーム体験がスムーズ、マルチタスク処理も快適" }
        ]
    },
    clothing: {
        title: "服装服饰",
        items: [
            { zh: "时尚外套，引领潮流！", en: "Fashionable jacket leading the trend!", ja: "トレンドをリードするファッショナブルなジャケット！" },
            { zh: "精选面料，舒适透气", en: "Premium fabric, comfortable and breathable", ja: "上質な生地、快適で通気性抜群" }
        ]
    },
    beauty: {
        title: "美妆护肤",
        items: [
            { zh: "护肤套装推荐", en: "Professional skincare set for healthy skin care!", ja: "肌の健康を守るプロ仕様スキンケアセット！" },
            { zh: "天然成分，温和不刺激", en: "Natural ingredients, gentle and non-irritating", ja: "天然成分、優しく刺激なし" }
        ]
    },
    food: {
        title: "食品饮料",
        items: [
            { zh: "健康零食推荐", en: "Healthy snacks, nutritious and delicious!", ja: "栄養豊富で美味しいヘルシースナック！" },
            { zh: "天然原料，无添加防腐剂", en: "Natural ingredients, no preservatives added", ja: "天然原料、保存料無添加" }
        ]
    },
    home: {
        title: "家居用品",
        items: [
            { zh: "智能家居产品", en: "Smart home, technological living!", ja: "スマートホーム、テクノロジーライフ！" },
            { zh: "智能控制，一键操作", en: "Smart control with one-click operation", ja: "スマートコントロール、ワンクリック操作" }
        ]
    }
};

let currentCategory = 'electronics';

const categoryItems = document.querySelectorAll('.category-item');
const categoryTitle = document.getElementById('category-title');
const copyItemsContainer = document.getElementById('copy-items');
const toast = document.getElementById('toast');

// 动态渲染左侧分类导航
function renderCategoryList() {
    const categoryList = document.querySelector('.category-list');
    categoryList.innerHTML = '';
    const keys = Object.keys(window.copyData);
    keys.forEach((key, idx) => {
        const div = document.createElement('div');
        div.className = 'category-item' + (idx === 0 ? ' active' : '');
        div.dataset.category = key;
        div.innerHTML = `<span>${window.copyData[key].title}</span>`;
        categoryList.appendChild(div);
    });
    // 绑定点击事件
    const items = categoryList.querySelectorAll('.category-item');
    items.forEach(item => {
        item.addEventListener('click', function() {
            items.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.dataset.category;
            updateCategoryTitle();
            renderCopyItems();
        });
    });
    // 默认选中第一个分类
    if (keys.length > 0) {
        currentCategory = keys[0];
        updateCategoryTitle();
        renderCopyItems();
    }
}

// 页面初始化和导入后都调用

document.addEventListener('DOMContentLoaded', function() {
    renderCategoryList();
    setupTabSwitch();
});

function setupEventListeners() {
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            const category = this.dataset.category;
            if (category !== currentCategory) {
                currentCategory = category;
                updateActiveCategory();
                updateCategoryTitle();
                renderCopyItems();
            }
        });
    });
}

function updateActiveCategory() {
    categoryItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.category === currentCategory) {
            item.classList.add('active');
        }
    });
}

function updateCategoryTitle() {
    categoryTitle.textContent = window.copyData[currentCategory].title;
}

function setupTabSwitch() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(tc => tc.classList.remove('active'));
            this.classList.add('active');
            const tab = this.getAttribute('data-tab');
            document.getElementById('tab-' + tab).classList.add('active');
        });
    });
}

// 渲染每个句子的多语言版本
function renderCopyItems() {
    const items = window.copyData[currentCategory].items;
    copyItemsContainer.innerHTML = '';
    const langs = getLanguages();
    items.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'sentence-card';
        card.innerHTML = langs.map(lang => `
            <div class="lang-row">
                <span class="lang-label">${lang.name}</span>
                <span class="sentence-text">${escapeHtml(item[lang.key] || '')}</span>
                <button class="sentence-copy-btn" onclick="copyText('${escapeHtml(item[lang.key] || '')}')"><i class="fas fa-copy"></i> 复制</button>
            </div>
        `).join('');
        copyItemsContainer.appendChild(card);
    });
}

function copyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showToast();
}

function showToast() {
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 默认语言列表
const defaultLanguages = [
    { key: 'zh', label: '中文' },
    { key: 'en', label: 'English' },
    { key: 'ja', label: '日本語' }
];

function getLanguages() {
    const langs = localStorage.getItem('copyLanguages');
    if (langs) {
        try { return JSON.parse(langs); } catch(e) {}
    }
    return [...defaultLanguages];
}
function saveLanguages(langs) {
    localStorage.setItem('copyLanguages', JSON.stringify(langs));
}

// 管理区渲染入口（扩展文案管理）
function renderManagePanel() {
    const root = document.getElementById('manage-root');
    if (!root) return;
    root.innerHTML = '';

    // 导入导出区
    const ioBox = document.createElement('div');
    ioBox.className = 'manage-section';
    ioBox.innerHTML = `
        <h3>导入/导出</h3>
        <button id="export-btn"><i class="fas fa-download"></i> 导出配置</button>
        <label class="import-label">
            <i class="fas fa-upload"></i> 导入配置
            <input type="file" id="import-input" accept="application/json" style="display:none;" />
        </label>
        <details style="margin-top:16px;">
          <summary style="cursor:pointer;font-size:1rem;color:#764ba2;font-weight:600;">查看导入JSON格式示例</summary>
          <pre style="background:#f6f8fe;border-radius:8px;padding:14px 12px;margin-top:10px;font-size:0.98rem;overflow-x:auto;">{
  "copyData": {
    "分类名": {
      "title": "分类显示名",
      "items": [
        { "zh": "中文文案", "en": "English text", "tl": "菲律宾语文案" }
        // ...可有多条
      ]
    }
    // ...可有多个分类
  },
  "languages": [
    { "key": "zh", "name": "中文" },
    { "key": "en", "name": "English" },
    { "key": "tl", "name": "菲律宾语" }
  ]
}</pre>
        </details>
    `;
    root.appendChild(ioBox);

    document.getElementById('export-btn').onclick = function() {
        const data = {
            copyData: window.copyData,
            languages: getLanguages()
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'copy-text-config.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };
    document.getElementById('import-input').onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(evt) {
            try {
                const data = JSON.parse(evt.target.result);
                if (data.copyData && data.languages) {
                    window.copyData = data.copyData;
                    saveCopyData();
                    saveLanguages(data.languages);
                    alert('导入成功！');
                    renderCategoryList();
                    renderManagePanel();
                } else {
                    alert('导入的文件格式不正确');
                }
            } catch (err) {
                alert('导入失败：' + err.message);
            }
        };
        reader.readAsText(file);
    };

    // 语言管理区
    const langBox = document.createElement('div');
    langBox.className = 'manage-section';
    langBox.innerHTML = `
        <h3>语言管理</h3>
        <ul class="manage-lang-list" id="manage-lang-list"></ul>
        <div class="manage-lang-add">
            <input type="text" id="manage-lang-key" placeholder="语言key，如zh" maxlength="8" />
            <input type="text" id="manage-lang-label" placeholder="语言名称，如中文" maxlength="12" />
            <button id="manage-lang-add-btn"><i class="fas fa-plus"></i> 添加语言</button>
        </div>
    `;
    root.appendChild(langBox);
    renderManageLanguages();

    // 分类管理区
    const catBox = document.createElement('div');
    catBox.className = 'manage-section';
    catBox.innerHTML = `
        <h3>分类管理</h3>
        <ul class="manage-cat-list" id="manage-cat-list"></ul>
        <div class="manage-cat-add">
            <input type="text" id="manage-cat-input" placeholder="新分类名称" />
            <button id="manage-cat-add-btn"><i class="fas fa-plus"></i> 添加分类</button>
        </div>
    `;
    root.appendChild(catBox);
    renderManageCategories();

    // 文案管理区
    const docBox = document.createElement('div');
    docBox.className = 'manage-section';
    docBox.innerHTML = `
        <h3>文案管理</h3>
        <div class="manage-doc-cat-select">
            <label>选择分类：</label>
            <select id="manage-doc-cat">
                ${Object.keys(window.copyData).map(key => `<option value="${key}">${window.copyData[key].title}</option>`).join('')}
            </select>
        </div>
        <ul class="manage-doc-list" id="manage-doc-list"></ul>
        <button id="manage-doc-add-btn"><i class="fas fa-plus"></i> 添加文案</button>
    `;
    root.appendChild(docBox);
    renderManageDocs();

    // 分类切换事件
    document.getElementById('manage-doc-cat').onchange = renderManageDocs;
    // 添加文案事件
    document.getElementById('manage-doc-add-btn').onclick = function() {
        const catKey = document.getElementById('manage-doc-cat').value;
        const langs = getLanguages();
        const newDoc = {};
        langs.forEach(l => newDoc[l.key] = '');
        window.copyData[catKey].items.push(newDoc);
        saveCopyData();
        renderManageDocs();
    };

    // 语言管理区渲染后，添加添加语言按钮事件
    document.getElementById('manage-lang-add-btn').onclick = function() {
        const keyInput = document.getElementById('manage-lang-key');
        const labelInput = document.getElementById('manage-lang-label');
        const key = keyInput.value.trim();
        const label = labelInput.value.trim();
        if (!key || !label) {
            alert('请输入语言key和名称');
            return;
        }
        let langs = getLanguages();
        if (langs.some(l => l.key === key)) {
            alert('该语言已存在');
            return;
        }
        langs.push({ key, name: label });
        saveLanguages(langs);
        // 给所有文案补充该语言字段
        Object.values(window.copyData).forEach(cat => {
            cat.items.forEach(item => {
                if (!(key in item)) item[key] = '';
            });
        });
        saveCopyData();
        renderManagePanel();
    };
}

// 渲染语言列表
function renderManageLanguages() {
    const ul = document.getElementById('manage-lang-list');
    if (!ul) return;
    ul.innerHTML = '';
    const langs = getLanguages();
    langs.forEach(lang => {
        const li = document.createElement('li');
        li.className = 'manage-lang-item';
        li.innerHTML = `
            <span>${lang.name} <code>${lang.key}</code></span>
            <button class="lang-del-btn" data-key="${lang.key}"><i class="fas fa-trash"></i></button>
        `;
        ul.appendChild(li);
    });
    // 删除语言
    ul.querySelectorAll('.lang-del-btn').forEach(btn => {
        btn.onclick = function() {
            const key = this.getAttribute('data-key');
            let langs = getLanguages();
            if (langs.length <= 1) return alert('至少保留一种语言');
            if (confirm('确定要删除语言“' + key + '”？')) {
                langs = langs.filter(l => l.key !== key);
                saveLanguages(langs);
                // 删除所有文案中的该语言字段
                Object.values(window.copyData).forEach(cat => {
                    cat.items.forEach(item => { delete item[key]; });
                });
                saveCopyData();
                renderManagePanel();
            }
        };
    });
}

// 渲染分类列表
function renderManageCategories() {
    const ul = document.getElementById('manage-cat-list');
    if (!ul) return;
    ul.innerHTML = '';
    Object.keys(window.copyData).forEach(key => {
        const li = document.createElement('li');
        li.className = 'manage-cat-item';
        li.innerHTML = `
            <span>${window.copyData[key].title}</span>
            <button class="cat-edit-btn" data-key="${key}"><i class="fas fa-edit"></i></button>
            <button class="cat-del-btn" data-key="${key}"><i class="fas fa-trash"></i></button>
        `;
        ul.appendChild(li);
    });
    // 删除分类
    ul.querySelectorAll('.cat-del-btn').forEach(btn => {
        btn.onclick = function() {
            const key = this.getAttribute('data-key');
            if (confirm('确定要删除分类“' + window.copyData[key].title + '”吗？')) {
                delete window.copyData[key];
                saveCopyData();
                renderManagePanel();
            }
        };
    });
    // 编辑分类
    ul.querySelectorAll('.cat-edit-btn').forEach(btn => {
        btn.onclick = function() {
            const key = this.getAttribute('data-key');
            const newName = prompt('请输入新的分类名称', window.copyData[key].title);
            if (newName && newName !== key) {
                window.copyData[newName] = { ...window.copyData[key], title: newName };
                delete window.copyData[key];
                saveCopyData();
                renderManagePanel();
            }
        };
    });
}

// 渲染文案列表
function renderManageDocs() {
    const catKey = document.getElementById('manage-doc-cat').value;
    const ul = document.getElementById('manage-doc-list');
    if (!ul) return;
    ul.innerHTML = '';
    const items = window.copyData[catKey]?.items || [];
    const langs = getLanguages();
    items.forEach((item, idx) => {
        const li = document.createElement('li');
        li.className = 'manage-doc-item';
        li.innerHTML = `
            <div class="manage-doc-fields">
                ${langs.map(lang => `
                    <div class="manage-doc-field">
                        <label>${lang.name} <code>${lang.key}</code></label>
                        <textarea data-idx="${idx}" data-key="${lang.key}" rows="2" placeholder="${lang.name}文案">${item[lang.key] || ''}</textarea>
                    </div>
                `).join('')}
            </div>
            <div class="manage-doc-actions">
                <button class="doc-save-btn" data-idx="${idx}"><i class="fas fa-save"></i> 保存</button>
                <button class="doc-del-btn" data-idx="${idx}"><i class="fas fa-trash"></i> 删除</button>
            </div>
        `;
        ul.appendChild(li);
    });
    // 保存文案
    ul.querySelectorAll('.doc-save-btn').forEach(btn => {
        btn.onclick = function() {
            const idx = this.getAttribute('data-idx');
            const fields = ul.querySelectorAll(`textarea[data-idx='${idx}']`);
            fields.forEach(f => {
                window.copyData[catKey].items[idx][f.getAttribute('data-key')] = f.value;
            });
            saveCopyData();
            renderManageDocs();
        };
    });
    // 删除文案
    ul.querySelectorAll('.doc-del-btn').forEach(btn => {
        btn.onclick = function() {
            const idx = this.getAttribute('data-idx');
            if (confirm('确定要删除这条文案吗？')) {
                window.copyData[catKey].items.splice(idx, 1);
                saveCopyData();
                renderManageDocs();
            }
        };
    });
}

// 本地存储同步
function saveCopyData() {
    localStorage.setItem('copyData', JSON.stringify(window.copyData));
}
function loadCopyData() {
    const d = localStorage.getItem('copyData');
    if (d) {
        try {
            return JSON.parse(d);
        } catch(e) {}
    }
    return null;
}

// 页面加载时同步本地数据
(function(){
    const d = loadCopyData();
    if (d) window.copyData = d;
})();

// Tab切换时渲染管理区
(function(){
    document.addEventListener('DOMContentLoaded', function() {
        const manageTab = document.querySelector('[data-tab="manage"]');
        if (manageTab) {
            manageTab.addEventListener('click', renderManagePanel);
        }
    });
})(); 