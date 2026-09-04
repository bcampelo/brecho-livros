/**
 * Lógica da Landing Page de Brechó
 */

// Placeholder SVG em data URI para imagens ausentes ou quebradas
const SVG_PLACEHOLDER = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400" viewBox="0 0 300 400"><rect width="100%" height="100%" fill="%231C1C21"/><path d="M120 160h60v80h-60z" fill="%2326262B"/><text x="150" y="210" fill="%2371717A" font-family="sans-serif" font-size="16" text-anchor="middle" dominant-baseline="middle">Sem foto</text></svg>`;

// Quantos dias um item continua com o selo NOVO (contando do campo "adicionadoEm")
const DIAS_NOVIDADE = 21;

// Textos padrão do pedido com vários itens.
// Se você quiser mudar, é só criar essas chaves dentro do CONFIG no data.js.
const MSG_SELECAO_ABERTURA = "Olá, tenho interesse nestes livros:";
const MSG_SELECAO_TOTAL = "Total";

// Estado da Aplicação
const state = {
  search: "",
  tipo: "tudo", // tudo, livro, box
  estados: [], // array de estados selecionados
  preco: "todos", // todos, ate20, 20a50, 50a100, acima100
  ordem: "padrao", // padrao, menor-preco, maior-preco, az, recentes
  ocultarVendidos: true,
  selecionados: new Set() // ids marcados para o pedido em lote
};

let primeiraRenderizacao = true;

// ============================================================================
// INICIALIZAÇÃO
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  preencherConfiguracoesUI();
  gerarChipsEstado();
  configurarEventosFiltros();
  configurarSelecao();
  updateGrid();
  abrirItemDaUrl();
});

function preencherConfiguracoesUI() {
  document.title = CONFIG.nomeDaVitrine;
  document.getElementById("ui-title").textContent = CONFIG.nomeDaVitrine;
  document.getElementById("ui-subtitle").textContent = CONFIG.subtitulo;
  document.getElementById("ui-rodape-aviso").textContent = CONFIG.avisoRodape;
  
  const linkGeral = linkWhatsApp(CONFIG.mensagemGeral);
  document.getElementById("ui-btn-geral").href = linkGeral;
  document.getElementById("ui-rodape-wa").href = linkGeral;
}

function gerarChipsEstado() {
  const container = document.getElementById("chips-estado");
  let html = `<label class="chip"><input type="checkbox" value="todos" checked> Todos</label>`;
  
  for (const [key, obj] of Object.entries(ESTADOS)) {
    html += `<label class="chip" data-estado="${key}"><input type="checkbox" value="${key}"> ${obj.rotulo}</label>`;
  }
  container.innerHTML = html;

  // Comportamento dos checkboxes de estado (exclusividade do "Todos")
  const checkboxes = container.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(cb => {
    cb.addEventListener('change', (e) => {
      const val = e.target.value;
      if (val === "todos" && e.target.checked) {
        checkboxes.forEach(c => { if(c.value !== "todos") c.checked = false; });
      } else if (val !== "todos" && e.target.checked) {
        container.querySelector('input[value="todos"]').checked = false;
      }
      
      // Atualizar cores visuais dos chips
      container.querySelectorAll('.chip').forEach(chip => {
        const est = chip.getAttribute('data-estado');
        if (est && chip.querySelector('input').checked) {
          chip.style.borderColor = ESTADOS[est].cor;
          chip.style.color = '#FFF';
          chip.style.backgroundColor = `${ESTADOS[est].cor}22`;
        } else {
          chip.style.borderColor = '';
          chip.style.color = '';
          chip.style.backgroundColor = '';
        }
      });
      
      // Checar se zerou tudo
      const checkeds = Array.from(checkboxes).filter(c => c.checked);
      if (checkeds.length === 0) container.querySelector('input[value="todos"]').checked = true;

      // Atualizar estado
      state.estados = Array.from(checkboxes).filter(c => c.checked && c.value !== "todos").map(c => c.value);
      updateGrid();
    });
  });
}

