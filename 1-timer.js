import"./assets/modulepreload-polyfill-B5Qt9EMX.js";import{f as p,i as m}from"./assets/vendor-BbbuE1sJ.js";const u=document.getElementById("datetime-picker"),a=document.querySelector("[data-start]"),g=document.querySelector("[data-days]"),S=document.querySelector("[data-hours]"),D=document.querySelector("[data-minutes]"),b=document.querySelector("[data-seconds]");let c=null,i=null;const w={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){const t=e[0];t<=new Date?(m.error({title:"Error",message:"Please choose a date in the future",position:"topRight"}),a.disabled=!0):(c=t,a.disabled=!1)}};p(u,w);a.addEventListener("click",()=>{c&&(a.disabled=!0,u.disabled=!0,i=setInterval(()=>{const t=c-new Date;if(t<=0){clearInterval(i),l(0,0,0,0),m.success({title:"Time's up!",message:"The countdown has ended.",position:"topRight"}),u.disabled=!1;return}const{days:n,hours:o,minutes:d,seconds:r}=T(t);l(n,o,d,r)},1e3))});function T(e){const r=Math.floor(e/864e5),h=Math.floor(e%864e5/36e5),f=Math.floor(e%864e5%36e5/6e4),y=Math.floor(e%864e5%36e5%6e4/1e3);return{days:r,hours:h,minutes:f,seconds:y}}function s(e){return String(e).padStart(2,"0")}function l(e,t,n,o){g.textContent=s(e),S.textContent=s(t),D.textContent=s(n),b.textContent=s(o)}
//# sourceMappingURL=1-timer.js.map
