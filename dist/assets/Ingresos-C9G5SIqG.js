import{s as i}from"./index-DgmeF42Q.js";import{J as h,E as m,L as x,d as f,v as b,o as a,a as s,t as e,c as n,z as g,F as y,aJ as v,aK as I}from"./index-BKZWN546.js";const d=t=>(v("data-v-a40e2227"),t=t(),I(),t),k={class:"mt-8 card flex flex-col gap-4 w-full",style:{"background-color":"rgba(255, 255, 255, 0.8)"}},w=d(()=>s("div",{class:"font-semibold text-xl"},"Reporte de Ingresos",-1)),B={class:"mb-4"},F={class:"table-auto w-full"},S=d(()=>s("thead",null,[s("tr",null,[s("th",{class:"px-4 py-2"},"Fecha de Ingreso"),s("th",{class:"px-4 py-2"},"Monto"),s("th",{class:"px-4 py-2"},"Descripción")])],-1)),D={class:"border px-4 py-2"},E={class:"border px-4 py-2"},J={class:"border px-4 py-2"},L={__name:"Ingresos",setup(t){const c=m([]),p=x(()=>c.value.reduce((l,r)=>l+r.monto,0));return(l,r)=>{const _=i;return a(),f(_,null,{default:b(()=>[s("div",k,[w,s("div",B,[s("p",null,"Total de ingresos anuales: "+e(p.value),1)]),s("table",F,[S,s("tbody",null,[(a(!0),n(y,null,g(c.value,(o,u)=>(a(),n("tr",{key:u},[s("td",D,e(o.fecha),1),s("td",E,e(o.monto),1),s("td",J,e(o.descripcion),1)]))),128))])])])]),_:1})}}},C=h(L,[["__scopeId","data-v-a40e2227"]]);export{C as default};