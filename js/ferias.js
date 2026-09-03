document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       CONFIGURAÇÕES
    ===================================================== */

    const STORAGE_KEY = "seHubFerias";

    const funcionarios = [
        "Ana Beatriz",
        "Fabiane",
        "Ítalo",
        "Eduardo"
    ];

    const coresFuncionarios = {
        "Ana Beatriz": "ana",
        "Fabiane": "fabiane",
        "Ítalo": "italo",
        "Eduardo": "eduardo"
    };


    /* =====================================================
       ELEMENTOS
    ===================================================== */

    const plannedModal =
        document.getElementById("plannedVacationModal");

    const scheduledModal =
        document.getElementById("scheduledVacationModal");

    const plannedForm =
        document.getElementById("plannedVacationForm");

    const scheduledForm =
        document.getElementById("scheduledVacationForm");

    const plannedStartDate =
        document.getElementById("plannedStartDate");

    const plannedDays =
        document.getElementById("plannedDays");

    const scheduledStartDate =
        document.getElementById("scheduledStartDate");

    const scheduledDays =
        document.getElementById("scheduledDays");

    const calculatedReturn =
        document.getElementById("calculatedReturn");

    const modalConflictWarning =
        document.getElementById("modalConflictWarning");

    const conflictAlert =
        document.getElementById("vacationConflictAlert");

    const calendar =
        document.getElementById("vacationCalendar");

    const calendarMonth =
        document.getElementById("calendarMonth");

    const plannedList =
        document.getElementById("plannedVacationList");

    const scheduledList =
        document.getElementById("scheduledVacationList");

    const alertList =
        document.getElementById("vacationAlertList");


    /* =====================================================
       ESTADO
    ===================================================== */

    let dados = carregarDados();

    let dataCalendario = new Date();


    /* =====================================================
       CARREGAR DADOS
    ===================================================== */

    function carregarDados() {

        const dadosSalvos =
            localStorage.getItem(STORAGE_KEY);

        if (dadosSalvos) {

            try {

                return JSON.parse(dadosSalvos);

            } catch (erro) {

                console.error(
                    "Erro ao carregar dados:",
                    erro
                );

            }

        }

        return {

            planejadas: [],

            programadas: []

        };

    }


    /* =====================================================
       SALVAR DADOS
    ===================================================== */

    function salvarDados() {

        localStorage.setItem(

            STORAGE_KEY,

            JSON.stringify(dados)

        );

    }


    /* =====================================================
       FORMATAÇÃO DE DATAS
    ===================================================== */

    function criarData(dataString) {

        const partes =
            dataString.split("-");

        return new Date(

            Number(partes[0]),

            Number(partes[1]) - 1,

            Number(partes[2])

        );

    }


    function formatarData(dataString) {

        if (!dataString) {

            return "-";

        }

        const data =
            criarData(dataString);

        return data.toLocaleDateString(
            "pt-BR"
        );

    }


    function formatarDataLonga(dataString) {

        if (!dataString) {

            return "-";

        }

        const data =
            criarData(dataString);

        return data.toLocaleDateString(
            "pt-BR",
            {
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );

    }


    /* =====================================================
       CÁLCULO DE DATA
    ===================================================== */

    function adicionarDias(
        dataString,
        quantidade
    ) {

        const data =
            criarData(dataString);

        data.setDate(
            data.getDate() + quantidade
        );

        return data;

    }


    function calcularDataRetorno(
        inicio,
        dias
    ) {

        if (
            !inicio ||
            !dias ||
            dias <= 0
        ) {

            return null;

        }

        // Se as férias começam no dia 1
        // e duram 10 dias,
        // o retorno será no dia 11.

        return adicionarDias(
            inicio,
            Number(dias)
        );

    }


    /* =====================================================
       VERIFICAR CONFLITO
    ===================================================== */

    function intervalosSeSobrepoem(
        inicioA,
        fimA,
        inicioB,
        fimB
    ) {

        return (

            inicioA <= fimB &&
            fimA >= inicioB

        );

    }


    function verificarConflito(
        inicio,
        dias
    ) {

        const novaDataInicio =
            criarData(inicio);

        const novaDataFim =
            adicionarDias(
                inicio,
                Number(dias) - 1
            );


        return dados.programadas.find(
            ferias => {

                const dataInicioExistente =
                    criarData(
                        ferias.inicio
                    );

                const dataFimExistente =
                    criarData(
                        ferias.fim
                    );


                return intervalosSeSobrepoem(

                    novaDataInicio,

                    novaDataFim,

                    dataInicioExistente,

                    dataFimExistente

                );

            }
        );

    }


    /* =====================================================
       ATUALIZAR DATA DE RETORNO
    ===================================================== */

    function atualizarDataRetorno() {

        const inicio =
            scheduledStartDate.value;

        const dias =
            Number(
                scheduledDays.value
            );


        if (
            !inicio ||
            !dias
        ) {

            calculatedReturn.textContent =
                "Informe a data e a quantidade de dias";

            esconderConflitoModal();

            return;

        }


        const retorno =
            calcularDataRetorno(
                inicio,
                dias
            );


        calculatedReturn.textContent =
            formatarDataLonga(

                retorno
                    .toISOString()
                    .split("T")[0]

            );


        const conflito =
            verificarConflito(
                inicio,
                dias
            );


        if (conflito) {

            mostrarConflitoModal(
                conflito
            );

        } else {

            esconderConflitoModal();

        }

    }


    scheduledStartDate
        .addEventListener(
            "change",
            atualizarDataRetorno
        );


    scheduledDays
        .addEventListener(
            "input",
            atualizarDataRetorno
        );


    /* =====================================================
       MODAIS
    ===================================================== */

    function abrirModal(modal) {

        if (!modal) {

            return;

        }

        modal.classList.add("active");

    }


    function fecharModal(modal) {

        if (!modal) {

            return;

        }

        modal.classList.remove("active");

    }


    document
        .getElementById(
            "openPlannedVacationModal"
        )
        ?.addEventListener(
            "click",
            () => {

                abrirModal(
                    plannedModal
                );

            }
        );


    document
        .getElementById(
            "openScheduledVacationModal"
        )
        ?.addEventListener(
            "click",
            () => {

                abrirModal(
                    scheduledModal
                );

            }
        );


    document
        .getElementById(
            "plannedTabButton"
        )
        ?.addEventListener(
            "click",
            () => {

                abrirModal(
                    plannedModal
                );

            }
        );


    document
        .getElementById(
            "scheduledTabButton"
        )
        ?.addEventListener(
            "click",
            () => {

                abrirModal(
                    scheduledModal
                );

            }
        );


    document
        .querySelectorAll(
            "[data-close]"
        )
        .forEach(
            botao => {

                botao.addEventListener(
                    "click",
                    () => {

                        const id =
                            botao.dataset.close;

                        fecharModal(
                            document.getElementById(id)
                        );

                    }
                );

            }
        );


    [plannedModal, scheduledModal]
        .forEach(
            modal => {

                modal?.addEventListener(
                    "click",
                    evento => {

                        if (
                            evento.target ===
                            modal
                        ) {

                            fecharModal(
                                modal
                            );

                        }

                    }
                );

            }
        );


    /* =====================================================
       ALERTA DE CONFLITO
    ===================================================== */

    function mostrarConflitoModal(
        conflito
    ) {

        modalConflictWarning
            .classList
            .remove("hidden");


        modalConflictWarning
            .querySelector("span")
            .textContent =

            `Conflito! ${conflito.funcionario} já está de férias neste período.`;

    }


    function esconderConflitoModal() {

        modalConflictWarning
            .classList
            .add("hidden");

    }


    function mostrarAlertaConflito() {

        conflictAlert
            .classList
            .remove("hidden");

    }


    function esconderAlertaConflito() {

        conflictAlert
            .classList
            .add("hidden");

    }


    document
        .getElementById(
            "closeConflictAlert"
        )
        ?.addEventListener(
            "click",
            esconderAlertaConflito
        );


    /* =====================================================
       SALVAR FÉRIAS PLANEJADAS
    ===================================================== */

    plannedForm
        .addEventListener(
            "submit",
            evento => {

                evento.preventDefault();


                const funcionario =
                    document.getElementById(
                        "plannedEmployee"
                    ).value;


                const inicio =
                    plannedStartDate.value;


                const dias =
                    Number(
                        plannedDays.value
                    );


                const observacao =
                    document.getElementById(
                        "plannedObservation"
                    ).value;


                if (
                    !funcionario ||
                    !inicio ||
                    !dias
                ) {

                    return;

                }


                const fim =
                    adicionarDias(
                        inicio,
                        dias - 1
                    );


                const registro = {

                    id:
                        Date.now(),

                    funcionario,

                    inicio,

                    fim:
                        fim
                            .toISOString()
                            .split("T")[0],

                    dias,

                    observacao

                };


                dados.planejadas.push(
                    registro
                );


                salvarDados();

                plannedForm.reset();

                fecharModal(
                    plannedModal
                );


                atualizarTudo();

            }
        );


    /* =====================================================
       SALVAR FÉRIAS PROGRAMADAS
    ===================================================== */

    scheduledForm
        .addEventListener(
            "submit",
            evento => {

                evento.preventDefault();


                const funcionario =
                    document.getElementById(
                        "scheduledEmployee"
                    ).value;


                const inicio =
                    scheduledStartDate.value;


                const dias =
                    Number(
                        scheduledDays.value
                    );


                const observacao =
                    document.getElementById(
                        "scheduledObservation"
                    ).value;


                if (
                    !funcionario ||
                    !inicio ||
                    !dias
                ) {

                    return;

                }


                const conflito =
                    verificarConflito(
                        inicio,
                        dias
                    );


                if (conflito) {

                    mostrarConflitoModal(
                        conflito
                    );

                    mostrarAlertaConflito();

                    return;

                }


                const fim =
                    adicionarDias(
                        inicio,
                        dias - 1
                    );


                const retorno =
                    calcularDataRetorno(
                        inicio,
                        dias
                    );


                const registro = {

                    id:
                        Date.now(),

                    funcionario,

                    inicio,

                    fim:
                        fim
                            .toISOString()
                            .split("T")[0],

                    retorno:
                        retorno
                            .toISOString()
                            .split("T")[0],

                    dias,

                    observacao

                };


                dados.programadas.push(
                    registro
                );


                salvarDados();

                scheduledForm.reset();

                calculatedReturn.textContent =
                    "Informe a data e a quantidade de dias";

                esconderConflitoModal();

                fecharModal(
                    scheduledModal
                );


                atualizarTudo();

            }
        );


    /* =====================================================
       RENDERIZAR FÉRIAS PLANEJADAS
    ===================================================== */

    function renderizarPlanejadas() {

        plannedList.innerHTML = "";


        dados.planejadas
            .sort(
                (a, b) =>
                    a.inicio.localeCompare(
                        b.inicio
                    )
            )
            .forEach(
                ferias => {

                    const classe =
                        coresFuncionarios[
                            ferias.funcionario
                        ];


                    const inicial =
                        ferias.funcionario
                            .charAt(0);


                    const item =
                        document.createElement(
                            "div"
                        );


                    item.className =
                        "vacation-item";


                    item.innerHTML = `

                        <div class="vacation-person-avatar ${classe}">

                            ${inicial}

                        </div>


                        <div class="vacation-person-info">

                            <strong>

                                ${ferias.funcionario}

                            </strong>

                            <span>

                                ${ferias.observacao || "Sem observação"}

                            </span>

                        </div>


                        <div class="vacation-dates">

                            <div class="vacation-date-info">

                                <span>

                                    Início pretendido

                                </span>

                                <strong>

                                    ${formatarData(
                                        ferias.inicio
                                    )}

                                </strong>

                            </div>


                            <div class="vacation-days">

                                ${ferias.dias} dias

                            </div>

                        </div>


                        <span class="vacation-status status-planned">

                            Planejada

                        </span>


                        <button
                            class="vacation-delete"
                            data-type="planned"
                            data-id="${ferias.id}">

                            <i class="fa-solid fa-trash"></i>

                        </button>

                    `;


                    plannedList.appendChild(
                        item
                    );

                }
            );

    }


    /* =====================================================
       RENDERIZAR FÉRIAS PROGRAMADAS
    ===================================================== */

    function renderizarProgramadas() {

        scheduledList.innerHTML = "";


        dados.programadas
            .sort(
                (a, b) =>
                    a.inicio.localeCompare(
                        b.inicio
                    )
            )
            .forEach(
                ferias => {

                    const classe =
                        coresFuncionarios[
                            ferias.funcionario
                        ];


                    const inicial =
                        ferias.funcionario
                            .charAt(0);


                    const item =
                        document.createElement(
                            "div"
                        );


                    item.className =
                        "vacation-item";


                    item.innerHTML = `

                        <div class="vacation-person-avatar ${classe}">

                            ${inicial}

                        </div>


                        <div class="vacation-person-info">

                            <strong>

                                ${ferias.funcionario}

                            </strong>

                            <span>

                                ${ferias.observacao || "Sem observação"}

                            </span>

                        </div>


                        <div class="vacation-dates">

                            <div class="vacation-date-info">

                                <span>

                                    Início

                                </span>

                                <strong>

                                    ${formatarData(
                                        ferias.inicio
                                    )}

                                </strong>

                            </div>


                            <div class="vacation-date-info">

                                <span>

                                    Retorno

                                </span>

                                <strong>

                                    ${formatarData(
                                        ferias.retorno
                                    )}

                                </strong>

                            </div>


                            <div class="vacation-days">

                                ${ferias.dias} dias

                            </div>

                        </div>


                        <span class="vacation-status status-scheduled">

                            Programada

                        </span>


                        <button
                            class="vacation-delete"
                            data-type="scheduled"
                            data-id="${ferias.id}">

                            <i class="fa-solid fa-trash"></i>

                        </button>

                    `;


                    scheduledList.appendChild(
                        item
                    );

                }
            );

    }


    /* =====================================================
       EXCLUIR REGISTRO
    ===================================================== */

    document.addEventListener(
        "click",
        evento => {

            const botao =
                evento.target.closest(
                    ".vacation-delete"
                );


            if (!botao) {

                return;

            }


            const tipo =
                botao.dataset.type;


            const id =
                Number(
                    botao.dataset.id
                );


            const confirmar =
                confirm(
                    "Deseja realmente excluir este registro?"
                );


            if (!confirmar) {

                return;

            }


            if (
                tipo ===
                "planned"
            ) {

                dados.planejadas =
                    dados.planejadas.filter(
                        item =>
                            item.id !== id
                    );

            }


            if (
                tipo ===
                "scheduled"
            ) {

                dados.programadas =
                    dados.programadas.filter(
                        item =>
                            item.id !== id
                    );

            }


            salvarDados();

            atualizarTudo();

        }
    );


    /* =====================================================
       CALENDÁRIO
    ===================================================== */

    function renderizarCalendario() {

        calendar.innerHTML = "";


        const ano =
            dataCalendario.getFullYear();


        const mes =
            dataCalendario.getMonth();


        const primeiroDia =
            new Date(
                ano,
                mes,
                1
            );


        const ultimoDia =
            new Date(
                ano,
                mes + 1,
                0
            );


        const diasNoMes =
            ultimoDia.getDate();


        const inicioSemana =
            primeiroDia.getDay();


        const nomeMes =
            dataCalendario.toLocaleDateString(
                "pt-BR",
                {
                    month: "long",
                    year: "numeric"
                }
            );


        calendarMonth.textContent =

            nomeMes
                .charAt(0)
                .toUpperCase() +

            nomeMes.slice(1);


        // Dias do mês anterior

        for (
            let i = inicioSemana - 1;
            i >= 0;
            i--
        ) {

            const data =
                new Date(
                    ano,
                    mes,
                    -i
                );


            criarCelulaCalendario(
                data,
                true
            );

        }


        // Dias do mês atual

        for (
            let dia = 1;
            dia <= diasNoMes;
            dia++
        ) {

            const data =
                new Date(
                    ano,
                    mes,
                    dia
                );


            criarCelulaCalendario(
                data,
                false
            );

        }


        // Dias do próximo mês

        const totalCelulas =
            calendar.children.length;


        const restantes =
            42 - totalCelulas;


        for (
            let dia = 1;
            dia <= restantes;
            dia++
        ) {

            const data =
                new Date(
                    ano,
                    mes + 1,
                    dia
                );


            criarCelulaCalendario(
                data,
                true
            );

        }

    }


    function criarCelulaCalendario(
        data,
        outroMes
    ) {

        const celula =
            document.createElement(
                "div"
            );


        celula.className =
            "calendar-day";


        if (outroMes) {

            celula.classList.add(
                "other-month"
            );

        }


        const hoje =
            new Date();


        if (

            data.getDate() ===
                hoje.getDate()

            &&

            data.getMonth() ===
                hoje.getMonth()

            &&

            data.getFullYear() ===
                hoje.getFullYear()

        ) {

            celula.classList.add(
                "today"
            );

        }


        const numero =
            document.createElement(
                "div"
            );


        numero.className =
            "day-number";


        numero.textContent =
            data.getDate();


        celula.appendChild(
            numero
        );


        const dataString =

            `${data.getFullYear()}-` +

            `${String(
                data.getMonth() + 1
            ).padStart(2, "0")}-` +

            `${String(
                data.getDate()
            ).padStart(2, "0")}`;


        dados.programadas
            .filter(
                ferias => {

                    return (

                        dataString >=
                            ferias.inicio

                        &&

                        dataString <=
                            ferias.fim

                    );

                }
            )
            .forEach(
                ferias => {

                    const evento =
                        document.createElement(
                            "div"
                        );


                    const classe =
                        coresFuncionarios[
                            ferias.funcionario
                        ];


                    evento.className =
                        `vacation-event ${classe}`;


                    evento.title =
                        `${ferias.funcionario} — ${ferias.dias} dias`;


                    evento.textContent =
                        ferias.funcionario;


                    celula.appendChild(
                        evento
                    );

                }
            );


        calendar.appendChild(
            celula
        );

    }


    document
        .getElementById(
            "previousMonth"
        )
        ?.addEventListener(
            "click",
            () => {

                dataCalendario.setMonth(

                    dataCalendario.getMonth() - 1

                );


                renderizarCalendario();

            }
        );


    document
        .getElementById(
            "nextMonth"
        )
        ?.addEventListener(
            "click",
            () => {

                dataCalendario.setMonth(

                    dataCalendario.getMonth() + 1

                );


                renderizarCalendario();

            }
        );


    /* =====================================================
       ABAS
    ===================================================== */

    document
        .querySelectorAll(
            ".vacation-tab"
        )
        .forEach(
            aba => {

                aba.addEventListener(
                    "click",
                    () => {

                        document
                            .querySelectorAll(
                                ".vacation-tab"
                            )
                            .forEach(
                                item =>
                                    item.classList
                                        .remove(
                                            "active"
                                        )
                            );


                        document
                            .querySelectorAll(
                                ".vacation-tab-content"
                            )
                            .forEach(
                                conteudo =>
                                    conteudo.classList
                                        .remove(
                                            "active"
                                        )
                            );


                        aba.classList.add(
                            "active"
                        );


                        const tab =
                            aba.dataset.tab;


                        document
                            .getElementById(
                                `${tab}Tab`
                            )
                            ?.classList
                            .add(
                                "active"
                            );

                    }
                );

            }
        );


    /* =====================================================
       CONTADORES
    ===================================================== */

    function atualizarResumo() {

        document
            .getElementById(
                "plannedVacations"
            )
            .textContent =

            dados.planejadas.length;


        document
            .getElementById(
                "scheduledVacations"
            )
            .textContent =

            dados.programadas.length;


        const hoje =
            new Date()
                .toISOString()
                .split("T")[0];


        const proximas =
            dados.programadas
                .filter(
                    ferias =>
                        ferias.inicio >= hoje
                )
                .sort(
                    (a, b) =>
                        a.inicio.localeCompare(
                            b.inicio
                        )
                );


        if (proximas.length > 0) {

            const proxima =
                proximas[0];


            document
                .getElementById(
                    "nextVacation"
                )
                .textContent =

                `${proxima.funcionario} — ${formatarData(
                    proxima.inicio
                )}`;

        } else {

            document
                .getElementById(
                    "nextVacation"
                )
                .textContent =
                "Nenhuma programada";

        }

    }


    /* =====================================================
       ALERTAS DE VENCIMENTO
    ===================================================== */

    function renderizarAlertas() {

        alertList.innerHTML = "";


        /*
           Por enquanto estamos usando
           um período aquisitivo fictício
           para testar a funcionalidade.

           Mais tarde podemos colocar
           a data real de admissão de
           cada funcionário.
        */


        const periodoAquisitivo = {

            "Ana Beatriz":
                "2025-01-01",

            "Fabiane":
                "2025-03-15",

            "Ítalo":
                "2025-06-01",

            "Eduardo":
                "2025-09-01"

        };


        let quantidadeAlertas = 0;


        funcionarios.forEach(
            funcionario => {

                const inicio =
                    periodoAquisitivo[
                        funcionario
                    ];


                if (!inicio) {

                    return;

                }


                const vencimento =
                    adicionarDias(
                        inicio,
                        365
                    );


                const hoje =
                    new Date();


                const diferenca =
                    Math.ceil(

                        (

                            vencimento -
                            hoje

                        ) /

                        (

                            1000 *
                            60 *
                            60 *
                            24

                        )

                    );


                if (
                    diferenca <= 60
                ) {

                    quantidadeAlertas++;


                    const item =
                        document.createElement(
                            "div"
                        );


                    const tipo =

                        diferenca <= 0
                            ? "danger"
                            : "warning";


                    item.className =

                        `vacation-alert-item ${tipo}`;


                    item.innerHTML = `

                        <div class="vacation-alert-icon">

                            <i class="fa-solid fa-triangle-exclamation"></i>

                        </div>


                        <div class="vacation-alert-content">

                            <strong>

                                ${funcionario}

                            </strong>


                            <p>

                                ${

                                    diferenca <= 0

                                    ?

                                    "O período aquisitivo está vencido."

                                    :

                                    `O período aquisitivo vence em ${diferenca} dias.`

                                }

                            </p>

                        </div>

                    `;


                    alertList.appendChild(
                        item
                    );

                }

            }
        );


        document
            .getElementById(
                "vacationAlerts"
            )
            .textContent =

            quantidadeAlertas;

    }


    /* =====================================================
       ATUALIZAR TUDO
    ===================================================== */

    function atualizarTudo() {

        renderizarPlanejadas();

        renderizarProgramadas();

        renderizarCalendario();

        renderizarAlertas();

        atualizarResumo();

    }


    /* =====================================================
       INICIALIZAÇÃO
    ===================================================== */

    atualizarTudo();

});