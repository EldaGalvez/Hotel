import{s as y}from"./index-DgmeF42Q.js";import{s as f}from"./index-BPXYz1vO.js";import{J as m,E as d,L as b,d as F,v as w,o as l,a as e,w as g,aI as C,c as p,z as k,F as S,t as a,x as B,aJ as L,aK as I}from"./index-BKZWN546.js";const u=c=>(L("data-v-c94c8ece"),c=c(),I(),c),H={class:"mt-8 card flex flex-col gap-4 w-full",style:{"background-color":"rgba(255, 255, 255, 0.8)"}},D=u(()=>e("div",{class:"font-semibold text-xl"},"Historial de Facturas",-1)),V={class:"flex flex-col gap-2"},E={class:"table-auto w-full"},J=u(()=>e("thead",null,[e("tr",null,[e("th",{class:"px-4 py-2"},"Fecha de la Facturación"),e("th",{class:"px-4 py-2"},"Hora de la Facturación"),e("th",{class:"px-4 py-2"},"RFC"),e("th",{class:"px-4 py-2"},"Monto"),e("th",{class:"px-4 py-2"},"Descripción de Servicios"),e("th",{class:"px-4 py-2"},"Acciones")])],-1)),M={class:"border px-4 py-2"},N={class:"border px-4 py-2"},$={class:"border px-4 py-2"},z={class:"border px-4 py-2"},A={class:"border px-4 py-2"},K={class:"border px-4 py-2"},Q={__name:"Historial",setup(c){const r=d([]),t=d(""),_=b(()=>t.value?r.value.filter(o=>o.rfc.toLowerCase().includes(t.value.toLowerCase())||o.descripcionServicios.toLowerCase().includes(t.value.toLowerCase())||o.fechaFactura.includes(t.value)):r.value),h=o=>{r.value.splice(o,1)};return(o,i)=>{const x=f,v=y;return l(),F(v,null,{default:w(()=>[e("div",H,[D,e("div",V,[g(e("input",{type:"text","onUpdate:modelValue":i[0]||(i[0]=s=>t.value=s),placeholder:"Buscar factura...",class:"p-2 border border-gray-300 rounded"},null,512),[[C,t.value]])]),e("table",E,[J,e("tbody",null,[(l(!0),p(S,null,k(_.value,(s,n)=>(l(),p("tr",{key:n},[e("td",M,a(s.fechaFactura),1),e("td",N,a(s.horaFactura),1),e("td",$,a(s.rfc),1),e("td",z,a(s.monto),1),e("td",A,a(s.descripcionServicios),1),e("td",K,[B(x,{icon:"pi pi-trash",onClick:R=>h(n),class:"p-button-danger"},null,8,["onClick"])])]))),128))])])])]),_:1})}}},q=m(Q,[["__scopeId","data-v-c94c8ece"]]);export{q as default};