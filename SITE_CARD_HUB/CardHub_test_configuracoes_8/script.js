const modal = document.getElementById("modal");
const conteudo = document.getElementById("conteudoModal");
const titulo = document.getElementById("tituloModal");
 
const salvarModal = document.getElementById("salvarModal");
 
const empresaNome = document.getElementById("empresaNome");
const empresaEmail = document.getElementById("empresaEmail");
 
const toast = document.getElementById("toast");
 
// ==========================
// MENU RESPONSIVO
// ==========================
 
const sidebar = document.querySelector(".sidebar");
const menuBtn = document.getElementById("menuBtn");
const overlay = document.getElementById("overlay");
 
if(menuBtn){
 
menuBtn.onclick = ()=>{
 
sidebar.classList.toggle("show");
overlay.classList.toggle("show");
 
};
 
}
 
if(overlay){
 
overlay.onclick = ()=>{
 
sidebar.classList.remove("show");
overlay.classList.remove("show");
 
};
 
}
 
// ==========================
// TOAST
// ==========================
 
function mostrarToast(msg){
 
toast.innerHTML = msg;
 
toast.classList.add("show");
 
setTimeout(()=>{
 
toast.classList.remove("show");
 
},3000);
 
}
 
// ==========================
// PERFIL
// ==========================
 
document.getElementById("editarPerfil").onclick = ()=>{
 
titulo.innerHTML="Editar Perfil";
 
conteudo.innerHTML=`
 
<label>Nome da empresa</label>
 
<input id="nomeInput" value="${empresaNome.innerHTML}">
 
<label>Email</label>
 
<input id="emailInput" value="${empresaEmail.innerHTML}">
 
`;
 
abrirModal();
 
salvarModal.onclick = ()=>{
 
empresaNome.innerHTML =
document.getElementById("nomeInput").value;
 
empresaEmail.innerHTML =
document.getElementById("emailInput").value;
 
localStorage.setItem("empresa",empresaNome.innerHTML);
 
localStorage.setItem("email",empresaEmail.innerHTML);
 
fecharModal();
 
mostrarToast("Perfil atualizado!");
 
};
 
};
 
// ==========================
// CONTA
// ==========================
 
function abrirConta(){
 
titulo.innerHTML="Dados da Conta";
 
conteudo.innerHTML=`
 
<input placeholder="Nome completo">
 
<input placeholder="Telefone">
 
<input placeholder="CNPJ">
 
`;
 
abrirModal();
 
salvarModal.onclick=()=>{
 
mostrarToast("Dados da conta atualizados!");
 
fecharModal();
 
};
 
}
 
// ==========================
// SENHA
// ==========================
 
function abrirSenha(){
 
titulo.innerHTML="Alterar Senha";
 
conteudo.innerHTML=`
 
<input id="senha1" type="password" placeholder="Senha atual">
 
<input id="senha2" type="password" placeholder="Nova senha">
 
<input id="senha3" type="password" placeholder="Confirmar senha">
 
`;
 
abrirModal();
 
salvarModal.onclick=()=>{
 
const s2=document.getElementById("senha2").value;
const s3=document.getElementById("senha3").value;
 
if(s2!==s3){
 
mostrarToast("As senhas não coincidem!");
 
return;
 
}
 
mostrarToast("Senha alterada com sucesso!");
 
fecharModal();
 
};
 
}
 
// ==========================
// PREFERÊNCIAS
// ==========================
 
function abrirPreferencias(){
 
titulo.innerHTML="Preferências";
 
conteudo.innerHTML=`
 
<label>Idioma</label>
 
<select id="idioma">
 
<option>Português</option>
 
<option>English</option>
 
</select>
 
<label>Tema</label>
 
<select id="tema">
 
<option>Escuro</option>
 
<option>Claro</option>
 
</select>
 
`;
 
abrirModal();
 
salvarModal.onclick=()=>{
 
localStorage.setItem("idioma",
document.getElementById("idioma").value);
 
localStorage.setItem("tema",
document.getElementById("tema").value);
 
mostrarToast("Preferências salvas!");
 
fecharModal();
 
};
 
}
 
// ==========================
// MODAL
// ==========================
 
function abrirModal(){
 
modal.style.display="flex";
 
}
 
function fecharModal(){
 
modal.style.display="none";
 
}
 
window.onclick=(e)=>{
 
if(e.target===modal){
 
fecharModal();
 
}
 
};
 
// ==========================
// NOTIFICAÇÕES
// ==========================
 
const notificacao=document.getElementById("notificacao");
 
notificacao.addEventListener("change",()=>{
 
if(notificacao.checked){
 
mostrarToast("Notificações ativadas");
 
}else{
 
mostrarToast("Notificações desativadas");
 
}
 
localStorage.setItem("notificacao",notificacao.checked);
 
});
 
// ==========================
// PLANO
// ==========================
 
const plano=document.getElementById("gerenciarPlano");
 
if(plano){
 
plano.onclick=()=>{
 
mostrarToast("Em breve você poderá alterar seu plano.");
 
};
 
}
 
// ==========================
// CARREGAR DADOS
// ==========================
 
window.onload=()=>{
 
const nome=localStorage.getItem("empresa");
const email=localStorage.getItem("email");
const notif=localStorage.getItem("notificacao");
 
if(nome){
 
empresaNome.innerHTML=nome;
 
}
 
if(email){
 
empresaEmail.innerHTML=email;
 
}
 
if(notif!==null){
 
notificacao.checked = notif==="true";
 
}
 
};