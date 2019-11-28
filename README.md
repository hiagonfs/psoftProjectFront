# psoftProjectFront
Repositório com o Front-End do projeto da disciplina Projeto de Software.

# Requisitos

Os requisitos aqui implementados foram especificados [neste documento](https://docs.google.com/document/d/1h5WhnOhvyRmIbj_obhWK5XmoJgK35lVWPM2UwwMOT_Y/preview)

# Dependências
```
Nenhuma dependência é necessária para executar o projeto.
```

## Deploy
O link para deploy da aplicação (apenas Backend) está no link: https://psoft-ajude.herokuapp.com/
O link para deploy da aplicação (Backend + Frontend) está no link: http://ajude.netlify.com/

## Vídeo demonstrativo
Segue link para vídeo demonstrativo da aplicação:https://youtu.be/-qGLa6BqiAs

## Quer testar a aplicação?
Aqui está um usuário de teste para você ;)
###### E-mail: joaoDaSilva_ajude@gmail.com
###### Senha: 123654

## Um pouco sobre o desenvolvimento

Foi utilizado Single-page application, em que é usado a reescrita da 'page' atual, de forma dinâmica.

Para mais informações sobre Single-Page: https://www.devmedia.com.br/ja-ouviu-falar-em-single-page-applications/39009

A aplicação foi dividida em 3 arquivos: index.html, app.js, style.css que realizam a comunição de interface da aplicação, buscando as informações no Backend e exibindo ao usuário. 

## Tratamento de erros e Código de Status

Os erros são tratados devidamente no backend, com código de status.
Para entradas anômalas as que são esperadas, requisições mal formuladas e eventos inesperados. O código trata o erro com diferentes formas, seja ele de falta de permissão, dados não encontrados no banco, tokens inválidos ou expirados. Cada exception lançada possui um status code associado, você pode verificar uma lista dos status utilizados no projeto aqui: https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status
