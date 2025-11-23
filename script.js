{\rtf1\ansi\ansicpg950\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 document.addEventListener('DOMContentLoaded', () => \{\
    // \uc0\u29554 \u21462 \u25152 \u26377 \u21487 \u35320 \u30332  Modal \u30340 \u36899 \u32080 \
    const actionLinks = document.querySelectorAll('.action-link');\
    // \uc0\u29554 \u21462 \u25152 \u26377 \u38364 \u38281 \u25353 \u37397 \
    const closeButtons = document.querySelectorAll('.close-modal-btn');\
    // \uc0\u29554 \u21462 \u25152 \u26377  Modal \u20803 \u32032 \
    const modals = document.querySelectorAll('.modal');\
\
    // 1. \uc0\u35373 \u23450 \u38283 \u21855  Modal \u30340 \u20107 \u20214 \u30435 \u32893 \u22120 \
    actionLinks.forEach(link => \{\
        link.addEventListener('click', (event) => \{\
            event.preventDefault();\
            const modalId = link.getAttribute('data-modal');\
            const targetModal = document.getElementById(modalId);\
            if (targetModal) \{\
                targetModal.classList.add('active');\
            \}\
        \});\
    \});\
\
    // 2. \uc0\u35373 \u23450 \u38364 \u38281  Modal \u30340 \u20107 \u20214 \u30435 \u32893 \u22120  (\u25353 \u37397 \u38364 \u38281 )\
    closeButtons.forEach(button => \{\
        button.addEventListener('click', () => \{\
            // \uc0\u25214 \u21040 \u25353 \u37397 \u25152 \u22312 \u30340  Modal \u29238 \u20803 \u32032 \u20006 \u31227 \u38500  active \u39006 \u21029 \
            button.closest('.modal').classList.remove('active');\
        \});\
    \});\
\
    // 3. \uc0\u35373 \u23450 \u40670 \u25802  Modal \u32972 \u26223 \u38364 \u38281 \u30340 \u20107 \u20214 \u30435 \u32893 \u22120 \
    modals.forEach(modal => \{\
        modal.addEventListener('click', (event) => \{\
            // \uc0\u22914 \u26524 \u40670 \u25802 \u30340 \u30446 \u27161 \u26159  Modal \u26412 \u36523  (\u19981 \u26159 \u20839 \u23481 \u21312 )\
            if (event.target === modal) \{\
                modal.classList.remove('active');\
            \}\
        \});\
    \});\
\});}