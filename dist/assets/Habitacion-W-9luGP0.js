import{s as x}from"./index-DgmeF42Q.js";import{s as h}from"./index-BPXYz1vO.js";import{J as y,E as i,L as g,d as w,v as u,o as l,a as e,w as k,aI as B,c as p,z as C,F as E,t as r,x as H,A as I,aJ as L,aK as S}from"./index-BKZWN546.js";const _=o=>(L("data-v-5a148f8d"),o=o(),S(),o),N={class:"mt-8 card flex flex-col gap-4 w-full",style:{"background-color":"rgba(255, 255, 255, 0.8)"}},V=_(()=>e("div",{class:"font-semibold text-xl"},"Estado de Habitaciones",-1)),F={class:"flex flex-col gap-2"},A={class:"table-auto w-full"},D=_(()=>e("thead",null,[e("tr",null,[e("th",{class:"px-4 py-2"},"Número de Habitación"),e("th",{class:"px-4 py-2"},"Estado"),e("th",{class:"px-4 py-2"},"Acciones")])],-1)),J={class:"border px-4 py-2"},T={class:"border px-4 py-2"},$={class:"border px-4 py-2"},z={__name:"Habitacion",setup(o){const c=i([]),a=i(""),f=g(()=>a.value?c.value.filter(t=>t.numero.toString().includes(a.value)||t.estado.toLowerCase().includes(a.value.toLowerCase())):c.value),m=t=>{c.value[t].estado=c.value[t].estado==="ocupada"?"disponible":"ocupada"};return(t,d)=>{const v=h,b=x;return l(),w(b,null,{default:u(()=>[e("div",N,[V,e("div",F,[k(e("input",{type:"text","onUpdate:modelValue":d[0]||(d[0]=s=>a.value=s),placeholder:"Buscar habitación...",class:"p-2 border border-gray-300 rounded"},null,512),[[B,a.value]])]),e("table",A,[D,e("tbody",null,[(l(!0),p(E,null,C(f.value,(s,n)=>(l(),p("tr",{key:n},[e("td",J,r(s.numero),1),e("td",T,r(s.estado),1),e("td",$,[H(v,{onClick:K=>m(n),class:"mr-2"},{default:u(()=>[I(r(s.estado==="ocupada"?"Liberar":"Ocupar"),1)]),_:2},1032,["onClick"])])]))),128))])])])]),_:1})}}},U=y(z,[["__scopeId","data-v-5a148f8d"]]);export{U as default};