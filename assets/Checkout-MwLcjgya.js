import{j as e,r as f,L as _,f as b,b as w,g as I,h as $,i as T}from"./index-DJfziI53.js";import{u as L}from"./useGetDataList-CyWpu0rj.js";import{F as g}from"./FlexContainer-7pYeUEBP.js";import{R as B}from"./RenderQueryData-MXl8oXhH.js";import{L as m}from"./ListHeader-SQQnyuqh.js";import{B as D}from"./Divider-Cr1DzigY.js";import{T as C,c as k}from"./index.esm-BQoPtOZZ.js";import{L as E,u as q}from"./useGetLocal-XPN0whis.js";import{E as M,b as N,F as O,a as S}from"./formik.esm-C_ghLgU5.js";import{I as R}from"./Img-DznJS-u6.js";import{n as y,p as V,t as d,a as A,c as Y,e as G,v as U}from"./Validate-y5izOD3P.js";import"./GridContainer-7fmX5WB_.js";const W="_header_135cc_2",H="_table_135cc_7",J="_leftCol_135cc_13",Q="_inforForm_135cc_18",X="_paymentLabel_135cc_23",z="_noteTxt_135cc_28",K="_product_135cc_34",Z="_productImg_135cc_38",ee="_productInfor_135cc_42",te="_productTxt_135cc_46",se="_total_135cc_53",re="_buyBtn_135cc_72",ae="_checkoutContainer_135cc_86",ne="_ePayForm_135cc_96",oe="_btnContainer_135cc_110",s={header:W,table:H,leftCol:J,inforForm:Q,paymentLabel:X,noteTxt:z,product:K,productImg:Z,productInfor:ee,productTxt:te,total:se,buyBtn:re,checkoutContainer:ae,ePayForm:ne,btnContainer:oe},ie=[{id:"name",label:"Full name",name:"name"},{id:"phone",label:"Phone",type:"tel",placeholder:"+84 | 0213 456 789",name:"phone"}];function ce(){return e.jsxs("div",{style:{marginBottom:"2rem"},children:[e.jsx("div",{className:"columnContent",style:{marginBottom:"1rem"},children:ie.map((t,r)=>e.jsx(C,{form:"paymentInfor",field:t,isRequired:!0},`infor-${r}`))}),e.jsx(E,{})]})}const de=[{id:"cardCode",label:"Card code",placeholder:"0123 4567 8901 2345",name:"cardCode"},{id:"expiredDate",label:"Expired date",placeholder:"DD/MM/YY",type:"date",name:"expiredDate"},{id:"password",label:"Password",placeholder:"3 character",name:"password",isPassword:!0,type:"password"},{id:"ownerName",label:"Owner name",placeholder:"John Wilson",name:"ownerName"}];function le({setMethod:t}){return e.jsxs("div",{style:{marginBottom:"2rem",paddingBottom:"2rem",borderBottom:"solid 1px var(--gray)"},children:[e.jsx(N,{required:!0,type:"radio",name:"paymentMethod",value:"cod",id:"cod",onClick:()=>t("cod")}),e.jsx("label",{htmlFor:"cod",className:s.paymentLabel,children:"COD"})]})}function me({setMethod:t,currMethod:r}){const[o,u]=f.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{marginBottom:"2rem"},children:[e.jsx(N,{onClick:()=>t("ePayment"),required:!0,type:"radio",name:"paymentMethod",value:"ePayment",id:"ePayment"}),e.jsx("label",{htmlFor:"ePayment",className:s.paymentLabel,children:"Online payment"})]}),r==="ePayment"&&e.jsxs("div",{className:`columnContent ${s.ePayForm}`,children:[de.map((n,p)=>e.jsx(C,{form:"paymentInfor",isEpayment:!0,field:n,isPassword:n.isPassword,isShowPass:o,setShowPass:u},`payment-${p}`)),e.jsx("p",{className:`copyRight ${s.noteTxt}`,children:"We won't store your card infor"})]})]})}function ue(){const[t,r]=f.useState("cod");return e.jsxs("div",{children:[e.jsx(m,{title:"Payment information",className:s.header}),e.jsx(le,{setMethod:r}),e.jsx(me,{currMethod:t,setMethod:r}),e.jsx(M,{name:"paymentMethod",component:"p",className:"text-red-500 text-m mt-1"})]})}function pe({product:t}){return e.jsxs("tr",{className:s.product,children:[e.jsx("td",{children:e.jsxs(g,{margin:0,gap:1,children:[e.jsx(R,{alt:t.title,elClass:`img ${s.productImg}`,imgSrc:t.images[0]}),e.jsxs("div",{className:`columnContent ${s.productTxt}`,style:{width:"60%"},children:[e.jsx(_,{to:`/test-covet-lux/product?product_id=${t.id}`,children:t.title}),e.jsxs("p",{children:["X",t.amount]}),e.jsxs("p",{children:["$",t.price]})]})]})}),e.jsxs("td",{className:s.productTxt,children:["$",t.amount*t.price]})]})}function he({productList:t}){return e.jsxs("table",{className:`${s.table} ${s.productInfor}`,children:[e.jsx("thead",{children:e.jsxs("tr",{style:{textAlign:"left",marginBottom:"2rem"},children:[e.jsx("th",{children:"Product"}),e.jsx("th",{children:"Total"})]})}),e.jsx("tbody",{children:t.map((r,o)=>e.jsx(pe,{product:r},`product-${o}`))})]})}function xe({total:t}){const r=t>=100?0:5;return e.jsx("table",{className:`${s.table} ${s.productTxt} ${s.total}`,children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"Sub-total"}),e.jsxs("td",{children:["$",t]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Shipping fee"}),e.jsxs("td",{children:["$",r]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Total"}),e.jsxs("td",{children:["$",r+t]})]})]})})}const l=t=>t.when("paymentMethod",{is:"ePayment",then:r=>r.required("This field is required"),otherwise:r=>r.notRequired()}),je={name:y.required(),phone:V.required(),city:d.required(),district:d.required(),ward:d.required(),specificAddress:d.required(),paymentMethod:A,cardCode:l(Y),expiredDate:l(G),password:l(U),ownerName:l(y)},ye=k().shape(je);function fe({handleSubmit:t}){const r=b(o=>o.user).user.id!==void 0;return e.jsxs("div",{className:s.btnContainer,children:[e.jsx("button",{onClick:t,type:"submit",form:"paymentInfor",className:`${s.buyBtn} fill-btn`,children:"BUY NOW"}),!r&&e.jsxs("p",{className:`${s.noteTxt} copyRight`,style:{textAlign:"center"},children:[e.jsx(_,{to:"/test-covet-lux/login",className:"link",children:"Login"})," ","to track your order."]})]})}function Le(){const t=b(a=>a.cart).productArray,{dataResponse:r,isLoading:o,isError:u}=L("products",t.map(a=>a.id)),n=q("personal_infor")||{},p={name:n.name||"",phone:n.phone||"",city:n.city||"",district:n.district||"",ward:n.ward||"",specificAddress:n.specificAddress||""},x=w(),c=r.map((a,i)=>({...a,amount:t[i].amount})),h=c.reduce((a,i)=>a+=i.amount*i.price,0),P=I();function v(a,{setSubmitting:i}){const{...F}=a,j=new Date().valueOf();x($({...F,id:j,products:t,status:"placed",goodsTotal:h,deliverFee:h>=100?0:5})),x(T()),P(`/test-covet-lux/buy_success?order_id=${j}`,{replace:!0}),i(!1)}return e.jsxs(e.Fragment,{children:[e.jsx(g,{elClass:s.checkoutContainer,children:e.jsx(O,{initialValues:p,validationSchema:ye,validateOnBlur:!1,validateOnChange:!1,onSubmit:v,children:({handleSubmit:a})=>e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:s.leftCol,children:[e.jsx(m,{title:"Personal information",className:s.header}),e.jsxs(S,{onSubmit:a,id:"paymentInfor",className:`columnContent ${s.inforForm}`,children:[e.jsx(ce,{}),e.jsx(ue,{})]})]}),e.jsxs("div",{style:{flexGrow:"1"},children:[e.jsx(m,{title:"Order information",className:s.header}),e.jsx(B,{isError:u,isLoading:o,isEmptyList:!c||c.length===0,children:e.jsx(he,{productList:c})}),e.jsx(m,{title:"Total detail",className:s.header}),e.jsx(xe,{total:h}),e.jsx(fe,{handleSubmit:a})]})]})})}),e.jsx(D,{})]})}export{Le as default};
