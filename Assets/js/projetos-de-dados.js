// ============================================
// BANCO CENTRAL DE PROJETOS - SE HUB
// ============================================

const projetos = {

    // ========================================
    // HAVANA
    // ========================================

    "havana": {

        id: "havana",

        nome: "Projeto HAVANA",

        descricaoCurta:
            'Desenvolvimento do Cereal "Snow Churros".',

        descricao:
            'Projeto destinado ao desenvolvimento do Cereal "Snow Churros", acompanhando as etapas de desenvolvimento, testes, validação e preparação para implantação.',

        responsavel: "Eduardo",

        progresso: 85,

        inicio: "Janeiro 2026",

        prazo: "Dezembro 2026",

        status: "andamento",

        statusTexto: "Em andamento",

        prioridade: "alta",

        prioridadeTexto: "Alta",

        icone: "fa-calendar-check",

        cor: "green",

        equipe: [

            {
                nome: "Eduardo",
                inicial: "E",
                cargo: "Responsável",
                avatar: "green-avatar"
            },

            {
                nome: "Fabiane",
                inicial: "F",
                cargo: "Equipe SE",
                avatar: "pink-avatar"
            },

            {
                nome: "Ana Beatriz",
                inicial: "A",
                cargo: "Equipe SE",
                avatar: "blue-avatar"
            },

            {
                nome: "Ítalo",
                inicial: "I",
                cargo: "Equipe SE",
                avatar: "red-avatar"
            }

        ],

        objetivos: [

            {
                titulo: "Desenvolvimento do produto",

                descricao:
                    "Conduzir as etapas necessárias para desenvolvimento do Cereal Snow Churros."
            },

            {
                titulo: "Validação",

                descricao:
                    "Realizar testes e validações para garantir que o produto atenda aos requisitos definidos."
            },

            {
                titulo: "Preparação para implantação",

                descricao:
                    "Preparar o projeto para as etapas finais e implantação."
            }

        ],

        etapas: [

            {
                numero: "01",
                nome: "Planejamento",
                descricao:
                    "Definição dos objetivos, requisitos e planejamento inicial do projeto.",
                status: "concluido"
            },

            {
                numero: "02",
                nome: "Desenvolvimento",
                descricao:
                    "Desenvolvimento e acompanhamento das atividades relacionadas ao produto.",
                status: "concluido"
            },

            {
                numero: "03",
                nome: "Testes e validação",
                descricao:
                    "Realização dos testes e validações necessárias.",
                status: "andamento"
            },

            {
                numero: "04",
                nome: "Implantação",
                descricao:
                    "Preparação para conclusão e implantação do projeto.",
                status: "pendente"
            }

        ],

        tarefas: [

            {
                titulo: "Planejamento inicial",
                responsavel: "Eduardo",
                status: "concluida"
            },

            {
                titulo: "Desenvolvimento do produto",
                responsavel: "Eduardo",
                status: "concluida"
            },

            {
                titulo: "Testes e validação",
                responsavel: "Fabiane",
                status: "andamento"
            },

            {
                titulo: "Validação final",
                responsavel: "Ana Beatriz",
                status: "pendente"
            }

        ],

        documentos: [

            {
                nome: "Documentação do projeto",
                tipo: "PDF",
                icone: "fa-file-pdf",
                classe: "pdf-icon",
                link: "#"
            },

            {
                nome: "Controle de atividades",
                tipo: "Excel",
                icone: "fa-file-excel",
                classe: "excel-icon",
                link: "#"
            },

            {
                nome: "Especificação do projeto",
                tipo: "Word",
                icone: "fa-file-word",
                classe: "word-icon",
                link: "#"
            }

        ],

        links: [

            {
                nome: "Sistema do projeto",
                icone: "fa-link",
                link: "#"
            },

            {
                nome: "Pasta compartilhada",
                icone: "fa-folder",
                link: "#"
            }

        ],

        observacoes:
            "Projeto atualmente em fase de testes e validação. As próximas atividades estão relacionadas à conclusão das validações e preparação para implantação."

    },


    // ========================================
    // THOR
    // ========================================

    "thor": {

        id: "thor",

        nome: "Projeto THOR",

        descricaoCurta:
            'Desenvolvimento do Cereal "Nescau Cereal" com adição de proteínas.',

        descricao:
            'Projeto destinado ao desenvolvimento do Cereal Nescau Cereal com adição de proteínas, acompanhando as etapas de desenvolvimento, testes e validação.',

        responsavel: "Ana Beatriz",

        progresso: 60,

        inicio: "Fevereiro 2026",

        prazo: "Outubro 2026",

        status: "andamento",

        statusTexto: "Em andamento",

        prioridade: "alta",

        prioridadeTexto: "Alta",

        icone: "fa-chart-line",

        cor: "blue",

        equipe: [

            {
                nome: "Ana Beatriz",
                inicial: "A",
                cargo: "Responsável",
                avatar: "blue-avatar"
            },

            {
                nome: "Eduardo",
                inicial: "E",
                cargo: "Equipe SE",
                avatar: "green-avatar"
            },

            {
                nome: "Fabiane",
                inicial: "F",
                cargo: "Equipe SE",
                avatar: "pink-avatar"
            }

        ],

        objetivos: [

            {
                titulo: "Desenvolvimento do produto",

                descricao:
                    "Desenvolver o produto com a adição de proteínas."
            },

            {
                titulo: "Validação",

                descricao:
                    "Validar as características do produto durante as etapas de desenvolvimento."
            }

        ],

        etapas: [

            {
                numero: "01",
                nome: "Planejamento",
                descricao:
                    "Definição dos requisitos e planejamento do projeto.",
                status: "concluido"
            },

            {
                numero: "02",
                nome: "Desenvolvimento",
                descricao:
                    "Desenvolvimento do produto.",
                status: "andamento"
            },

            {
                numero: "03",
                nome: "Testes",
                descricao:
                    "Testes e validação do produto.",
                status: "pendente"
            },

            {
                numero: "04",
                nome: "Conclusão",
                descricao:
                    "Finalização do projeto.",
                status: "pendente"
            }

        ],

        tarefas: [

            {
                titulo: "Planejamento",
                responsavel: "Ana Beatriz",
                status: "concluida"
            },

            {
                titulo: "Desenvolvimento",
                responsavel: "Ana Beatriz",
                status: "andamento"
            },

            {
                titulo: "Testes",
                responsavel: "Eduardo",
                status: "pendente"
            }

        ],

        documentos: [],

        links: [],

        observacoes:
            "Projeto em desenvolvimento."

    },


    // ========================================
    // ZEUS
    // ========================================

    "zeus": {

        id: "zeus",

        nome: "Projeto ZEUS",

        descricaoCurta:
            'Projeto de desenvolvimento e reformulação do Cereal "Nescau Cereal".',

        descricao:
            'Projeto de desenvolvimento e reformulação do Cereal Nescau Cereal, buscando melhorias no produto e acompanhamento das etapas necessárias para sua evolução.',

        responsavel: "Ítalo",

        progresso: 40,

        inicio: "Março 2026",

        prazo: "Novembro 2026",

        status: "andamento",

        statusTexto: "Em andamento",

        prioridade: "media",

        prioridadeTexto: "Média",

        icone: "fa-gears",

        cor: "red",

        equipe: [

            {
                nome: "Ítalo",
                inicial: "I",
                cargo: "Responsável",
                avatar: "red-avatar"
            },

            {
                nome: "Eduardo",
                inicial: "E",
                cargo: "Equipe SE",
                avatar: "green-avatar"
            },

            {
                nome: "Ana Beatriz",
                inicial: "A",
                cargo: "Equipe SE",
                avatar: "blue-avatar"
            }

        ],

        objetivos: [

            {
                titulo: "Reformulação",

                descricao:
                    "Avaliar oportunidades de melhoria no produto."
            },

            {
                titulo: "Desenvolvimento",

                descricao:
                    "Conduzir as atividades de desenvolvimento."
            }

        ],

        etapas: [

            {
                numero: "01",
                nome: "Planejamento",
                descricao:
                    "Definição do escopo do projeto.",
                status: "concluido"
            },

            {
                numero: "02",
                nome: "Desenvolvimento",
                descricao:
                    "Desenvolvimento e reformulação do produto.",
                status: "andamento"
            },

            {
                numero: "03",
                nome: "Testes",
                descricao:
                    "Testes do produto.",
                status: "pendente"
            },

            {
                numero: "04",
                nome: "Conclusão",
                descricao:
                    "Finalização do projeto.",
                status: "pendente"
            }

        ],

        tarefas: [

            {
                titulo: "Definição do escopo",
                responsavel: "Ítalo",
                status: "concluida"
            },

            {
                titulo: "Desenvolvimento",
                responsavel: "Ítalo",
                status: "andamento"
            },

            {
                titulo: "Testes",
                responsavel: "Eduardo",
                status: "pendente"
            }

        ],

        documentos: [],

        links: [],

        observacoes:
            "Projeto atualmente em desenvolvimento."

    },


    // ========================================
    // COLORADO
    // ========================================

    "colorado": {

        id: "colorado",

        nome: "Projeto COLORADO",

        descricaoCurta:
            'Mapeamento e implementação de melhorias no Cereal "Nescau Cereal" e "Snow Flakes".',

        descricao:
            'Projeto voltado ao mapeamento e implementação de melhorias relacionadas aos produtos Nescau Cereal e Snow Flakes.',

        responsavel: "Fabiane",

        progresso: 100,

        inicio: "Janeiro 2026",

        prazo: "Junho 2026",

        status: "concluido",

        statusTexto: "Concluído",

        prioridade: "media",

        prioridadeTexto: "Média",

        icone: "fa-arrow-trend-up",

        cor: "pink",

        equipe: [

            {
                nome: "Fabiane",
                inicial: "F",
                cargo: "Responsável",
                avatar: "pink-avatar"
            },

            {
                nome: "Eduardo",
                inicial: "E",
                cargo: "Equipe SE",
                avatar: "green-avatar"
            }

        ],

        objetivos: [

            {
                titulo: "Mapeamento",

                descricao:
                    "Mapear os processos e oportunidades de melhoria."
            },

            {
                titulo: "Implementação",

                descricao:
                    "Implementar as melhorias identificadas."
            }

        ],

        etapas: [

            {
                numero: "01",
                nome: "Mapeamento",
                descricao:
                    "Mapeamento das oportunidades.",
                status: "concluido"
            },

            {
                numero: "02",
                nome: "Implementação",
                descricao:
                    "Implementação das melhorias.",
                status: "concluido"
            },

            {
                numero: "03",
                nome: "Validação",
                descricao:
                    "Validação dos resultados.",
                status: "concluido"
            }

        ],

        tarefas: [

            {
                titulo: "Mapeamento",
                responsavel: "Fabiane",
                status: "concluida"
            },

            {
                titulo: "Implementação",
                responsavel: "Fabiane",
                status: "concluida"
            },

            {
                titulo: "Validação",
                responsavel: "Eduardo",
                status: "concluida"
            }

        ],

        documentos: [],

        links: [],

        observacoes:
            "Projeto concluído em Junho de 2026."

    },


    // ========================================
    // RUSH
    // ========================================

    "rush": {

        id: "rush",

        nome: "Projeto RUSH",

        descricaoCurta:
            'Organização e centralização da criação da linha "RUSH".',

        descricao:
            'Projeto destinado à organização e centralização das atividades relacionadas à criação da linha RUSH, com proposta de cereais de até 50g.',

        responsavel: "Ana Beatriz",

        progresso: 100,

        inicio: "Janeiro 2026",

        prazo: "Maio 2026",

        status: "concluido",

        statusTexto: "Concluído",

        prioridade: "alta",

        prioridadeTexto: "Alta",

        icone: "fa-file-circle-check",

        cor: "yellow",

        equipe: [

            {
                nome: "Ana Beatriz",
                inicial: "A",
                cargo: "Responsável",
                avatar: "blue-avatar"
            },

            {
                nome: "Eduardo",
                inicial: "E",
                cargo: "Equipe SE",
                avatar: "green-avatar"
            }

        ],

        objetivos: [

            {
                titulo: "Centralização",

                descricao:
                    "Centralizar as informações relacionadas ao projeto."
            },

            {
                titulo: "Organização",

                descricao:
                    "Organizar as atividades e informações da nova linha."
            }

        ],

        etapas: [

            {
                numero: "01",
                nome: "Planejamento",
                descricao:
                    "Planejamento da nova linha.",
                status: "concluido"
            },

            {
                numero: "02",
                nome: "Desenvolvimento",
                descricao:
                    "Desenvolvimento do projeto.",
                status: "concluido"
            },

            {
                numero: "03",
                nome: "Conclusão",
                descricao:
                    "Finalização das atividades.",
                status: "concluido"
            }

        ],

        tarefas: [

            {
                titulo: "Planejamento",
                responsavel: "Ana Beatriz",
                status: "concluida"
            },

            {
                titulo: "Desenvolvimento",
                responsavel: "Ana Beatriz",
                status: "concluida"
            },

            {
                titulo: "Conclusão",
                responsavel: "Eduardo",
                status: "concluida"
            }

        ],

        documentos: [],

        links: [],

        observacoes:
            "Projeto concluído em Maio de 2026."

    },


    // ========================================
    // SNIPER
    // ========================================

    "sniper": {

        id: "sniper",

        nome: "Projeto SNIPER",

        descricaoCurta:
            "Projeto futuro destinado à identificação de novas embalagens dos Cereais Nestlé.",

        descricao:
            "Projeto futuro destinado à identificação de novas oportunidades relacionadas às embalagens dos Cereais Nestlé.",

        responsavel: "Eduardo",

        progresso: 0,

        inicio: "Janeiro 2027",

        prazo: "A definir",

        status: "planejado",

        statusTexto: "Planejado",

        prioridade: "baixa",

        prioridadeTexto: "Baixa",

        icone: "fa-lightbulb",

        cor: "purple",

        equipe: [

            {
                nome: "Eduardo",
                inicial: "E",
                cargo: "Responsável",
                avatar: "green-avatar"
            }

        ],

        objetivos: [

            {
                titulo: "Identificar oportunidades",

                descricao:
                    "Identificar novas oportunidades relacionadas às embalagens."
            }

        ],

        etapas: [

            {
                numero: "01",
                nome: "Planejamento",
                descricao:
                    "Definição do escopo do projeto.",
                status: "pendente"
            },

            {
                numero: "02",
                nome: "Pesquisa",
                descricao:
                    "Pesquisa e identificação de oportunidades.",
                status: "pendente"
            },

            {
                numero: "03",
                nome: "Desenvolvimento",
                descricao:
                    "Desenvolvimento das soluções.",
                status: "pendente"
            }

        ],

        tarefas: [],

        documentos: [],

        links: [],

        observacoes:
            "Projeto planejado para início em Janeiro de 2027."

    }

};