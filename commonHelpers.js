import{a as f,i as c,S as g}from"./assets/vendor-dccfeb28.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function i(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerpolicy&&(o.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?o.credentials="include":r.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(r){if(r.ep)return;r.ep=!0;const o=i(r);fetch(r.href,o)}})();const E="40858309-c006559b48084651189398a1c";f.defaults.baseURL="https://pixabay.com/api/";async function h(t,e,i){return(await f.get(`?key=${E}&q=${t}&image_type=photo&orientation=horizontal&safesearch=true&page=${e}&per_page=${i}`)).data}const n={searchForm:document.getElementById("search-form"),gallery:document.querySelector(".gallery"),inputSerch:document.querySelector(".serch-form-input"),btnSerch:document.querySelector(".serch-form-btn"),btnLoadMore:document.querySelector(".load-more")};let u="",s=1,m;const d=40;n.searchForm.addEventListener("submit",S);function S(t){if(t.preventDefault(),s=1,u=t.currentTarget.elements.searchQuery.value.trim(),n.gallery.innerHTML="",!t.currentTarget.elements.searchQuery.value.trim()){c.error({title:"Error",position:"center",message:"The search string cannot be empty. Please specify your search query."});return}h(u,s,d).then(e=>{e.totalHits===0?c.error({title:"Error",position:"center",message:"Sorry, there are no images matching your search query. Please try again."}):(p(e.hits),m=new g(".gallery a").refresh(),c.success({position:"center",message:`Hooray! We found ${e.totalHits} images.`}))}).catch(e=>{c.error({title:"Error",position:"center",message:`${e.message} Something went wrong!`}),console.log(e)}).finally(()=>{n.searchForm.reset(),window.addEventListener("scroll",y)})}function p(t){if(!n.gallery)return;const e=t.map(a=>{const{id:r,largeImageURL:o,webformatURL:l,tags:w,likes:H,views:b,comments:L,downloads:v}=a;return`
                <div class="photo-card">
                    <a href='${o}' class="card-link js-card-link">
                        <img class="photo" src="${l}" alt="${w}" loading="lazy" />
                        <div class="info">
                            <p class="info-item">
                            <b>Views</b>
                            ${b}
                            </p>
                            <p class="info-item">
                            <b>Comments</b>
                            ${L}
                            </p>
                            <p class="info-item">
                            <b>Downloads</b>
                            ${v}
                            </p>
                        </div>
                    </a>
                </div>`}).join("");if(n.gallery.insertAdjacentHTML("beforeend",e),s===1)return;const{height:i}=n.gallery.firstElementChild.getBoundingClientRect();window.scrollBy({top:i*2,behavior:"smooth"})}function $(){s+=1,m.destroy(),h(u,s,d).then(t=>{p(t.hits),m=new g(".gallery a").refresh();const e=Math.ceil(t.totalHits/d);s>=e&&(c.warning({position:"center",message:"We're sorry, but you've reached the end of search results."}),window.removeEventListener("scroll",y))}).catch(t=>console.log(t))}function q(){return window.innerHeight+window.scrollY>=document.documentElement.scrollHeight}function y(){q()&&$()}
//# sourceMappingURL=commonHelpers.js.map
