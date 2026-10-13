var e=``,t=``,n=null;async function r(e,t,r,i={}){if(!r||r.classList.contains(`is-loading`))return;let a=r.querySelector(`h3`),o=r.querySelector(`p`),s=a.textContent,c=o.textContent;try{r.classList.add(`is-loading`),r.setAttribute(`aria-busy`,`true`),a.textContent=`جاري التجهيز...`,o.textContent=`قد تستغرق هذه العملية بعض الوقت. الرجاء الانتظار.`,n=new AbortController;let s=await fetch(e,{signal:n.signal,headers:{"X-Requested-With":`XMLHttpRequest`,...i}});if(!s.ok){let e=await s.json().catch(()=>({}));throw Error(e.message||e.error||`فشل في الاتصال بالخادم: ${s.status}`)}let c=s.headers.get(`Content-Disposition`),l=t;if(c){let e=null,t=/filename\*=UTF-8''([^;]+)/i.exec(c);if(t&&t[1])try{e=decodeURIComponent(t[1])}catch(e){console.error(`Error decoding UTF-8 filename from header:`,e)}if(!e){let t=/filename="([^"]+)"/i.exec(c);t&&t[1]&&(e=t[1])}e&&(l=e)}let u=await s.blob(),d=window.URL.createObjectURL(u),f=document.createElement(`a`);f.style.display=`none`,f.href=d,f.download=l,document.body.appendChild(f),f.click(),setTimeout(()=>window.URL.revokeObjectURL(d),1e3),f.remove()}catch(e){if(e.name===`AbortError`)return;console.error(`Download failed:`,e);let t=document.getElementById(`downloadStatus`);t.hidden=!1,t.textContent=`فشل التحميل: ${e.message}`}finally{r.classList.remove(`is-loading`),r.removeAttribute(`aria-busy`),a.textContent=s,o.textContent=c}}function i(i,a){let o=document.getElementById(`downloadOptionsModal`);if(!o||!i)return;let s=o.querySelector(`#downloadModalTitle`),c=o.querySelector(`#downloadFileName`),l=o.querySelector(`#downloadFullFileContainer`),u=o.querySelector(`#cancelDownloadOptionsBtn`),d=i.name||i.id;c.textContent=d,o.querySelectorAll(`.download-option-box`).forEach(e=>{e.classList.remove(`is-loading`)}),l.style.display=`none`,s.textContent=`تحميل PDF للدرس`,l.style.display=`flex`;let f=o.querySelector(`#downloadFullNoQR`);f.href=`https://tiqdrcdn.ahmedtamer.com/drawapp/appFiles/${i.id.slice(0,2)}/${i.id.slice(2)}/file.pdf`;let p=`${d} - كامل.pdf`;f.setAttribute(`download`,p),f.setAttribute(`target`,`_blank`),f.onclick=null;let m=o.querySelector(`#downloadQuestionsWithYouTube`);if(m){let n=`${d} - أسئلة مع يوتيوب وQR.pdf`,a=`/api/explorer/file-pdf-with-youtube?${new URLSearchParams({fileId:i.id,parentId:t,filename:n})}`;m.href=a,m.onclick=t=>{t.preventDefault(),r(a,n,m,{Authorization:e})}}let h=a||document.activeElement,g=document.body.style.overflow,_=()=>{o.classList.remove(`visible`),n?.abort(),e=``,t=``,document.body.style.overflow=g,o.querySelector(`#downloadStatus`).hidden=!0,h?.focus()};u.onclick=_,o.onkeydown=e=>{if(e.key===`Escape`)e.preventDefault(),_();else if(e.key===`Tab`){let t=Array.from(o.querySelectorAll(`a[href], button`)).filter(e=>e.getClientRects().length>0),n=t[0],r=t[t.length-1];e.shiftKey&&(document.activeElement===n||document.activeElement===o.querySelector(`[role="dialog"]`))?(e.preventDefault(),r?.focus()):!e.shiftKey&&document.activeElement===r&&(e.preventDefault(),n?.focus())}},o.dataset.listenerAttached||(o.addEventListener(`click`,e=>{e.target===o&&u.click()}),o.dataset.listenerAttached=`true`),document.body.style.overflow=`hidden`,o.classList.add(`visible`),o.querySelector(`[role="dialog"]`).focus()}function a({id:n,name:r,parentId:a,authorization:o=``,permissions:s=[],opener:c}){if(t=a,typeof n!=`string`||n.length<3)throw Error(`A valid file ID is required`);if(!document.getElementById(`downloadOptionsModal`)){let e=document.createElement(`style`);e.textContent=`#downloadOptionsModal { --color-background:#0c1117; --color-surface:#171d23; --color-border:#343a40; --color-text-primary:#e3e9ed; --color-text-secondary:#949da5; --color-primary:#d97706; --color-primary-hover:#ffad00; --color-error:#ef4444; display:none; position:fixed; inset:0; z-index:10000; align-items:center; justify-content:center; background:#0009; color:var(--color-text-primary); font-family:inherit; }
#downloadOptionsModal.visible { display:flex; }
#downloadOptionsModal [hidden] { display:none !important; }
#downloadOptionsModal .download-options-container { display:flex; }
#downloadOptionsModal .download-option-box { flex:1; color:inherit; text-decoration:none; background:var(--color-background); }
#downloadOptionsModal .download-option-box p { color:var(--color-text-secondary); font-size:.85rem; line-height:1.5; }
#downloadOptionsModal .download-icon-wrapper { display:flex; align-items:center; justify-content:center; color:var(--color-primary); border:1px solid var(--color-border); background:var(--color-surface); }
#downloadOptionsModal .spinner-wrapper { display:none; }
#downloadOptionsModal .is-loading { pointer-events:none; opacity:.7; }
#downloadOptionsModal .is-loading .download-icon-wrapper { display:none; }
#downloadOptionsModal .is-loading .spinner-wrapper { display:flex; align-items:center; justify-content:center; }
#downloadOptionsModal .spinner { width:28px; height:28px; animation:lessonPdfSpin 1s linear infinite; stroke:var(--color-primary); }
#downloadOptionsModal .modal-action-button { padding:10px 16px; border:1px solid var(--color-border); border-radius:8px; background:#ffffff0d; color:inherit; font:inherit; cursor:pointer; }
#downloadOptionsModal #downloadStatus { color:var(--color-error); }
@keyframes lessonPdfSpin { to { transform:rotate(360deg); } }
#downloadOptionsModal .modal-content {
    width: min(720px, calc(100% - 32px));
    max-height: calc(100dvh - 40px);
    overflow-y: auto;
    box-sizing: border-box;
    padding: 28px;
    background: var(--color-surface);
    border-radius: 20px;
    text-align: start;
}

#downloadOptionsModal .pdf-download-heading {
    padding-bottom: 20px;
    border-bottom: 1px solid var(--color-border);
}

