document.addEventListener("DOMContentLoaded", () => {
    // Check if we are on the maquinas page
    const rawProductsContainer = document.getElementById('raw-products-source');
    const premiumCatalogRoot = document.getElementById('premium-catalog-root');
    
    if (!rawProductsContainer || !premiumCatalogRoot) return;
    
    // Config
    const ITEMS_PER_PAGE = 12;
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get('filter');
    let currentFilter = filterParam ? filterParam.toLowerCase() : 'supremax';
    let currentSearchTerm = '';
    
    // Parse products from raw HTML
    const rawCards = rawProductsContainer.querySelectorAll('.product-card');
    const products = Array.from(rawCards).map(card => {
        const id = card.getAttribute('data-id');
        const name = card.getAttribute('data-name') || card.querySelector('h3').textContent;
        const category = card.getAttribute('data-category') || '';
        const modelsAttr = card.getAttribute('data-models') || '';
        const price = card.getAttribute('data-price') || '0.00';
        const image = card.getAttribute('data-image') || card.querySelector('img').src;
        
        const paragraphs = card.querySelectorAll('.product-content p');
        let modelText = '';
        let shortDescription = '';
        
        paragraphs.forEach(p => {
            if (p.querySelector('strong') && p.textContent.includes('Modelos:')) {
                modelText = p.textContent.replace('Modelos:', '').trim();
            } else {
                if (!shortDescription) shortDescription = p.textContent.trim();
            }
        });
        
        // Specifications (ul)
        const ulElement = card.querySelector('.product-content ul');
        const specsHTML = ulElement ? ulElement.outerHTML : '';
        const specsList = ulElement ? Array.from(ulElement.querySelectorAll('li')).map(li => li.textContent.trim()) : [];
        
        return {
            id,
            name,
            category,
            models: modelsAttr || modelText,
            price,
            image,
            shortDescription,
            specs: specsList,
            specsHTML
        };
    });
    
    // Filter functions
    const categoryMapping = {
        'todas': () => true,
        'supremax': (cat, name, specs) => cat.toLowerCase().includes('supremax') || name.toLowerCase().includes('supremax') || (specs && specs.toLowerCase().includes('supremax')),
        'panitech': (cat, name, specs) => cat.toLowerCase().includes('panitech') || name.toLowerCase().includes('panitech') || (specs && specs.toLowerCase().includes('panitech')),
        'mcgfrio': (cat, name, specs) => cat.toLowerCase().includes('mcgfrio') || name.toLowerCase().includes('mcgfrio') || (specs && specs.toLowerCase().includes('mcgfrio'))
    };

    // Make products globally available for modal
    window.premiumProductsData = products;
    
    // Build UI layout
    premiumCatalogRoot.innerHTML = `
        <div class="premium-catalog-container">
            <div class="premium-filters-wrapper">
                <div class="premium-search-container">
                    <input type="text" id="premium-local-search" class="premium-search-input" placeholder="Buscar por nome, modelo ou categoria..." autocomplete="off" />
                </div>
                <div class="premium-category-filters" id="premium-filter-buttons">
                    <button class="premium-filter-btn active" data-filter="supremax">Supremax</button>
                    <button class="premium-filter-btn" data-filter="panitech">Panitech</button>
                    <button class="premium-filter-btn" data-filter="mcgfrio">MCGfrio</button>
                </div>
            </div>
            
            <div id="premium-grid-container" class="premium-product-grid"></div>
            
            <div class="premium-pagination-container">
                <button id="premium-load-more" class="premium-load-more-btn hidden">
                    Carregar mais
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </button>
            </div>
        </div>
    `;
    
    // Inject modal into body to avoid stacking context issues with panel-enter animation
    const modalTemplate = `
        <div id="premium-product-modal" class="premium-modal-overlay">
            <div class="premium-modal-content">
                <button class="premium-modal-close-btn" id="premium-modal-close">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
                <div class="premium-modal-image-col">
                    <img id="premium-modal-img" src="" alt="">
                </div>
                <div class="premium-modal-details-col">
                    <div id="premium-modal-category" class="premium-modal-category"></div>
                    <h2 id="premium-modal-title" class="premium-modal-title"></h2>
                    <p id="premium-modal-desc" class="premium-modal-desc"></p>
                    
                    <div class="premium-modal-specs-title">Especificações Técnicas</div>
                    <div id="premium-modal-specs-container" class="premium-modal-specs"></div>
                    
                    <div class="premium-modal-actions" id="premium-modal-actions-container">
                        <!-- Botão Injetado Dinamicamente para preservar atributos do carrinho -->
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Only append if it doesn't already exist
    if (!document.getElementById('premium-product-modal')) {
        document.body.insertAdjacentHTML('beforeend', modalTemplate);
    }
    
    const gridContainer = document.getElementById('premium-grid-container');
    const loadMoreBtn = document.getElementById('premium-load-more');
    const filterButtons = document.querySelectorAll('.premium-filter-btn');
    
    // Set initial active button
    filterButtons.forEach(btn => {
        if (btn.getAttribute('data-filter') === currentFilter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    const localSearchInput = document.getElementById('premium-local-search');
    
    // Sync with global header search if it exists
    const globalSearchInput = document.getElementById('site-search-input');
    
    function filterProducts() {
        return products.filter(p => {
            // Apply category filter
            let passesFilter = true;
            if (currentFilter !== 'todas' && categoryMapping[currentFilter]) {
                passesFilter = categoryMapping[currentFilter](p.category, p.name, p.specsHTML + " " + p.shortDescription);
            }
            
            // Apply search
            if (passesFilter && currentSearchTerm) {
                const term = currentSearchTerm.toLowerCase();
                const textToSearch = (p.name + " " + p.category + " " + p.models).toLowerCase();
                passesFilter = textToSearch.includes(term);
            }
            
            return passesFilter;
        });
    }
    
    function renderGrid(reset = false) {
        if (reset) {
            currentPage = 1;
            gridContainer.innerHTML = '';
        }
        
        const filteredProducts = filterProducts();
        const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIdx = startIdx + ITEMS_PER_PAGE;
        const productsToShow = filteredProducts.slice(startIdx, endIdx);
        
        if (reset && filteredProducts.length === 0) {
            gridContainer.innerHTML = `
                <div class="premium-empty-state">
                    <h3>Nenhuma máquina encontrada</h3>
                    <p>Tente ajustar seus filtros ou termos de pesquisa.</p>
                </div>
            `;
            loadMoreBtn.classList.add('hidden');
            return;
        }
        
        const fragment = document.createDocumentFragment();
        
        productsToShow.forEach((p, index) => {
            const card = document.createElement('div');
            // Important: add product-card class and data attributes so main.js cart logic works
            card.className = 'product-card catalog-choice';
            card.setAttribute('data-id', p.id);
            card.setAttribute('data-name', p.name);
            card.setAttribute('data-price', p.price);
            card.setAttribute('data-image', p.image);
            card.setAttribute('data-category', p.category);
            
            const displayNumber = String(startIdx + index + 1).padStart(2, '0');
            
            card.innerHTML = `
                <div class="catalog-choice-visual">
                    <img src="${p.image}" alt="${p.name}" loading="lazy">
                    <span>${displayNumber}</span>
                </div>
                <div class="catalog-choice-content">
                    <h3 title="${p.name}">${p.name}</h3>
                    <p>${p.shortDescription}</p>
                    
                    <div class="catalog-choice-actions">
                        <button class="select-btn" onclick="window.openPremiumModal('${p.id}')">
                            Ver detalhes <span>→</span>
                        </button>
                        <button class="add-to-cart-btn" data-id="${p.id}">
                            Add 🛒
                        </button>
                    </div>
                </div>
            `;
            fragment.appendChild(card);
        });
        
        gridContainer.appendChild(fragment);
        
        const remaining = filteredProducts.length - endIdx;
        if (remaining > 0) {
            loadMoreBtn.classList.remove('hidden');
            loadMoreBtn.innerHTML = `Carregar mais (${remaining} restantes) <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
        } else {
            loadMoreBtn.classList.add('hidden');
        }
    }
    
    // Handlers
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.getAttribute('data-filter');
            renderGrid(true);
        });
    });
    
    const handleSearch = (e) => {
        currentSearchTerm = e.target.value;
        if (localSearchInput && localSearchInput !== e.target) localSearchInput.value = currentSearchTerm;
        if (globalSearchInput && globalSearchInput !== e.target) globalSearchInput.value = currentSearchTerm;
        renderGrid(true);
    };
    
    if (localSearchInput) localSearchInput.addEventListener('input', handleSearch);
    if (globalSearchInput) globalSearchInput.addEventListener('input', handleSearch);
    
    loadMoreBtn.addEventListener('click', () => {
        currentPage++;
        renderGrid(false);
    });
    
    // Modal Logic
    const modalOverlay = document.getElementById('premium-product-modal');
    const modalCloseBtn = document.getElementById('premium-modal-close');
    
    window.openPremiumModal = (id) => {
        const product = window.premiumProductsData.find(p => p.id === id);
        if (!product) return;
        
        document.getElementById('premium-modal-img').src = product.image;
        document.getElementById('premium-modal-img').alt = product.name;
        document.getElementById('premium-modal-category').textContent = product.category;
        
        const titleText = product.models ? `${product.name} (${product.models})` : product.name;
        document.getElementById('premium-modal-title').textContent = titleText;
        document.getElementById('premium-modal-desc').textContent = product.shortDescription;
        
        const specsContainer = document.getElementById('premium-modal-specs-container');
        if (product.specsHTML) {
            specsContainer.innerHTML = product.specsHTML;
        } else if (product.specs.length > 0) {
            specsContainer.innerHTML = '<ul>' + product.specs.map(s => `<li>${s}</li>`).join('') + '</ul>';
        } else {
            specsContainer.innerHTML = '<p style="color:var(--muted);">Nenhuma especificação adicional.</p>';
        }
        
        // Re-inject the button so the global cart logic picks it up (needs .product-card context)
        const actionsContainer = document.getElementById('premium-modal-actions-container');
        actionsContainer.innerHTML = `
            <div class="product-card" style="display:contents;" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">
                <button class="add-to-cart-btn premium-btn-primary">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style="margin-right:4px;"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.967C16.59 2.016 14.11 1.008 11.48 1.007 6.046 1.007 1.62 5.377 1.617 10.806c-.001 1.7.456 3.355 1.32 4.81l-.396 1.447L2.14 18.52l1.492-.391.495.295c1.4.832 2.97 1.246 4.5 1.247 0 .001.001 0 0 0zM17.65 14c-.31-.155-1.837-.91-2.12-.997-.285-.088-.492-.132-.698.175-.207.309-.803.998-.985 1.206-.18.207-.362.233-.672.078-1.5-.75-2.6-1.3-3.6-3.05-.24-.41.24-.38.69-1.28.075-.15.038-.284-.018-.397-.056-.113-.493-1.185-.675-1.62-.177-.428-.358-.37-.493-.377-.128-.007-.275-.007-.422-.007s-.385.056-.587.276c-.201.22-.77.753-.77 1.835 0 1.083.787 2.128.897 2.28.111.15 1.549 2.366 3.753 3.318 2.203.952 2.203.635 2.599.599.397-.036 1.837-.751 2.095-1.448.259-.696.259-1.293.18-1.423-.077-.13-.284-.207-.594-.362z"/></svg>
                    Solicitar orçamento
                </button>
            </div>
        `;
        
        modalOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    };
    
    window.closePremiumModal = () => {
        modalOverlay.classList.remove('open');
        document.body.style.overflow = '';
    };
    
    modalCloseBtn.addEventListener('click', window.closePremiumModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) window.closePremiumModal();
    });
    
    // If add to cart is clicked inside modal, close modal automatically
    document.addEventListener('click', (e) => {
        if (e.target.closest('#premium-modal-actions-container .add-to-cart-btn')) {
            window.closePremiumModal();
        }
    });
    
    // Initial render
    renderGrid(true);
});
