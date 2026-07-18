export default function Grid(){

return(

<div
style={{
position:"fixed",
inset:0,
pointerEvents:"none",
opacity:.18,
backgroundImage:
`
linear-gradient(#393939 1px,transparent 1px),
linear-gradient(90deg,#393939 1px,transparent 1px)
`,
backgroundSize:"32px 32px"
}}
/>

);

}
