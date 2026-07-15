document.addEventListener("DOMContentLoaded", () => {
    /* 1. Scroll Animations (Fade In / Slide Up) */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Seleciona elementos para animar
    const animateElements = document.querySelectorAll('.hero-content, .about-grid, .product-card, .service-grid article, .catalog-choice, .contact-layout');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    /* 2. Catalog Search (Linha Acessório Panificação) */
    const searchInput = document.querySelector('.search-field input');
    const catalogItems = document.querySelectorAll('.catalog-choice');
    if (searchInput && catalogItems.length > 0) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase().trim();
            catalogItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(term)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    /* 3. WhatsApp Form (Orçamento) */
    const contactForm = document.querySelector('.contact-layout form');
    if (contactForm) {
        // Remover o 'onsubmit' inline que estava na tag HTML
        contactForm.removeAttribute('onsubmit');
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const destino = formData.get('destino');
            
            if (!destino) {
                alert("Por favor, selecione para qual cidade deseja enviar o orçamento.");
                return;
            }

            const nome = formData.get('nome') || '';
            const email = formData.get('email') || '';
            const telefone = formData.get('telefone') || 'Não informado';
            const interesse = formData.get('interesse') || 'Não especificado';
            const mensagem = formData.get('mensagem') || '';

            const texto = `*Solicitação de orçamento — Porto Máquinas*\n\n` +
                          `*Nome:* ${nome}\n` +
                          `*E-mail:* ${email}\n` +
                          `*Telefone:* ${telefone}\n` +
                          `*Equipamento:* ${interesse}\n\n` +
                          `*Mensagem:*\n${mensagem}\n\n` +
                          `Enviado pelo site estático Porto Máquinas.`;

            const url = `https://wa.me/${destino}?text=${encodeURIComponent(texto)}`;
            window.open(url, '_blank');
        });
    }
    /* 4. Splash Screen Logic */
    const isHomePage = document.querySelector('.hero') !== null;
    
    if (isHomePage) {
        if (!sessionStorage.getItem('splashShown')) {
            // First time loading in this session
            document.body.classList.add('splash-active');
            sessionStorage.setItem('splashShown', 'true');
            
            // Create splash screen dynamically
            const splashScreen = document.createElement('div');
            splashScreen.id = 'splash-screen';
            splashScreen.className = 'splash-screen';
            splashScreen.innerHTML = `
                <div class="splash-content">
                    <div class="splash-logo">Porto Máquinas</div>
                    <div class="splash-spinner"></div>
                </div>
            `;
            document.body.prepend(splashScreen);
            
            setTimeout(() => {
                document.body.classList.remove('splash-active');
                // Allow animation to finish
                setTimeout(() => splashScreen.remove(), 600);
            }, 2000); // 1.5s animation-delay + 0.5s fade out
        }
    }

    /* 5. Image Lightbox */
    const productImages = document.querySelectorAll('.product-visual img, .catalog-choice-visual img');
    if (productImages.length > 0) {
        // Create lightbox overlay
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-overlay';
        
        // Estilos de segurança contra cache de CSS
        lightbox.style.position = 'fixed';
        lightbox.style.top = '0';
        lightbox.style.left = '0';
        lightbox.style.width = '100%';
        lightbox.style.height = '100vh';
        lightbox.style.visibility = 'hidden';
        lightbox.style.pointerEvents = 'none';
        
        const lightboxImg = document.createElement('img');
        lightbox.appendChild(lightboxImg);
        document.body.appendChild(lightbox);

        productImages.forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', (e) => {
                e.preventDefault();
                lightboxImg.src = img.src;
                lightbox.style.visibility = 'visible';
                lightbox.style.pointerEvents = 'auto';
                lightbox.classList.add('show');
            });
        });

        lightbox.addEventListener('click', () => {
            lightbox.style.visibility = 'hidden';
            lightbox.style.pointerEvents = 'none';
            lightbox.classList.remove('show');
        });
    }

    /* 6. Floating WhatsApp Button */
    const floatBtn = document.createElement('a');
    floatBtn.href = "https://wa.me/5511940395154?text=Ol%C3%A1%2C%20estou%20no%20site%20da%20Porto%20M%C3%A1quinas%20e%20gostaria%20de%20informa%C3%A7%C3%B5es.";
    floatBtn.className = 'whatsapp-float';
    floatBtn.target = '_blank';
    floatBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M12.031 21.054c-1.579 0-3.125-.425-4.49-1.229l-5.04 1.32 1.34-4.912c-.883-1.425-1.35-3.076-1.35-4.78 0-4.935 4.015-8.95 8.95-8.95 4.935 0 8.95 4.015 8.95 8.95s-4.015 8.95-8.95 8.95zm0-16.142c-3.968 0-7.192 3.224-7.192 7.192 0 1.282.336 2.531.973 3.633l.112.193-.787 2.88 2.946-.773.187.111c1.077.64 2.308.977 3.58.977 3.968 0 7.192-3.224 7.192-7.192 0-3.968-3.224-7.192-7.192-7.192z"></path><path d="M15.82 13.676c-.225-.113-1.332-.656-1.538-.73-.205-.075-.355-.113-.505.113-.15.225-.58 .73-.711.881-.131.15-.262.169-.487.056-.225-.113-.951-.35-1.813-1.125-.671-.603-1.125-1.346-1.256-1.571-.131-.225-.014-.347.098-.46.101-.101.225-.262.337-.394.113-.131.15-.225.225-.375.075-.15.038-.281-.019-.394-.056-.113-.505-1.218-.693-1.668-.182-.437-.369-.379-.505-.386-.131-.007-.281-.007-.431-.007-.15 0-.394.056-.6.281-.205.225-.786.769-.786 1.875s.805 2.175.918 2.325c.113.15 1.583 2.419 3.834 3.389.536.231.954.369 1.28.472.537.17 1.025.146 1.411.088.432-.064 1.332-.544 1.519-1.069.187-.525.187-.975.131-1.069-.056-.094-.206-.15-.431-.262z"></path></svg>`;
    document.body.appendChild(floatBtn);

    /* ==========================================
       CARRINHO DE COMPRAS - LÓGICA
       ========================================== */

    // 1. Estado do Carrinho (carregado do localStorage)
    let cart = [];
    try {
        cart = JSON.parse(localStorage.getItem('porto_maquinas_cart')) || [];
        if (!Array.isArray(cart)) cart = [];
    } catch (err) {
        cart = [];
    }

    // 2. Injeção Dinâmica dos Elementos do Carrinho
    function injectCartElements() {
        // Injetar o botão do carrinho no Header (e empilhar a busca abaixo dele)
        const headerMain = document.querySelector('.header-main');
        const siteSearch = document.querySelector('.site-search');
        
        if (headerMain) {
            if (siteSearch) {
                // Criar ou obter o grupo de ações (carrinho + busca)
                let group = document.querySelector('.header-actions-group');
                if (!group) {
                    group = document.createElement('div');
                    group.className = 'header-actions-group';
                    headerMain.appendChild(group);
                    
                    // Mover a barra de busca para dentro do grupo
                    group.appendChild(siteSearch);
                }
                
                // Injetar o botão do carrinho se não existir, acima da busca
                if (!document.getElementById('cart-toggle-btn')) {
                    const cartToggleHTML = `
                        <div class="cart-toggle-container">
                            <button id="cart-toggle-btn" class="cart-toggle-btn" aria-label="Ver carrinho">
                                <span>🛒</span>
                                <span class="cart-text">Carrinho</span>
                                <span id="cart-badge" class="cart-badge">0</span>
                            </button>
                        </div>
                    `;
                    group.insertAdjacentHTML('afterbegin', cartToggleHTML);
                }
            } else {
                // Fallback caso a página não tenha barra de busca
                if (!document.getElementById('cart-toggle-btn')) {
                    const cartToggleHTML = `
                        <div class="cart-toggle-container">
                            <button id="cart-toggle-btn" class="cart-toggle-btn" aria-label="Ver carrinho">
                                <span>🛒</span>
                                <span class="cart-text">Carrinho</span>
                                <span id="cart-badge" class="cart-badge">0</span>
                            </button>
                        </div>
                    `;
                    headerMain.insertAdjacentHTML('beforeend', cartToggleHTML);
                }
            }
        }

        // Injetar a Gaveta (Drawer) do Carrinho no final do body
        if (!document.getElementById('cart-drawer')) {
            const drawerHTML = `
                <div id="cart-overlay" class="cart-drawer-overlay"></div>
                <div id="cart-drawer" class="cart-drawer">
                    <div class="cart-drawer-header">
                        <h2>Seu Orçamento / Carrinho</h2>
                        <button id="cart-close-btn" class="cart-close-btn" aria-label="Fechar carrinho">&times;</button>
                    </div>
                    <div id="cart-body" class="cart-drawer-body">
                        <!-- Itens renderizados via JS -->
                    </div>
                    <div class="cart-drawer-footer">
                        <div class="cart-summary-row">
                            <span>Itens:</span>
                            <span id="cart-count-summary">0 itens</span>
                        </div>
                        <div class="cart-footer-actions">
                            <button id="cart-checkout-btn" class="cart-btn-checkout">
                                Finalizar Pedido <span>→</span>
                            </button>
                            <button id="cart-clear-btn" class="cart-btn-clear">Limpar Carrinho</button>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', drawerHTML);
        }

        // Injetar o Modal de Sucesso/Confirmação no final do body
        if (!document.getElementById('cart-success-modal')) {
            const modalHTML = `
                <div id="cart-success-modal" class="cart-modal-overlay">
                    <div class="cart-modal">
                        <div class="cart-modal-icon">✓</div>
                        <h3>Solicitação Enviada!</h3>
                        <p>Seu pedido de simulação de orçamento foi processado com sucesso. Nossos especialistas entrarão em contato para alinhar especificações técnicas e opções de financiamento.</p>
                        <button id="cart-modal-close-btn" class="cart-modal-btn-close">Fechar</button>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        }
    }

    // 3. Funções Utilitárias de Formatação e Salvamento
    function formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    }

    function saveCart() {
        localStorage.setItem('porto_maquinas_cart', JSON.stringify(cart));
    }

    // 4. Renderização do Carrinho na Interface
    function renderCart() {
        const cartBody = document.getElementById('cart-body');
        const cartBadge = document.getElementById('cart-badge');
        const countSummary = document.getElementById('cart-count-summary');
        const totalVal = document.getElementById('cart-total-val');

        if (!cartBody) return;

        // Limpa o corpo da gaveta
        cartBody.innerHTML = '';

        let totalItems = 0;
        let totalPrice = 0;

        if (cart.length === 0) {
            cartBody.innerHTML = `
                <div class="cart-empty-message">
                    <span>🛒</span>
                    Seu carrinho está vazio.<br>Adicione produtos para orçamento.
                </div>
            `;
        } else {
            cart.forEach(item => {
                totalItems += item.qty;
                totalPrice += item.price * item.qty;

                const itemHTML = `
                    <div class="cart-item" data-id="${item.id}">
                        <div class="cart-item-img">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="cart-item-details">
                            <div>
                                <h4 class="cart-item-title">${item.name}</h4>
                            </div>
                            <div class="cart-item-actions">
                                <div class="qty-controls">
                                    <button class="qty-btn dec-qty-btn" aria-label="Diminuir quantidade">-</button>
                                    <span class="qty-val">${item.qty}</span>
                                    <button class="qty-btn inc-qty-btn" aria-label="Aumentar quantidade">+</button>
                                </div>
                                <button class="cart-item-remove" aria-label="Remover produto">Remover</button>
                            </div>
                        </div>
                    </div>
                `;
                cartBody.insertAdjacentHTML('beforeend', itemHTML);
            });
        }

        // Atualizar contadores e valores
        if (cartBadge) {
            cartBadge.textContent = totalItems;
        }
        if (countSummary) {
            countSummary.textContent = `${totalItems} ${totalItems === 1 ? 'item' : 'itens'}`;
        }

    }

    // 5. Adicionar Item ao Carrinho (com animação)
    function addToCart(id, name, price, image) {
        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.qty += 1;
        } else {
            cart.push({
                id,
                name,
                price,
                image,
                qty: 1
            });
        }

        saveCart();
        renderCart();
        animateBadge();
        openCartDrawer();
    }

    // 6. Remover Item do Carrinho
    function removeFromCart(id) {
        cart = cart.filter(item => item.id !== id);
        saveCart();
        renderCart();
    }

    // 7. Mudar Quantidade
    function changeQty(id, delta) {
        const item = cart.find(item => item.id === id);
        if (item) {
            item.qty += delta;
            if (item.qty <= 0) {
                removeFromCart(id);
            } else {
                saveCart();
                renderCart();
            }
        }
    }

    // 8. Limpar Carrinho
    function clearCart() {
        cart = [];
        saveCart();
        renderCart();
    }

    // 9. Abrir e Fechar Drawer do Carrinho
    function openCartDrawer() {
        const drawer = document.getElementById('cart-drawer');
        const overlay = document.getElementById('cart-overlay');
        if (drawer && overlay) {
            drawer.classList.add('show');
            overlay.classList.add('show');
        }
    }

    function closeCartDrawer() {
        const drawer = document.getElementById('cart-drawer');
        const overlay = document.getElementById('cart-overlay');
        if (drawer && overlay) {
            drawer.classList.remove('show');
            overlay.classList.remove('show');
        }
    }

    // 10. Efeito Bounce no Badge do Carrinho
    function animateBadge() {
        const badge = document.getElementById('cart-badge');
        if (badge) {
            badge.classList.remove('bounce');
            void badge.offsetWidth; // Força re-renderização/reflow para reiniciar animação
            badge.classList.add('bounce');
        }
    }

    // 11. Modal de Sucesso
    function showSuccessModal() {
        const modal = document.getElementById('cart-success-modal');
        if (modal) {
            modal.classList.add('show');
        }
    }

    function hideSuccessModal() {
        const modal = document.getElementById('cart-success-modal');
        if (modal) {
            modal.classList.remove('show');
        }
    }

    // Inicialização do fluxo do carrinho
    injectCartElements();
    renderCart();

    // 12. Listeners de Eventos Globais do Carrinho
    
    // Toggle (abrir/fechar)
    const toggleBtn = document.getElementById('cart-toggle-btn');
    const closeBtn = document.getElementById('cart-close-btn');
    const overlay = document.getElementById('cart-overlay');

    if (toggleBtn) {
        toggleBtn.addEventListener('click', openCartDrawer);
    }
    if (closeBtn) {
        closeBtn.addEventListener('click', closeCartDrawer);
    }
    if (overlay) {
        overlay.addEventListener('click', closeCartDrawer);
    }

    // Botões "Adicionar ao Carrinho"
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.add-to-cart-btn');
        if (btn) {
            const card = btn.closest('.product-card') || btn.closest('.catalog-choice');
            if (card) {
                const id = card.getAttribute('data-id');
                const name = card.getAttribute('data-name');
                const price = parseFloat(card.getAttribute('data-price'));
                const image = card.getAttribute('data-image');
                if (id && name && !isNaN(price)) {
                    addToCart(id, name, price, image);
                }
            }
        }
    });

    // Interações dentro do Carrinho (Aumentar, diminuir, remover)
    const cartBody = document.getElementById('cart-body');
    if (cartBody) {
        cartBody.addEventListener('click', (e) => {
            const itemElement = e.target.closest('.cart-item');
            if (!itemElement) return;

            const id = itemElement.getAttribute('data-id');

            if (e.target.closest('.inc-qty-btn')) {
                changeQty(id, 1);
            } else if (e.target.closest('.dec-qty-btn')) {
                changeQty(id, -1);
            } else if (e.target.closest('.cart-item-remove')) {
                removeFromCart(id);
            }
        });
    }

    // Limpar Carrinho
    const clearBtn = document.getElementById('cart-clear-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (confirm('Tem certeza de que deseja esvaziar o carrinho?')) {
                clearCart();
            }
        });
    }

    // Finalizar Pedido (WhatsApp)
    const checkoutBtn = document.getElementById('cart-checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Seu carrinho está vazio. Adicione itens antes de finalizar.');
                return;
            }
            
            // Montar mensagem para o WhatsApp com os itens
            let msg = `*Solicitação de Orçamento — Porto Máquinas*\n\n`;
            msg += `Olá! Gostaria de solicitar um orçamento para os seguintes equipamentos:\n\n`;
            
            cart.forEach(item => {
                msg += `• *${item.qty}x* ${item.name}\n`;
            });
            
            msg += `\nEnviado através do simulador de carrinho do site Porto Máquinas.`;
            
            const destino = "5511940395154";
            const url = `https://wa.me/${destino}?text=${encodeURIComponent(msg)}`;
            
            window.open(url, '_blank');
            
            closeCartDrawer();
            showSuccessModal();
            clearCart();
        });
    }

    // Fechar Modal de Sucesso
    const modalCloseBtn = document.getElementById('cart-modal-close-btn');
    const modalOverlay = document.getElementById('cart-success-modal');
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', hideSuccessModal);
    }
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                hideSuccessModal();
            }
        });
    }
});
