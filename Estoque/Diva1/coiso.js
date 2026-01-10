const form = document.getElementById('estoqueForm');
  const btnSubmit = document.getElementById('btnSubmit');
  const btnCancelar = document.getElementById('btnCancelar');
  const tabela = document.getElementById('tabelaEstoque');
  const valorTotal = document.getElementById('valorTotal');
  const inputBusca = document.getElementById('inputBusca');

  let estoque = JSON.parse(localStorage.getItem('estoque')) || [];
  let indexEmEdicao = -1;

  const formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

  // --- Função de Compressão de Imagem ---
  function comprimirImagem(arquivo) {
    return new Promise((resolve) => {
      const leitor = new FileReader();
      leitor.readAsDataURL(arquivo);
      leitor.onload = (evento) => {
        const img = new Image();
        img.src = evento.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let largura = img.width;
          let altura = img.height;
          const limite = 400; // Tamanho máximo em pixels

          if (largura > altura) {
            if (largura > limite) {
              altura *= limite / largura;
              largura = limite;
            }
          } else {
            if (altura > limite) {
              largura *= limite / altura;
              altura = limite;
            }
          }

          canvas.width = largura;
          canvas.height = altura;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, largura, altura);
          
          // Exporta como JPEG com 70% de qualidade para economizar muito espaço
          resolve(canvas.toDataURL('image/jpeg', 0.7));
        };
      };
    });
  }

  function salvarNoStorage() {
    try {
      localStorage.setItem('estoque', JSON.stringify(estoque));
    } catch (e) {
      alert("⚠️ O armazenamento está cheio! Remova itens ou use imagens menores.");
    }
  }

  function renderizar(lista = estoque) {
    tabela.innerHTML = '';
    let totalAcumulado = 0;

    lista.forEach((item) => {
      const realIndex = estoque.indexOf(item);
      const subtotal = item.quantidade * item.preco;
      totalAcumulado += subtotal;

      let statusHtml = item.quantidade <= 0 
        ? '<span class="status-badge status-esgotado">Indisponível</span>' 
        : '<span class="status-badge status-ok">Disponível</span>';
      
      let linhaClasse = (item.quantidade > 0 && item.quantidade <= 5) ? 'stock-baixo' : '';
      let alertaTexto = (item.quantidade > 0 && item.quantidade <= 5) ? '<span class="alerta-texto">⚠️ QUASE ESGOTADO</span>' : '';

      const tr = document.createElement('tr');
      tr.className = linhaClasse;
      tr.innerHTML = `
        <td><img src="${item.foto || 'https://via.placeholder.com/50'}" class="img-produto"></td>
        <td><strong>${item.nome}</strong><br><small>${item.categoria}</small></td>
        <td>${statusHtml}</td>
        <td>${item.quantidade} ${alertaTexto}</td>
        <td>${formatter.format(item.preco)}</td>
        <td>${formatter.format(subtotal)}</td>
        <td>
          <button class="btn-edit" onclick="prepararEdicao(${realIndex})">✏️</button>
          <button class="btn-remove" onclick="remover(${realIndex})">🗑️</button>
        </td>
      `;
      tabela.appendChild(tr);
    });
    valorTotal.textContent = `Total Geral: ${formatter.format(totalAcumulado)}`;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btnTextoOriginal = btnSubmit.textContent;
    btnSubmit.textContent = "PROCESSANDO...";
    btnSubmit.disabled = true;

    const fotoArquivo = document.getElementById('foto').files[0];
    let fotoFinal = indexEmEdicao !== -1 ? estoque[indexEmEdicao].foto : null;

    if (fotoArquivo) {
      fotoFinal = await comprimirImagem(fotoArquivo);
    }

    processarFormulario(fotoFinal);
    btnSubmit.disabled = false;
    btnSubmit.textContent = btnTextoOriginal;
  });

  function processarFormulario(fotoBase64) {
    const itemDados = {
      nome: document.getElementById('nome').value,
      categoria: document.getElementById('categoria').value,
      quantidade: Number(document.getElementById('quantidade').value),
      preco: Number(document.getElementById('preco').value),
      foto: fotoBase64
    };

    if (indexEmEdicao === -1) {
      estoque.push(itemDados);
    } else {
      estoque[indexEmEdicao] = itemDados;
    }

    salvarNoStorage();
    renderizar();
    cancelarEdicao();
  }

  // Funções de apoio (manter as que você já tem)
  function prepararEdicao(index) {
    indexEmEdicao = index;
    const item = estoque[index];
    document.getElementById('nome').value = item.nome;
    document.getElementById('categoria').value = item.categoria;
    document.getElementById('quantidade').value = item.quantidade;
    document.getElementById('preco').value = item.preco;
    form.classList.add('editando');
    btnSubmit.textContent = "SALVAR ALTERAÇÕES";
    btnCancelar.style.display = "block";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function cancelarEdicao() {
    indexEmEdicao = -1;
    form.reset();
    form.classList.remove('editando');
    btnSubmit.textContent = "CADASTRAR";
    btnCancelar.style.display = "none";
  }

  function filtrarEstoque() {
    const termo = inputBusca.value.toLowerCase();
    const filtrados = estoque.filter(i => 
      i.nome.toLowerCase().includes(termo) || i.categoria.toLowerCase().includes(termo)
    );
    renderizar(filtrados);
  }

  function remover(index) {
    if(confirm("Deseja eliminar este item?")) {
      estoque.splice(index, 1);
      salvarNoStorage();
      renderizar();
    }
  }

  // Mantenha suas funções gerarPDF(), gerarExcel() e gerarTXT() abaixo...
  renderizar();