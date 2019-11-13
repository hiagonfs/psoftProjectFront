let URL = 'http://localhost:8080/campanha';
let $botaoCadastrar = document.querySelector("#criar");
$botaoCadastrar.addEventListener('click', cadastrar_campanha);

function cadastrar_campanha() {

  let nome = document.querySelector("#nome").value;
  let descricao = document.querySelector("#descricao").value;
  let deadline = document.querySelector("#deadline").value;
  let metaArrecadacao = document.querySelector("#metaArrecadacao").value;

  fetch(URL, {
    'method': 'POST',
    'body': `{"nome": "${nome}", 
              "descricao": "${descicao}", 
              "deadline": "${deadline}"},
              "meta": "${meta}"}`,
              
    'headers': {'Content-Type': 'application/json'}
  })
  .then(r => r.json()) 
  .then(u => {
      
      console.log('Pronto! Campanha criada com sucesso!');
      
  });
}