// ============================================================================
// FILTROS E ORDENAÇÃO
// ============================================================================
function configurarEventosFiltros() {
  // Busca
  const inputBusca = document.getElementById("filter-search");
  const btnClear = document.getElementById("btn-clear-search");
  let debounceTimeout;

  inputBusca.addEventListener("input", (e) => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      state.search = e.target.value;
      btnClear.style.display = state.search ? "block" : "none";
      updateGrid();
    }, 200);
  });

  btnClear.addEventListener("click", () => {
    inputBusca.value = "";
    state.search = "";
    btnClear.style.display = "none";
    updateGrid();
  });

  // Tipo (Radios)
  document.querySelectorAll('input[name="tipo"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      state.tipo = e.target.value;
      updateGrid();
    });
  });

  // Preço e Ordem
  document.getElementById("filter-preco").addEventListener('change', e => { state.preco = e.target.value; updateGrid(); });
  document.getElementById("filter-ordem").addEventListener('change', e => { state.ordem = e.target.value; updateGrid(); });
  
  // Vendidos
  document.getElementById("filter-vendidos").addEventListener('change', e => { state.ocultarVendidos = e.target.checked; updateGrid(); });

  // Limpar Todos
  const btnLimpar = document.getElementById("btn-limpar-filtros");
  const btnLimparEmpty = document.getElementById("btn-limpar-empty");
  const limparTudo = () => {
    inputBusca.value = ""; state.search = ""; btnClear.style.display = "none";
    document.querySelector('input[name="tipo"][value="tudo"]').checked = true; state.tipo = "tudo";
    document.querySelector('#chips-estado input[value="todos"]').click(); // Aciona evento pra resetar
    document.getElementById("filter-preco").value = "todos"; state.preco = "todos";
    document.getElementById("filter-ordem").value = "padrao"; state.ordem = "padrao";
    document.getElementById("filter-vendidos").checked = true; state.ocultarVendidos = true;
    updateGrid();
  };
  btnLimpar.addEventListener("click", limparTudo);
  btnLimparEmpty.addEventListener("click", limparTudo);
}

function normalizeString(str) {
  if (!str) return "";
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function itemMatchesFilters(item) {
  // Vendido
  if (state.ocultarVendidos && item.vendido) return false;
  
  // Tipo
  if (state.tipo !== "tudo" && item.tipo !== state.tipo) return false;
  
  // Estado
  if (state.estados.length > 0) {
    if (!state.estados.includes(item.estado)) return false;
  }
  
  // Preço
  const precoBase = item.tipo === "box" ? item.precoConjunto : item.preco;
  if (state.preco !== "todos") {
    if (state.preco === "ate20" && precoBase > 20) return false;
    if (state.preco === "20a50" && (precoBase <= 20 || precoBase > 50)) return false;
    if (state.preco === "50a100" && (precoBase <= 50 || precoBase > 100)) return false;
    if (state.preco === "acima100" && precoBase <= 100) return false;
  }
  
  // Busca
  if (state.search.trim()) {
    const q = normalizeString(state.search);
    const searchArea = [
      item.titulo,
      item.autor,
      ...(item.tags || []),
      ...(item.itens ? item.itens.map(i => i.titulo) : [])
    ].map(normalizeString).join(" ");
    
    if (!searchArea.includes(q)) return false;
  }
  
  return true;
}

// ============================================================================
// RENDERIZAÇÃO
// ============================================================================
function formatCurrency(val) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
}

function getPrecoAvulso(box) {
  if (!box.vendeAvulso || !box.itens) return null;
  const disponiveis = box.itens.filter(i => !i.vendido);
  if (disponiveis.length === 0) return null;
  const menor = Math.min(...disponiveis.map(i => i.preco || Infinity));
  return menor !== Infinity ? menor : null;
}

function imgErrorHandler(img) {
  img.onerror = null;
  img.src = SVG_PLACEHOLDER;
}

