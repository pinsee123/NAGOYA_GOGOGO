document.addEventListener('DOMContentLoaded', () => {

    // === 行程資料表 (Hero Section 更新的數據源，已加入 weatherLink) ===
    const itineraryData = {
        // 名古屋市 (犬山城、榮商圈)
        'day-1': { 
            date: '📅 DAY 1 | 11月24日', 
            location: '📍 名古屋市 ☀️ 15°C', 
            title: '名古屋歷史文化巡禮',
            weatherLink: 'https://tenki.jp/forecast/5/26/5110/23100/' 
        },
        'day-2': { 
            date: '📅 DAY 2 | 11月25日', 
            location: '📍 稻澤市 🌥️ 13°C', 
            title: '銀杏黃葉與歷史文化',
            weatherLink: 'https://tenki.jp/leisure/5/26/21040/10days.html' 
        },
        // 長久手市 (吉卜力公園)
        'day-3': { 
            date: '📅 DAY 3 | 11月26日', 
            location: '📍 長久手市 🌤️ 14°C', 
            title: '吉卜力公園探險日',
            weatherLink: 'https://tenki.jp/leisure/5/26/161/37531/3hours.html' 
        },
        // 豊田市/香嵐溪
        'day-4': { 
            date: '📅 DAY 4 | 11月27日', 
            location: '📍 豊田市 🍂 10°C', 
            title: '香嵐溪紅葉攝影日',
            weatherLink: 'https://tenki.jp/leisure/5/26/173/3404/10days.html' 
        },
        // 中部國際機場
        'day-5': { 
            date: '📅 DAY 5 | 11月28日', 
            location: '📍 中部國際機場 ✈️', 
            title: '返程與機場接駁',
            weatherLink: 'https://tenki.jp/leisure/airport/5/26/24072/10days.html' 
        },
        'summary': { 
            date: '📝 行程總覽', 
            location: '📍 日本名古屋五日遊', 
            title: '行程總覽與重要備註',
            weatherLink: 'https://tenki.jp/forecast/5/26/' 
        }
    };
    
    // === 元素選擇器 (已修正 navItems 的選擇器) ===
    const heroDate = document.getElementById('hero-date');
    const heroLocation = document.getElementById('hero-location');
    const heroTitle = document.getElementById('hero-title');
    const heroLocationLink = document.getElementById('hero-location-link'); 
    
    // 【關鍵修復】：選擇新的頂部導航標籤
    const navItems = document.querySelectorAll('.top-nav-tabs .nav-item');
    const dayContents = document.querySelectorAll('.day-content'); 
    const modals = document.querySelectorAll('.modal');
    const actionLinks = document.querySelectorAll('.action-link');
    const closeButtons = document.querySelectorAll('.close-modal-btn');


    // === 核心切換函數：同步更新 Hero Section 及內容 ===
    function switchDayContent(targetId) {
        
        // 1. 隱藏所有內容區塊，顯示目標區塊
        dayContents.forEach(content => {
            content.classList.add('hidden');
        });

        const targetContent = document.getElementById(targetId);
        if (targetContent) {
            targetContent.classList.remove('hidden');
        }

        // 2. 更新底部導航欄的 active 狀態
        navItems.forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`.nav-nav-tabs .nav-item[data-target="${targetId}"]`).classList.add('active');
        
        // 3. 根據 targetId 更新 Hero Section 內容
        const data = itineraryData[targetId];
        if (data && heroDate && heroLocation && heroTitle && heroLocationLink) {
            heroDate.textContent = data.date;
            heroLocation.textContent = data.location;
            heroTitle.textContent = data.title;
            
            // 更新 Hero Section 頂部連結的 href 屬性
            heroLocationLink.href = data.weatherLink; 
        }

        // 4. 滾動到頁面頂部
        window.scrollTo(0, 0); 
    }

    // === 事件監聽器 (保持不變) ===
    
    // 頂部導航欄切換
    navItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault(); 
            const targetId = item.getAttribute('data-target');
            
            if (targetId) {
                switchDayContent(targetId);
            }
        });
    });

    // Modal 開啟邏輯
    actionLinks.forEach(link => { 
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const modalId = link.getAttribute('data-modal');
            const targetModal = document.getElementById(modalId);
            if (targetModal) {
                targetModal.classList.add('active');
            }
        });
    });

    // Modal 關閉邏輯
    closeButtons.forEach(button => { 
        button.addEventListener('click', () => {
            button.closest('.modal').classList.remove('active');
        });
    });

    // Modal 背景點擊關閉邏輯
    modals.forEach(modal => { 
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
    
    // 初始載入時調用一次切換函數
    const initialActive = document.querySelector('.top-nav-tabs .nav-item.active');
    if (initialActive) {
        switchDayContent(initialActive.getAttribute('data-target'));
    } else if (dayContents.length > 0) {
        switchDayContent(dayContents[0].id);
    }
});
