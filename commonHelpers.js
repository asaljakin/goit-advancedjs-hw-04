import{a as f,i as c,S as g}from"./assets/vendor-dccfeb28.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function s(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerpolicy&&(o.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?o.credentials="include":r.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=s(r);fetch(r.href,o)}})();const v="40858309-c006559b48084651189398a1c";f.defaults.baseURL="https://pixabay.com/api/";async function h(t,e,s){return(await f.get(`?key=${v}&q=${t}&image_type=photo&orientation=horizontal&safesearch=true&page=${e}&per_page=${s}`)).data}const n={searchForm:document.getElementById("search-form"),gallery:document.querySelector(".gallery"),inputSerch:document.querySelector(".serch-form-input"),btnSerch:document.querySelector(".serch-form-btn"),btnLoadMore:document.querySelector(".load-more")};let u="",l=1,m;const d=40;n.searchForm.addEventListener("submit",S);function S(t){if(t.preventDefault(),l=1,u=t.currentTarget.elements.searchQuery.value.trim(),n.gallery.innerHTML="",!t.currentTarget.elements.searchQuery.value.trim()){c.error({title:"Error",position:"center",message:"The search string cannot be empty. Please specify your search query."});return}h(u,l,d).then(e=>{e.totalHits===0?c.error({title:"Error",position:"center",message:"Sorry, there are no images matching your search query. Please try again."}):(p(e.hits),m=new g(".gallery a").refresh(),c.success({position:"center",message:`Hooray! We found ${e.totalHits} images.`}))}).catch(e=>{c.error({title:"Error",position:"center",message:`${e.message} Something went wrong!`}),console.log(e)}).finally(()=>{n.searchForm.reset()})}function p(t){if(!n.gallery)return;const e=t.map(i=>{const{id:r,largeImageURL:o,webformatURL:a,tags:y,likes:H,views:b,comments:w,downloads:L}=i;return`
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
            </div>`}).join("");n.gallery.insertAdjacentHTML("beforeend",e);const{height:s}=n.gallery.firstElementChild.getBoundingClientRect();window.scrollBy({top:s*2,behavior:"smooth"})}function $(){l+=1,m.destroy(),h(u,l,d).then(t=>{p(t.hits),m=new g(".gallery a").refresh();const e=Math.ceil(t.totalHits/d);l>e&&c.warning({position:"center",message:"We're sorry, but you've reached the end of search results."})}).catch(t=>console.log(t))}function E(){return window.innerHeight+window.scrollY>=document.documentElement.scrollHeight}function q(){E()&&$()}window.addEventListener("scroll",q);
//# sourceMappingURL=commonHelpers.js.map
