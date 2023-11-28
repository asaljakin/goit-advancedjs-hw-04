import{a as g,i as s,S as f}from"./assets/vendor-dccfeb28.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&c(l)}).observe(document,{childList:!0,subtree:!0});function a(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(t){if(t.ep)return;t.ep=!0;const o=a(t);fetch(t.href,o)}})();const E="40858309-c006559b48084651189398a1c";g.defaults.baseURL="https://pixabay.com/api/";async function h(r,e,a){return(await g.get(`?key=${E}&q=${r}&image_type=photo&orientation=horizontal&safesearch=true&page=${e}&per_page=${a}`)).data}const i={searchForm:document.getElementById("search-form"),gallery:document.querySelector(".gallery"),inputSerch:document.querySelector(".serch-form-input"),btnSerch:document.querySelector(".serch-form-btn"),btnLoadMore:document.querySelector(".load-more")};let u="",n=1,m;const d=40;i.searchForm.addEventListener("submit",S);async function S(r){if(r.preventDefault(),n=1,u=r.currentTarget.elements.searchQuery.value.trim(),i.gallery.innerHTML="",!u){s.error({title:"Error",position:"center",message:"The search string cannot be empty. Please specify your search query."});return}try{const e=await h(u,n,d);if(e.totalHits===0){s.error({title:"Error",position:"center",message:"Sorry, there are no images matching your search query. Please try again."});return}else y(e.hits),m=new f(".gallery a").refresh(),s.success({position:"center",message:`Hooray! We found ${e.totalHits} images.`});Math.ceil(e.totalHits/d)<=n?s.warning({position:"bottomCenter",message:"We're sorry, but you've reached the end of search results."}):window.addEventListener("scroll",p)}catch(e){s.error({title:"Error",position:"center",message:`${e.message} Something went wrong!`}),console.log(e)}finally{i.searchForm.reset()}}function y(r){if(!i.gallery)return;const e=r.map(c=>{const{id:t,largeImageURL:o,webformatURL:l,tags:w,likes:P,views:b,comments:L,downloads:v}=c;return`
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
                </div>`}).join("");if(i.gallery.insertAdjacentHTML("beforeend",e),n===1)return;const{height:a}=i.gallery.firstElementChild.getBoundingClientRect();window.scrollBy({top:a*2,behavior:"smooth"})}async function $(){n+=1,m.destroy();try{const r=await h(u,n,d);y(r.hits),m=new f(".gallery a").refresh();const e=Math.ceil(r.totalHits/d);n>=e&&(s.warning({position:"bottomCenter",message:"We're sorry, but you've reached the end of search results."}),window.removeEventListener("scroll",p))}catch(r){s.error({title:"Error",position:"center",message:`${r.message} Something went wrong!`}),console.log(r)}}function H(){return window.innerHeight+window.scrollY>=document.documentElement.scrollHeight}function p(){H()&&$()}
//# sourceMappingURL=commonHelpers.js.map
