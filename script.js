const form = document.getElementById('formulario-contato'); // Seleciona o formulário pelo ID

form.addEventListener('submit', (event) => { // Adiciona um ouvinte de eventos para o evento 'submit'
  event.preventDefault(); // Impede o comportamento padrão do envio do formulário

  const formData = new FormData(form); // Cria um objeto FormData a partir dos dados do formulário
  const data = Object.fromEntries(formData.entries()); // Converte o FormData em um objeto JavaScript

  fetch(form.action, { // Envia uma requisição fetch para o script Google Apps Script
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) // Envia os dados no formato JSON
  })
  .then(response => response.json()) // Converte a resposta do servidor para JSON
  .then(data => {
    if (data.status === 'success') { // Verifica se a requisição foi bem-sucedida
      alert('Dados enviados com sucesso!');
      form.reset(); // Limpa o formulário
    } else {
      alert('Ocorreu um erro ao enviar os dados: ' + data.message);
    }
  })
  .catch(error => {
    console.error('Erro ao enviar os dados:', error);
    alert('Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.');
  });
});