// Faz a foto aparecer com fade assim que carrega (inclusive se já veio do cache).
function prepararFadeDaImagem(img) {
  if (!img) return;
  img.classList.add("com-fade");
  const marcar = () => img.classList.add("carregada");
  if (img.complete && img.naturalWidth > 0) marcar();
  else img.addEventListener("load", marcar, { once: true });
}

function precoDoItem(item) {
  return item.tipo === "box" ? item.precoConjunto : item.preco;
}

// Data de entrada no acervo. Campo opcional: adicionadoEm: "2026-09-15"
function dataDoItem(item) {
  if (!item.adicionadoEm) return null;
  const d = new Date(item.adicionadoEm + "T12:00:00");
  return isNaN(d.getTime()) ? null : d;
}

function ehNovidade(item) {
  const d = dataDoItem(item);
  if (!d || item.vendido) return false;
  return (Date.now() - d.getTime()) / 86400000 <= DIAS_NOVIDADE;
}

function updateGrid() {
  const grid = document.getElementById("grid-vitrine");
  const emptyState = document.getElementById("empty-state");
  const btnLimpar = document.getElementById("btn-limpar-filtros");
  const contador = document.getElementById("ui-contador");
  
  // Filtrar
  let resultados = ACERVO.filter(itemMatchesFilters);
  
  // Ordenar
  if (state.ordem === "menor-preco") {
    resultados.sort((a, b) => (a.tipo === "box" ? a.precoConjunto : a.preco) - (b.tipo === "box" ? b.precoConjunto : b.preco));
  } else if (state.ordem === "maior-preco") {
    resultados.sort((a, b) => (b.tipo === "box" ? b.precoConjunto : b.preco) - (a.tipo === "box" ? a.precoConjunto : a.preco));
  } else if (state.ordem === "az") {
    resultados.sort((a, b) => a.titulo.localeCompare(b.titulo));
  } else if (state.ordem === "recentes") {
    // Itens sem data de entrada vão para o fim da lista.
    resultados.sort((a, b) => {
      const da = dataDoItem(a), db = dataDoItem(b);
      if (!da && !db) return 0;
      if (!da) return 1;
      if (!db) return -1;
      return db - da;
    });
  }

  // Visibilidade Limpar Filtros
  const temFiltroAtivo = state.search || state.tipo !== "tudo" || state.estados.length > 0 || state.preco !== "todos" || state.ordem !== "padrao" || !state.ocultarVendidos;
  btnLimpar.style.display = temFiltroAtivo ? "inline-block" : "none";

  // Contador
  contador.textContent = `${resultados.length} ite${resultados.length === 1 ? 'm' : 'ns'} encontrado${resultados.length === 1 ? '' : 's'}`;
  
  // Atualizar Stats do Topo (apenas uma vez na verdade, mas deixamos dinâmico caso ACERVO mude)
  const qtdLivros = ACERVO.filter(i => i.tipo === "livro" && !i.vendido).length;
  const qtdBoxes = ACERVO.filter(i => i.tipo === "box" && !i.vendido).length;
  const partes = [];
  if (qtdLivros) partes.push(`${qtdLivros} ${qtdLivros === 1 ? "livro avulso" : "livros avulsos"}`);
  if (qtdBoxes) partes.push(`${qtdBoxes} ${qtdBoxes === 1 ? "box" : "boxes"}`);
  document.getElementById("ui-stats").textContent = partes.length
    ? "Disponíveis: " + partes.join(" · ")
    : "Tudo vendido por enquanto";

  grid.innerHTML = "";
  if (resultados.length === 0) {
    grid.style.display = "none";
    emptyState.style.display = "block";
    return;
  }

  grid.style.display = "grid";
  emptyState.style.display = "none";

  resultados.forEach((item, indice) => {
    const selecionado = state.selecionados.has(item.id);
    const card = document.createElement("article");
    card.className = `card ${item.vendido ? "vendido" : ""} ${selecionado ? "selecionado" : ""}`;
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.dataset.id = item.id;
    // Usado para escalonar a entrada dos cards (só nos 14 primeiros, para não demorar).
    card.style.setProperty("--i", Math.min(indice, 14));
    if (primeiraRenderizacao) card.classList.add("entrando");

    // Tratamento de clique e teclado
    card.addEventListener("click", () => openModal(item));
    card.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(item); }});

    const estadoObj = ESTADOS[item.estado] || ESTADOS["bom"];
    const imgSrc = item.imagem || SVG_PLACEHOLDER;
    const novo = ehNovidade(item);

    let html = `
      <div class="card-img-wrapper">
        <img src="${imgSrc}" alt="Capa de ${item.titulo}" loading="lazy" decoding="async">
        ${item.vendido ? '<div class="selo-vendido">VENDIDO</div>' : ''}
        ${item.tipo === "box" ? `<div class="badge-tipo">📚 BOX · ${item.itens ? item.itens.length : 0} livros</div>` : ''}
        <div class="badge-estado" style="color: ${estadoObj.cor}; border-color: ${estadoObj.cor};">${estadoObj.rotulo}</div>
        ${novo ? '<div class="badge-novo">NOVO</div>' : ''}
        ${item.vendido ? '' : `<button class="btn-selecionar" type="button" aria-pressed="${selecionado}" aria-label="${selecionado ? 'Tirar' : 'Adicionar'} ${item.titulo} do pedido" title="Adicionar ao pedido">${selecionado ? '✓' : '+'}</button>`}
      </div>
      <div class="card-content">
        <h3 class="card-title">${item.titulo}</h3>
        <p class="card-author">${item.autor}</p>
        <div class="card-price-area">
    `;

    if (item.tipo === "livro") {
      html += `<div class="card-price">${formatCurrency(item.preco)}</div>`;
    } else {
      html += `<div class="card-price">${formatCurrency(item.precoConjunto)}</div>`;
      if (item.vendeAvulso) {
        const menorAvulso = getPrecoAvulso(item);
        if (menorAvulso) {
          html += `<div class="card-price-sub">box completo · avulso a partir de ${formatCurrency(menorAvulso)}</div>`;
        } else {
          html += `<div class="card-price-sub">box completo</div>`;
        }
      } else {
        html += `<div class="card-price-sub">box completo</div>`;
      }
    }

    html += `</div></div>`;
    card.innerHTML = html;

    // O placeholder é um data:URI com aspas, então o onerror é ligado aqui e não no HTML.
    const cardImg = card.querySelector("img");
    if (cardImg) cardImg.onerror = function () { imgErrorHandler(this); };
    prepararFadeDaImagem(cardImg);

    // Botão de seleção: não pode abrir o modal junto.
    const btnSel = card.querySelector(".btn-selecionar");
    if (btnSel) {
      btnSel.addEventListener("click", (e) => {
        e.stopPropagation();
        alternarSelecao(item.id);
      });
    }

    grid.appendChild(card);
  });

  primeiraRenderizacao = false;
}

