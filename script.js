document.addEventListener('DOMContentLoaded', () => {

    // === 行程資料表 (包含天氣連結) ===
    const itineraryData = {
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
            // 【修正】：更新為稻澤市 (祖父江所在地) 的準確天氣預報
            weatherLink: 'https://tenki.jp/forecast/5/26/5110/23220/' 
        },
        'day-3': { 
            date: '📅 DAY 3 | 11月26日', 
            location: '📍 長久手市 🌤️ 14°C', 
            title: '吉卜力公園探險日',
            weatherLink: 'https://tenki.jp/forecast/5/26/5110/23238/' // 更新為長久手市天氣
        },
        'day-4': { 
            date: '📅 DAY 4 | 11月27日', 
            location: '📍 豊田市 🍂 10°C', 
            title: '香嵐溪紅葉攝影日',
            weatherLink: 'https://tenki.jp/forecast/5/26/5120/23211/' // 更新為豊田市天氣
        },
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
    
    // === 元素選擇器 ===
    const heroDate = document.getElementById('hero-date');
    const heroLocation = document.getElementById('hero-location');
    const heroTitle = document.getElementById('hero-title');
    const heroLocationLink = document.getElementById('hero-location-link'); 
    
    // 選擇頂部導航標籤
    const navItems = document.querySelectorAll('.top-nav-tabs .nav-item');
    const dayContents = document.querySelectorAll('.day-content'); 
    const modals = document.querySelectorAll('.modal');
    const actionLinks = document.querySelectorAll('.action-link');
    const closeButtons = document.querySelectorAll('.close-modal-btn');


    // === 核心切換函數 ===
    function switchDayContent(targetId) {
        
        // 1. 顯示/隱藏內容區塊
        dayContents.forEach(content => {
            content.classList.add('hidden');
        });

        const targetContent = document.getElementById(targetId);
        if (targetContent) {
            targetContent.classList.remove('hidden');
        }

        // 2. 更新導航按鈕狀態
        navItems.forEach(item => {
            item.classList.remove('active');
        });
        
        const activeTab = document.querySelector(`.top-nav-tabs .nav-item[data-target="${targetId}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }
        
        // 3. 更新 Hero Section (文字與連結)
        const data = itineraryData[targetId];
        if (data && heroDate && heroLocation && heroTitle && heroLocationLink) {
            heroDate.textContent = data.date;
            heroLocation.textContent = data.location;
            heroTitle.textContent = data.title;
            
            // 更新連結
            heroLocationLink.href = data.weatherLink; 
        }

        // 4. 滾動到頂部
        window.scrollTo(0, 0); 
    }

    // === 事件監聽器 ===
    
    navItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault(); 
            const targetId = item.getAttribute('data-target');
            if (targetId) {
                switchDayContent(targetId);
            }
        });
    });

    // Modal 相關邏輯
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

    closeButtons.forEach(button => { 
        button.addEventListener('click', () => {
            button.closest('.modal').classList.remove('active');
        });
    });

    modals.forEach(modal => { 
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
    
    // 初始載入
    const initialActive = document.querySelector('.top-nav-tabs .nav-item.active');
    if (initialActive) {
        switchDayContent(initialActive.getAttribute('data-target'));
    } else if (dayContents.length > 0) {
        switchDayContent(dayContents[0].id);
    }
});
