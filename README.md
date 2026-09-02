# Vitrine de Brechó de Livros

Uma página leve, rápida e sem dependências para você exibir seus livros usados e vendê-los diretamente pelo WhatsApp.

## 🚀 Como usar

A página já está pronta para uso imediato. Como ela não requer servidores complexos ou bancos de dados, para vê-la rodando no seu computador, basta **dar um duplo clique no arquivo `index.html`** e ela abrirá no seu navegador.

## 📚 Como adicionar ou editar livros

Toda a sua lista de livros vive em **um único arquivo**: o `data.js`. Abra-o em qualquer bloco de notas ou editor de código.

### 1. Livro Avulso
Procure a lista `ACERVO = [ ... ]` e adicione um novo bloco no formato abaixo:

```javascript
{
  id: "nome-do-livro",
  tipo: "livro",
  titulo: "O Nome do Livro",
  autor: "Nome do Autor",
  editora: "Nome da Editora", // Opcional
  ano: 2023, // Opcional
  paginas: 300, // Opcional
  preco: 45.00, // Número, sem R$, use ponto para centavos
  estado: "bom", // Veja valores válidos abaixo
  vendido: false, // Mude para true quando vender
  imagem: "img/nome-do-livro.jpg",
  descricao: "Breve descrição do estado físico do livro.",
  tags: ["romance", "ficção"] // Opcional
}
