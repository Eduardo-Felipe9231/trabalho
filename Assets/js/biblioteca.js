/* ============================================
   BIBLIOTECA - SE HUB
   JavaScript definitivo
============================================ */


/* ============================================
   INICIALIZAÇÃO
============================================ */

document.addEventListener("DOMContentLoaded", () => {

    initLibrary();

});


/* ============================================
   FUNÇÃO PRINCIPAL
============================================ */

function initLibrary() {

    const documentsGrid =
        document.getElementById("documentsGrid");

    if (!documentsGrid) {
        return;
    }


    /* -----------------------------------------
       ELEMENTOS
    ----------------------------------------- */

    const searchInput =
        document.getElementById("librarySearch");

    const emptyLibrary =
        document.getElementById("emptyLibrary");

    const totalDocuments =
        document.getElementById("totalDocuments");

    const pdfDocuments =
        document.getElementById("pdfDocuments");

    const excelDocuments =
        document.getElementById("excelDocuments");

    const recentDocuments =
        document.getElementById("recentDocuments");

    const showFavorites =
        document.getElementById("showFavorites");

    const categoryButtons =
        document.querySelectorAll(".category-button");

    const viewButtons =
        document.querySelectorAll(".view-button");

    const addDocumentButton =
        document.querySelector(
            ".library-action-button.primary"
        );

    const filterButton =
        document.querySelector(
            ".library-action-button.secondary"
        );


    /* -----------------------------------------
       DOCUMENTOS
    ----------------------------------------- */

    let documents =
        Array.from(
            documentsGrid.querySelectorAll(".document-card")
        );


    /* -----------------------------------------
       ESTADO
    ----------------------------------------- */

    let currentCategory = "todos";

    let favoritesOnly = false;

    let currentSearch = "";

    let currentView = "grid";


    /* -----------------------------------------
       FAVORITOS
    ----------------------------------------- */

    loadFavorites();


    /* -----------------------------------------
       PESQUISA
    ----------------------------------------- */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            () => {

                currentSearch =
                    searchInput.value
                        .trim()
                        .toLowerCase();

                applyFilters();

            }
        );

    }


    /* -----------------------------------------
       CATEGORIAS
    ----------------------------------------- */

    categoryButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                categoryButtons.forEach(
                    item => {
                        item.classList.remove("active");
                    }
                );


                button.classList.add("active");


                currentCategory =
                    button.dataset.category || "todos";


                favoritesOnly = false;


                if (showFavorites) {

                    showFavorites.innerHTML =
                        `
                        Ver favoritos
                        <i class="fa-solid fa-arrow-right"></i>
                        `;

                }


                applyFilters();

            }
        );

    });


    /* -----------------------------------------
       FAVORITOS
    ----------------------------------------- */

    if (showFavorites) {

        showFavorites.addEventListener(
            "click",
            () => {

                favoritesOnly =
                    !favoritesOnly;


                if (favoritesOnly) {

                    categoryButtons.forEach(
                        item => {
                            item.classList.remove("active");
                        }
                    );


                    showFavorites.innerHTML =
                        `
                        Ver todos
                        <i class="fa-solid fa-arrow-left"></i>
                        `;

                } else {

                    const allButton =
                        document.querySelector(
                            '.category-button[data-category="todos"]'
                        );


                    categoryButtons.forEach(
                        item => {
                            item.classList.remove("active");
                        }
                    );


                    if (allButton) {
                        allButton.classList.add("active");
                    }


                    currentCategory = "todos";


                    showFavorites.innerHTML =
                        `
                        Ver favoritos
                        <i class="fa-solid fa-arrow-right"></i>
                        `;

                }


                applyFilters();

            }
        );

    }


    /* -----------------------------------------
       VISUALIZAÇÃO
    ----------------------------------------- */

    viewButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                viewButtons.forEach(
                    item => {
                        item.classList.remove("active");
                    }
                );


                button.classList.add("active");


                currentView =
                    button.dataset.view || "grid";


                if (currentView === "list") {

                    documentsGrid.classList.add(
                        "list-view"
                    );

                } else {

                    documentsGrid.classList.remove(
                        "list-view"
                    );

                }

            }
        );

    });


    /* -----------------------------------------
       ADICIONAR DOCUMENTO
    ----------------------------------------- */

    if (addDocumentButton) {

        addDocumentButton.addEventListener(
            "click",
            openAddDocumentModal
        );

    }


    /* -----------------------------------------
       FILTROS
    ----------------------------------------- */

    if (filterButton) {

        filterButton.addEventListener(
            "click",
            () => {

                showFilterMessage();

            }
        );

    }


    /* -----------------------------------------
       INICIALIZAR CARDS
    ----------------------------------------- */

    initializeCards();


    /* -----------------------------------------
       INDICADORES
    ----------------------------------------- */

    updateStatistics();


    /* -----------------------------------------
       CATEGORIAS
    ----------------------------------------- */

    updateCategoryCounters();


    /* -----------------------------------------
       FILTROS INICIAIS
    ----------------------------------------- */

    applyFilters();


    /* =========================================
       FUNÇÕES INTERNAS
    ========================================= */


    /* -----------------------------------------
       INICIALIZAR CARDS
    ----------------------------------------- */

    function initializeCards() {

        documents.forEach(card => {

            const favoriteButton =
                card.querySelector(
                    ".favorite-button"
                );


            if (favoriteButton) {

                favoriteButton.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();

                        event.stopPropagation();


                        toggleFavorite(card);

                    }
                );

            }


            const menuButton =
                card.querySelector(
                    ".document-menu-button"
                );


            if (menuButton) {

                menuButton.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();

                        event.stopPropagation();


                        openDocumentMenu(card);

                    }
                );

            }


            /* ----------------------------------
               CLIQUE NO CARD
            ---------------------------------- */

            card.addEventListener(
                "click",
                event => {

                    if (
                        event.target.closest(
                            ".favorite-button"
                        ) ||
                        event.target.closest(
                            ".document-menu-button"
                        )
                    ) {
                        return;
                    }


                    openDocument(card);

                }
            );

        });

    }


    /* -----------------------------------------
       FAVORITO
    ----------------------------------------- */

    function toggleFavorite(card) {

        const name =
            getDocumentName(card);

        const favoriteButton =
            card.querySelector(
                ".favorite-button"
            );


        if (!name || !favoriteButton) {
            return;
        }


        let favorites =
            getFavorites();


        const index =
            favorites.indexOf(name);


        if (index === -1) {

            favorites.push(name);

            favoriteButton.classList.add(
                "active"
            );

            setFavoriteIcon(
                favoriteButton,
                true
            );

        } else {

            favorites.splice(index, 1);

            favoriteButton.classList.remove(
                "active"
            );

            setFavoriteIcon(
                favoriteButton,
                false
            );

        }


        saveFavorites(favorites);


        updateStatistics();

        updateCategoryCounters();


        if (favoritesOnly) {

            applyFilters();

        }

    }


    /* -----------------------------------------
       ÍCONE FAVORITO
    ----------------------------------------- */

    function setFavoriteIcon(
        button,
        active
    ) {

        const icon =
            button.querySelector("i");


        if (!icon) {
            return;
        }


        if (active) {

            icon.classList.remove(
                "fa-regular"
            );

            icon.classList.add(
                "fa-solid"
            );

        } else {

            icon.classList.remove(
                "fa-solid"
            );

            icon.classList.add(
                "fa-regular"
            );

        }

    }


    /* -----------------------------------------
       CARREGAR FAVORITOS
    ----------------------------------------- */

    function loadFavorites() {

        const favorites =
            getFavorites();


        documents.forEach(card => {

            const name =
                getDocumentName(card);


            const button =
                card.querySelector(
                    ".favorite-button"
                );


            if (!button) {
                return;
            }


            const isFavorite =
                favorites.includes(name);


            if (isFavorite) {

                button.classList.add(
                    "active"
                );

                setFavoriteIcon(
                    button,
                    true
                );

            } else {

                button.classList.remove(
                    "active"
                );

                setFavoriteIcon(
                    button,
                    false
                );

            }

        });

    }


    /* -----------------------------------------
       LOCAL STORAGE
    ----------------------------------------- */

    function getFavorites() {

        try {

            return JSON.parse(
                localStorage.getItem(
                    "seHubBibliotecaFavoritos"
                )
            ) || [];

        } catch (error) {

            return [];

        }

    }


    function saveFavorites(favorites) {

        localStorage.setItem(
            "seHubBibliotecaFavoritos",
            JSON.stringify(favorites)
        );

    }


    /* -----------------------------------------
       FILTROS
    ----------------------------------------- */

    function applyFilters() {

        let visibleCount = 0;


        documents.forEach(card => {

            const category =
                (
                    card.dataset.category ||
                    ""
                ).toLowerCase();


            const name =
                (
                    card.dataset.name ||
                    card.querySelector("h3")?.textContent ||
                    ""
                ).toLowerCase();


            const description =
                (
                    card.querySelector("p")
                        ?.textContent ||
                    ""
                ).toLowerCase();


            const type =
                (
                    card.dataset.type ||
                    ""
                ).toLowerCase();


            const categoryMatch =
                currentCategory === "todos" ||
                category === currentCategory;


            const searchMatch =
                currentSearch === "" ||
                name.includes(currentSearch) ||
                description.includes(currentSearch) ||
                type.includes(currentSearch) ||
                category.includes(currentSearch);


            let favoriteMatch = true;


            if (favoritesOnly) {

                favoriteMatch =
                    getFavorites().includes(
                        getDocumentName(card)
                    );

            }


            const shouldShow =
                categoryMatch &&
                searchMatch &&
                favoriteMatch;


            if (shouldShow) {

                card.classList.remove(
                    "hidden"
                );

                visibleCount++;

            } else {

                card.classList.add(
                    "hidden"
                );

            }

        });


        if (emptyLibrary) {

            if (visibleCount === 0) {

                emptyLibrary.classList.add(
                    "show"
                );

            } else {

                emptyLibrary.classList.remove(
                    "show"
                );

            }

        }

    }


    /* -----------------------------------------
       PEGAR NOME DO DOCUMENTO
    ----------------------------------------- */

    function getDocumentName(card) {

        return (
            card.dataset.name ||
            card.querySelector("h3")
                ?.textContent
                ?.trim() ||
            ""
        );

    }


    /* -----------------------------------------
       ESTATÍSTICAS
    ----------------------------------------- */

    function updateStatistics() {

        const allDocuments =
            documents;


        if (totalDocuments) {

            totalDocuments.textContent =
                allDocuments.length;

        }


        if (pdfDocuments) {

            const pdfCount =
                allDocuments.filter(
                    card =>
                        (
                            card.dataset.type ||
                            ""
                        ).toLowerCase() === "pdf"
                ).length;


            pdfDocuments.textContent =
                pdfCount;

        }


        if (excelDocuments) {

            const excelCount =
                allDocuments.filter(
                    card =>
                        (
                            card.dataset.type ||
                            ""
                        ).toLowerCase() === "excel"
                ).length;


            excelDocuments.textContent =
                excelCount;

        }


        if (recentDocuments) {

            const recentCount =
                allDocuments.filter(
                    card =>
                        isRecent(card)
                ).length;


            recentDocuments.textContent =
                recentCount;

        }

    }


    /* -----------------------------------------
       DOCUMENTO RECENTE
    ----------------------------------------- */

    function isRecent(card) {

        const text =
            card.querySelector(
                ".document-card-footer small"
            )?.textContent
                ?.toLowerCase() || "";


        return (
            text.includes("hoje") ||
            text.includes("ontem") ||
            text.includes("1 dia") ||
            text.includes("2 dias") ||
            text.includes("3 dias") ||
            text.includes("4 dias") ||
            text.includes("5 dias") ||
            text.includes("6 dias")
        );

    }


    /* -----------------------------------------
       CONTADORES DAS CATEGORIAS
    ----------------------------------------- */

    function updateCategoryCounters() {

        categoryButtons.forEach(button => {

            const category =
                button.dataset.category;


            const counter =
                button.querySelector(
                    "strong"
                );


            if (!counter) {
                return;
            }


            if (category === "todos") {

                counter.textContent =
                    documents.length;

                return;

            }


            if (category === "favoritos") {

                counter.textContent =
                    getFavorites().length;

                return;

            }


            const count =
                documents.filter(
                    card =>
                        (
                            card.dataset.category ||
                            ""
                        ).toLowerCase() ===
                        category
                ).length;


            counter.textContent =
                count;

        });

    }


    /* -----------------------------------------
       ABRIR DOCUMENTO
    ----------------------------------------- */

    function openDocument(card) {

        const name =
            getDocumentName(card);


        const type =
            card.dataset.type || "arquivo";


        showToast(
            `Abrindo "${name}"...`,
            "info"
        );


        /*
            FUTURO:

            Aqui podemos colocar o link real
            do arquivo quando começarmos a
            integrar SharePoint / OneDrive.

            Exemplo:

            window.open(card.dataset.url, "_blank");
        */

    }


    /* -----------------------------------------
       MENU DO DOCUMENTO
    ----------------------------------------- */

    function openDocumentMenu(card) {

        closeDocumentMenu();


        const name =
            getDocumentName(card);


        const menu =
            document.createElement("div");


        menu.className =
            "library-document-menu";


        menu.innerHTML =
            `
            <button data-action="open">
                <i class="fa-solid fa-eye"></i>
                Abrir documento
            </button>

            <button data-action="favorite">
                <i class="fa-solid fa-star"></i>
                ${
                    getFavorites().includes(name)
                        ? "Remover dos favoritos"
                        : "Adicionar aos favoritos"
                }
            </button>

            <button data-action="share">
                <i class="fa-solid fa-share-nodes"></i>
                Compartilhar
            </button>

            <button data-action="info">
                <i class="fa-solid fa-circle-info"></i>
                Informações
            </button>
            `;


        document.body.appendChild(menu);


        const rect =
            card
                .querySelector(
                    ".document-menu-button"
                )
                .getBoundingClientRect();


        menu.style.position = "fixed";

        menu.style.top =
            `${rect.bottom + 6}px`;

        menu.style.left =
            `${Math.max(
                10,
                rect.right - menu.offsetWidth
            )}px`;


        menu.addEventListener(
            "click",
            event => {

                const actionButton =
                    event.target.closest(
                        "button"
                    );


                if (!actionButton) {
                    return;
                }


                const action =
                    actionButton.dataset.action;


                closeDocumentMenu();


                if (action === "open") {

                    openDocument(card);

                }


                if (action === "favorite") {

                    toggleFavorite(card);

                }


                if (action === "share") {

                    shareDocument(card);

                }


                if (action === "info") {

                    showDocumentInfo(card);

                }

            }
        );


        setTimeout(() => {

            document.addEventListener(
                "click",
                closeMenuOutside,
                {
                    once: true
                }
            );

        }, 0);


        function closeMenuOutside(event) {

            if (!menu.contains(event.target)) {

                closeDocumentMenu();

            }

        }

    }


    /* -----------------------------------------
       FECHAR MENU
    ----------------------------------------- */

    function closeDocumentMenu() {

        const oldMenu =
            document.querySelector(
                ".library-document-menu"
            );


        if (oldMenu) {

            oldMenu.remove();

        }

    }


    /* -----------------------------------------
       COMPARTILHAR
    ----------------------------------------- */

    function shareDocument(card) {

        const name =
            getDocumentName(card);


        if (
            navigator.share
        ) {

            navigator.share({

                title: name,

                text:
                    `Documento do SE Hub: ${name}`

            }).catch(() => {});

        } else {

            showToast(
                "Compartilhamento não disponível neste navegador.",
                "warning"
            );

        }

    }


    /* -----------------------------------------
       INFORMAÇÕES
    ----------------------------------------- */

    function showDocumentInfo(card) {

        const name =
            getDocumentName(card);


        const category =
            card.querySelector(
                ".document-category"
            )?.textContent
                ?.trim() || "Não informado";


        const type =
            card.querySelector(
                ".document-card-footer span"
            )?.textContent
                ?.trim() || "Não informado";


        const updated =
            card.querySelector(
                ".document-card-footer small"
            )?.textContent
                ?.trim() || "Não informado";


        openModal(
            "Informações do documento",
            `
            <div class="library-info">

                <div>
                    <span>Documento</span>
                    <strong>${escapeHTML(name)}</strong>
                </div>

                <div>
                    <span>Categoria</span>
                    <strong>${escapeHTML(category)}</strong>
                </div>

                <div>
                    <span>Tipo</span>
                    <strong>${escapeHTML(type)}</strong>
                </div>

                <div>
                    <span>Atualização</span>
                    <strong>${escapeHTML(updated)}</strong>
                </div>

            </div>
            `
        );

    }


    /* -----------------------------------------
       MODAL ADICIONAR DOCUMENTO
    ----------------------------------------- */

    function openAddDocumentModal() {

        openModal(
            "Adicionar documento",
            `
            <form id="addDocumentForm">

                <div class="library-form-group">

                    <label>
                        Nome do documento
                    </label>

                    <input
                        type="text"
                        id="newDocumentName"
                        placeholder="Ex.: Manual do equipamento"
                        required>

                </div>


                <div class="library-form-group">

                    <label>
                        Categoria
                    </label>

                    <select
                        id="newDocumentCategory"
                        required>

                        <option value="">
                            Selecione uma categoria
                        </option>

                        <option value="projetos">
                            Projetos
                        </option>

                        <option value="procedimentos">
                            Procedimentos
                        </option>

                        <option value="manuais">
                            Manuais
                        </option>

                        <option value="treinamentos">
                            Treinamentos
                        </option>

                        <option value="outros">
                            Outros
                        </option>

                    </select>

                </div>


                <div class="library-form-group">

                    <label>
                        Tipo do arquivo
                    </label>

                    <select
                        id="newDocumentType"
                        required>

                        <option value="">
                            Selecione o tipo
                        </option>

                        <option value="pdf">
                            PDF
                        </option>

                        <option value="excel">
                            Excel
                        </option>

                        <option value="word">
                            Word
                        </option>

                        <option value="powerpoint">
                            PowerPoint
                        </option>

                    </select>

                </div>


                <div class="library-form-group">

                    <label>
                        Descrição
                    </label>

                    <textarea
                        id="newDocumentDescription"
                        rows="4"
                        placeholder="Descrição do documento..."
                        required></textarea>

                </div>


                <div class="library-form-actions">

                    <button
                        type="button"
                        class="modal-cancel-button"
                        id="cancelAddDocument">

                        Cancelar

                    </button>


                    <button
                        type="submit"
                        class="modal-confirm-button">

                        <i class="fa-solid fa-plus"></i>

                        Adicionar

                    </button>

                </div>

            </form>
            `
        );


        const form =
            document.getElementById(
                "addDocumentForm"
            );


        const cancel =
            document.getElementById(
                "cancelAddDocument"
            );


        if (cancel) {

            cancel.addEventListener(
                "click",
                closeModal
            );

        }


        if (form) {

            form.addEventListener(
                "submit",
                event => {

                    event.preventDefault();


                    const name =
                        document
                            .getElementById(
                                "newDocumentName"
                            )
                            .value
                            .trim();


                    const category =
                        document
                            .getElementById(
                                "newDocumentCategory"
                            )
                            .value;


                    const type =
                        document
                            .getElementById(
                                "newDocumentType"
                            )
                            .value;


                    const description =
                        document
                            .getElementById(
                                "newDocumentDescription"
                            )
                            .value
                            .trim();


                    if (
                        !name ||
                        !category ||
                        !type ||
                        !description
                    ) {

                        showToast(
                            "Preencha todos os campos.",
                            "warning"
                        );

                        return;

                    }


                    addDocumentCard({
                        name,
                        category,
                        type,
                        description
                    });


                    closeModal();


                    showToast(
                        "Documento adicionado com sucesso!",
                        "success"
                    );

                }
            );

        }

    }


    /* -----------------------------------------
       ADICIONAR CARD
    ----------------------------------------- */

    function addDocumentCard(data) {

        const categoryName =
            capitalize(data.category);


        const typeData =
            getTypeData(data.type);


        const card =
            document.createElement("article");


        card.className =
            "document-card";


        card.dataset.category =
            data.category;

        card.dataset.type =
            data.type;

        card.dataset.name =
            data.name;


        card.innerHTML =
            `
            <div class="document-card-top">

                <div class="document-type-icon ${typeData.className}">

                    <i class="${typeData.icon}"></i>

                </div>


                <button class="favorite-button">

                    <i class="fa-regular fa-star"></i>

                </button>

            </div>


            <div class="document-card-body">

                <span class="document-category">

                    ${escapeHTML(categoryName)}

                </span>


                <h3>

                    ${escapeHTML(data.name)}

                </h3>


                <p>

                    ${escapeHTML(data.description)}

                </p>

            </div>


            <div class="document-card-footer">

                <div>

                    <span>

                        ${escapeHTML(typeData.label)}

                    </span>

                    <small>

                        Atualizado hoje

                    </small>

                </div>


                <button class="document-menu-button">

                    <i class="fa-solid fa-ellipsis-vertical"></i>

                </button>

            </div>
            `;


        documentsGrid.prepend(card);


        documents =
            Array.from(
                documentsGrid.querySelectorAll(
                    ".document-card"
                )
            );


        attachCardEvents(card);


        updateStatistics();

        updateCategoryCounters();

        applyFilters();

    }


    /* -----------------------------------------
       EVENTOS DE NOVO CARD
    ----------------------------------------- */

    function attachCardEvents(card) {

        const favoriteButton =
            card.querySelector(
                ".favorite-button"
            );


        if (favoriteButton) {

            favoriteButton.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    event.stopPropagation();

                    toggleFavorite(card);

                }
            );

        }


        const menuButton =
            card.querySelector(
                ".document-menu-button"
            );


        if (menuButton) {

            menuButton.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    event.stopPropagation();

                    openDocumentMenu(card);

                }
            );

        }


        card.addEventListener(
            "click",
            event => {

                if (
                    event.target.closest(
                        ".favorite-button"
                    ) ||
                    event.target.closest(
                        ".document-menu-button"
                    )
                ) {
                    return;
                }


                openDocument(card);

            }
        );

    }


    /* -----------------------------------------
       DADOS DO TIPO
    ----------------------------------------- */

    function getTypeData(type) {

        const types = {

            pdf: {

                label: "PDF",

                icon:
                    "fa-solid fa-file-pdf",

                className:
                    "pdf-file"

            },

            excel: {

                label: "Excel",

                icon:
                    "fa-solid fa-file-excel",

                className:
                    "excel-file"

            },

            word: {

                label: "Word",

                icon:
                    "fa-solid fa-file-word",

                className:
                    "word-file"

            },

            powerpoint: {

                label: "PowerPoint",

                icon:
                    "fa-solid fa-file-powerpoint",

                className:
                    "powerpoint-file"

            }

        };


        return (
            types[type] ||
            types.pdf
        );

    }


    /* -----------------------------------------
       MODAL GENÉRICO
    ----------------------------------------- */

    function openModal(
        title,
        content
    ) {

        closeModal();


        const overlay =
            document.createElement("div");


        overlay.className =
            "library-modal-overlay";


        overlay.id =
            "libraryModal";


        overlay.innerHTML =
            `
            <div class="library-modal">

                <div class="library-modal-header">

                    <div>

                        <span class="section-label">
                            BIBLIOTECA
                        </span>

                        <h2>
                            ${escapeHTML(title)}
                        </h2>

                    </div>


                    <button
                        type="button"
                        class="library-modal-close"
                        id="libraryModalClose">

                        <i class="fa-solid fa-xmark"></i>

                    </button>

                </div>


                <div class="library-modal-body">

                    ${content}

                </div>

            </div>
            `;


        document.body.appendChild(
            overlay
        );


        const closeButton =
            document.getElementById(
                "libraryModalClose"
            );


        if (closeButton) {

            closeButton.addEventListener(
                "click",
                closeModal
            );

        }


        overlay.addEventListener(
            "click",
            event => {

                if (
                    event.target === overlay
                ) {

                    closeModal();

                }

            }
        );


        document.addEventListener(
            "keydown",
            handleModalEscape
        );

    }


    /* -----------------------------------------
       FECHAR MODAL
    ----------------------------------------- */

    function closeModal() {

        const modal =
            document.getElementById(
                "libraryModal"
            );


        if (modal) {

            modal.remove();

        }


        document.removeEventListener(
            "keydown",
            handleModalEscape
        );

    }


    function handleModalEscape(event) {

        if (event.key === "Escape") {

            closeModal();

        }

    }


    /* -----------------------------------------
       TOAST
    ----------------------------------------- */

    function showToast(
        message,
        type = "info"
    ) {

        const oldToast =
            document.querySelector(
                ".library-toast"
            );


        if (oldToast) {

            oldToast.remove();

        }


        const toast =
            document.createElement("div");


        toast.className =
            `library-toast ${type}`;


        let icon =
            "fa-circle-info";


        if (type === "success") {
            icon = "fa-circle-check";
        }


        if (type === "warning") {
            icon = "fa-triangle-exclamation";
        }


        toast.innerHTML =
            `
            <i class="fa-solid ${icon}"></i>

            <span>
                ${escapeHTML(message)}
            </span>
            `;


        document.body.appendChild(
            toast
        );


        setTimeout(
            () => {

                toast.classList.add(
                    "hide"
                );


                setTimeout(
                    () => toast.remove(),
                    300
                );

            },
            3000
        );

    }


    /* -----------------------------------------
       FILTRO
    ----------------------------------------- */

    function showFilterMessage() {

        showToast(
            "Use as categorias ou a pesquisa para filtrar os documentos.",
            "info"
        );

    }


    /* -----------------------------------------
       CAPITALIZAR
    ----------------------------------------- */

    function capitalize(text) {

        if (!text) {
            return "";
        }


        return text.charAt(0).toUpperCase() +
            text.slice(1);

    }


    /* -----------------------------------------
       ESCAPAR HTML
    ----------------------------------------- */

    function escapeHTML(value) {

        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");

    }

}