// ============================================================================
// SELEÇÃO DE VÁRIOS ITENS (pedido em lote pelo WhatsApp)
// ============================================================================
function configurarSelecao() {
  document.getElementById("sel-limpar").addEventListener("click", () => {
    state.selecionados.clear();
    updateGrid();
    atualizarBarraSelecao();
  });
  atualizarBarraSelecao();
}

function alternarSelecao(id) {
  if (state.selecionados.has(id)) state.selecionados.delete(id);
  else state.selecionados.add(id);

  // Atualiza só o card mexido, para não recarregar a grade inteira.
  const card = document.querySelector(`.card[data-id="${CSS.escape(id)}"]`);
  if (card) {
    const ativo = state.selecionados.has(id);
    card.classList.toggle("selecionado", ativo);
    const btn = card.querySelector(".btn-selecionar");
    if (btn) {
      btn.textContent = ativo ? "✓" : "+";
      btn.setAttribute("aria-pressed", String(ativo));
    }
  }
  atualizarBarraSelecao();
}

function itensSelecionados() {
  return ACERVO.filter(i => state.selecionados.has(i.id));
}

function mensagemDaSelecao(itens) {
  const abertura = CONFIG.mensagemSelecao || MSG_SELECAO_ABERTURA;
  const linhas = itens.map(i => `• ${i.titulo} — ${formatCurrency(precoDoItem(i))}`);
  const total = itens.reduce((s, i) => s + (precoDoItem(i) || 0), 0);
  return `${abertura}\n\n${linhas.join("\n")}\n\n${MSG_SELECAO_TOTAL}: ${formatCurrency(total)}`;
}

