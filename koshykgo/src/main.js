import './styles.css';

const categories = [
  { name: 'Усі', icon: '✦' },
  { name: 'Фрукти', icon: '🍎' },
  { name: 'Овочі', icon: '🥬' },
  { name: 'Молочне', icon: '🥛' },
  { name: 'Випічка', icon: '🥖' },
  { name: 'Бакалія', icon: '🫙' }
];

const products = [
  { id: 1, name: 'Яблука', meta: 'солодкі, 1 кг', price: 58, category: 'Фрукти', tag: 'Хіт', emoji: '🍎', color: 'apple', image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&q=85' },
  { id: 2, name: 'Банани', meta: 'Еквадор, 1 кг', price: 44, category: 'Фрукти', tag: '−12%', emoji: '🍌', color: 'banana', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=85' },
  { id: 3, name: 'Авокадо', meta: 'стигле, 1 шт', price: 76, category: 'Фрукти', tag: 'Топ', emoji: '🥑', color: 'avocado', image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=85' },
  { id: 4, name: 'Помідори', meta: 'фермерські, 500 г', price: 89, category: 'Овочі', tag: 'Свіже', emoji: '🍅', color: 'tomato', image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=800&q=85' },
  { id: 5, name: 'Капуста', meta: 'свіжа, 1 кг', price: 62, category: 'Овочі', tag: 'Свіже', emoji: '🥬', color: 'spinach', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=85' },
  { id: 6, name: 'Сир', meta: '9%, 300 г', price: 129, category: 'Молочне', tag: 'Ніжний', emoji: '🧀', color: 'cheese', image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=800&q=85' },
  { id: 7, name: 'Йогурт', meta: 'без цукру, 350 г', price: 54, category: 'Молочне', tag: '−8%', emoji: '🥛', color: 'yogurt', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=85' },
  { id: 8, name: 'Хліб', meta: 'цільнозерновий, 450 г', price: 64, category: 'Випічка', tag: 'Теплий', emoji: '🥖', color: 'bread', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=85' },
  { id: 9, name: 'Кава', meta: '100% арабіка, 250 г', price: 189, category: 'Бакалія', tag: 'Для ранку', emoji: '☕', color: 'coffee', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=85' },
  { id: 10, name: 'Кавун', meta: 'солодкий, 1 шт', price: 156, category: 'Фрукти', tag: 'Сезонне', emoji: '🍉', color: 'watermelon', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=85' }
];

const state = {
  category: 'Усі',
  query: '',
  cart: {},
  cartOpen: false,
  checkoutOpen: false,
  toast: ''
};

const icon = (name, size = 20) => {
  const paths = {
    search: `<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/>`,
    cart: `<path d="M3 4h2l2 11h10l2-8H6"/><circle cx="9" cy="19" r="1.2"/><circle cx="17" cy="19" r="1.2"/>`,
    arrow: `<path d="M5 12h14M13 6l6 6-6 6"/>`,
    plus: `<path d="M12 5v14M5 12h14"/>`,
    minus: `<path d="M5 12h14"/>`,
    close: `<path d="m6 6 12 12M18 6 6 18"/>`,
    check: `<path d="m5 12 4 4L19 6"/>`,
    pin: `<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>`,
    user: `<circle cx="12" cy="8" r="3"/><path d="M5 20c.8-3.3 3.1-5 7-5s6.2 1.7 7 5"/>`
  };
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || ''}</svg>`;
};

const formatPrice = (value) => `${value.toLocaleString('uk-UA')} ₴`;
const cartItems = () => Object.entries(state.cart).map(([id, quantity]) => ({ ...products.find((product) => product.id === Number(id)), quantity }));
const cartCount = () => Object.values(state.cart).reduce((sum, value) => sum + value, 0);
const cartTotal = () => cartItems().reduce((sum, item) => sum + item.price * item.quantity, 0);

function filteredProducts() {
  const query = state.query.trim().toLowerCase();
  return products.filter((product) => {
    const matchesCategory = state.category === 'Усі' || product.category === state.category;
    const searchable = `${product.name} ${product.meta} ${product.category} ${product.tag}`.toLowerCase();
    return matchesCategory && (!query || searchable.includes(query));
  });
}

function productCard(product) {
  const quantity = state.cart[product.id] || 0;
  return `
    <article class="product-card">
      <div class="product-visual ${product.color}">
        <span class="product-tag">${product.tag}</span>
        <button class="visual-favorite" type="button" aria-label="Додати ${product.name} до обраного">♡</button>
        <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='grid'" />
        <span class="product-emoji" aria-hidden="true">${product.emoji}</span>
      </div>
      <div class="product-info">
        <div class="product-copy">
          <h3>${product.name}</h3>
          <p>${product.meta}</p>
        </div>
        <div class="product-buy-row">
          <strong>${formatPrice(product.price)}</strong>
          ${quantity ? `<div class="mini-stepper"><button data-action="decrease" data-id="${product.id}" aria-label="Зменшити кількість">${icon('minus', 16)}</button><span>${quantity}</span><button data-action="increase" data-id="${product.id}" aria-label="Збільшити кількість">${icon('plus', 16)}</button></div>` : `<button class="add-button" data-action="add" data-id="${product.id}" type="button" aria-label="Додати ${product.name} до кошика">${icon('plus', 18)}</button>`}
        </div>
      </div>
    </article>`;
}

function cartDrawer() {
  const items = cartItems();
  return `
    <div class="overlay ${state.cartOpen ? 'is-visible' : ''}" data-action="close-cart"></div>
    <aside class="cart-drawer ${state.cartOpen ? 'is-open' : ''}" aria-label="Кошик">
      <div class="drawer-head"><div><span class="eyebrow">Ваші покупки</span><h2>Кошик <span>${cartCount()}</span></h2></div><button class="icon-button" data-action="close-cart" aria-label="Закрити кошик">${icon('close')}</button></div>
      ${items.length ? `<div class="cart-list">${items.map((item) => `<div class="cart-item"><div class="cart-thumb ${item.color}"><img src="${item.image}" alt="" /><span>${item.emoji}</span></div><div class="cart-item-main"><div><h3>${item.name}</h3><p>${item.meta}</p></div><strong>${formatPrice(item.price * item.quantity)}</strong><div class="cart-item-bottom"><div class="stepper"><button data-action="decrease" data-id="${item.id}" aria-label="Зменшити кількість">${icon('minus', 15)}</button><span>${item.quantity}</span><button data-action="increase" data-id="${item.id}" aria-label="Збільшити кількість">${icon('plus', 15)}</button></div><button class="remove-link" data-action="remove" data-id="${item.id}">Видалити</button></div></div></div>`).join('')}</div><div class="drawer-footer"><div class="subtotal"><span>Разом</span><strong>${formatPrice(cartTotal())}</strong></div><button class="primary-button full-width" data-action="checkout">Перейти до оформлення ${icon('arrow', 18)}</button><p class="delivery-note">Безкоштовна доставка від 600 ₴</p></div>` : `<div class="empty-cart"><div class="empty-icon">${icon('cart', 30)}</div><h3>Кошик ще порожній</h3><p>Додайте щось свіже — і ми все підготуємо.</p><button class="primary-button" data-action="close-cart">До покупок ${icon('arrow', 18)}</button></div>`}
    </aside>`;
}

function checkoutModal() {
  if (!state.checkoutOpen) return '';
  return `<div class="modal-backdrop" data-action="close-checkout"><section class="checkout-modal" role="dialog" aria-modal="true" aria-label="Оформлення замовлення" data-stop-propagation="true"><div class="modal-head"><div><span class="eyebrow">Майже готово</span><h2>Оформлення</h2></div><button class="icon-button" data-action="close-checkout" aria-label="Закрити">${icon('close')}</button></div><div class="checkout-summary"><span>${cartCount()} ${cartCount() === 1 ? 'товар' : 'товари'}</span><strong>${formatPrice(cartTotal())}</strong></div><form id="checkout-form"><label>Ваше ім’я<input name="name" placeholder="Наприклад, Олена" required /></label><label>Телефон<input name="phone" type="tel" placeholder="+380 67 000 00 00" required /></label><label>Як отримати замовлення<select name="delivery"><option>Доставка до дверей</option><option>Самовивіз із магазину</option></select></label><label>Адреса доставки<textarea name="address" rows="2" placeholder="Вулиця, будинок, квартира" required></textarea></label><button class="primary-button full-width" type="submit">Підтвердити замовлення ${icon('arrow', 18)}</button><p class="form-note">Це демонстраційне оформлення — без списання коштів.</p></form></section></div>`;
}

function appTemplate() {
  const visibleProducts = filteredProducts();
  return `<div class="app-shell">
    <header class="topbar"><a class="brand" href="#top" aria-label="Кошик GO — на головну"><img src="/koshykgo-logo.png" alt="" /><span><b>КОШИК</b><em>GO</em></span></a><div class="location-pill">${icon('pin', 16)}<span>Київ, Україна</span><small>⌄</small></div><button class="cart-button" data-action="open-cart" aria-label="Відкрити кошик">${icon('cart', 21)}<span>Кошик</span>${cartCount() ? `<b>${cartCount()}</b>` : ''}</button></header>
    <main id="top">
      <section class="hero-section"><div class="hero-copy"><div class="hero-kicker"><span class="pulse-dot"></span> Щодня поруч</div><h1>Свіжі продукти.<br /><span>Зручно щодня.</span></h1><p>Зберемо ваш кошик з улюблених продуктів та привеземо тоді, коли зручно.</p><div class="hero-actions"><a class="primary-button" href="#catalog">До покупок ${icon('arrow', 18)}</a><button class="text-button" data-action="show-info">Як це працює <span>?</span></button></div></div><div class="hero-art"><div class="hero-orbit orbit-one"></div><div class="hero-orbit orbit-two"></div><div class="hero-card hero-card-main"><img src="/koshykgo-logo.png" alt="Логотип Кошик GO" /></div><div class="floating-food food-one">🍅</div><div class="floating-food food-two">🥖</div><div class="floating-food food-three">🥬</div><div class="hero-sticker">Доставка<br /><strong>від 29 ₴</strong></div></div></section>
      <section class="benefits-row"><div><span class="benefit-icon">✦</span><p><strong>Фермерське</strong><br />Обираємо найкраще</p></div><div><span class="benefit-icon">⌁</span><p><strong>Швидко</strong><br />Від 60 хвилин</p></div><div><span class="benefit-icon">✓</span><p><strong>Зручно</strong><br />Без черг і стресу</p></div></section>
      <section class="catalog-section" id="catalog"><div class="section-heading"><div><span class="eyebrow">Обирайте свіже</span><h2>Що додамо<br class="mobile-break" /> до вечері?</h2></div><button class="see-all" data-action="clear-category">Дивитися все ${icon('arrow', 17)}</button></div><div class="category-scroller">${categories.map((category) => `<button class="category-chip ${state.category === category.name ? 'active' : ''}" data-category="${category.name}"><span>${category.icon}</span>${category.name}</button>`).join('')}</div><div class="search-bar">${icon('search', 20)}<input id="search-input" value="${state.query}" placeholder="Знайти яблука, молоко, хліб..." aria-label="Пошук товарів" /><kbd>⌘ K</kbd></div><div class="catalog-meta"><p>${state.query ? `Результати для «${state.query}»` : 'Популярне сьогодні'}</p><span>${visibleProducts.length} позицій</span></div><div class="product-grid">${visibleProducts.length ? visibleProducts.map(productCard).join('') : `<div class="no-results"><span>🧺</span><h3>Нічого не знайшли</h3><p>Спробуйте іншу назву або очистіть пошук.</p><button class="secondary-button" data-action="clear-search">Очистити пошук</button></div>`}</div></section>
      <section class="delivery-banner"><div class="banner-copy"><span class="eyebrow">Плануйте покупки</span><h2>Доставка, коли<br /><em>вам зручно</em></h2><p>Оберіть часовий слот — ми подбаємо про решту.</p><button class="light-button" data-action="show-info">Дізнатися більше ${icon('arrow', 17)}</button></div><div class="banner-illustration"><div class="sun"></div><div class="hill hill-back"></div><div class="hill hill-front"></div><div class="bike">🚲</div></div></section>
    </main><nav class="bottom-nav"><a class="bottom-link active" href="#top"><span>⌂</span>Головна</a><a class="bottom-link" href="#catalog"><span>▦</span>Каталог</a><button class="bottom-link bottom-cart" data-action="open-cart"><span>${icon('cart', 20)}${cartCount() ? `<b>${cartCount()}</b>` : ''}</span>Кошик</button><button class="bottom-link" data-action="show-info"><span>♙</span>Профіль</button></nav>${cartDrawer()}${checkoutModal()}<div class="toast ${state.toast ? 'is-visible' : ''}">${icon('check', 18)}<span>${state.toast}</span></div></div>`;
}

function updateCart(id, delta) {
  const next = (state.cart[id] || 0) + delta;
  if (next <= 0) delete state.cart[id]; else state.cart[id] = next;
  render();
}

function showToast(message) {
  state.toast = message;
  render();
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => { state.toast = ''; render(); }, 2600);
}

function handleAction(action, id) {
  if (action === 'add') { updateCart(id, 1); showToast('Додано до кошика'); }
  if (action === 'increase') updateCart(id, 1);
  if (action === 'decrease') updateCart(id, -1);
  if (action === 'remove') { delete state.cart[id]; render(); }
  if (action === 'open-cart') { state.cartOpen = true; render(); }
  if (action === 'close-cart') { state.cartOpen = false; render(); }
  if (action === 'checkout' && cartCount()) { state.cartOpen = false; state.checkoutOpen = true; render(); }
  if (action === 'close-checkout') { state.checkoutOpen = false; render(); }
  if (action === 'clear-category') { state.category = 'Усі'; render(); document.querySelector('#catalog')?.scrollIntoView({ behavior: 'smooth' }); }
  if (action === 'clear-search') { state.query = ''; render(); }
  if (action === 'show-info') showToast('Ми вже готуємо цю функцію — скоро буде доступна');
}

function render() {
  document.querySelector('#app').innerHTML = appTemplate();
  document.querySelectorAll('[data-category]').forEach((button) => button.addEventListener('click', () => { state.category = button.dataset.category; render(); }));
  document.querySelectorAll('[data-action]').forEach((element) => element.addEventListener('click', (event) => { if (element.dataset.stopPropagation) event.stopPropagation(); handleAction(element.dataset.action, Number(element.dataset.id)); }));
  document.querySelectorAll('[data-stop-propagation]').forEach((element) => element.addEventListener('click', (event) => event.stopPropagation()));
  const search = document.querySelector('#search-input');
  search?.addEventListener('input', (event) => { state.query = event.target.value; render(); const input = document.querySelector('#search-input'); input?.focus(); input?.setSelectionRange(state.query.length, state.query.length); });
  document.querySelector('#checkout-form')?.addEventListener('submit', (event) => { event.preventDefault(); const order = `KG-${Math.floor(1000 + Math.random() * 8999)}`; state.checkoutOpen = false; state.cart = {}; render(); showToast(`Замовлення ${order} прийнято — дякуємо!`); });
}

window.addEventListener('keydown', (event) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); document.querySelector('#search-input')?.focus(); } if (event.key === 'Escape') { state.cartOpen = false; state.checkoutOpen = false; render(); } });

render();
