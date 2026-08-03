const formulario = document.getElementById("registerForm");

formulario.addEventListener("submit", function (e) {

    e.preventDefault();

    const empresa = document.getElementById("empresa").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;
    const termos = document.getElementById("termos").checked;

    if (senha !== confirmarSenha) {

        alert("As senhas não coincidem!");

        return;
    }

    if (!termos) {

        alert("Você precisa aceitar os Termos de Uso.");

        return;
    }

    alert(`
Conta criada com sucesso!

Empresa: ${empresa}
E-mail: ${email}
Telefone: ${telefone}
`);

    // Exemplo para integração futura
    /*
    fetch("https://sua-api.com/usuarios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            empresa,
            email,
            telefone,
            senha
        })
    });
    */

    formulario.reset();

});
document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    document.body.classList.add("fade-out");

    setTimeout(() => {
        window.location.href = "login.html";
    }, 600);
});