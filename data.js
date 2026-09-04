/**
 * ============================================================================
 * CONFIGURAÇÕES DO BRECHÓ E ACERVO DE LIVROS
 * ============================================================================
 * COMO ADICIONAR UM LIVRO AVULSO:
 * Copie um bloco de { tipo: "livro", ... } dentro da lista ACERVO e altere os dados.
 *
 * COMO ADICIONAR UM BOX:
 * Copie um bloco de { tipo: "box", ... } dentro da lista ACERVO e altere os dados.
 * Se "vendeAvulso" for true, preencha os preços individuais em cada item da lista "itens".
 *
 * VALORES DE ESTADO (exatamente como escritos abaixo, em minúsculas):
 * - "desgastado" : Marcas claras de uso, capa amassada, grifos.
 * - "bom"        : Bem conservado, pequenos sinais de manuseio.
 * - "excelente"  : Praticamente como novo.
 *
 * FOTOS:
 * Coloque as fotos na pasta "img/".
 * O nome do arquivo deve ser exatamente o que está preenchido no campo "imagem".
 * Recomendação: use imagens na proporção 3:4 (ex: 600x800 pixels).
 *
 * RECÉM-CHEGADOS (campo opcional "adicionadoEm"):
 * Escreva a data de entrada no formato "ano-mes-dia", ex: adicionadoEm: "2026-09-20".
 * Isso habilita a ordenação "Recém-chegados" e faz o selo NOVO aparecer no card
 * por 21 dias. Livros sem esse campo funcionam normal, só nunca ganham o selo.
 *
 * VENDIDOS:
 * Mude "vendido: false" para "vendido: true" quando o item for vendido.
 *
 * ----------------------------------------------------------------------------
 * ACERVO IMPORTADO DA CONVERSA DO WHATSAPP EM 02/09/2026.
 * Título, estado e preço vieram das legendas. Autor e editora foram lidos das
 * capas nas fotos. As descrições descrevem o que aparece na foto — sinta-se
 * livre para reescrever qualquer uma.
 * ----------------------------------------------------------------------------
 */
