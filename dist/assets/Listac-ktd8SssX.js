import{s as A}from"./index-DgmeF42Q.js";import{s as U}from"./index-CF6UkCLX.js";import{s as I}from"./index-CpTZafFL.js";import{s as B}from"./index-BPXYz1vO.js";import{J as F,E as m,L as T,d as E,v as x,o as v,a as e,w as N,aI as $,c as b,z as D,F as S,x as a,A as M,t as n,aJ as P,aK as z}from"./index-BKZWN546.js";const s=p=>(P("data-v-4a3ca8be"),p=p(),z(),p),G={class:"mt-8 card flex flex-col gap-4 w-full",style:{"background-color":"rgba(255, 255, 255, 0.8)"}},J=s(()=>e("div",{class:"font-semibold text-xl"},"Lista de Clientes",-1)),R={class:"flex flex-col gap-2"},q={class:"table-auto w-full"},K=s(()=>e("thead",null,[e("tr",null,[e("th",{class:"px-4 py-2"},"Nombre"),e("th",{class:"px-4 py-2"},"Apellido Paterno"),e("th",{class:"px-4 py-2"},"Apellido Materno"),e("th",{class:"px-4 py-2"},"Teléfono"),e("th",{class:"px-4 py-2"},"RFC"),e("th",{class:"px-4 py-2"},"Email"),e("th",{class:"px-4 py-2"},"Dirección"),e("th",{class:"px-4 py-2"},"Acciones")])],-1)),Q={class:"border px-4 py-2"},j={class:"border px-4 py-2"},H={class:"border px-4 py-2"},O={class:"border px-4 py-2"},W={class:"border px-4 py-2"},X={class:"border px-4 py-2"},Y={class:"border px-4 py-2"},Z={class:"border px-4 py-2"},ee={class:"card flex flex-col gap-4 w-full mt-8",style:{"background-color":"rgba(255, 255, 255, 0.8)"}},le=s(()=>e("div",{class:"font-semibold text-xl text-center"},[e("strong",null,"Alta de Cliente")],-1)),oe={class:"flex flex-wrap gap-4"},te={class:"w-full md:w-1/3"},ae=s(()=>e("label",{for:"nombre"},"Nombre",-1)),se={class:"w-full md:w-1/3"},de=s(()=>e("label",{for:"ap_pat"},"Apellido Paterno",-1)),ne={class:"w-full md:w-1/3"},re=s(()=>e("label",{for:"ap_mat"},"Apellido Materno",-1)),ce={class:"w-full md:w-1/3"},ie=s(()=>e("label",{for:"telefono"},"Teléfono",-1)),ue={class:"w-full md:w-1/3"},pe=s(()=>e("label",{for:"rfc"},"RFC",-1)),me={class:"w-full md:w-1/3"},_e=s(()=>e("label",{for:"email"},"Email",-1)),fe={class:"w-full"},ve=s(()=>e("label",{for:"direccion"},"Dirección",-1)),xe={__name:"Listac",setup(p){const r=m([]),o=m({nombre:"",ap_pat:"",ap_mat:"",telefono:"",rfc:"",email:"",direccion:""}),c=m(null),i=m(""),w=T(()=>i.value?r.value.filter(d=>d.nombre.toLowerCase().includes(i.value.toLowerCase())||d.ap_pat.toLowerCase().includes(i.value.toLowerCase())||d.ap_mat.toLowerCase().includes(i.value.toLowerCase())):r.value),h=d=>{const t=r.value[d];o.value={...t},c.value=d},y=()=>{o.value.nombre&&o.value.ap_pat?(c.value!==null?(r.value[c.value]={...o.value},c.value=null):r.value.push({...o.value}),C()):alert("Por favor, completa los campos requeridos.")},V=d=>{r.value.splice(d,1)},C=()=>{o.value={nombre:"",ap_pat:"",ap_mat:"",telefono:"",rfc:"",email:"",direccion:""},c.value=null};return(d,t)=>{const _=B,u=I,g=U,k=A;return v(),E(k,null,{default:x(()=>[e("div",G,[J,e("div",R,[N(e("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=l=>i.value=l),placeholder:"Buscar cliente...",class:"p-2 border border-gray-300 rounded"},null,512),[[$,i.value]])]),e("table",q,[K,e("tbody",null,[(v(!0),b(S,null,D(w.value,(l,f)=>(v(),b("tr",{key:f},[e("td",Q,n(l.nombre),1),e("td",j,n(l.ap_pat),1),e("td",H,n(l.ap_mat),1),e("td",O,n(l.telefono),1),e("td",W,n(l.rfc),1),e("td",X,n(l.email),1),e("td",Y,n(l.direccion),1),e("td",Z,[a(_,{icon:"pi pi-pencil",onClick:L=>h(f),class:"mr-2"},null,8,["onClick"]),a(_,{icon:"pi pi-trash",onClick:L=>V(f),class:"p-button-danger"},null,8,["onClick"])])]))),128))])])]),e("div",ee,[le,e("div",oe,[e("div",te,[ae,a(u,{id:"nombre",type:"text",modelValue:o.value.nombre,"onUpdate:modelValue":t[1]||(t[1]=l=>o.value.nombre=l),class:"w-full"},null,8,["modelValue"])]),e("div",se,[de,a(u,{id:"ap_pat",type:"text",modelValue:o.value.ap_pat,"onUpdate:modelValue":t[2]||(t[2]=l=>o.value.ap_pat=l),class:"w-full"},null,8,["modelValue"])]),e("div",ne,[re,a(u,{id:"ap_mat",type:"text",modelValue:o.value.ap_mat,"onUpdate:modelValue":t[3]||(t[3]=l=>o.value.ap_mat=l),class:"w-full"},null,8,["modelValue"])]),e("div",ce,[ie,a(u,{id:"telefono",type:"text",modelValue:o.value.telefono,"onUpdate:modelValue":t[4]||(t[4]=l=>o.value.telefono=l),class:"w-full"},null,8,["modelValue"])]),e("div",ue,[pe,a(u,{id:"rfc",type:"text",modelValue:o.value.rfc,"onUpdate:modelValue":t[5]||(t[5]=l=>o.value.rfc=l),class:"w-full"},null,8,["modelValue"])]),e("div",me,[_e,a(u,{id:"email",type:"text",modelValue:o.value.email,"onUpdate:modelValue":t[6]||(t[6]=l=>o.value.email=l),class:"w-full"},null,8,["modelValue"])]),e("div",fe,[ve,a(g,{id:"direccion",rows:"2",modelValue:o.value.direccion,"onUpdate:modelValue":t[7]||(t[7]=l=>o.value.direccion=l),class:"w-full"},null,8,["modelValue"])])]),a(_,{label:"Guardar Cliente",onClick:y,class:"mt-4"},{default:x(()=>[M(n(c.value!==null?"Actualizar":"Guardar"),1)]),_:1})])]),_:1})}}},Ce=F(xe,[["__scopeId","data-v-4a3ca8be"]]);export{Ce as default};