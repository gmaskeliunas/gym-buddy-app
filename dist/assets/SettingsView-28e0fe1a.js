import{d as n,u as r,c,b as e,w as d,v as i,e as t,f as u,t as m,a as h,o as _,_ as p}from"./index-5cbda85e.js";const b={class:"absolute inset-0 w-screen bg-gray-100"},g={class:"w-11/12 md:w-3/5 flex flex-col mx-auto mt-4 p-4 bg-white rounded-lg shadow-xl"},f={class:"flex flex-col"},x=e("label",{for:"username",class:"block text-gray-700 font-bold mb-2"},"Username:",-1),w=e("button",{type:"button",class:"btn w-min self-center bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 whitespace-normal mt-4",onclick:"usernameChangedModal.showModal()"}," Change username ",-1),y={id:"usernameChangedModal",class:"modal"},v={class:"modal-box"},C=e("h3",{class:"font-bold text-lg"},"Your username was changed successfully!",-1),S={class:"font-semibold text-primary"},k=e("p",{class:"py-4"},"Press ESC key or click the button below to close",-1),V=e("div",{class:"modal-action"},[e("form",{method:"dialog"},[e("button",{class:"btn"},"Close")])],-1),I=n({__name:"SettingsView",setup(M){const s=r(),a=()=>{localStorage.clear(),location.reload(),alert("Local storage has been cleared!")};return(B,o)=>(_(),c("div",b,[e("div",g,[e("form",f,[x,d(e("input",{type:"text",id:"username","onUpdate:modelValue":o[0]||(o[0]=l=>t(s).user.userId=l),class:"shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",maxlength:"25",required:""},null,512),[[i,t(s).user.userId]]),w]),e("dialog",y,[e("div",v,[C,e("p",null,[u("Your current username is: "),e("span",S,m(t(s).user.userId)+".",1)]),k,V])]),e("button",{class:"btn bg-primary self-center text-white mt-4",onClick:a},"Clear Local Storage (reset the app)")]),h(p)]))}});export{I as default};