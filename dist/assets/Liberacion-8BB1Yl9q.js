import{s as b}from"./index-DgmeF42Q.js";import{s as f}from"./index-BPXYz1vO.js";import{s as _}from"./index-CpTZafFL.js";import{J as p,E as h,d as L,v as c,o as x,a as e,x as l,A as v,aJ as w,aK as g}from"./index-BKZWN546.js";const r=t=>(w("data-v-9882f39d"),t=t(),g(),t),V={class:"flex justify-center items-center h-full"},H={class:"card flex flex-col gap-4 w-full max-w-4xl",style:{"background-color":"rgba(255, 255, 255, 0.8)"}},y=r(()=>e("div",{class:"font-semibold text-xl text-center"},[e("strong",null,"Registro de Liberación")],-1)),I={class:"flex flex-wrap gap-4"},k={class:"w-full md:w-1/2 lg:w-1/3"},B=r(()=>e("label",{for:"fechaLiberacion"},"Fecha de la Liberación",-1)),N={class:"w-full md:w-1/2 lg:w-1/3"},q=r(()=>e("label",{for:"horaLiberacion"},"Hora de la Liberación",-1)),F={class:"w-full md:w-1/2 lg:w-1/3"},R=r(()=>e("label",{for:"numeroHabitacion"},"Número de Habitación",-1)),S={__name:"Liberacion",setup(t){const a=h({fechaLiberacion:"",horaLiberacion:"",numeroHabitacion:""}),n=()=>{alert("Liberación de habitación registrada exitosamente"),d()},d=()=>{a.value={fechaLiberacion:"",horaLiberacion:"",numeroHabitacion:""}};return(U,o)=>{const s=_,u=f,m=b;return x(),L(m,null,{default:c(()=>[e("div",V,[e("div",H,[y,e("div",I,[e("div",k,[B,l(s,{id:"fechaLiberacion",type:"date",modelValue:a.value.fechaLiberacion,"onUpdate:modelValue":o[0]||(o[0]=i=>a.value.fechaLiberacion=i),class:"w-full",required:""},null,8,["modelValue"])]),e("div",N,[q,l(s,{id:"horaLiberacion",type:"time",modelValue:a.value.horaLiberacion,"onUpdate:modelValue":o[1]||(o[1]=i=>a.value.horaLiberacion=i),class:"w-full",required:""},null,8,["modelValue"])]),e("div",F,[R,l(s,{id:"numeroHabitacion",type:"text",modelValue:a.value.numeroHabitacion,"onUpdate:modelValue":o[2]||(o[2]=i=>a.value.numeroHabitacion=i),class:"w-full",required:""},null,8,["modelValue"])])]),l(u,{label:"Registrar Liberación",onClick:n,class:"mt-4"},{default:c(()=>[v(" Registrar Liberación ")]),_:1})])])]),_:1})}}},j=p(S,[["__scopeId","data-v-9882f39d"]]);export{j as default};
