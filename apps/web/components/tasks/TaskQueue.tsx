const tasks=[
{
id:"TASK-001",
title:"Analyze Repository",
status:"READY"
},
{
id:"TASK-002",
title:"Generate Plan",
status:"WAITING"
},
{
id:"TASK-003",
title:"Run Sandbox",
status:"PENDING"
},
{
id:"TASK-004",
title:"Create Pull Request",
status:"PENDING"
}
];

export default function TaskQueue(){

return(

<div>

{tasks.map(task=>(

<div
key={task.id}
style={{
borderBottom:"1px solid #393939",
padding:"12px 0"
}}
>

<div
style={{
fontFamily:"IBM Plex Mono",
fontSize:11,
color:"#8D8D8D"
}}
>
{task.id}
</div>

<div
style={{
marginTop:4,
fontWeight:600
}}
>
{task.title}
</div>

<div
style={{
marginTop:6,
fontFamily:"IBM Plex Mono",
fontSize:12,
color:"#24A148"
}}
>
{task.status}
</div>

</div>

))}

</div>

);

}
