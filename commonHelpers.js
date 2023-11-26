import{a as f,i as l,S as h}from"./assets/vendor-dccfeb28.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const v="40858309-c006559b48084651189398a1c";f.defaults.baseURL="https://pixabay.com/api/";async function g(t,r,s){return(await f.get(`?key=${v}&q=${t}&image_type=photo&orientation=horizontal&safesearch=true&page=${r}&per_page=${s}`)).data}const n={searchForm:document.getElementById("search-form"),gallery:document.querySelector(".gallery"),inputSerch:document.querySelector(".serch-form-input"),btnSerch:document.querySelector(".serch-form-btn"),btnLoadMore:document.querySelector(".load-more")};let u="",c=1,d;const m=40;n.searchForm.addEventListener("submit",S);function S(t){if(t.preventDefault(),c=1,u=t.currentTarget.elements.searchQuery.value.trim(),n.gallery.innerHTML="",!t.currentTarget.elements.searchQuery.value.trim()){l.error({title:"Error",position:"center",message:"The search string cannot be empty. Please specify your search query."});return}g(u,c,m).then(r=>{r.totalHits===0?l.error({title:"Error",position:"center",message:"Sorry, there are no images matching your search query. Please try again."}):(p(r.hits),d=new h(".gallery a").refresh(),l.success({position:"center",message:`Hooray! We found ${r.totalHits} images.`}))}).catch(r=>console.log(r)).finally(()=>{n.searchForm.reset()})}function p(t){if(!n.gallery)return;const r=t.map(i=>{const{id:e,largeImageURL:o,webformatURL:a,tags:y,likes:H,views:b,comments:w,downloads:L}=i;return`
            <div class="photo-card">
                <a href='${o}' class="card-link js-card-link">
                    <img class="photo" src="${a}" alt="${y}" loading="lazy" />
                    <div class="info">
                        <p class="info-item">
                        <b>Views</b>
                        ${b}
                        </p>
                        <p class="info-item">
                        <b>Comments</b>
                        ${w}
                        </p>
                        <p class="info-item">
                        <b>Downloads</b>
                        ${L}
                        </p>
                    </div>
                </a>
            </div>`}).join("");n.gallery.insertAdjacentHTML("beforeend",r);const{height:s}=n.gallery.firstElementChild.getBoundingClientRect();window.scrollBy({top:s*2,behavior:"smooth"})}function $(){c+=1,d.destroy(),g(u,c,m).then(t=>{p(t.hits),d=new h(".gallery a").refresh();const r=Math.ceil(t.totalHits/m);c>r&&l.warning({position:"center",message:"We're sorry, but you've reached the end of search results."})}).catch(t=>console.log(t))}function E(){return window.innerHeight+window.scrollY>=document.documentElement.scrollHeight}function q(){E()&&$()}window.addEventListener("scroll",q);
//# sourceMappingURL=commonHelpers.js.map
