document.addEventListener("DOMContentLoaded", () => {

    // ==================================================
    // PROJETOS PADRÃO
    // ==================================================

    const projetosPadrao = {

        "sistema-ferias": {

            nome:
                "Sistema de Controle de Férias",

            descricaoCurta:
                "Desenvolvimento de uma plataforma interna para gerenciamento das férias dos colaboradores do Setor SE.",

            descricao:
                "Este projeto tem como objetivo desenvolver uma plataforma interna para facilitar o controle e gerenciamento das férias dos colaboradores do Setor SE. A solução permitirá acompanhar férias planejadas e programadas, visualizar períodos no calendário, identificar possíveis conflitos de datas e emitir alertas relacionados ao vencimento dos períodos aquisitivos.",

            responsavel:
                "Eduardo",

            progresso:
                85,

            inicio:
                "Janeiro 2026",

            prazo:
                "Dezembro 2026",

            status:
                "andamento",

            icone:
                "fa-calendar-check"

        },


        "dashboard-producao": {

            nome:
                "Dashboard de Produção",

            descricaoCurta:
                "Desenvolvimento de indicadores para acompanhamento dos resultados e desempenho da produção.",

            descricao:
                "Desenvolvimento de indicadores para acompanhamento dos resultados e desempenho da produção.",

            responsavel:
                "Ana Beatriz",

            progresso:
                60,

            inicio:
                "Fevereiro 2026",

            prazo:
                "Outubro 2026",

            status:
                "andamento",

            icone:
                "fa-chart-line"

        },


        "automacao-kitkat": {

            nome:
                "Automação Linha KITKAT",

            descricaoCurta:
                "Projeto de automação e integração dos equipamentos da linha KITKAT.",

            descricao:
                "Projeto de automação e integração dos equipamentos utilizados na linha KITKAT, buscando otimizar processos, reduzir atividades manuais e melhorar a eficiência operacional da linha de produção.",

            responsavel:
                "Ítalo",

            progresso:
                40,

            inicio:
                "Março 2026",

            prazo:
                "Novembro 2026",

            status:
                "andamento",

            icone:
                "fa-gears"

        },


        "melhoria-processos": {

            nome:
                "Melhoria Contínua de Processos",

            descricaoCurta:
                "Mapeamento e implementação de melhorias nos processos operacionais e administrativos do Setor SE.",

            descricao:
                "Projeto focado na identificação de oportunidades de melhoria nos processos realizados pelo Setor SE, buscando aumentar a eficiência das atividades, reduzir retrabalho e otimizar os recursos disponíveis.",

            responsavel:
                "Fabiane",

            progresso:
                100,

            inicio:
                "Janeiro 2026",

            prazo:
                "Junho 2026",

            status:
                "concluido",

            icone:
                "fa-arrow-trend-up"

        },


        "controle-documentos": {

            nome:
                "Controle Digital de Documentos",

            descricaoCurta:
                "Organização e centralização dos documentos utilizados pelo Setor SE.",

            descricao:
                "Projeto desenvolvido para organizar e centralizar documentos importantes utilizados pelo Setor SE, facilitando o acesso às informações e reduzindo o tempo necessário para localizar arquivos.",

            responsavel:
                "Ana Beatriz",

            progresso:
                100,

            inicio:
                "Janeiro 2026",

            prazo:
                "Maio 2026",

            status:
                "concluido",

            icone:
                "fa-folder-open"

        },


        "novo-projeto": {

            nome:
                "Novo Projeto de Automação",

            descricaoCurta:
                "Projeto futuro destinado à identificação de novas oportunidades de automação.",

            descricao:
                "Projeto planejado para identificar novas oportunidades de automação e otimização das atividades realizadas pelo Setor SE, avaliando processos que possam ser aprimorados através de soluções tecnológicas.",

            responsavel:
                "Eduardo",

            progresso:
                0,

            inicio:
                "Janeiro 2027",

            prazo:
                "A definir",

            status:
                "planejado",

            icone:
                "fa-robot"

        }

    };


    // ==================================================
    // PEGAR ID DA URL
    // ==================================================

    const parametros =
        new URLSearchParams(
            window.location.search
        );


    const projetoId =
        parametros.get("id");


    // ==================================================
    // LOCALSTORAGE
    // ==================================================

    let projetosCriados = {};

    try {

        projetosCriados =
            JSON.parse(
                localStorage.getItem(
                    "seHubProjects"
                )
            ) || {};

    } catch (erro) {

        console.error(
            "Erro ao carregar projetos:",
            erro
        );

        projetosCriados = {};

    }


    // ==================================================
    // UNIR PROJETOS
    // ==================================================

    const projetos = {

        ...projetosPadrao,

        ...projetosCriados

    };


    // ==================================================
    // VERIFICAR PROJETO
    // ==================================================

    if (
        !projetoId ||
        !projetos[projetoId]
    ) {

        mostrarProjetoNaoEncontrado();

        return;

    }


    let projeto =
        projetos[projetoId];


    // ==================================================
    // ELEMENTOS
    // ==================================================

    const nome =
        document.getElementById(
            "detailProjectName"
        );


    const descricaoCurta =
        document.getElementById(
            "detailProjectShortDescription"
        );


    const descricao =
        document.getElementById(
            "detailProjectDescription"
        );


    const responsavel =
        document.getElementById(
            "detailProjectResponsible"
        );


    const progresso =
        document.getElementById(
            "detailProjectProgress"
        );


    const progressoPercent =
        document.getElementById(
            "detailProgressPercent"
        );


    const progressoBar =
        document.getElementById(
            "detailProgressBar"
        );


    const inicio =
        document.getElementById(
            "detailProjectStart"
        );


    const prazo =
        document.getElementById(
            "detailProjectDeadline"
        );


    const status =
        document.getElementById(
            "detailProjectStatus"
        );


    const icone =
        document.getElementById(
            "detailProjectIcon"
        );


    const objectivesList =
        document.getElementById(
            "objectivesList"
        );


    const timeline =
        document.getElementById(
            "projectTimeline"
        );


    const teamList =
        document.getElementById(
            "detailTeamList"
        );


    const documentsList =
        document.getElementById(
            "documentsList"
        );


    const linksList =
        document.getElementById(
            "linksList"
        );


    const observation =
        document.getElementById(
            "projectObservation"
        );


    // ==================================================
    // FUNÇÕES AUXILIARES
    // ==================================================

    function formatarStatus(valor) {

        const statusMap = {

            andamento:
                "Em andamento",

            concluido:
                "Concluído",

            planejado:
                "Planejado"

        };


        return (
            statusMap[valor] ||
            "Planejado"
        );

    }


    function formatarMesParaInput(valor) {

        if (!valor) {

            return "";

        }


        const meses = {

            janeiro: "01",
            fevereiro: "02",
            março: "03",
            abril: "04",
            maio: "05",
            junho: "06",
            julho: "07",
            agosto: "08",
            setembro: "09",
            outubro: "10",
            novembro: "11",
            dezembro: "12"

        };


        const partes =
            valor
                .toLowerCase()
                .trim()
                .split(/\s+/);


        if (
            partes.length !== 2
        ) {

            return "";

        }


        const mes =
            meses[partes[0]];


        const ano =
            partes[1];


        if (
            !mes ||
            !/^\d{4}$/.test(ano)
        ) {

            return "";

        }


        return `${ano}-${mes}`;

    }


    function formatarMes(valor) {

        if (!valor) {

            return "A definir";

        }


        const partes =
            valor.split("-");


        if (
            partes.length !== 2
        ) {

            return "A definir";

        }


        const ano =
            partes[0];


        const numeroMes =
            Number(partes[1]);


        const meses = [

            "Janeiro",
            "Fevereiro",
            "Março",
            "Abril",
            "Maio",
            "Junho",
            "Julho",
            "Agosto",
            "Setembro",
            "Outubro",
            "Novembro",
            "Dezembro"

        ];


        if (
            !meses[numeroMes - 1]
        ) {

            return "A definir";

        }


        return (
            meses[numeroMes - 1] +
            " " +
            ano
        );

    }


    function escaparHTML(texto) {

        if (
            texto === null ||
            texto === undefined
        ) {

            return "";

        }


        return String(texto)

            .replace(
                /&/g,
                "&amp;"
            )

            .replace(
                /</g,
                "&lt;"
            )

            .replace(
                />/g,
                "&gt;"
            )

            .replace(
                /"/g,
                "&quot;"
            )

            .replace(
                /'/g,
                "&#039;"
            );

    }


    function obterInicial(nome) {

        if (!nome) {

            return "?";

        }


        return nome
            .trim()
            .charAt(0)
            .toUpperCase();

    }


    // ==================================================
    // RENDERIZAR INFORMAÇÕES
    // ==================================================

    function renderizarProjeto() {

        if (nome) {

            nome.textContent =
                projeto.nome ||
                "Projeto";

        }


        if (descricaoCurta) {

            descricaoCurta.textContent =
                projeto.descricaoCurta ||
                projeto.descricao ||
                "Sem descrição.";

        }


        if (descricao) {

            descricao.textContent =
                projeto.descricao ||
                projeto.descricaoCurta ||
                "Sem descrição.";

        }


        if (responsavel) {

            responsavel.textContent =
                projeto.responsavel ||
                "Não informado";

        }


        const percentual =
            Math.max(
                0,
                Math.min(
                    100,
                    Number(
                        projeto.progresso
                    ) || 0
                )
            );


        if (progresso) {

            progresso.textContent =
                `${percentual}%`;

        }


        if (progressoPercent) {

            progressoPercent.textContent =
                `${percentual}%`;

        }


        if (progressoBar) {

            progressoBar.style.width =
                `${percentual}%`;

        }


        if (inicio) {

            inicio.textContent =
                projeto.inicio ||
                "A definir";

        }


        if (prazo) {

            prazo.textContent =
                projeto.prazo ||
                "A definir";

        }


        renderizarStatus();

        renderizarIcone();

        renderizarObjetivos();

        renderizarTimeline();

        renderizarEquipe();

        renderizarDocumentos();

        renderizarLinks();

        renderizarObservacao();


        document.title =
            `SE Hub | ${projeto.nome}`;

    }


    // ==================================================
    // STATUS
    // ==================================================

    function renderizarStatus() {

        if (!status) {

            return;

        }


        status.textContent =
            formatarStatus(
                projeto.status
            );


        status.classList.remove(

            "status-progress",
            "status-completed",
            "status-planned",
            "status-andamento",
            "status-concluido",
            "status-planejado"

        );


        if (
            projeto.status ===
            "andamento"
        ) {

            status.classList.add(
                "status-progress"
            );

        }


        else if (
            projeto.status ===
            "concluido"
        ) {

            status.classList.add(
                "status-completed"
            );

        }


        else {

            status.classList.add(
                "status-planned"
            );

        }

    }


    // ==================================================
    // ÍCONE
    // ==================================================

    function renderizarIcone() {

        if (!icone) {

            return;

        }


        icone.innerHTML = `

            <i class="fa-solid ${
                escaparHTML(
                    projeto.icone ||
                    "fa-diagram-project"
                )
            }"></i>

        `;

    }


    // ==================================================
    // OBJETIVOS
    // ==================================================

    function renderizarObjetivos() {

        if (!objectivesList) {

            return;

        }


        const objetivos =
            Array.isArray(
                projeto.objetivos
            )
                ? projeto.objetivos
                : [

                    {

                        titulo:
                            "Centralizar informações",

                        descricao:
                            "Reunir as informações relacionadas ao projeto em um único ambiente."

                    },

                    {

                        titulo:
                            "Melhorar a organização",

                        descricao:
                            "Facilitar o acompanhamento das atividades, responsáveis e prazos."

                    },

                    {

                        titulo:
                            "Aumentar a eficiência",

                        descricao:
                            "Reduzir retrabalho e melhorar a eficiência dos processos envolvidos."

                    }

                ];


        objectivesList.innerHTML = "";


        objetivos.forEach(
            objetivo => {

                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "objective-item";


                item.innerHTML = `

                    <div class="objective-check">

                        <i class="fa-solid fa-check"></i>

                    </div>


                    <div>

                        <strong>

                            ${escaparHTML(
                                objetivo.titulo ||
                                "Objetivo"
                            )}

                        </strong>


                        <p>

                            ${escaparHTML(
                                objetivo.descricao ||
                                ""
                            )}

                        </p>

                    </div>

                `;


                objectivesList.appendChild(
                    item
                );

            }
        );

    }


    // ==================================================
    // TIMELINE
    // ==================================================

    function renderizarTimeline() {

        if (!timeline) {

            return;

        }


        let etapas =
            projeto.etapas;


        if (
            !Array.isArray(etapas) ||
            etapas.length === 0
        ) {

            const percentual =
                Number(
                    projeto.progresso
                ) || 0;


            etapas = [

                {

                    nome:
                        "Planejamento",

                    descricao:
                        "Definição dos objetivos e requisitos do projeto.",

                    status:
                        "completed"

                },

                {

                    nome:
                        "Desenvolvimento",

                    descricao:
                        "Construção e implementação das funcionalidades.",

                    status:
                        percentual >= 50
                            ? "completed"
                            : "current"

                },

                {

                    nome:
                        "Testes e validação",

                    descricao:
                        "Testes das funcionalidades e validação com a equipe.",

                    status:
                        percentual >= 80
                            ? "completed"
                            : "current"

                },

                {

                    nome:
                        "Implantação",

                    descricao:
                        "Disponibilização da solução para utilização do setor.",

                    status:
                        percentual >= 100
                            ? "completed"
                            : "pending"

                }

            ];

        }


        timeline.innerHTML = "";


        etapas.forEach(
            (etapa, index) => {

                const item =
                    document.createElement(
                        "div"
                    );


                let classe = "";


                if (
                    etapa.status ===
                    "completed"
                ) {

                    classe =
                        "completed";

                }


                else if (
                    etapa.status ===
                    "current"
                ) {

                    classe =
                        "current";

                }


                let iconeEtapa =
                    "fa-flag";


                if (
                    etapa.status ===
                    "completed"
                ) {

                    iconeEtapa =
                        "fa-check";

                }


                else if (
                    etapa.status ===
                    "current"
                ) {

                    iconeEtapa =
                        "fa-spinner";

                }


                item.className =
                    `timeline-item ${classe}`;


                item.innerHTML = `

                    <div class="timeline-marker">

                        <i class="fa-solid ${iconeEtapa}"></i>

                    </div>


                    <div class="timeline-content">

                        <span>

                            Etapa ${String(
                                index + 1
                            ).padStart(
                                2,
                                "0"
                            )}

                        </span>


                        <strong>

                            ${escaparHTML(
                                etapa.nome ||
                                "Etapa"
                            )}

                        </strong>


                        <p>

                            ${escaparHTML(
                                etapa.descricao ||
                                ""
                            )}

                        </p>

                    </div>

                `;


                timeline.appendChild(
                    item
                );

            }
        );

    }


    // ==================================================
    // EQUIPE
    // ==================================================

    function renderizarEquipe() {

        if (!teamList) {

            return;

        }


        let equipe =
            projeto.equipe;


        if (
            !Array.isArray(equipe) ||
            equipe.length === 0
        ) {

            equipe = [

                {

                    nome:
                        projeto.responsavel ||
                        "Não informado",

                    funcao:
                        "Responsável"

                }

            ];

        }


        teamList.innerHTML = "";


        const coresAvatar = [

            "green-avatar",
            "pink-avatar",
            "blue-avatar",
            "red-avatar"

        ];


        equipe.forEach(
            (membro, index) => {

                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "detail-team-member";


                const avatar =
                    coresAvatar[
                        index %
                        coresAvatar.length
                    ];


                item.innerHTML = `

                    <div class="avatar ${avatar}">

                        ${escaparHTML(
                            obterInicial(
                                membro.nome
                            )
                        )}

                    </div>


                    <div>

                        <strong>

                            ${escaparHTML(
                                membro.nome ||
                                "Membro"
                            )}

                        </strong>


                        <span>

                            ${escaparHTML(
                                membro.funcao ||
                                "Equipe SE"
                            )}

                        </span>

                    </div>

                `;


                teamList.appendChild(
                    item
                );

            }
        );

    }


    // ==================================================
    // DOCUMENTOS
    // ==================================================

    function renderizarDocumentos() {

        if (!documentsList) {

            return;

        }


        const documentos =
            Array.isArray(
                projeto.documentos
            )
                ? projeto.documentos
                : [];


        documentsList.innerHTML = "";


        if (
            documentos.length === 0
        ) {

            documentsList.innerHTML = `

                <div class="empty-detail-message">

                    <i class="fa-solid fa-folder-open"></i>

                    <span>

                        Nenhum documento cadastrado.

                    </span>

                </div>

            `;

            return;

        }


        documentos.forEach(
            documento => {

                const item =
                    document.createElement(
                        "a"
                    );


                item.className =
                    "document-item";


                item.href =
                    documento.url ||
                    "#";


                if (
                    documento.url
                ) {

                    item.target =
                        "_blank";

                    item.rel =
                        "noopener noreferrer";

                }


                item.innerHTML = `

                    <div class="document-icon ${obterClasseDocumento(
                        documento.tipo
                    )}">

                        <i class="fa-solid ${obterIconeDocumento(
                            documento.tipo
                        )}"></i>

                    </div>


                    <div>

                        <strong>

                            ${escaparHTML(
                                documento.nome ||
                                "Documento"
                            )}

                        </strong>


                        <span>

                            ${escaparHTML(
                                documento.tipo ||
                                "Arquivo"
                            )}

                        </span>

                    </div>


                    <i class="fa-solid fa-download"></i>

                `;


                documentsList.appendChild(
                    item
                );

            }
        );

    }


    function obterIconeDocumento(tipo) {

        const valor =
            String(
                tipo || ""
            ).toLowerCase();


        if (
            valor.includes("pdf")
        ) {

            return "fa-file-pdf";

        }


        if (
            valor.includes("excel") ||
            valor.includes("xlsx") ||
            valor.includes("xls")
        ) {

            return "fa-file-excel";

        }


        if (
            valor.includes("word") ||
            valor.includes("doc")
        ) {

            return "fa-file-word";

        }


        return "fa-file";

    }


    function obterClasseDocumento(tipo) {

        const valor =
            String(
                tipo || ""
            ).toLowerCase();


        if (
            valor.includes("pdf")
        ) {

            return "pdf-icon";

        }


        if (
            valor.includes("excel") ||
            valor.includes("xlsx") ||
            valor.includes("xls")
        ) {

            return "excel-icon";

        }


        if (
            valor.includes("word") ||
            valor.includes("doc")
        ) {

            return "word-icon";

        }


        return "";

    }


    // ==================================================
    // LINKS
    // ==================================================

    function renderizarLinks() {

        if (!linksList) {

            return;

        }


        const links =
            Array.isArray(
                projeto.links
            )
                ? projeto.links
                : [];


        linksList.innerHTML = "";


        if (
            links.length === 0
        ) {

            linksList.innerHTML = `

                <div class="empty-detail-message">

                    <i class="fa-solid fa-link"></i>

                    <span>

                        Nenhum link cadastrado.

                    </span>

                </div>

            `;

            return;

        }


        links.forEach(
            link => {

                const item =
                    document.createElement(
                        "a"
                    );


                item.className =
                    "project-link";


                item.href =
                    link.url ||
                    "#";


                if (
                    link.url
                ) {

                    item.target =
                        "_blank";

                    item.rel =
                        "noopener noreferrer";

                }


                item.innerHTML = `

                    <i class="fa-solid ${
                        escaparHTML(
                            link.icone ||
                            "fa-link"
                        )
                    }"></i>


                    <span>

                        ${escaparHTML(
                            link.nome ||
                            "Link do projeto"
                        )}

                    </span>


                    <i class="fa-solid fa-arrow-up-right-from-square"></i>

                `;


                linksList.appendChild(
                    item
                );

            }
        );

    }


    // ==================================================
    // OBSERVAÇÃO
    // ==================================================

    function renderizarObservacao() {

        if (!observation) {

            return;

        }


        observation.textContent =
            projeto.observacao ||
            "Este espaço poderá ser utilizado para registrar informações importantes, atualizações ou observações relacionadas ao projeto.";

    }


    // ==================================================
    // MODAL DE EDIÇÃO
    // ==================================================

    const editModal =
        document.getElementById(
            "editProjectModal"
        );


    const editForm =
        document.getElementById(
            "editProjectForm"
        );


    const closeEditModal =
        document.getElementById(
            "closeEditProjectModal"
        );


    const cancelEdit =
        document.getElementById(
            "cancelEditProject"
        );


    const editButton =
        document.getElementById(
            "editProjectButton"
        );


    const modalOverlay =
        editModal
            ? editModal.querySelector(
                ".edit-project-modal-overlay"
            )
            : null;


    // ==================================================
    // CAMPOS DO FORMULÁRIO
    // ==================================================

    const editName =
        document.getElementById(
            "editProjectName"
        );


    const editDescription =
        document.getElementById(
            "editProjectDescription"
        );


    const editResponsible =
        document.getElementById(
            "editProjectResponsible"
        );


    const editStatus =
        document.getElementById(
            "editProjectStatus"
        );


    const editProgress =
        document.getElementById(
            "editProjectProgress"
        );


    const editStart =
        document.getElementById(
            "editProjectStart"
        );


    const editDeadline =
        document.getElementById(
            "editProjectDeadline"
        );


    const editIcon =
        document.getElementById(
            "editProjectIcon"
        );


    // ==================================================
    // ABRIR MODAL
    // ==================================================

    function abrirModalEdicao() {

        if (
            !editModal
        ) {

            return;

        }


        // Preencher campos

        if (editName) {

            editName.value =
                projeto.nome ||
                "";

        }


        if (editDescription) {

            editDescription.value =
                projeto.descricao ||
                "";

        }


        if (editResponsible) {

            editResponsible.value =
                projeto.responsavel ||
                "";

        }


        if (editStatus) {

            editStatus.value =
                projeto.status ||
                "planejado";

        }


        if (editProgress) {

            editProgress.value =
                Number(
                    projeto.progresso
                ) || 0;

        }


        if (editStart) {

            editStart.value =
                formatarMesParaInput(
                    projeto.inicio
                );

        }


        if (editDeadline) {

            editDeadline.value =
                formatarMesParaInput(
                    projeto.prazo
                );

        }


        if (editIcon) {

            editIcon.value =
                projeto.icone ||
                "fa-diagram-project";

        }


        editModal.classList.add(
            "open"
        );


        document.body.style.overflow =
            "hidden";


        setTimeout(
            () => {

                if (editName) {

                    editName.focus();

                }

            },
            150
        );

    }


    // ==================================================
    // FECHAR MODAL
    // ==================================================

    function fecharModalEdicao() {

        if (!editModal) {

            return;

        }


        editModal.classList.remove(
            "open"
        );


        document.body.style.overflow =
            "";

    }


    // ==================================================
    // BOTÃO EDITAR
    // ==================================================

    if (editButton) {

        editButton.addEventListener(
            "click",
            abrirModalEdicao
        );

    }


    // ==================================================
    // FECHAR
    // ==================================================

    if (closeEditModal) {

        closeEditModal.addEventListener(
            "click",
            fecharModalEdicao
        );

    }


    if (cancelEdit) {

        cancelEdit.addEventListener(
            "click",
            fecharModalEdicao
        );

    }


    if (modalOverlay) {

        modalOverlay.addEventListener(
            "click",
            fecharModalEdicao
        );

    }


    // ==================================================
    // ESC
    // ==================================================

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                editModal &&
                editModal.classList.contains(
                    "open"
                )
            ) {

                fecharModalEdicao();

            }

        }
    );


    // ==================================================
    // SALVAR ALTERAÇÕES
    // ==================================================

    if (editForm) {

        editForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                // ==========================================
                // PEGAR VALORES
                // ==========================================

                const novoNome =
                    editName
                        ? editName.value.trim()
                        : "";


                const novaDescricao =
                    editDescription
                        ? editDescription.value.trim()
                        : "";


                const novoResponsavel =
                    editResponsible
                        ? editResponsible.value.trim()
                        : "";


                const novoStatus =
                    editStatus
                        ? editStatus.value
                        : "planejado";


                let novoProgresso =
                    editProgress
                        ? Number(
                            editProgress.value
                        )
                        : 0;


                const novoInicio =
                    editStart
                        ? editStart.value
                        : "";


                const novoPrazo =
                    editDeadline
                        ? editDeadline.value
                        : "";


                const novoIcone =
                    editIcon
                        ? editIcon.value
                        : "fa-diagram-project";


                // ==========================================
                // VALIDAÇÃO
                // ==========================================

                if (
                    !novoNome ||
                    !novaDescricao ||
                    !novoResponsavel ||
                    !novoInicio
                ) {

                    alert(
                        "Preencha todos os campos obrigatórios."
                    );

                    return;

                }


                if (
                    Number.isNaN(
                        novoProgresso
                    )
                ) {

                    novoProgresso =
                        0;

                }


                novoProgresso =
                    Math.max(
                        0,
                        Math.min(
                            100,
                            novoProgresso
                        )
                    );


                // ==========================================
                // AJUSTAR PROGRESSO PELO STATUS
                // ==========================================

                if (
                    novoStatus ===
                    "concluido"
                ) {

                    novoProgresso =
                        100;

                }


                if (
                    novoStatus ===
                    "planejado"
                ) {

                    novoProgresso =
                        0;

                }


                // ==========================================
                // ATUALIZAR PROJETO
                // ==========================================

                projeto.nome =
                    novoNome;


                projeto.descricao =
                    novaDescricao;


                /*
                    Mantém a descrição curta antiga
                    quando ela existir.

                    Para projetos editados, podemos
                    atualizar a descrição curta
                    automaticamente.
                */

                projeto.descricaoCurta =
                    novaDescricao;


                projeto.responsavel =
                    novoResponsavel;


                projeto.status =
                    novoStatus;


                projeto.progresso =
                    novoProgresso;


                projeto.inicio =
                    formatarMes(
                        novoInicio
                    );


                projeto.prazo =
                    novoPrazo
                        ? formatarMes(
                            novoPrazo
                        )
                        : "A definir";


                projeto.icone =
                    novoIcone;


                // ==========================================
                // SALVAR NO LOCALSTORAGE
                // ==========================================

                projetosCriados[projetoId] =
                    projeto;


                try {

                    localStorage.setItem(

                        "seHubProjects",

                        JSON.stringify(
                            projetosCriados
                        )

                    );

                } catch (erro) {

                    console.error(
                        "Erro ao salvar projeto:",
                        erro
                    );


                    alert(
                        "Não foi possível salvar as alterações."
                    );


                    return;

                }


                // ==========================================
                // ATUALIZAR TELA
                // ==========================================

                renderizarProjeto();


                // ==========================================
                // FECHAR MODAL
                // ==========================================

                fecharModalEdicao();


                // ==========================================
                // FEEDBACK
                // ==========================================

                alert(
                    "Projeto atualizado com sucesso!"
                );

            }
        );

    }


    // ==================================================
    // COMPARTILHAR
    // ==================================================

    const shareButton =
        document.getElementById(
            "shareProjectButton"
        );


    if (shareButton) {

        shareButton.addEventListener(
            "click",
            async () => {

                const url =
                    window.location.href;


                if (
                    navigator.share
                ) {

                    try {

                        await navigator.share({

                            title:
                                projeto.nome,

                            text:
                                `Confira o projeto "${projeto.nome}" no SE Hub.`,

                            url:
                                url

                        });

                    } catch (erro) {

                        // Cancelamento do usuário.
                        // Não fazer nada.

                    }

                    return;

                }


                try {

                    await navigator.clipboard.writeText(
                        url
                    );


                    alert(
                        "Link do projeto copiado!"
                    );

                } catch (erro) {

                    alert(
                        "Não foi possível copiar o link."
                    );

                }

            }
        );

    }


    // ==================================================
    // PROJETO NÃO ENCONTRADO
    // ==================================================

    function mostrarProjetoNaoEncontrado() {

        document.title =
            "SE Hub | Projeto não encontrado";


        const nomeElemento =
            document.getElementById(
                "detailProjectName"
            );


        const descricaoElemento =
            document.getElementById(
                "detailProjectShortDescription"
            );


        const descricaoCompleta =
            document.getElementById(
                "detailProjectDescription"
            );


        if (nomeElemento) {

            nomeElemento.textContent =
                "Projeto não encontrado";

        }


        if (descricaoElemento) {

            descricaoElemento.textContent =
                "Não foi possível encontrar as informações deste projeto.";

        }


        if (descricaoCompleta) {

            descricaoCompleta.textContent =
                "O projeto solicitado não existe ou pode ter sido removido.";

        }

    }


    // ==================================================
    // INICIALIZAÇÃO
    // ==================================================

    renderizarProjeto();

});