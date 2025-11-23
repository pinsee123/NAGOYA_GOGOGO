document.addEventListener('DOMContentLoaded', () => {
    // 獲取所有可觸發 Modal 的連結 (class="action-link")
    const actionLinks = document.querySelectorAll('.action-link');
    // 獲取所有關閉按鈕
    const closeButtons = document.querySelectorAll('.close-modal-btn');
    // 獲取所有 Modal 元素
    const modals = document.querySelectorAll('.modal');

    // 1. 設定開啟 Modal 的事件監聽器
    actionLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // 防止默認連結行為
            const modalId = link.getAttribute('data-modal'); // 取得要開啟的 Modal ID
            const targetModal = document.getElementById(modalId);
            if (targetModal) {
                targetModal.classList.add('active'); // 增加 active 類別使其顯示
            }
        });
    });

    // 2. 設定關閉 Modal 的事件監聽器 (按鈕關閉)
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 找到按鈕所在的 Modal 父元素並移除 active 類別
            button.closest('.modal').classList.remove('active');
        });
    });

    // 3. 設定點擊 Modal 背景關閉的事件監聽器
    modals.forEach(modal => {
        modal.addEventListener('click', (event) => {
            // 如果點擊的目標是 Modal 本身 (達成 Modal 背景點擊關閉)
            if (event.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
});
