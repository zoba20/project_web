// script.js - تحسين: بحث فوري، lazy load للصور إذا لم يدعم المتصفح، عداد سلة بسيط
document.addEventListener('DOMContentLoaded', function(){

  // Search filtering
  const search = document.getElementById('search-input');
  if(search){
    search.addEventListener('input', function(e){
      const q = e.target.value.trim().toLowerCase();
      document.querySelectorAll('.product-card').forEach(card=>{
        const title = card.querySelector('.title').textContent.toLowerCase();
        card.style.display = title.includes(q) ? '' : 'none';
      });
    });
  }

  // Lazy loading fallback
  if('loading' in HTMLImageElement.prototype){
    // browser supports loading=lazy, nothing to do
  } else {
    const imgs = document.querySelectorAll('img[data-src]');
    const io = new IntersectionObserver((entries, obs)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          obs.unobserve(img);
        }
      });
    }, {rootMargin: '200px'});
    imgs.forEach(i=>io.observe(i));
  }

  // Simple cart counter stored in localStorage
  const cartCountEl = document.getElementById('cart-count');
  function updateCartCount(){ 
    const n = parseInt(localStorage.getItem('cartCount')||'0',10);
    if(cartCountEl) cartCountEl.textContent = n;
  }
  updateCartCount();

  document.querySelectorAll('.add-to-cart').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const cur = parseInt(localStorage.getItem('cartCount')||'0',10);
      localStorage.setItem('cartCount', cur+1);
      updateCartCount();
      // simple feedback
      btn.textContent = 'تم الإضافة ✓';
      setTimeout(()=> btn.textContent = 'أضف إلى السلة', 1200);
    });
  });

});