const CONFIG = {
  nomeDaVitrine: "Brechó de Livros",
  subtitulo: "Livros usados, com carinho, a preço de amigo",
  telefoneWhatsApp: "5568992317997",
  mensagemLivro: "Olá, tenho interesse no livro {titulo}",
  mensagemBox: "Olá, tenho interesse no box {titulo}",
  mensagemGeral: "Olá, vi sua vitrine de livros e queria saber mais",
  avisoRodape: "Combinamos entrega ou envio pelo WhatsApp."
};
const ESTADOS = {
  "desgastado": { rotulo: "Desgastado", cor: "#F87171", descricao: "Tem marcas claras de uso: capa amassada ou riscada, bordas amareladas, possíveis dobras, anotações ou grifos. Íntegro e totalmente legível." },
  "bom": { rotulo: "Bom", cor: "#FBBF24", descricao: "Usado, porém bem conservado: pequenos sinais de manuseio, sem páginas soltas, rasgos ou anotações relevantes." },
  "excelente": { rotulo: "Excelente", cor: "#34D399", descricao: "Praticamente como novo: sem marcas relevantes, parece pouco ou nunca lido." }
};
const ACERVO = [
  {
    id: "box-crepusculo",
    tipo: "box",
    titulo: "Box Crepúsculo — Saga Completa",
    autor: "Stephenie Meyer",
    editora: "Intrínseca",

    precoConjunto: 85.00,
    estado: "bom",
    vendido: true,
    imagem: "img/box-crepusculo.jpg",
    descricao: "Os 4 volumes da saga, edição Intrínseca. Capas com marcas de manuseio e leve desgaste nas quinas; miolo íntegro.",
    vendeAvulso: false,
    tags: ["saga", "vampiros", "romance", "young adult"],
    itens: [
      { titulo: "1 — Crepúsculo", estado: "bom", vendido: false, imagem: "img/box-crepusculo-1.jpg" },
      { titulo: "2 — Lua Nova", estado: "bom", vendido: false, imagem: "img/box-crepusculo-2.jpg" },
      { titulo: "3 — Eclipse", estado: "bom", vendido: false, imagem: "img/box-crepusculo-3.jpg" },
      { titulo: "4 — Amanhecer", estado: "bom", vendido: false, imagem: "img/box-crepusculo-4.jpg" }
    ]
  },
  {
    id: "box-divina-comedia",
    tipo: "box",
    titulo: "Box A Divina Comédia de Dante",
    autor: "Dante Alighieri",
    editora: "Principis",
    precoConjunto: 50.00,
    estado: "excelente",
    vendido: true,
    adicionadoEm: "2026-09-04",
    imagem: "img/box-divina-comedia.jpg",
    descricao: "Os três volumes na luva original da Principis, tradução de José Pedro Xavier Pinheiro. Capas em ótimo estado; a luva tem uma marca pequena na lateral.",
    vendeAvulso: false,
    tags: ["clássico", "poesia", "literatura italiana"],
    itens: [
      { titulo: "1 — Inferno", estado: "excelente", vendido: false, imagem: "img/box-divina-comedia-1.jpg" },
      { titulo: "2 — Purgatório", estado: "excelente", vendido: false, imagem: "img/box-divina-comedia-2.jpg" },
      { titulo: "3 — Paraíso", estado: "excelente", vendido: false, imagem: "img/box-divina-comedia-3.jpg" }
    ]
  },
  {
    id: "um-homem-de-sorte",
    tipo: "livro",
    titulo: "Um Homem de Sorte",
    autor: "Nicholas Sparks",
    editora: "Novo Conceito",
    preco: 20.00,
    estado: "desgastado",
    vendido: false,
    adicionadoEm: "2026-09-04",
    imagem: "img/um-homem-de-sorte.jpg",
    descricao: "Capa clara bem amarelada nas bordas e com marcas visíveis de manuseio. Miolo íntegro.",
    tags: ["romance", "drama"]
  },
  {
    id: "um-porto-seguro",
    tipo: "livro",
    titulo: "Um Porto Seguro",
    autor: "Nicholas Sparks",
    editora: "Novo Conceito",
    preco: 20.00,
    estado: "bom",
    vendido: false,
    adicionadoEm: "2026-09-04",
    imagem: "img/um-porto-seguro.jpg",
    descricao: "Edição com a capa do filme. Leves marcas de uso nas bordas.",
    tags: ["romance", "drama"]
  },
  {
    id: "o-sol-e-para-todos",
    tipo: "livro",
    titulo: "O Sol é para Todos",
    autor: "Harper Lee",
    editora: "José Olympio",
    preco: 25.00,
    estado: "bom",
    vendido: false,
    adicionadoEm: "2026-09-04",
    imagem: "img/o-sol-e-para-todos.jpg",
    descricao: "Prêmio Pulitzer de literatura. Capa laranja com pequenos pontos de desgaste nas quinas.",
    tags: ["clássico", "drama", "vestibular"]
  },
  {
    id: "quando-fui-morto-em-cuba",
    tipo: "livro",
    titulo: "Quando Fui Morto em Cuba",
    autor: "Roberto Drummond",
    editora: "Ática",
    preco: 10.00,
    estado: "bom",
    vendido: false,
    adicionadoEm: "2026-09-04",
    imagem: "img/quando-fui-morto-em-cuba.jpg",
    descricao: "2ª edição. Capa dourada com o amarelado natural da idade da edição.",
    tags: ["literatura brasileira", "contos"]
  },
  {
    id: "auto-da-compadecida",
    tipo: "livro",
    titulo: "Auto da Compadecida",
    autor: "Ariano Suassuna",
    editora: "Nova Fronteira",
    preco: 15.00,
    estado: "excelente",
    vendido: false,
    adicionadoEm: "2026-09-04",
    imagem: "img/auto-da-compadecida.jpg",
    descricao: "Capa branca bem conservada, sem dobras na lombada.",
    tags: ["clássico", "teatro", "literatura brasileira", "vestibular"]
  },
  {
    id: "o-peso-do-silencio",
    tipo: "livro",
    titulo: "O Peso do Silêncio",
    autor: "Heather Gudenkauf",
    editora: "Harlequin",
    preco: 15.00,
    estado: "excelente",
    vendido: false,
    adicionadoEm: "2026-09-04",
    imagem: "img/o-peso-do-silencio.jpg",
    descricao: "Exemplar praticamente sem marcas.",
    tags: ["romance", "suspense"]
  },
  {
    id: "suas-verdades",
    tipo: "livro",
    titulo: "Suas Verdades — O Tempo Não Apaga",
    autor: "Américo Simões",
    editora: "Barbara",
    preco: 15.00,
    estado: "bom",
    vendido: false,
    adicionadoEm: "2026-09-04",
    imagem: "img/suas-verdades.jpg",
    descricao: "Capa com leve amarelado nas bordas. Leitura perfeitamente íntegra.",
    tags: ["romance", "drama"]
  },
  {
    id: "diarios-do-vampiro-a-furia",
    tipo: "livro",
    titulo: "Diários do Vampiro: A Fúria",
    autor: "L. J. Smith",
    editora: "Galera",
    preco: 15.00,
    estado: "excelente",
    vendido: false,
    adicionadoEm: "2026-09-04",
    imagem: "img/diarios-do-vampiro-a-furia.jpg",
    descricao: "Livro 3 da série que deu origem a Vampire Diaries. Bem conservado.",
    tags: ["vampiros", "young adult", "fantasia"]
  },
  {
    id: "as-veias-abertas-da-america-latina",
    tipo: "livro",
    titulo: "As Veias Abertas da América Latina",
    autor: "Eduardo Galeano",
    editora: "Paz e Terra",
    preco: 20.00,
    estado: "bom",
    vendido: false,
    adicionadoEm: "2026-09-04",
    imagem: "img/as-veias-abertas-da-america-latina.jpg",
    descricao: "Edição com prefácio de Isabel Allende. Capa clara com marcas de manuseio.",
    tags: ["história", "política", "ensaio"]
  },
  {
    id: "quincas-borba",
    tipo: "livro",
    titulo: "Quincas Borba",
    autor: "Machado de Assis",
    editora: "Maralto",
    preco: 20.00,
    estado: "excelente",
    vendido: false,
    adicionadoEm: "2026-09-04",
    imagem: "img/quincas-borba.jpg",
    descricao: "Edição com posfácio de Joselia Aguiar. Praticamente novo.",
    tags: ["clássico", "literatura brasileira", "vestibular"]
  },
  {
    id: "diarios-do-vampiro-o-confronto",
    tipo: "livro",
    titulo: "Diários do Vampiro: O Confronto",
    autor: "L. J. Smith",
    editora: "Galera",
    preco: 15.00,
    estado: "bom",
    vendido: false,
    adicionadoEm: "2026-09-04",
    imagem: "img/diarios-do-vampiro-o-confronto.jpg",
    descricao: "Livro 2 da série. Capa com riscos leves no brilho.",
    tags: ["vampiros", "young adult", "fantasia"]
  },
  {
    id: "a-mao-esquerda-de-deus",
    tipo: "livro",
    titulo: "A Mão Esquerda de Deus",
    autor: "Paul Hoffman",
    editora: "Suma de Letras",
    preco: 20.00,
    estado: "bom",
    vendido: false,
    adicionadoEm: "2026-09-04",
    imagem: "img/a-mao-esquerda-de-deus.jpg",
    descricao: "Bordas da capa com leve desgaste de leitura.",
    tags: ["fantasia", "aventura"]
  },
  {
    id: "a-escolha",
    tipo: "livro",
    titulo: "A Escolha",
    autor: "Nicholas Sparks",
    editora: "Novo Conceito",
    preco: 15.00,
    estado: "bom",
    vendido: false,
    adicionadoEm: "2026-09-04",
    imagem: "img/a-escolha.jpg",
    descricao: "Pequenas marcas de manuseio na capa, lombada firme.",
    tags: ["romance", "drama"]
  },
  {
    id: "o-recurso",
    tipo: "livro",
    titulo: "O Recurso",
    autor: "John Grisham",
    editora: "Rocco",
    preco: 15.00,
    estado: "bom",
    vendido: false,
    adicionadoEm: "2026-09-04",
    imagem: "img/o-recurso.jpg",
    descricao: "Capa dura preta com título em dourado. Leves marcas de uso nas quinas.",
    tags: ["suspense", "thriller", "capa dura"]
  },
  {
    id: "o-medico-e-o-monstro",
    tipo: "livro",
    titulo: "O Médico e o Monstro",
    autor: "Robert Louis Stevenson",
    preco: 15.00,
    estado: "excelente",
    vendido: true,
    imagem: "img/o-medico-e-o-monstro.jpg",
    descricao: "Edição em capa dura, com acabamento metalizado no título. Praticamente sem marcas.",
    tags: ["clássico", "terror", "capa dura"]
  },
  {
    id: "a-arte-muda-da-fuga",
    tipo: "livro",
    titulo: "A Arte Muda da Fuga",
    autor: "Carlos Dala Stella",
    editora: "Positivo",
    preco: 15.00,
    estado: "excelente",
    vendido: false,
    imagem: "img/a-arte-muda-da-fuga.jpg",
    descricao: "Capa dura preta com recortes em relevo. Muito bem conservado.",
    tags: ["arte", "capa dura"]
  },
  {
    id: "god-of-war-2",
    tipo: "livro",
    titulo: "God of War II",
    autor: "Robert E. Vardeman",
    editora: "LeYa",
    preco: 20.00,
    estado: "bom",
    vendido: false,
    imagem: "img/god-of-war-2.jpg",
    descricao: "A história oficial que deu origem ao jogo. Capa com brilho preservado, leves marcas de manuseio.",
    tags: ["fantasia", "games", "aventura"]
  },
  {
    id: "a-revolucao-dos-bichos",
    tipo: "livro",
    titulo: "A Revolução dos Bichos",
    autor: "George Orwell",
    editora: "Principis",
    preco: 15.00,
    estado: "bom",
    vendido: true,
    imagem: "img/a-revolucao-dos-bichos.jpg",
    descricao: "Edição Principis, capa rosa. Pequenos sinais de manuseio nas bordas.",
    tags: ["clássico", "distopia", "sátira"]
  },
  {
    id: "inteligencia-socioemocional",
    tipo: "livro",
    titulo: "Inteligência Socioemocional",
    autor: "Augusto Cury",
    editora: "Escola da Inteligência",
    preco: 10.00,
    estado: "bom",
    vendido: false,
    imagem: "img/inteligencia-socioemocional.jpg",
    descricao: "Ferramentas para pais inspiradores e professores encantadores. Capa clara com leve marca de uso.",
    tags: ["autoajuda", "educação"]
  },
  {
    id: "alguem-para-amar-a-vida-inteira",
    tipo: "livro",
    titulo: "Alguém Para Amar a Vida Inteira",
    autor: "Roniwalter Jatobá",
    editora: "Positivo",
    preco: 20.00,
    estado: "excelente",
    vendido: false,
    imagem: "img/alguem-para-amar-a-vida-inteira.jpg",
    descricao: "Capa em ótimo estado, sem dobras. Parece pouco lido.",
    tags: ["literatura brasileira", "contos"]
  },
  {
    id: "1984",
    tipo: "livro",
    titulo: "1984",
    autor: "George Orwell",
    editora: "Nova Fronteira",
    preco: 20.00,
    estado: "excelente",
    vendido: true,
    imagem: "img/1984.jpg",
    descricao: "Edição Nova Fronteira com capa rosa. Conservado, sem dobras na lombada.",
    tags: ["clássico", "distopia", "ficção científica"]
  },
  {
    id: "percy-jackson-o-mar-de-monstros",
    tipo: "livro",
    titulo: "Percy Jackson e os Olimpianos: O Mar de Monstros",
    autor: "Rick Riordan",
    editora: "Intrínseca",
    preco: 20.00,
    estado: "bom",
    vendido: false,
    imagem: "img/percy-jackson-o-mar-de-monstros.jpg",
    descricao: "Livro II da série. Capa com marcas de leitura nas bordas, miolo íntegro.",
    tags: ["fantasia", "aventura", "young adult", "mitologia"]
  },
  {
    id: "magnus-chase-o-martelo-de-thor",
    tipo: "livro",
    titulo: "Magnus Chase e os Deuses de Asgard: O Martelo de Thor",
    autor: "Rick Riordan",
    editora: "Intrínseca",
    preco: 20.00,
    estado: "excelente",
    vendido: false,
    imagem: "img/magnus-chase-o-martelo-de-thor.jpg",
    descricao: "Livro II da série. Bem conservado, com brilho da capa preservado.",
    tags: ["fantasia", "aventura", "young adult", "mitologia"]
  },
  {
    id: "memorias-do-subsolo",
    tipo: "livro",
    titulo: "Memórias do Subsolo",
    autor: "Fiódor Dostoiévski",
    editora: "Penguin-Companhia",
    preco: 10.00,
    estado: "excelente",
    vendido: true,
    imagem: "img/memorias-do-subsolo.jpg",
    descricao: "Edição Penguin Clássicos. Capa firme, sem vincos na lombada.",
    tags: ["clássico", "literatura russa", "filosofia"]
  },
  {
    id: "a-arte-de-fazer-acontecer",
    tipo: "livro",
    titulo: "A Arte de Fazer Acontecer",
    autor: "David Allen",
    editora: "Sextante",
    preco: 20.00,
    estado: "excelente",
    vendido: true,
    imagem: "img/a-arte-de-fazer-acontecer.jpg",
    descricao: "O método GTD (Getting Things Done). Exemplar praticamente novo.",
    tags: ["produtividade", "negócios", "autoajuda"]
  },
  {
    id: "otelo",
    tipo: "livro",
    titulo: "Otelo",
    autor: "William Shakespeare",
    editora: "Camelot",
    preco: 15.00,
    estado: "bom",
    vendido: true,
    imagem: "img/otelo.jpg",
    descricao: "Edição com capa branca e detalhes dourados. Pequena marca no canto superior da capa.",
    tags: ["clássico", "teatro"]
  },
  {
    id: "triste-fim-de-policarpo-quaresma",
    tipo: "livro",
    titulo: "Triste Fim de Policarpo Quaresma",
    autor: "Lima Barreto",
    editora: "Record",
    preco: 10.00,
    estado: "desgastado",
    vendido: false,
    imagem: "img/triste-fim-de-policarpo-quaresma.jpg",
    descricao: "Capa com etiqueta arrancada deixando marca visível e sinais de manuseio. Texto totalmente íntegro.",
    tags: ["clássico", "literatura brasileira", "vestibular"]
  },
  {
    id: "as-cronicas-de-narnia",
    tipo: "livro",
    titulo: "As Crônicas de Nárnia — Volume Único",
    autor: "C. S. Lewis",
    editora: "Martins Fontes",
    preco: 40.00,
    estado: "bom",
    vendido: false,
    imagem: "img/as-cronicas-de-narnia.jpg",
    descricao: "As 7 histórias em um só volume. Capa com marcas de manuseio e um vinco no canto inferior.",
    tags: ["fantasia", "clássico", "volume único"]
  },
  {
    id: "o-codigo-da-vinci",
    tipo: "livro",
    titulo: "O Código Da Vinci",
    autor: "Dan Brown",
    editora: "Sextante",
    preco: 25.00,
    estado: "bom",
    vendido: false,
    imagem: "img/o-codigo-da-vinci.jpg",
    descricao: "Capa dura vermelha. Bordas com sinais de leitura, lombada firme.",
    tags: ["suspense", "thriller", "capa dura"]
  },
  {
    id: "a-guerra-dos-tronos",
    tipo: "livro",
    titulo: "A Guerra dos Tronos — As Crônicas de Gelo e Fogo, Livro Um",
    autor: "George R. R. Martin",
    editora: "LeYa",
    preco: 25.00,
    estado: "bom",
    vendido: false,
    imagem: "img/a-guerra-dos-tronos.jpg",
    descricao: "Primeiro livro da saga. Quinas da capa com desgaste de leitura, miolo bem conservado.",
    tags: ["fantasia", "épico", "saga"]
  },
  {
    id: "o-heroi-perdido",
    tipo: "livro",
    titulo: "O Herói Perdido — Os Heróis do Olimpo, Livro Um",
    autor: "Rick Riordan",
    editora: "Intrínseca",
    preco: 20.00,
    estado: "bom",
    vendido: false,
    imagem: "img/o-heroi-perdido.jpg",
    descricao: "Primeiro livro da série. Capa com leves marcas de manuseio.",
    tags: ["fantasia", "aventura", "young adult", "mitologia"]
  },
  {
    id: "magnus-chase-a-espada-do-verao",
    tipo: "livro",
    titulo: "Magnus Chase e os Deuses de Asgard: A Espada do Verão",
    autor: "Rick Riordan",
    editora: "Intrínseca",
    preco: 20.00,
    estado: "bom",
    vendido: false,
    imagem: "img/magnus-chase-a-espada-do-verao.jpg",
    descricao: "Livro I da série. Bordas da capa com desgaste de leitura.",
    tags: ["fantasia", "aventura", "young adult", "mitologia"]
  },
  {
    id: "a-senhora-do-jogo",
    tipo: "livro",
    titulo: "A Senhora do Jogo",
    autor: "Sidney Sheldon e Tilly Bagshawe",
    editora: "Record",
    preco: 15.00,
    estado: "bom",
    vendido: false,
    imagem: "img/a-senhora-do-jogo.jpg",
    descricao: "Continuação da saga da família Blackwell. Capa preta com pequenos sinais de manuseio.",
    tags: ["suspense", "drama"]
  },
  {
    id: "anjo-da-escuridao",
    tipo: "livro",
    titulo: "Anjo da Escuridão",
    autor: "Sidney Sheldon e Tilly Bagshawe",
    editora: "Record",
    preco: 15.00,
    estado: "bom",
    vendido: false,
    imagem: "img/anjo-da-escuridao.jpg",
    descricao: "Capa com leve desgaste nas bordas, miolo íntegro.",
    tags: ["suspense", "thriller"]
  },
  {
    id: "a-batalha-do-apocalipse",
    tipo: "livro",
    titulo: "A Batalha do Apocalipse",
    autor: "Eduardo Spohr",
    editora: "Verus",
    preco: 20.00,
    estado: "excelente",
    vendido: false,
    imagem: "img/a-batalha-do-apocalipse.jpg",
    descricao: "Da queda dos anjos ao crepúsculo do mundo. Exemplar bem conservado.",
    tags: ["fantasia", "literatura brasileira", "anjos"]
  },
  {
    id: "filhos-do-eden-herdeiros-de-atlantida",
    tipo: "livro",
    titulo: "Filhos do Éden: Herdeiros de Atlântida",
    autor: "Eduardo Spohr",
    editora: "Verus",
    preco: 20.00,
    estado: "excelente",
    vendido: false,
    imagem: "img/filhos-do-eden-herdeiros-de-atlantida.jpg",
    descricao: "Livro 1 da trilogia. Capa em ótimo estado.",
    tags: ["fantasia", "literatura brasileira", "anjos"]
  },
  {
    id: "depois-da-escuridao",
    tipo: "livro",
    titulo: "Depois da Escuridão",
    autor: "Sidney Sheldon e Tilly Bagshawe",
    editora: "Record",
    preco: 15.00,
    estado: "bom",
    vendido: false,
    imagem: "img/depois-da-escuridao.jpg",
    descricao: "Capa preta brilhante com pequenos sinais de manuseio.",
    tags: ["suspense", "romance"]
  },
  {
    id: "juizo-final",
    tipo: "livro",
    titulo: "Juízo Final",
    autor: "Sidney Sheldon",
    editora: "Record",
    preco: 10.00,
    estado: "bom",
    vendido: false,
    imagem: "img/juizo-final.jpg",
    descricao: "Capa com leve amarelado nas bordas, típico da idade da edição.",
    tags: ["suspense", "thriller"]
  },
  {
    id: "em-busca-de-um-novo-amanha",
    tipo: "livro",
    titulo: "Em Busca de um Novo Amanhã",
    autor: "Sidney Sheldon e Tilly Bagshawe",
    editora: "Record",
    preco: 15.00,
    estado: "bom",
    vendido: false,
    imagem: "img/em-busca-de-um-novo-amanha.jpg",
    descricao: "Continuação de Se Houver Amanhã. Quinas com leve desgaste.",
    tags: ["suspense", "thriller"]
  },
  {
    id: "nada-dura-para-sempre",
    tipo: "livro",
    titulo: "Nada Dura Para Sempre",
    autor: "Sidney Sheldon",
    editora: "Record",
    preco: 15.00,
    estado: "bom",
    vendido: false,
    imagem: "img/nada-dura-para-sempre.jpg",
    descricao: "Capa com leve amarelado nas bordas. Leitura perfeitamente íntegra.",
    tags: ["suspense", "drama"]
  },
  {
    id: "atos-de-deus",
    tipo: "livro",
    titulo: "Atos de Deus — O Clone de Cristo, Livro Três",
    autor: "James BeauSeigneur",
    editora: "Novo Século",
    preco: 15.00,
    estado: "bom",
    vendido: false,
    imagem: "img/atos-de-deus.jpg",
    descricao: "2ª edição revista e atualizada. Capa em bom estado.",
    tags: ["suspense", "ficção científica", "religião"]
  },
  {
    id: "a-hospedeira",
    tipo: "livro",
    titulo: "A Hospedeira",
    autor: "Stephenie Meyer",
    editora: "Intrínseca",
    preco: 15.00,
    estado: "bom",
    vendido: true,
    imagem: "img/a-hospedeira.jpg",
    descricao: "Da autora da série Crepúsculo. Alguns riscos leves no brilho da capa.",
    tags: ["ficção científica", "romance", "young adult"]
  },
  {
    id: "aura-negra",
    tipo: "livro",
    titulo: "Aura Negra — Academia de Vampiros",
    autor: "Richelle Mead",
    preco: 10.00,
    estado: "bom",
    vendido: false,
    imagem: "img/aura-negra.jpg",
    descricao: "Da série Academia de Vampiros. Capa com marcas de manuseio.",
    tags: ["vampiros", "young adult", "fantasia"]
  },
  {
    id: "a-cabana",
    tipo: "livro",
    titulo: "A Cabana",
    autor: "William P. Young",
    editora: "Sextante",
    preco: 15.00,
    estado: "bom",
    vendido: false,
    imagem: "img/a-cabana.jpg",
    descricao: "Capa com brilho preservado e pequenos sinais de leitura.",
    tags: ["drama", "espiritualidade"]
  },
  {
    id: "fortaleza-digital",
    tipo: "livro",
    titulo: "Fortaleza Digital",
    autor: "Dan Brown",
    editora: "Sextante",
    preco: 10.00,
    estado: "desgastado",
    vendido: false,
    imagem: "img/fortaleza-digital.jpg",
    descricao: "Capa com marcas evidentes de uso e desgaste nas bordas. Miolo legível e completo.",
    tags: ["suspense", "thriller", "tecnologia"]
  },
  {
    id: "tudo-o-que-ela-sempre-quis",
    tipo: "livro",
    titulo: "Tudo o Que Ela Sempre Quis",
    autor: "Barbara Freethy",
    editora: "Novo Conceito",
    preco: 10.00,
    estado: "desgastado",
    vendido: false,
    imagem: "img/tudo-o-que-ela-sempre-quis.jpg",
    descricao: "Capa clara com amarelado e marcas de manuseio bem visíveis. Leitura íntegra.",
    tags: ["romance", "drama"]
  },
  {
    id: "querido-john",
    tipo: "livro",
    titulo: "Querido John",
    autor: "Nicholas Sparks",
    editora: "Novo Conceito",
    preco: 15.00,
    estado: "bom",
    vendido: false,
    imagem: "img/querido-john.jpg",
    descricao: "Edição com a capa do filme. Leves marcas de manuseio nas bordas.",
    tags: ["romance", "drama"]
  },
  {
    id: "o-simbolo-perdido",
    tipo: "livro",
    titulo: "O Símbolo Perdido",
    autor: "Dan Brown",
    editora: "Sextante",
    preco: 15.00,
    estado: "bom",
    vendido: false,
    imagem: "img/o-simbolo-perdido.jpg",
    descricao: "Capa dura dourada. Pequenos sinais de manuseio, lombada firme.",
    tags: ["suspense", "thriller", "capa dura"]
  },
  {
    id: "cacada",
    tipo: "livro",
    titulo: "Caçada — Série House of Night",
    autor: "P. C. Cast e Kristin Cast",
    preco: 10.00,
    estado: "bom",
    vendido: false,
    imagem: "img/cacada.jpg",
    descricao: "Da série House of Night. Capa preta com riscos leves no brilho.",
    tags: ["vampiros", "young adult", "fantasia"]
  }
];