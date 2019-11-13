let URL = 'http://localhost:8080/usuario';
let $botaoCadastrar = document.querySelector("#criar");
$botaoCadastrar.addEventListener('click', cadastrar_usuario);

function cadastrar_usuario() {
  let nome = document.querySelector("#nome").value;
  let sobrenome = document.querySelector("#sobrenome").value;
  let email = document.querySelector("#email").value;
  let numCartaoCredito = document.querySelector("#numCartaoCredito").value;
  let senha = document.querySelector("#senha").value;
  fetch(URL, {
    'method': 'POST',
    'body': `{"nome": "${nome}", "sobrenome": "${sobrenome}",
              "email": "${email}", "numCartaoCredito": "${numCartaoCredito}",
              "senha": "${senha}"}`,
    'headers': {'Content-Type': 'application/json'}
  })
  .then(r => r.json())
  .then(u => {
      console.log('Pronto! Usuario criado com sucesso!');
      roteiaPaginaAleatoria(); 
  });
}

function roteiaPaginaAleatoria() {

  window.location.replace("http://localhost:8080/home");

}
