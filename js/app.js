'use strict';

/* ========= Util ========= */
const elementToggleFunc = (elem) => elem && elem.classList.toggle('active');

/* ========= Sidebar ========= */
const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');
if (sidebar && sidebarBtn) {
    sidebarBtn.addEventListener('click', () => elementToggleFunc(sidebar));
}

/* ========= Modal (Testimonials) — robusto ========= */
const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');
const modalImg = document.querySelector('[data-modal-img]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');

const hasModalDeps =
    modalContainer && modalCloseBtn && overlay && modalImg && modalTitle && modalText;

const testimonialsModalFunc = () => {
    if (!hasModalDeps) return;
    modalContainer.classList.toggle('active');
    overlay.classList.toggle('active');
};

if (hasModalDeps && testimonialsItem.length) {
    for (let i = 0; i < testimonialsItem.length; i++) {
        testimonialsItem[i].addEventListener('click', function () {
            const avatar = this.querySelector('[data-testimonials-avatar]');
            const title = this.querySelector('[data-testimonials-title]');
            const text = this.querySelector('[data-testimonials-text]');
            if (avatar) {
                modalImg.src = avatar.src;
                modalImg.alt = avatar.alt || '';
            }
            if (title) modalTitle.innerHTML = title.innerHTML;
            if (text) modalText.innerHTML = text.innerHTML;
            testimonialsModalFunc();
        });
    }
    modalCloseBtn.addEventListener('click', testimonialsModalFunc);
    overlay.addEventListener('click', testimonialsModalFunc);
}

/* ========= Filter Select / Projetos — robusto ========= */
const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');
const filterBtn = document.querySelectorAll('[data-filter-btn]');
const filterItems = document.querySelectorAll('[data-filter-item]');

if (select) {
    select.addEventListener('click', function () {
        elementToggleFunc(this);
    });
}

const filterFunc = (selectedValue) => {
    if (!filterItems.length) return;
    for (let i = 0; i < filterItems.length; i++) {
        const item = filterItems[i];
        if (selectedValue === 'all' || selectedValue === item.dataset.category) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    }
};

if (selectItems.length && selectValue) {
    for (let i = 0; i < selectItems.length; i++) {
        selectItems[i].addEventListener('click', function () {
            const selectedValue = this.innerText.toLowerCase();
            selectValue.innerText = this.innerText;
            elementToggleFunc(select);
            filterFunc(selectedValue);
        });
    }
}

let lastClickedBtn = filterBtn.length ? filterBtn[0] : null;

if (filterBtn.length && selectValue) {
    for (let i = 0; i < filterBtn.length; i++) {
        filterBtn[i].addEventListener('click', function () {
            const selectedValue = this.innerText.toLowerCase();
            selectValue.innerText = this.innerText;
            filterFunc(selectedValue);

            if (lastClickedBtn) lastClickedBtn.classList.remove('active');
            this.classList.add('active');
            lastClickedBtn = this;
        });
    }
}

/* ========= Formulário (pode nem existir após trocar por WhatsApp) ========= */
const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

if (form && formInputs.length && formBtn) {
    for (let i = 0; i < formInputs.length; i++) {
        formInputs[i].addEventListener('input', function () {
            if (form.checkValidity()) {
                formBtn.removeAttribute('disabled');
            } else {
                formBtn.setAttribute('disabled', '');
            }
        });
    }
}

/* ========= Navegação por páginas (usa data-target) ========= */
const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

if (navigationLinks.length && pages.length) {
    navigationLinks.forEach((link) => {
        link.addEventListener('click', () => {
            const target = link.dataset.target; // about | resume | portfolio | contact | blog
            if (!target) return;

            pages.forEach((page) => {
                const isActive = page.dataset.page === target;
                page.classList.toggle('active', isActive);
            });

            navigationLinks.forEach((btn) => {
                btn.classList.toggle('active', btn === link);
            });

            window.scrollTo({ top: 0, behavior: 'smooth' });

            // fecha a sidebar no mobile ao navegar
            if (sidebar && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        });
    });
}
