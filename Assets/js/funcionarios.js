document.addEventListener("DOMContentLoaded", () => {

    // ============================================
    // DADOS DOS FUNCIONÁRIOS
    // ============================================

    const funcionarios = {

        eduardo: {
            nome: "Eduardo",
            inicial: "E",
            cor: "green",
            cargo: "Engenharia SE",
            status: "Ativo",
            admissao: "10/01/2024",
            aquisitivo: "10/01/2025 → 09/01/2026",
            concessivo: "10/01/2026 → 09/01/2027",
            feriasDisponiveis: "30 dias",
            projetos: 3,
            historico: [
                {
                    ano: "2025",
                    dias: "20 dias"
                },
                {
                    ano: "2024",
                    dias: "10 dias"
                }
            ]
        },

        fabiane: {
            nome: "Fabiane",
            inicial: "F",
            cor: "pink",
            cargo: "Engenharia SE",
            status: "Férias",
            admissao: "15/03/2023",
            aquisitivo: "15/03/2025 → 14/03/2026",
            concessivo: "15/03/2026 → 14/03/2027",
            feriasDisponiveis: "20 dias",
            projetos: 5,
            historico: [
                {
                    ano: "2025",
                    dias: "30 dias"
                },
                {
                    ano: "2024",
                    dias: "15 dias"
                }
            ]
        },

        ana: {
            nome: "Ana Beatriz",
            inicial: "A",
            cor: "blue",
            cargo: "Engenharia SE",
            status: "Planejada",
            admissao: "20/08/2024",
            aquisitivo: "20/08/2025 → 19/08/2026",
            concessivo: "20/08/2026 → 19/08/2027",
            feriasDisponiveis: "30 dias",
            projetos: 2,
            historico: [
                {
                    ano: "2025",
                    dias: "10 dias"
                }
            ]
        },

        italo: {
            nome: "Ítalo",
            inicial: "I",
            cor: "red",
            cargo: "Engenharia SE",
            status: "Ativo",
            admissao: "05/02/2022",
            aquisitivo: "05/02/2025 → 04/02/2026",
            concessivo: "05/02/2026 → 04/02/2027",
            feriasDisponiveis: "30 dias",
            projetos: 4,
            historico: [
                {
                    ano: "2025",
                    dias: "30 dias"
                },
                {
                    ano: "2024",
                    dias: "20 dias"
                }
            ]
        }

    };


    // ============================================
    // ELEMENTOS DO PAINEL
    // ============================================

    const panel =
        document.getElementById("employeePanel");

    const overlay =
        document.getElementById("panelOverlay");

    const closeButton =
        document.getElementById("closePanel");


    // ============================================
    // ELEMENTOS QUE RECEBEM OS DADOS
    // ============================================

    const panelEmployeeName =
        document.getElementById("panelEmployeeName");

    const panelName =
        document.getElementById("panelName");

    const panelAvatar =
        document.getElementById("panelAvatar");

    const panelStatus =
        document.getElementById("panelStatus");


    // ============================================
    // ABRIR PAINEL
    // ============================================

    function abrirPainel(id) {

        const funcionario =
            funcionarios[id];

        if (!funcionario) {

            console.error(
                "Funcionário não encontrado:",
                id
            );

            return;

        }


        // Nome do cabeçalho

        panelEmployeeName.textContent =
            funcionario.nome;


        // Nome do perfil

        panelName.textContent =
            funcionario.nome;


        // Inicial

        panelAvatar.textContent =
            funcionario.inicial;


        // Remove classes antigas

        panelAvatar.classList.remove(
            "green-avatar",
            "pink-avatar",
            "blue-avatar",
            "red-avatar"
        );


        // Adiciona a cor correta

        panelAvatar.classList.add(
            `${funcionario.cor}-avatar`
        );


        // Status

        panelStatus.textContent =
            funcionario.status;


        // Remove classes antigas do status

        panelStatus.classList.remove(
            "active",
            "vacation",
            "planning"
        );


        // Define estilo do status

        if (funcionario.status === "Ativo") {

            panelStatus.classList.add(
                "active"
            );

        }

        if (funcionario.status === "Férias") {

            panelStatus.classList.add(
                "vacation"
            );

        }

        if (funcionario.status === "Planejada") {

            panelStatus.classList.add(
                "planning"
            );

        }


        // Abre painel

        panel.classList.add("open");

        overlay.classList.add("active");

    }


    // ============================================
    // FECHAR PAINEL
    // ============================================

    function fecharPainel() {

        panel.classList.remove("open");

        overlay.classList.remove("active");

    }


    // ============================================
    // BOTÕES DE VISUALIZAÇÃO
    // ============================================

    const viewButtons =
        document.querySelectorAll(".view");


    viewButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const id =
                    button.dataset.employee;

                abrirPainel(id);

            }
        );

    });


    // ============================================
    // FECHAR
    // ============================================

    closeButton.addEventListener(
        "click",
        fecharPainel
    );


    overlay.addEventListener(
        "click",
        fecharPainel
    );


    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape"
            ) {

                fecharPainel();

            }

        }
    );

});