// FORME demo store: cart data is saved in this browser using localStorage.
const FORME = (() => {
  const products = [
    {id:'runner-01',name:'FORME Runner 01',type:'FOOTWEAR',category:'shoes',price:1890,desc:'รองเท้าทรงคลาสสิก น้ำหนักเบา ใส่สบายในทุกวัน',image:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85',tag:'BESTSELLER',color:0xd9dfd0},
    {id:'court-02',name:'Court Minimal 02',type:'FOOTWEAR',category:'shoes',price:2190,desc:'สนีกเกอร์ทรงมินิมอล แมตช์ได้กับทุกลุค',image:'https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=900&q=85',tag:'NEW',color:0xe5e1d8},
    {id:'daily-tee',name:'Daily Essential Tee',type:'APPAREL',category:'clothes',price:590,desc:'เสื้อยืดผ้าสัมผัสนุ่ม ทรงพอดีตัว',image:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85',tag:'ESSENTIAL',color:0xe7e4da},
    {id:'overshirt',name:'Relaxed Overshirt',type:'APPAREL',category:'clothes',price:1290,desc:'เสื้อคลุมทรงสบาย เรียบเท่ ใช้ได้หลายโอกาส',image:'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=85',tag:'POPULAR',color:0x9caa8c},
    {id:'street-low',name:'Street Low 03',type:'FOOTWEAR',category:'shoes',price:1990,desc:'รองเท้าลำลองพื้นนุ่ม สำหรับวันสบาย ๆ',image:'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=85',tag:'LIMITED',color:0xc9c7bb},
    {id:'cotton-shirt',name:'Cotton Form Shirt',type:'APPAREL',category:'clothes',price:990,desc:'เสื้อเชิ้ตผ้าคอตตอน ดีไซน์สะอาดตา',image:'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=85',tag:'NEW',color:0xe4e3d9},
    {id:'runner-sand',name:'Runner Sand 04',type:'FOOTWEAR',category:'shoes',price:2290,desc:'โทนสีธรรมชาติ พร้อมพื้นรองรับแรงกระแทก',image:'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=85',tag:'NEW',color:0xc9bca8},
    {id:'hoodie-form',name:'Form Everyday Hoodie',type:'APPAREL',category:'clothes',price:1590,desc:'ฮู้ดดี้ผ้านุ่ม ทรงโอเวอร์ไซซ์เล็กน้อย',image:'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85',tag:'POPULAR',color:0xaaa99e}
  ];
  const money = n => '฿' + Number(n).toLocaleString('th-TH');
  const getCart = () => { try { return JSON.parse(localStorage.getItem('forme-cart')||'[]'); } catch { return []; } };
  const save = cart => { localStorage.setItem('forme-cart',JSON.stringify(cart)); updateCartCount(); };
  const addToCart = id => { const cart=getCart(),row=cart.find(x=>x.id===id); row?row.qty++:cart.push({id,qty:1});save(cart); };
  const changeQty = (id,step) => { let cart=getCart();const row=cart.find(x=>x.id===id);if(row)row.qty+=step;cart=cart.filter(x=>x.qty>0);save(cart); };
  const removeFromCart = id => save(getCart().filter(x=>x.id!==id));
  const subtotal = () => getCart().reduce((sum,row)=>{const p=products.find(x=>x.id===row.id);return sum+(p?p.price*row.qty:0)},0);
  const updateCartCount = () => {const n=getCart().reduce((s,x)=>s+x.qty,0);document.querySelectorAll('.cart-count').forEach(el=>el.textContent=n);};
  const productCard = (p,showView=false) => `<article class="product-card"><a class="product-image" href="javascript:void(0)" ${showView?`data-view="${p.id}"`:''}><img loading="lazy" src="${p.image}" alt="${p.name}"><span class="product-tag">${p.tag}</span><div class="product-actions">${showView?`<button data-view="${p.id}">ดูแบบ 3D ◉</button>`:''}<button data-add="${p.id}">เพิ่มลงตะกร้า +</button></div></a><div class="product-meta"><div><h3>${p.name}</h3><p>${p.type}</p></div><div class="product-price">${money(p.price)}</div></div></article>`;
  return {products,money,getCart,addToCart,changeQty,removeFromCart,subtotal,updateCartCount,productCard};
})();
document.addEventListener('DOMContentLoaded',()=>{const toggle=document.querySelector('.menu-toggle');if(toggle)toggle.addEventListener('click',()=>document.querySelector('.nav-links').classList.toggle('show'));FORME.updateCartCount();});
