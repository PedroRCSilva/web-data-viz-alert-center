// Função para fazer a validação do e-mail
function analisar_email() {
  var email = in_email.value;
  var emailCorreto = email.indexOf("@" && ".") >= 0;
  if (!emailCorreto) {
    msg_email.innerHTML = `Insira seu email neste formato: <strong style="color:red;">nome@exemplo.com!</strong>`;
    return false;
  } else {
    msg_email.innerHTML = ``;
    return true;
  }
}

// Função para fazer a validação do senha
function analisar_senha() {
  var senha = in_senha.value;
  // A expressão utilizada abaixo, serve para validar a string, a qual deve conter no mínimo 1 número, 1 letra minúscula, 1 letra maiúscula, 1 caracter especial, além de conter no mínimo 9 caracteres e no máximo 20
  // A função ".match()" serve para pesquisar na string a expressão supracitada
  var senhaCaracteres =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{9,20}$/;
  var senhaCorreta = senha.match(senhaCaracteres);

  if (!senhaCorreta) {
    msg_senha.innerHTML = `A senha deve conter mais de 8 caracteres, contendo <strong>números</strong>, <strong>caracteres especiais</strong>, <strong>letras maiúsculas</strong> e <strong>minúsculas</strong>.`;
    return false;
  } else {
    msg_senha.innerHTML = ``;
    return true;
  }
}

function entrar() {
  var aviso = document.querySelector(".sucess");
  var emailVar = in_email.value;
  var senhaVar = in_senha.value;

  console.log("FORM LOGIN: ", emailVar);
  console.log("FORM SENHA: ", senhaVar);

  fetch("/usuarios/autenticar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      emailServer: emailVar,
      senhaServer: senhaVar,
    }),
  })
    .then(function (resposta) {
      console.log("ESTOU NO THEN DO entrar()!");

      if (resposta.ok) {
        console.log(resposta);
        resposta.json().then((json) => {
          console.log(json);
          console.log(JSON.stringify(json));
          sessionStorage.EMAIL_USUARIO = json.email;
          sessionStorage.NOME_USUARIO = json.nome;
          sessionStorage.ID_USUARIO = json.id;
          aviso.style.zIndex = "999";
          setTimeout(() => {
            aviso.style.opacity = "1";
          }, 400);

          setTimeout(function () {
            window.location = "dashboard-geral.html";
          }, 5000);
          // apenas para exibir o loading
        });
      } else {
        resposta.text().then((texto) => {
          console.error(texto);
          alert(texto);
        });
      }
    })
    .catch(function (erro) {
      console.log(erro);
    });

  return false;
}


