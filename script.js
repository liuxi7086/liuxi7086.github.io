// 新的数据结构示例
const copyData = {
    electronics: {
        title: "电子产品",
        items: [
            {
                zh: "全新智能手机，性能强劲，拍照清晰！",
                en: "Brand new smartphone with powerful performance and crystal clear photos!",
                ja: "高性能で写真が鮮明な最新スマートフォン！"
            },
            {
                zh: "超长续航，快速充电",
                en: "Ultra-long battery life with fast charging",
                ja: "超長持ちバッテリーと急速充電"
            },
            {
                zh: "游戏体验流畅，多任务处理无压力",
                en: "Smooth gaming experience, seamless multitasking",
                ja: "ゲーム体験がスムーズ、マルチタスク処理も快適"
            }
        ]
    },
    clothing: {
        title: "服装服饰",
        items: [
            {
                zh: "时尚外套，引领潮流！",
                en: "Fashionable jacket leading the trend!",
                ja: "トレンドをリードするファッショナブルなジャケット！"
            },
            {
                zh: "精选面料，舒适透气",
                en: "Premium fabric, comfortable and breathable",
                ja: "上質な生地、快適で通気性抜群"
            }
        ]
    },
    beauty: {
        title: "美妆护肤",
        items: [
            {
                zh: "护肤套装推荐",
                en: "Professional skincare set for healthy skin care!",
                ja: "肌の健康を守るプロ仕様スキンケアセット！"
            },
            {
                zh: "天然成分，温和不刺激",
                en: "Natural ingredients, gentle and non-irritating",
                ja: "天然成分、優しく刺激なし"
            }
        ]
    },
    food: {
        title: "食品饮料",
        items: [
            {
                zh: "健康零食推荐",
                en: "Healthy snacks, nutritious and delicious!",
                ja: "栄養豊富で美味しいヘルシースナック！"
            },
            {
                zh: "天然原料，无添加防腐剂",
                en: "Natural ingredients, no preservatives added",
                ja: "天然原料、保存料無添加"
            }
        ]
    },
    home: {
        title: "家居用品",
        items: [
            {
                zh: "智能家居产品",
                en: "Smart home, technological living!",
                ja: "スマートホーム、テクノロジーライフ！"
            },
            {
                zh: "智能控制，一键操作",
                en: "Smart control with one-click operation",
                ja: "スマートコントロール、ワンクリック操作"
            }
        ]
    }
};

let currentCategory = 'electronics';

const categoryItems = document.querySelectorAll('.category-item');
const categoryTitle = document.getElementById('category-title');
const copyItemsContainer = document.getElementById('copy-items');
const toast = document.getElementById('toast');

document.addEventListener('DOMContentLoaded', function() {
    renderCopyItems();
    setupEventListeners();
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
    categoryTitle.textContent = copyData[currentCategory].title;
}

// 渲染每个句子的多语言版本
function renderCopyItems() {
    const items = copyData[currentCategory].items;
    copyItemsContainer.innerHTML = '';

    items.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'sentence-card';
        card.innerHTML = `
            <div class="lang-row">
                <span class="lang-label">中文</span>
                <span class="sentence-text">${escapeHtml(item.zh)}</span>
                <button class="sentence-copy-btn" onclick="copyText('${escapeHtml(item.zh)}')"><i class="fas fa-copy"></i> 复制</button>
            </div>
            <div class="lang-row">
                <span class="lang-label">English</span>
                <span class="sentence-text">${escapeHtml(item.en)}</span>
                <button class="sentence-copy-btn" onclick="copyText('${escapeHtml(item.en)}')"><i class="fas fa-copy"></i> Copy</button>
            </div>
            <div class="lang-row">
                <span class="lang-label">日本語</span>
                <span class="sentence-text">${escapeHtml(item.ja)}</span>
                <button class="sentence-copy-btn" onclick="copyText('${escapeHtml(item.ja)}')"><i class="fas fa-copy"></i> コピー</button>
            </div>
        `;
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