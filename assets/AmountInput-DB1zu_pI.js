import{j as t}from"./index-DJfziI53.js";const r="_amountInput_piv0b_3",c={amountInput:r};function a({amount:u,setAmount:s,id:l=null,callback:e,index:i=null,productList:p=null}){function o(n){i!==null&&n>=1&&n<=20&&e(n,i,p),n<1||n>20?s(1):s(n)}return t.jsxs("div",{className:c.amountInput,children:[t.jsx("button",{onClick:()=>o(u-1),children:"-"}),t.jsx("input",{id:l,type:"numder",min:1,step:1,value:u,onChange:n=>o(Number(n.target.value))}),t.jsx("button",{onClick:()=>o(u+1),children:"+"})]})}export{a as A};