function atualizarBarraSelecao() {
  const barra = document.getElementById("sel-bar");
  const itens = itensSelecionados();

  if (itens.length === 0) {
    barra.classList.remove("ativa");
    document.body.classList.remove("tem-selecao");
    return;
  }

  const total = itens.reduce((s, i) => s + (precoDoItem(i) || 0), 0);
  document.getElementById("sel-qtd").textContent =
    `${itens.length} ${itens.length === 1 ? "item selecionado" : "itens selecionados"}`;
  document.getElementById("sel-total").textContent = formatCurrency(total);
  document.getElementById("sel-link").href = linkWhatsApp(mensagemDaSelecao(itens));

  barra.classList.add("ativa");
  document.body.classList.add("tem-selecao");
}

// ============================================================================
// LINK DIRETO PARA UM ITEM  (?livro=id)
// ============================================================================
function urlDoItem(id) {
  const u = new URL(window.location.href);
  u.search = "?livro=" + encodeURIComponent(id);
  u.hash = "";
  return u.toString();
}

// O protocolo file:// não aceita history.pushState com query string.
function podeUsarHistorico() {
  return window.location.protocol !== "file:";
}

function abrirItemDaUrl() {
  const id = new URLSearchParams(window.location.search).get("livro");
  if (!id) return;
  const item = ACERVO.find(i => i.id === id);
  if (!item) return;
  if (podeUsarHistorico()) {
    try { history.replaceState({ livro: id }, "", urlDoItem(id)); } catch (e) { /* ignora */ }
  }
  openModal(item, true);
}

async function copiarTexto(texto) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(texto);
      return true;
    }
  } catch (e) { /* cai no plano B */ }

  try {
    const ta = document.createElement("textarea");
    ta.value = texto;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch (e) {
    return false;
  }
}

// ============================================================================
// WHATSAPP LINK BUILDER
// ============================================================================
function linkWhatsApp(mensagem) {
  return `https://wa.me/${CONFIG.telefoneWhatsApp}?text=${encodeURIComponent(mensagem)}`;
}

// ============================================================================
// MODAL
// ============================================================================
let elementoFocoAnterior = null;
let itemAberto = null;
let modalEmpilhouUrl = false;