#downloadOptionsModal .modal-content:focus {
    outline: none;
}

#downloadOptionsModal .pdf-format-label,
#downloadOptionsModal .pdf-option-badge {
    display: inline-block;
    padding: 4px 9px;
    border-radius: 6px;
    background: rgba(217, 119, 6, 0.12);
    color: var(--color-primary-hover);
    font-size: 0.75rem;
    font-weight: 600;
}

#downloadOptionsModal h2 {
    margin: 12px 0 4px;
    font-size: 1.5rem;
}

#downloadOptionsModal .pdf-file-name {
    color: var(--color-text-primary);
    overflow-wrap: anywhere;
    margin: 0 0 8px;
}

#downloadOptionsModal #downloadModalDescription {
    margin: 0;
    color: var(--color-text-secondary);
    font-size: 0.9rem;
}

#downloadOptionsModal .download-options-container {
    gap: 12px;
    margin: 20px 0;
}

#downloadOptionsModal .download-options-container.is-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: none;
}

#downloadOptionsModal .download-option-box {
    display: grid;
    grid-template-columns: 42px minmax(0, 1fr);
    column-gap: 12px;
    align-items: start;
    box-sizing: border-box;
    min-width: 0;
    padding: 18px;
    border: 1px solid var(--color-border);
    border-radius: 12px;
    text-align: start;
    transition: border-color 0.2s, background-color 0.2s;
}

#downloadOptionsModal .download-option-box:hover {
    transform: none;
    box-shadow: none;
    border-color: var(--color-primary);
    background: rgba(217, 119, 6, 0.06);
}

#downloadOptionsModal .download-option-box:focus-visible,
#downloadOptionsModal button:focus-visible {
    outline: 2px solid var(--color-primary-hover);
    outline-offset: 4px;
}

#downloadOptionsModal .download-icon-wrapper,
#downloadOptionsModal .download-option-box.is-loading .spinner-wrapper {
    grid-column: 1;
    grid-row: 1 / span 4;
    width: 42px;
    height: 42px;
    margin: 0;
    border-radius: 10px;
    transform: none;
}

#downloadOptionsModal .download-icon-wrapper svg {
    width: 24px;
    height: 24px;
}

#downloadOptionsModal .pdf-option-badge {
    grid-column: 2;
    justify-self: start;
    background: var(--color-surface);
    color: var(--color-text-secondary);
}

