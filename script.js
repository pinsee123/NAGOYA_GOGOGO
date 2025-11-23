document.addEventListener('DOMContentLoaded', () => {
    
    // === 變數定義 ===
    const actionLinks = document.querySelectorAll('.action-link');
    const closeButtons = document.querySelectorAll('.close-modal-btn');
    const modals = document.querySelectorAll('.modal');
    
    const navItems = document.querySelectorAll('.bottom-nav .nav-item');
    const dayContents = document.querySelectorAll('.day-content'); // 所有的行程內容區塊

    
    // === 1. Modal 彈窗控制 (保留功能) ===
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

    
    // === 2. 底部導航欄切換功能 (修復重點) ===
    
    function switchDayContent(targetId) {
        // 1. 隱藏所有內容區塊
        dayContents.forEach(content => {
            content.classList.add('hidden');
        });

        // 2. 顯示目標區塊
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
            targetContent.classList.remove('hidden');
        }

        // 3. 更新底部導航欄的 active 狀態
        navItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // 找到對應 data-target 的導航按鈕並設為 active
        document.querySelector(`.nav-item[data-target="${targetId}"]`).classList.add('active');
        
        // 4. 滾動到頁面頂部
        window.scrollTo(0, 0); 
    }

    // 為每個導航按鈕添加點擊事件
    navItems.forEach(item => {
        item.addEventListener('click', (event) => {
            // 阻止默認的錨點跳轉行為 (讓 JS 處理切換)
            event.preventDefault(); 
            const targetId = item.getAttribute('data-target');
            
            // 只有 Day 內容才執行切換，其他（地圖/總表）可以預留
            if (targetId && targetId.startsWith('day-')) {
                switchDayContent(targetId);
            }
        });
    });
    
    // 確保 App 載入時，如果設定了 active 狀態，就顯示對應內容
    const initialActive = document.querySelector('.bottom-nav .nav-item.active');
    if (initialActive) {
        // 初始載入時調用一次切換函數，確保內容正確顯示
        switchDayContent(initialActive.getAttribute('data-target'));
    }

});