function openModal(item, viaHistorico = false) {
  elementoFocoAnterior = document.activeElement;
  itemAberto = item;

  // Coloca ?livro=id na barra de endereços, para poder compartilhar o link direto.
  // Como é um pushState, o botão "voltar" do celular fecha o modal em vez de sair do site.
  if (!viaHistorico && podeUsarHistorico()) {
    try {
      history.pushState({ livro: item.id }, "", urlDoItem(item.id));
      modalEmpilhouUrl = true;
    } catch (e) {
      modalEmpilhouUrl = false;
    }
  }

  const backdrop = document.getElementById("modal-backdrop");
  const dialog = document.getElementById("modal-dialog");
  
  // Preencher dados básicos
  document.getElementById("modal-img").src = item.imagem || SVG_PLACEHOLDER;
  document.getElementById("modal-img").onerror = function() { imgErrorHandler(this); };
  
  const badgeTipo = document.getElementById("modal-badge-tipo");
  if (item.tipo === "box") {
    badgeTipo.style.display = "block";
    badgeTipo.textContent = `📚 BOX · ${item.itens ? item.itens.length : 0} livros`;
  } else {
    badgeTipo.style.display = "none";
  }

  document.getElementById("modal-title").textContent = item.titulo;
  document.getElementById("modal-author").textContent = item.autor;
  
  // Estado geral
  const estadoObj = ESTADOS[item.estado] || ESTADOS["bom"];
  const badgeEstado = document.getElementById("modal-estado-badge");
  badgeEstado.textContent = estadoObj.rotulo;
  badgeEstado.style.color = estadoObj.cor;
  badgeEstado.style.borderColor = estadoObj.cor;
  document.getElementById("modal-estado-desc").textContent = estadoObj.descricao;

  // Preços e Botão Principal
  const priceArea = document.getElementById("modal-price");
  const priceSub = document.getElementById("modal-price-sub");
  const actionArea = document.getElementById("modal-main-action");
  
  let precoValor = item.tipo === "box" ? item.precoConjunto : item.preco;
  priceArea.textContent = formatCurrency(precoValor);
  
  if (item.tipo === "box") {
    priceSub.textContent = "Preço do box completo";
  } else {
    priceSub.textContent = "";
  }

  // Ações Principais
  actionArea.innerHTML = "";
  if (item.vendido) {
    actionArea.innerHTML = `<button class="btn btn-large" disabled>Já vendido</button>`;
  } else {
    const msgTemplate = item.tipo === "box" ? CONFIG.mensagemBox : CONFIG.mensagemLivro;
    const msg = msgTemplate.replace("{titulo}", item.titulo);
    const textoBtn = item.tipo === "box" ? "Quero o box completo" : "Tenho interesse";
    actionArea.innerHTML = `<a href="${linkWhatsApp(msg)}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-large">${textoBtn}</a>`;
  }

  // Botão de copiar o link direto deste item
  const btnCopiar = document.createElement("button");
  btnCopiar.type = "button";
  btnCopiar.className = "btn btn-secondary btn-large btn-copiar-link";
  btnCopiar.textContent = "Copiar link deste item";
  btnCopiar.addEventListener("click", async () => {
    const ok = await copiarTexto(urlDoItem(item.id));
    btnCopiar.textContent = ok ? "Link copiado ✓" : "Não consegui copiar";
    btnCopiar.classList.toggle("copiado", ok);
    setTimeout(() => {
      btnCopiar.textContent = "Copiar link deste item";
      btnCopiar.classList.remove("copiado");
    }, 2000);
  });
  actionArea.appendChild(btnCopiar);

  // Specs
  const specsDiv = document.getElementById("modal-specs");
  specsDiv.innerHTML = "";
  if (item.editora || item.ano || item.paginas) {
    specsDiv.style.display = "grid";
    if (item.editora) specsDiv.innerHTML += `<div class="spec-item"><span>Editora</span><strong>${item.editora}</strong></div>`;
    if (item.ano) specsDiv.innerHTML += `<div class="spec-item"><span>Ano</span><strong>${item.ano}</strong></div>`;
    if (item.paginas) specsDiv.innerHTML += `<div class="spec-item"><span>Páginas</span><strong>${item.paginas}</strong></div>`;
  } else {
    specsDiv.style.display = "none";
  }

  // Descrição
  const descDiv = document.getElementById("modal-desc");
  if (item.descricao) {
    descDiv.style.display = "block";
    descDiv.textContent = item.descricao;
  } else {
    descDiv.style.display = "none";
  }

  // Tags
  const tagsDiv = document.getElementById("modal-tags");
  tagsDiv.innerHTML = "";
  if (item.tags && item.tags.length > 0) {
    item.tags.forEach(tag => {
      tagsDiv.innerHTML += `<span class="tag">${tag}</span>`;
    });
  }

  // Box itens
  const boxArea = document.getElementById("modal-box-items");
  if (item.tipo === "box" && item.itens) {
    boxArea.style.display = "block";
    document.getElementById("modal-box-count").textContent = item.itens.length;
    
    const note = document.getElementById("modal-box-note");
    note.style.display = item.vendeAvulso ? "none" : "block";

    const listDiv = document.getElementById("modal-box-list");
    listDiv.innerHTML = "";
    
    item.itens.forEach(vol => {
      const volEst = ESTADOS[vol.estado] || ESTADOS["bom"];
      const vImg = vol.imagem || SVG_PLACEHOLDER;
      
      let vHtml = `<div class="box-item-row ${vol.vendido ? 'vendido-row' : ''}">
        <img src="${vImg}" class="box-item-img" alt="Capa de ${vol.titulo}" loading="lazy">
        <div class="box-item-info">
          <div class="box-item-title">${vol.titulo}</div>
          <div class="box-item-meta">${vol.ano || ''} ${vol.ano && vol.paginas ? '·' : ''} ${vol.paginas ? vol.paginas+'p' : ''}</div>
          <div class="badge-estado-inline" style="color: ${volEst.cor}; border-color: ${volEst.cor};">${volEst.rotulo}</div>
        </div>`;
      
      if (item.vendeAvulso) {
        vHtml += `<div class="box-item-action">`;
        if (vol.preco) vHtml += `<div class="box-item-price">${formatCurrency(vol.preco)}</div>`;
        if (vol.vendido) {
           vHtml += `<button class="btn-small-outline" disabled style="border-color:var(--borda);color:var(--texto-fraco)">Vendido</button>`;
        } else {
           const vMsg = CONFIG.mensagemLivro.replace("{titulo}", `${vol.titulo} (do ${item.titulo})`);
           vHtml += `<a href="${linkWhatsApp(vMsg)}" target="_blank" class="btn-small-outline">Só este</a>`;
        }
        vHtml += `</div>`;
      }
      
      vHtml += `</div>`;
      listDiv.innerHTML += vHtml;
    });

    // Mesmo motivo do card: o onerror é ligado aqui, depois que o HTML foi montado.
    listDiv.querySelectorAll(".box-item-img").forEach(im => {
      im.onerror = function () { imgErrorHandler(this); };
    });
  } else {
    boxArea.style.display = "none";
  }

  // Mostrar
  document.body.style.overflow = "hidden";
  backdrop.classList.add("open");
  
  // Focus Trap Init
  setTimeout(() => { document.getElementById("modal-close").focus(); }, 100);
}

