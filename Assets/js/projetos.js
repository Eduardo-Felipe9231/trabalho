document.addEventListener("DOMContentLoaded", () => {

    // ============================================
    // ELEMENTOS PRINCIPAIS
    // ============================================

    const projectsGrid =
        document.getElementById("projectsGrid");

    const filterButtons =
        document.querySelectorAll(".filter-button");

    const searchInput =
        document.getElementById("projectSearch");


    // ============================================
    // CONTADORES
    // ============================================

    const totalProjects =
        document.getElementById("totalProjects");

    const activeProjects =
        document.getElementById("activeProjects");

    const completedProjects =
        document.getElementById("completedProjects");

    const plannedProjects =
        document.getElementById("plannedProjects");


    // ============================================
    // MODAL NOVO PROJETO
    // ============================================

    const newProjectModal =
        document.getElementById(
            "newProjectModal"
        );

    const newProjectModalOverlay =
        document.getElementById(
            "newProjectModalOverlay"
        );

    const openNewProjectModal =
        document.getElementById(
            "openNewProjectModal"
        );

    const closeNewProjectModal =
        document.getElementById(
            "closeNewProjectModal"
        );

    const cancelNewProject =
        document.getElementById(
            "cancelNewProject"
        );

    const newProjectForm =
        document.getElementById(
            "newProjectForm"
        );


    // ============================================
    // DADOS DOS PROJETOS PADRÃO
    // ============================================

    const projetosPadrao = {

        "sistema-ferias": {

            nome:
                "Sistema de Controle de Férias",

            descricao:
                "Desenvolvimento de uma plataforma interna para gerenciamento das férias dos colaboradores do Setor SE.",

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

            descricao:
                "Projeto de automação e integração dos equipamentos da linha KITKAT.",

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

            descricao:
                "Mapeamento e implementação de melhorias nos processos operacionais e administrativos do Setor SE.",

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

            descricao:
                "Organização e centralização dos documentos utilizados pelo Setor SE.",

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

            descricao:
                "Projeto futuro destinado à identificação de novas oportunidades de automação.",

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


    // ============================================
    // CARREGAR PROJETOS DO LOCALSTORAGE
    // ============================================

    let projetosCriados =
        JSON.parse(
            localStorage.getItem(
                "seHubProjects"
            )
        ) || {};


    let projetos = {

        ...projetosPadrao,

        ...projetosCriados

    };


    // ============================================
    // FUNÇÕES AUXILIARES
    // ============================================

    function formatarStatus(status) {

        const statusFormatado = {

            andamento:
                "Em andamento",

            concluido:
                "Concluído",

            planejado:
                "Planejado"

        };

        return (
            statusFormatado[status] ||
            "Planejado"
        );

    }


    function formatarMes(valor) {

        if (!valor) {

            return "A definir";

        }


        const [ano, mes] =
            valor.split("-");


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


        return (
            meses[Number(mes) - 1] +
            " " +
            ano
        );

    }


    function criarIdProjeto(nome) {

        let id = nome
            .toLowerCase()
            .normalize("NFD")
            .replace(
                /[\u0300-\u036f]/g,
                ""
            )
            .replace(
                /[^a-z0-9]+/g,
                "-"
            )
            .replace(
                /^-+|-+$/g,
                ""
            );


        let idOriginal =
            id;

        let contador =
            1;


        while (
            projetos[id]
        ) {

            id =
                idOriginal +
                "-" +
                contador;

            contador++;

        }


        return id;

    }


    // ============================================
    // COR DO PROJETO
    // ============================================

    function obterCorProjeto(
        status
    ) {

        if (
            status === "andamento"
        ) {

            return {

                iconClass:
                    "blue-project",

                barClass:
                    "blue-bar",

                statusClass:
                    "status-progress"

            };

        }


        if (
            status === "concluido"
        ) {

            return {

                iconClass:
                    "green-project",

                barClass:
                    "green-bar",

                statusClass:
                    "status-completed"

            };

        }


        return {

            iconClass:
                "purple-project",

            barClass:
                "purple-bar",

            statusClass:
                "status-planned"

        };

    }


    // ============================================
    // RENDERIZAR PROJETOS
    // ============================================

    function renderizarProjetos() {

        if (!projectsGrid) {

            return;

        }


        projectsGrid.innerHTML =
            "";


        Object.entries(projetos).forEach(
            ([id, projeto]) => {

                const cores =
                    obterCorProjeto(
                        projeto.status
                    );


                const inicial =
                    projeto.responsavel
                        .charAt(0)
                        .toUpperCase();


                const card =
                    document.createElement(
                        "article"
                    );


                card.className =
                    "project-card";


                card.dataset.project =
                    id;


                card.dataset.status =
                    projeto.status;


                card.innerHTML = `

                    <div class="project-card-top">

                        <div class="project-icon ${cores.iconClass}">

                            <i class="fa-solid ${projeto.icone}"></i>

                        </div>


                        <span class="project-status ${cores.statusClass}">

                            ${formatarStatus(
                                projeto.status
                            )}

                        </span>

                    </div>


                    <h3>

                        ${projeto.nome}

                    </h3>


                    <p>

                        ${projeto.descricao}

                    </p>


                    <div class="project-responsible">

                        <div class="avatar green-avatar">

                            ${inicial}

                        </div>


                        <div>

                            <span>

                                Responsável

                            </span>


                            <strong>

                                ${projeto.responsavel}

                            </strong>

                        </div>

                    </div>


                    <div class="project-progress">

                        <div class="progress-header">

                            <span>

                                Progresso

                            </span>


                            <strong>

                                ${projeto.progresso}%

                            </strong>

                        </div>


                        <div class="progress">

                            <div
                                class="progress-bar ${cores.barClass}"
                                style="width: ${projeto.progresso}%">
                            </div>

                        </div>

                    </div>


                    <div class="project-card-footer">

                        <span>

                            <i class="fa-solid fa-calendar"></i>

                            ${projeto.prazo}

                        </span>


                        <button
                            class="project-view-button"
                            type="button">

                            Ver projeto

                            <i class="fa-solid fa-arrow-right"></i>

                        </button>

                    </div>

                `;


                projectsGrid.appendChild(
                    card
                );


                const viewButton =
                    card.querySelector(
                        ".project-view-button"
                    );


                viewButton.addEventListener(
                    "click",
                    () => {

                        window.location.href =
                            `projeto-detalhes.html?id=${id}`;

                    }
                );

            }
        );


        filtrarProjetos();

        atualizarContadores();

    }


    // ============================================
    // ATUALIZAR CONTADORES
    // ============================================

    function atualizarContadores() {

        const listaProjetos =
            Object.values(
                projetos
            );


        const andamento =
            listaProjetos.filter(
                projeto =>
                    projeto.status ===
                    "andamento"
            ).length;


        const concluido =
            listaProjetos.filter(
                projeto =>
                    projeto.status ===
                    "concluido"
            ).length;


        const planejado =
            listaProjetos.filter(
                projeto =>
                    projeto.status ===
                    "planejado"
            ).length;


        if (totalProjects) {

            totalProjects.textContent =
                listaProjetos.length;

        }


        if (activeProjects) {

            activeProjects.textContent =
                andamento;

        }


        if (completedProjects) {

            completedProjects.textContent =
                concluido;

        }


        if (plannedProjects) {

            plannedProjects.textContent =
                planejado;

        }

    }


    // ============================================
    // FILTRAR PROJETOS
    // ============================================

    function filtrarProjetos() {

        const filtroAtivo =
            document.querySelector(
                ".filter-button.active"
            );


        const filtro =
            filtroAtivo
                ? filtroAtivo.dataset.filter
                : "todos";


        const pesquisa =
            searchInput
                ? searchInput.value
                    .toLowerCase()
                    .trim()
                : "";


        const projectCards =
            document.querySelectorAll(
                ".project-card"
            );


        projectCards.forEach(
            card => {

                const projectId =
                    card.dataset.project;


                const projeto =
                    projetos[projectId];


                if (!projeto) {

                    return;

                }


                const textoProjeto = (

                    projeto.nome +
                    " " +
                    projeto.descricao +
                    " " +
                    projeto.responsavel

                )
                    .toLowerCase();


                const correspondeFiltro =

                    filtro === "todos" ||

                    projeto.status ===
                    filtro;


                const correspondePesquisa =

                    textoProjeto.includes(
                        pesquisa
                    );


                if (

                    correspondeFiltro &&
                    correspondePesquisa

                ) {

                    card.classList.remove(
                        "hidden"
                    );

                } else {

                    card.classList.add(
                        "hidden"
                    );

                }

            }
        );

    }


    // ============================================
    // BOTÕES DE FILTRO
    // ============================================

    filterButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    filterButtons.forEach(
                        btn => {

                            btn.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    filtrarProjetos();

                }
            );

        }
    );


    // ============================================
    // PESQUISA
    // ============================================

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filtrarProjetos
        );

    }


    // ============================================
    // ABRIR MODAL
    // ============================================

    function abrirModalNovoProjeto() {

        if (
            !newProjectModal ||
            !newProjectModalOverlay
        ) {

            return;

        }


        newProjectModal.classList.add(
            "open"
        );


        newProjectModalOverlay.classList.add(
            "active"
        );


        document.body.style.overflow =
            "hidden";


        const nameInput =
            document.getElementById(
                "newProjectName"
            );


        if (nameInput) {

            setTimeout(
                () => {

                    nameInput.focus();

                },
                200
            );

        }

    }


    // ============================================
    // FECHAR MODAL
    // ============================================

    function fecharModalNovoProjeto() {

        if (newProjectModal) {

            newProjectModal.classList.remove(
                "open"
            );

        }


        if (newProjectModalOverlay) {

            newProjectModalOverlay.classList.remove(
                "active"
            );

        }


        document.body.style.overflow =
            "";

    }


    // ============================================
    // EVENTOS DO MODAL
    // ============================================

    if (openNewProjectModal) {

        openNewProjectModal.addEventListener(
            "click",
            abrirModalNovoProjeto
        );

    }


    if (closeNewProjectModal) {

        closeNewProjectModal.addEventListener(
            "click",
            fecharModalNovoProjeto
        );

    }


    if (cancelNewProject) {

        cancelNewProject.addEventListener(
            "click",
            () => {

                if (newProjectForm) {

                    newProjectForm.reset();

                }


                fecharModalNovoProjeto();

            }
        );

    }


    if (newProjectModalOverlay) {

        newProjectModalOverlay.addEventListener(
            "click",
            fecharModalNovoProjeto
        );

    }


    // ============================================
    // TECLA ESC
    // ============================================

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                fecharModalNovoProjeto();

            }

        }
    );


    // ============================================
    // CRIAR NOVO PROJETO
    // ============================================

    if (newProjectForm) {

        newProjectForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const nome =
                    document.getElementById(
                        "newProjectName"
                    ).value.trim();


                const descricao =
                    document.getElementById(
                        "newProjectDescription"
                    ).value.trim();


                const responsavel =
                    document.getElementById(
                        "newProjectResponsible"
                    ).value.trim();


                const status =
                    document.getElementById(
                        "newProjectStatus"
                    ).value;


                const progresso =
                    Number(
                        document.getElementById(
                            "newProjectProgress"
                        ).value
                    );


                const inicio =
                    document.getElementById(
                        "newProjectStart"
                    ).value;


                const prazo =
                    document.getElementById(
                        "newProjectDeadline"
                    ).value;


                const icone =
                    document.getElementById(
                        "newProjectIcon"
                    ).value;


                // Verificação adicional

                if (

                    !nome ||
                    !descricao ||
                    !responsavel ||
                    !inicio

                ) {

                    alert(
                        "Preencha todos os campos obrigatórios."
                    );

                    return;

                }


                // Cria um ID único

                const projectId =
                    criarIdProjeto(
                        nome
                    );


                // Ajusta automaticamente o progresso

                let progressoFinal =
                    progresso;


                if (
                    status === "concluido"
                ) {

                    progressoFinal =
                        100;

                }


                if (
                    status === "planejado"
                ) {

                    progressoFinal =
                        0;

                }


                // Cria o projeto

                const novoProjeto = {

                    nome:
                        nome,

                    descricao:
                        descricao,

                    responsavel:
                        responsavel,

                    progresso:
                        progressoFinal,

                    inicio:
                        formatarMes(
                            inicio
                        ),

                    prazo:
                        prazo
                            ? formatarMes(
                                prazo
                            )
                            : "A definir",

                    status:
                        status,

                    icone:
                        icone

                };


                // Adiciona ao objeto

                projetos[projectId] =
                    novoProjeto;


                // Salva somente os projetos criados

                projetosCriados[projectId] =
                    novoProjeto;


                localStorage.setItem(

                    "seHubProjects",

                    JSON.stringify(
                        projetosCriados
                    )

                );


                // Fecha o modal

                fecharModalNovoProjeto();


                // Limpa o formulário

                newProjectForm.reset();


                // Renderiza novamente

                renderizarProjetos();


                // Feedback

                alert(
                    "Projeto criado com sucesso!"
                );

            }
        );

    }


    // ============================================
    // INICIALIZAÇÃO
    // ============================================

    renderizarProjetos();

});