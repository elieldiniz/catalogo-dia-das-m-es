function renderCatalogo(canecas, categoria) {
  const catalog = document.getElementById('catalog');
  catalog.innerHTML = '';
  canecas.forEach((caneca, index) => {
    const card = document.createElement('div');
    card.className = 'caneca-card';

    // Carousel container
    const carousel = document.createElement('div');
    carousel.className = 'carousel';

    // Images container
    const imagesContainer = document.createElement('div');
    imagesContainer.className = 'carousel-images';

    // Add images
    caneca.imgs.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = caneca.nome;
      imagesContainer.appendChild(img);
    });

    carousel.appendChild(imagesContainer);

    // Prev button
    const prevBtn = document.createElement('button');
    prevBtn.className = 'carousel-button prev';
    prevBtn.innerHTML = '&#10094;';
    carousel.appendChild(prevBtn);

    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'carousel-button next';
    nextBtn.innerHTML = '&#10095;';
    carousel.appendChild(nextBtn);

    // Name
    const nome = document.createElement('div');
    nome.className = 'caneca-nome';
    nome.textContent = caneca.nome;

    // WhatsApp button
    const btn = document.createElement('a');
    btn.className = 'btn-whatsapp';
    btn.href = `https://wa.me/556992445784?text=Olá!%20Tenho%20interesse%20na%20${encodeURIComponent(caneca.nome)}%20do%20catálogo%20de%20${encodeURIComponent(categoria)}.`;
    btn.target = '_blank';
    btn.rel = 'noopener noreferrer';
    btn.textContent = 'Quero esta';

    // Append all
    card.appendChild(carousel);
    card.appendChild(nome);
    card.appendChild(btn);

    catalog.appendChild(card);

    // Carousel functionality (responsivo)
    let currentIndex = 0;

    function updateCarousel() {
      const carouselWidth = carousel.offsetWidth;
      imagesContainer.style.transform = `translateX(-${currentIndex * carouselWidth}px)`;
      imagesContainer.style.width = `${caneca.imgs.length * carouselWidth}px`;
      // Ajusta a largura de cada imagem
      Array.from(imagesContainer.children).forEach(img => {
        img.style.width = carouselWidth + 'px';
        img.style.height = carouselWidth + 'px';
      });
    }

    // Atualiza ao redimensionar a tela
    window.addEventListener('resize', updateCarousel);

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex === 0) ? caneca.imgs.length - 1 : currentIndex - 1;
      updateCarousel();
    });
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex === caneca.imgs.length - 1) ? 0 : currentIndex + 1;
      updateCarousel();
    });

    // Garante que o carrossel começa certo
    setTimeout(updateCarousel, 0);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const btns = document.querySelectorAll('.categoria-btn');
  function atualizarCatalogo(categoria) {
    renderCatalogo(window.catalogos[categoria], categoria);
    btns.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.categoria-btn[data-categoria="${categoria}"]`).classList.add('active');
  }
  btns.forEach(btn => {
    btn.addEventListener('click', function() {
      const categoria = this.getAttribute('data-categoria');
      atualizarCatalogo(categoria);
    });
  });
  // Inicializa com a primeira categoria
  atualizarCatalogo(btns[1].getAttribute('data-categoria'));
});