function closeModal() {
  // Se o modal empilhou uma URL, voltar no histórico é quem fecha de fato
  // (assim o botão "voltar" do celular e o X fazem a mesma coisa).
  if (modalEmpilhouUrl) {
    modalEmpilhouUrl = false;
    history.back();
    return;
  }
  fecharModalDeFato();
}

function fecharModalDeFato() {
  const backdrop = document.getElementById("modal-backdrop");
  if (!backdrop.classList.contains("open")) return;
  backdrop.classList.remove("open");
  document.body.style.overflow = "";
  itemAberto = null;
  if (elementoFocoAnterior) elementoFocoAnterior.focus();
}

// Voltar/avançar do navegador controlam a abertura do modal.
window.addEventListener("popstate", (e) => {
  modalEmpilhouUrl = false;
  fecharModalDeFato();
  const id = e.state && e.state.livro;
  if (id) {
    const item = ACERVO.find(i => i.id === id);
    if (item) openModal(item, true);
  }
});

// Eventos do Modal
document.getElementById("modal-close").addEventListener("click", closeModal);
document.getElementById("modal-backdrop").addEventListener("click", (e) => {
  if (e.target.id === "modal-backdrop") closeModal();
});
document.addEventListener("keydown", (e) => {
  if (!document.getElementById("modal-backdrop").classList.contains("open")) return;
  if (e.key === "Escape") {
    closeModal();
    return;
  }
  
  // Focus Trap
  if (e.key === "Tab") {
    const focusable = document.getElementById("modal-dialog").querySelectorAll('a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    
    if (e.shiftKey) {
      if (document.activeElement === first) { last.focus(); e.preventDefault(); }
    } else {
      if (document.activeElement === last) { first.focus(); e.preventDefault(); }
    }
  }
});