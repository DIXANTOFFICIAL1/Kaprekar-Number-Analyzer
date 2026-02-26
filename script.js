const input=document.getElementById("inputNumber");
const output=document.getElementById("output");
const stepsDiv=document.getElementById("steps");
const history=document.getElementById("history");
const themeBtn=document.getElementById("themeBtn");

themeBtn.onclick=()=>{
document.body.classList.toggle("dark");
themeBtn.textContent=
document.body.classList.contains("dark")?"☀":"🌙";
}

function analyze(){
let K=parseInt(input.value);
output.innerHTML="";
stepsDiv.innerHTML="";

if(isNaN(K)||K<=0){
output.innerHTML="<p class='error'>Enter valid positive number</p>";
return;
}

let N=K*K;
let s=N.toString();
let mid=Math.floor(s.length/2);
let LP=parseInt(s.slice(0,mid))||0;
let RP=parseInt(s.slice(mid))||0;

if(LP+RP===K){
output.innerHTML=`<p class="success">${K} is Kaprekar Number</p>`;
}else{
output.innerHTML=`<p class="error">${K} is NOT Kaprekar Number</p>`;
}

runSequence(K);
addHistory(K);
}

function runSequence(num){
let seen=new Set();
while(!seen.has(num)){
seen.add(num);
  
let s=num.toString().padStart(4,"0");
let asc=s.split("").sort().join("");
let desc=asc.split("").reverse().join("");
let res=parseInt(desc)-parseInt(asc);
stepsDiv.innerHTML+=
`<div>${desc} - ${asc} = ${res}</div>`;
num=res;
}
}

function addHistory(n){
let li=document.createElement("li");
li.textContent=n;
history.prepend(li);
}

function clearAll(){
input.value="";
output.innerHTML="";
stepsDiv.innerHTML="";
history.innerHTML="";
}

function exportHistory(){
let data=[...history.children]
.map(li=>li.textContent)
.join("\n");

let blob=new Blob([data],
{type:"text/plain"});
let a=document.createElement("a");
a.href=URL.createObjectURL(blob);
a.download="kaprekar-history.txt";
a.click();
}
