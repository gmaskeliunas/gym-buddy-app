import{d as f,u as p,c as a,b as t,F as d,r as m,e as u,a as g,o as n,t as r,n as h,_ as x}from"./index-5cbda85e.js";const b={class:"absolute w-screen bg-gray-100"},w={class:"w-11/12 md:w-3/5 mx-auto mt-4 flex flex-col p-4 mb-20 bg-white rounded-lg shadow-xl"},y=t("div",{class:"m-4 self-center"},[t("p",null,"Here you can browse the success rate of your routine exercises!")],-1),S={class:"font-bold self-center"},v={class:"mr-3"},C=f({__name:"StatisticsView",setup(k){const _=p(),{defaultMuscleGroups:l}=_,c=(i,o)=>(o?Math.round(i/o*100):0).toString();return(i,o)=>(n(),a("div",b,[t("div",w,[y,(n(!0),a(d,null,m(u(l).map(s=>s.name),s=>(n(),a("div",{class:"flex flex-col",key:s},[t("p",S,r(s),1),(n(!0),a(d,null,m(u(l).filter(e=>e.name===s)[0].exercises.filter(e=>e.enabled===!0),e=>(n(),a("li",{class:"list-none flex ml-8 mb-1",key:e.id},[t("p",v,r(e.name)+":",1),t("div",{class:"radial-progress text-xs",style:h({"--size":"2rem","--value":c(e.timesCompleted,e.timesShowed)})},r(c(e.timesCompleted,e.timesShowed))+"% ",5)]))),128))]))),128))]),g(x)]))}});export{C as default};
