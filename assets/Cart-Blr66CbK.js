import{j as e,L as d,b as y,d as N,e as T,r as _,f as b}from"./index-DJfziI53.js";import{F as $}from"./FlexContainer-7pYeUEBP.js";import{B as p}from"./Divider-Cr1DzigY.js";import{u as q}from"./useGetDataList-CyWpu0rj.js";import{M as m}from"./index-CeEDtpwb.js";import{A as f}from"./AmountInput-DB1zu_pI.js";import{I as g}from"./Img-DznJS-u6.js";import{R as k}from"./RenderQueryData-MXl8oXhH.js";const v="_productContainer_48qhf_3",S="_select_48qhf_11",R="_money_48qhf_11",A="_img_48qhf_15",F="_tableHeader_48qhf_20",w="_productTitle_48qhf_35",B="_deleteBtn_48qhf_45",D="_totalContainer_48qhf_55",W="_totalTable_48qhf_59",P="_checkoutBtn_48qhf_84",E="_total_48qhf_55",I="_emtyContainer_48qhf_96",O="_emtyImg_48qhf_101",H="_emptyTxt_48qhf_105",M="_productRow_48qhf_112",z="_cartContainer_48qhf_122",U="_imgContainer_48qhf_141",n={productContainer:v,delete:"_delete_48qhf_11",select:S,money:R,img:A,tableHeader:F,productTitle:w,deleteBtn:B,totalContainer:D,totalTable:W,checkoutBtn:P,total:E,emtyContainer:I,emtyImg:O,emptyTxt:H,productRow:M,cartContainer:z,imgContainer:U},Q="/test-covet-lux/assets/empty-cart-DDtoXXdQ.svg";function G(){return e.jsxs("div",{className:`columnContent ${n.emtyContainer}`,children:[e.jsx("img",{alt:"empty cart",src:Q,className:n.emtyImg}),e.jsx("p",{className:n.emptyTxt,children:"Your cart is empty"}),e.jsxs(d,{to:"/test-covet-lux/products?page=1",className:"border-btn",children:["Go shopping"," ",e.jsx("ion-icon",{name:"arrow-forward-outline",style:{fontSize:"2rem"}})]})]})}function X({children:t}){return e.jsx("table",{className:n.productContainer,children:e.jsxs("tbody",{children:[e.jsx(m,{minWidth:601,children:e.jsxs("tr",{className:n.tableHeader,children:[e.jsx("th",{children:"PRODUCT"}),e.jsx("th",{}),e.jsx("th",{children:"PRICE"}),e.jsx("th",{children:"AMOUNT"}),e.jsx("th",{children:"TOTAL"}),e.jsx("th",{})]})}),e.jsx(m,{maxWidth:600,minWidth:461,children:e.jsxs("tr",{className:n.tableHeader,children:[e.jsx("th",{children:"PRODUCT"}),e.jsx("th",{}),e.jsx("th",{children:"TOTAL"}),e.jsx("th",{})]})}),e.jsx(m,{maxWidth:460,children:e.jsxs("tr",{className:n.tableHeader,children:[e.jsx("th",{children:"PRODUCT"}),e.jsx("th",{}),e.jsx("th",{children:"TOTAL"})]})}),t]})})}function Y({index:t,productList:s,updateAmount:a,handleDelete:l}){var r;return e.jsx(e.Fragment,{children:s[t]&&e.jsxs("tr",{className:n.productRow,children:[e.jsx("td",{children:e.jsx(g,{alt:s[t].title,elClass:n.img,imgSrc:s[t].images[0]})}),e.jsx("td",{children:e.jsx(d,{className:n.productTitle,to:`/test-covet-lux/product?product_id=${s[t].id}`,children:s[t].title})}),e.jsx("td",{className:n.money,children:e.jsxs("p",{children:["$",s[t].price]})}),e.jsx("td",{children:e.jsx(f,{callback:a,productList:s,index:t,amount:(r=s[t])==null?void 0:r.amount,setAmount:()=>{},id:`product-${s[t].id}`})}),e.jsx("td",{className:`${n.money} orange-text`,children:e.jsxs("p",{children:["$",s[t].amount*s[t].price]})}),e.jsx("td",{className:n.delete,children:e.jsx("button",{className:"tx-hover--orange",onClick:()=>l(),children:e.jsx("ion-icon",{name:"close-outline",style:{fontSize:"2.5rem"}})})})]})})}function J({index:t,productList:s,updateAmount:a,handleDelete:l}){var r;return e.jsx(e.Fragment,{children:s[t]&&e.jsxs("tr",{className:n.productRow,children:[e.jsx("td",{className:n.imgContainer,children:e.jsx(g,{alt:s[t].title,elClass:n.img,imgSrc:s[t].images[0]})}),e.jsxs("td",{children:[e.jsx(d,{className:n.productTitle,to:`/test-covet-lux/product?product_id=${s[t].id}`,children:s[t].title}),e.jsxs("p",{className:n.money,children:["$",s[t].price]}),e.jsx(f,{callback:a,productList:s,index:t,amount:(r=s[t])==null?void 0:r.amount,setAmount:()=>{},id:`product-${s[t].id}`})]}),e.jsx("td",{className:`${n.money} orange-text`,children:e.jsxs("p",{children:["$",s[t].amount*s[t].price]})}),e.jsx("td",{className:n.delete,children:e.jsx("button",{className:"tx-hover--orange",onClick:()=>l(),children:e.jsx("ion-icon",{name:"close-outline",style:{fontSize:"2.5rem"}})})})]})})}function K({index:t,productList:s,updateAmount:a,handleDelete:l}){var r;return e.jsx(e.Fragment,{children:s[t]&&e.jsxs("tr",{className:n.productRow,children:[e.jsx("td",{className:n.imgContainer,children:e.jsx(g,{alt:s[t].title,elClass:n.img,imgSrc:s[t].images[0]})}),e.jsxs("td",{children:[e.jsx(d,{className:n.productTitle,to:`/test-covet-lux/product?product_id=${s[t].id}`,children:s[t].title}),e.jsxs("p",{className:n.money,children:["$",s[t].price]})]}),e.jsxs("td",{className:`${n.money} orange-text`,children:[e.jsxs("p",{children:["$",s[t].amount*s[t].price]}),e.jsx(f,{callback:a,productList:s,index:t,amount:(r=s[t])==null?void 0:r.amount,setAmount:()=>{},id:`product-${s[t].id}`}),e.jsxs("div",{className:n.delete,onClick:()=>l(),children:[e.jsx(m,{minWidth:460,children:e.jsx("button",{className:"tx-hover--orange",children:e.jsx("ion-icon",{name:"close-outline",style:{fontSize:"2.5rem"}})})}),e.jsx(m,{maxWidth:460,children:e.jsx("button",{className:"link",children:"Remove"})})]})]})]})})}function V({index:t,productList:s,setProductList:a}){const l=y();function r(i,j,x){let u=[...x];u[j].amount=i,a(u),l(N({id:x[j].id,amount:i}))}function o(){let i=[...s];i.splice(t,1),a(i),l(T({id:s[t].id}))}return e.jsxs(e.Fragment,{children:[e.jsx(m,{minWidth:601,children:e.jsx(Y,{index:t,productList:s,updateAmount:r,handleDelete:o})}),e.jsx(m,{maxWidth:600,minWidth:461,children:e.jsx(J,{index:t,productList:s,updateAmount:r,handleDelete:o})}),e.jsx(m,{maxWidth:460,children:e.jsx(K,{index:t,productList:s,updateAmount:r,handleDelete:o})})]})}function Z({children:t}){return e.jsxs("table",{className:`${n.productContainer} ${n.totalTable}`,children:[e.jsxs("tr",{className:n.tableHeader,children:[e.jsx("th",{children:"TOTAL"}),e.jsx("th",{})]}),t]})}function L(){return e.jsx(e.Fragment,{children:e.jsx(d,{to:"/test-covet-lux/checkout",className:`fill-btn ${n.checkoutBtn}`,children:"Checkout"})})}function ee({totalCost:t,setTotalMoney:s,totalMoney:a}){const l=t>=100?0:10,r=l>0?`($${100-t} more to get free shipment)`:"";return _.useEffect(function(){s(t+l)},[s,l,t]),e.jsxs(e.Fragment,{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"Sub-total"}),e.jsxs("td",{children:["$",t]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Shipping fee"}),e.jsxs("td",{children:["$",l," ",e.jsx("p",{className:"gray-text",style:{fontSize:"1.4rem"},children:r})]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Total"}),e.jsxs("td",{className:n.total,children:["$",a]})]})]})}function ie(){const t=b(c=>c.cart).productArray,s=t==null?void 0:t.map(c=>c.id),{dataResponse:a,isError:l,isLoading:r}=q("products",s),[o,i]=_.useState([]);_.useEffect(()=>{if(a&&a.length>0){const c=a==null?void 0:a.map((h,C)=>({...h,amount:t[C].amount}));i(c)}},[a]);const j=o.reduce((c,h)=>c+=h.amount*h.price,0),[x,u]=_.useState(0);return e.jsxs(e.Fragment,{children:[e.jsx(p,{distance:1}),e.jsx(k,{isError:l,isLoading:r,isEmptyList:o.length===0,emptyMess:e.jsx(G,{}),children:e.jsxs($,{gap:2,elClass:n.cartContainer,children:[e.jsx(X,{children:o!==null&&e.jsx(e.Fragment,{children:o.map((c,h)=>e.jsx(V,{setProductList:i,index:h,product:c,productList:o},`product-${c.id}`))})}),e.jsxs("div",{className:n.totalContainer,children:[e.jsx(Z,{children:e.jsx(ee,{totalMoney:x,setTotalMoney:u,totalCost:j})}),e.jsx(L,{})]})]})}),e.jsx(p,{distance:3})]})}export{ie as default};
