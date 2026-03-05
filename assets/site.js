// Southwood Civic Group - site.js (vanilla JS, GitHub Pages friendly)

(function(){
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

  // Drawer controls
  const menuBtn = $("#menuBtn");
  const closeBtn = $("#closeBtn");
  const backdrop = $("#drawerBackdrop");
  const drawer = $("#drawer");

  function openDrawer(){
    document.body.classList.add("drawerOpen");
    drawer?.setAttribute("aria-hidden", "false");
    menuBtn?.setAttribute("aria-expanded", "true");
    // focus first link
    const firstLink = drawer?.querySelector("a");
    setTimeout(()=> firstLink?.focus(), 50);
  }

  function closeDrawer(){
    document.body.classList.remove("drawerOpen");
    drawer?.setAttribute("aria-hidden", "true");
    menuBtn?.setAttribute("aria-expanded", "false");
    menuBtn?.focus();
  }

  menuBtn?.addEventListener("click", openDrawer);
  closeBtn?.addEventListener("click", closeDrawer);
  backdrop?.addEventListener("click", closeDrawer);

  document.addEventListener("keydown", (e)=>{
    if(e.key === "Escape" && document.body.classList.contains("drawerOpen")){
      closeDrawer();
    }
  });

  // Mark active nav link
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  $$('a[data-nav]').forEach(a=>{
    const href = (a.getAttribute("href") || "").toLowerCase();
    if(href === path){
      a.classList.add("active");
      a.setAttribute("aria-current","page");
    }
  });

  // Lightbox for gallery page
  const lightbox = $("#lightbox");
  if(lightbox){
    const lbImg = $("#lbImg");
    const lbTitle = $("#lbTitle");
    const lbClose = $("#lbClose");
    const lbPrev = $("#lbPrev");
    const lbNext = $("#lbNext");

    const items = $$("[data-gallery-item]");
    let idx = 0;

    function show(i){
      idx = (i + items.length) % items.length;
      const el = items[idx];
      const src = el.getAttribute("data-full");
      const title = el.getAttribute("data-title") || "Photo";
      lbImg.src = src;
      lbTitle.textContent = title;
    }

    function open(i){
      show(i);
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden","false");
      setTimeout(()=> lbClose?.focus(), 30);
    }

    function close(){
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden","true");
    }

    items.forEach((el, i)=>{
      el.addEventListener("click", ()=> open(i));
      el.addEventListener("keydown", (e)=>{
        if(e.key === "Enter" || e.key === " "){
          e.preventDefault();
          open(i);
        }
      });
    });

    lbClose?.addEventListener("click", close);
    lightbox.addEventListener("click", (e)=>{
      if(e.target === lightbox) close();
    });

    lbPrev?.addEventListener("click", ()=> show(idx - 1));
    lbNext?.addEventListener("click", ()=> show(idx + 1));

    document.addEventListener("keydown", (e)=>{
      if(!lightbox.classList.contains("open")) return;
      if(e.key === "Escape") close();
      if(e.key === "ArrowLeft") show(idx - 1);
      if(e.key === "ArrowRight") show(idx + 1);
    });
  }

  // Small nicety: set copyright year
  const y = $("#year");
  if(y) y.textContent = String(new Date().getFullYear());


})();
