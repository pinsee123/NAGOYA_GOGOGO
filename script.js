document.addEventListener('DOMContentLoaded', () => {

    // === 行程資料表 ===
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
            weatherLink: 'https://tenki.jp/forecast/5/26/5110/23220/' 
        },
        'day-3': { 
            date: '📅 DAY 3 | 11月26日', 
            location: '📍 長久手市 🌤️ 14°C', 
            title: '吉卜力公園探險日',
            weatherLink: 'https://tenki.jp/forecast/5/26/5110/23238/' 
        },
        'day-4': { 
            date: '📅 DAY 4 | 11月27日', 
            location: '📍 豊田市 🍂 10°C', 
            title: '香嵐溪紅葉攝影日',
            weatherLink: 'https://tenki.jp/forecast/5/26/5120/23211/' 
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
    
    const navItems = document.querySelectorAll('.top-nav-tabs .nav-item');
    const dayContents = document.querySelectorAll('.day-content'); 
    const modals = document.querySelectorAll('.modal');
    const actionLinks = document.querySelectorAll('.action-link');
    const closeButtons = document.querySelectorAll('.close-modal-btn');
    
    // 【新增】折疊選單 (Accordion) 選擇器
    const toggleHeaders = document.querySelectorAll('.toggle-header');


    // === 核心切換函數 ===
    function switchDayContent(targetId) {
        dayContents.forEach(content => {
            content.classList.add('hidden');
        });

        const targetContent = document.getElementById(targetId);
        if (targetContent) {
            targetContent.classList.remove('hidden');
        }

        navItems.forEach(item => {
            item.classList.remove('active');
        });
        
        const activeTab = document.querySelector(`.top-nav-tabs .nav-item[data-target="${targetId}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }
        
        const data = itineraryData[targetId];
        if (data && heroDate && heroLocation && heroTitle && heroLocationLink) {
            heroDate.textContent = data.date;
            heroLocation.textContent = data.location;
            heroTitle.textContent = data.title;
            heroLocationLink.href = data.weatherLink; 
        }

        window.scrollTo(0, 0); 
    }

    // === 事件監聽器 ===
    
    // 1. 導航切換
    navItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault(); 
            const targetId = item.getAttribute('data-target');
            if (targetId) {
                switchDayContent(targetId);
            }
        });
    });

    // 2. Modal 邏輯
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
    
    // 3. 【新增】折疊選單互動邏輯
    toggleHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // 找到下一個兄弟元素 (就是內容區塊)
            const content = header.nextElementSibling;
            if (content) {
                content.classList.toggle('open');
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