#downloadOptionsModal .download-option-box h3 {
    grid-column: 2;
    margin: 9px 0 0;
    font-size: 1rem;
}

#downloadOptionsModal .download-option-box p {
    grid-column: 2;
    margin: 6px 0 0;
}

#downloadOptionsModal .pdf-option-action {
    grid-column: 2;
    margin-top: 14px;
    color: var(--color-primary-hover);
    font-size: 0.85rem;
    font-weight: 600;
}

#downloadOptionsModal .pdf-youtube-option {
    border-color: rgba(217, 119, 6, 0.55);
    background: linear-gradient(110deg, rgba(217, 119, 6, 0.09), var(--color-background));
}

#downloadOptionsModal .pdf-youtube-option .download-icon-wrapper svg {
    color: var(--color-error);
}

#downloadOptionsModal .pdf-permission-note {
    margin: 12px 0 0;
    font-size: 0.85rem;
    line-height: 1.6;
    color: var(--color-text-secondary);
}

#downloadOptionsModal .download-option-box.is-loading .pdf-option-action {
    visibility: hidden;
}

#downloadOptionsModal .modal-actions {
    margin-top: 20px;
    padding-top: 16px;
    border-top: 1px solid var(--color-border);
}

@media (max-width: 540px) {
    #downloadOptionsModal .modal-content { padding: 20px; }
    #downloadOptionsModal .download-options-container.is-grid { grid-template-columns: 1fr; }
    #downloadOptionsModal #downloadFullFileContainer { flex-direction: column; }
}

`,document.head.appendChild(e),document.body.insertAdjacentHTML(`beforeend`,`<div class="modal-overlay" id="downloadOptionsModal" dir="rtl">
        <div class="modal-content download-modal" role="dialog" aria-modal="true" aria-labelledby="downloadModalTitle" aria-describedby="downloadModalDescription" tabindex="-1">
            <div class="pdf-download-heading">
                <span class="pdf-format-label">PDF</span>
                <h2 id="downloadModalTitle">تحميل PDF</h2>
                <p id="downloadFileName" class="pdf-file-name"></p>
                <p id="downloadModalDescription">اختر النسخة المناسبة للتحميل.</p>
            </div>
            <div class="download-options-container" id="downloadFullFileContainer">
                <a href="#" id="downloadFullNoQR" class="download-option-box ">
                    <div class="download-icon-wrapper" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></svg></div>
                    <div class="spinner-wrapper" aria-hidden="true"><svg class="spinner" viewBox="0 0 50 50"><circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle></svg></div>
                    <span class="pdf-option-badge">بدون QR</span>
                    <h3>الملف الكامل</h3>
                    <p>تحميل ملف PDF الأصلي مباشرة.</p>
                    <span class="pdf-option-action">تحميل PDF <span aria-hidden="true">↓</span></span>
                </a>
            </div>
            <div class="pdf-youtube-section">
                <a href="#" id="downloadQuestionsWithYouTube" class="download-option-box pdf-youtube-option">
                    <div class="download-icon-wrapper" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3z"/></svg></div>
                    <div class="spinner-wrapper" aria-hidden="true"><svg class="spinner" viewBox="0 0 50 50"><circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle></svg></div>
                    <span class="pdf-option-badge">YouTube + QR</span>
                    <h3>الأسئلة مع روابط يوتيوب وQR</h3>
                    <p>أسئلة فقط مع أزرار لفتح فيديوهات يوتيوب ورموز QR، بدون إجابات.</p>
                    <span class="pdf-option-action">تحميل PDF <span aria-hidden="true">↓</span></span>
                </a>
                <p class="pdf-permission-note" hidden>لتنزيل هذه النسخة، أضف صلاحية «تحميل أسئلة PDF بروابط يوتيوب ورموز QR» لحسابك من لوحة المشرفين، ثم سجّل الدخول مجددًا.</p>

            </div>
            <p id="downloadStatus" role="alert" hidden></p>
            <div class="modal-actions">
                <button type="button" class="modal-action-button" id="cancelDownloadOptionsBtn">إغلاق</button>
            </div>
        </div>
    </div>`)}e=o?/^Bearer\s/i.test(o)?o:`Bearer ${o}`:``;let l=document.getElementById(`downloadOptionsModal`);l.querySelector(`.pdf-permission-note`).hidden=s.includes(`DrawGetPDFWithCodes`),l.querySelector(`#downloadStatus`).hidden=!0,i({id:n,name:r},c)}function o(){let e=document.getElementById(`downloadOptionsModal`);e?.classList.contains(`visible`)&&e.querySelector(`#cancelDownloadOptionsBtn`).click()}export{o as closeLessonPdfPopup,a as openLessonPdfPopup};