/* empty css                      */import{a as v,i,S as b}from"./assets/vendor-DqB7j7Ix.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))m(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const f of s.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&m(f)}).observe(document,{childList:!0,subtree:!0});function o(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function m(t){if(t.ep)return;t.ep=!0;const s=o(t);fetch(t.href,s)}})();const L="47647589-b8e3be9abf9fcf69ccbc2b85f",w="https://pixabay.com/api/",E=40;async function y(r,e=1){try{return(await v.get(w,{params:{key:L,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:E,page:e}})).data}catch(o){throw console.error("API error:",o),new Error("Failed to fetch images")}}function g(r){return r.map(e=>`
          <a href="${e.largeImageURL}">
            <img src="${e.webformatURL}" alt="${e.tags}" />
            
            <div class="card-info">
              <div class="info-block">
                <p class="label">Likes</p>
                <p class="value">${e.likes}</p>
              </div>
              <div class="info-block">
                <p class="label">Views</p>
                <p class="value">${e.views}</p>
              </div>
              <div class="info-block">
                <p class="label">Comments</p>
                <p class="value">${e.comments}</p>
              </div>
              <div class="info-block">
                <p class="label">Downloads</p>
                <p class="value">${e.downloads}</p>
              </div>
            </div>
          </a>
        `).join("")}const a=document.querySelector("#search-form"),d=document.querySelector(".gallery"),u=document.querySelector(".load-more"),p=document.querySelector(".loader");let l="",n=1,h=0,c;a.addEventListener("submit",async r=>{if(r.preventDefault(),l=a.elements.searchQuery.value.trim(),!l){i.warning({title:"Oops!",message:"Please enter a search term!",position:"topRight"});return}a.elements.searchQuery.disabled=!0,a.elements.searchQuery.style.opacity="0.5",d.innerHTML="",n=1,u.classList.add("hidden"),p.classList.remove("hidden");try{const e=await y(l,n);if(h=e.totalHits,e.hits.length===0){i.error({message:"No images found. Try another keyword.",position:"topRight"});return}const o=g(e.hits);d.innerHTML=o,c?c.refresh():c=new b(".gallery a"),h>40&&u.classList.remove("hidden")}catch{i.error({message:"Error fetching images",position:"topRight"})}finally{p.classList.add("hidden"),a.elements.searchQuery.disabled=!1,a.elements.searchQuery.style.opacity="1",a.reset()}});u.addEventListener("click",async()=>{n+=1,p.classList.remove("hidden");try{const r=await y(l,n),e=g(r.hits);d.insertAdjacentHTML("beforeend",e),c.refresh();const o=Math.ceil(h/40);n>=o&&(u.classList.add("hidden"),i.info({message:"You've reached the end of the results.",position:"topRight"})),P()}catch{i.error({message:"Error loading more images",position:"topRight"})}finally{p.classList.add("hidden")}});function P(){const{height:r}=d.firstElementChild.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}
//# sourceMappingURL=page-2.js.map
