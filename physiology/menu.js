"use strict"
const menu = {
    openOrCloseMeatBalls() {
        const meatBallsMenuContent = document.querySelector(".meatballs-menu-expanded");
        meatBallsMenuContent.classList.toggle("--open");
    },
    closeMeatBalls() {
        const meatBallsMenuContent = document.querySelector(".meatballs-menu-expanded");
        meatBallsMenuContent.classList.remove("--open");
    },
    openArticle(article) {
        article.classList.add("--open");
    },
    closeArticle(article) {
        article.classList.remove("--open");
    },
    filtrarEstadioClinicoOMS(classNameDoEstadioSelecionado) {
        const estadios = document.querySelectorAll(".estadio");
        for (const estadio of estadios) {
            if(classNameDoEstadioSelecionado === "todos") {
                estadio.classList.remove("--display-none");
            } else {
                estadio.classList.add("--display-none");
                let estadioSelecionado = document.querySelector(`.${classNameDoEstadioSelecionado}`);
                estadioSelecionado.classList.remove("--display-none");
            }
        }
    },
    showCurrentTabDoser(currentTab) {
        // Change Doser and Document Title
        const doserTitle = document.querySelector(".doser__title");
        doserTitle.textContent = currentTab.title;
        // Show current tab article
        currentTab.classList.add("header__main-menu__btn--current");
        // Show currentTab Medicines
        const doserOptgroups = document.querySelectorAll(".doser__select__optgroup");
        const currenTabMedicines = document.querySelectorAll(`.${currentTab.dataset.optgroup}`);
        for (const optgroup of doserOptgroups) {
            optgroup.classList.add("--display-none");
        }
        for (const medicine of currenTabMedicines) {
            medicine.classList.remove("--display-none");
        }
        // Select currentTab default medicine
        const labelForSelect = document.querySelector(".doser__label--medicine");
        const inputTypeSearchIntoSelect = document.querySelector(".doser__select__searching-box");
        
        let options = document.querySelectorAll(".doser__select__option");
        for (const option of options) {
            option.classList.remove("--selected");
        }
        let defaultOption;
        if(currentTab.title === "Doseador de Antirretrovirais") {
            defaultOption = document.querySelector(".doser__select__option--placeholder");
            inputTypeSearchIntoSelect.classList.remove("--display-none");
            labelForSelect.textContent = "ARV:";    
        } else {
            defaultOption = document.querySelectorAll(`.${currentTab.dataset.optgroup} li`)[0];
            inputTypeSearchIntoSelect.classList.add("--display-none");
            labelForSelect.textContent = "Fármaco:"; 
        }
        defaultOption.classList.add("--selected");
    }
}
function listenToEvents() {
    // Open & close meatBalls-menu by clicking the menu
    const meatBallsMenu = document.querySelector(".meatballs-menu");
    meatBallsMenu.addEventListener("click", menu.openOrCloseMeatBalls);
    // Close meatBalls-menu by clicking anywhere
    window.addEventListener("click", event => {
        if(!event.target.matches(".meatballs-menu, .meatballs-menu__dot")) {
            menu.closeMeatBalls();
        }
    });
    // Open meatBalls-menu articles
    const meatBallsMenuOptions = document.querySelectorAll(".meatballs-menu-expanded__option");
    meatBallsMenuOptions.forEach( option => {
        option.addEventListener("click", () => {
            if(option.dataset.article) {
                const relatedArticle = document.querySelector(`.${option.dataset.article}`);
                menu.openArticle(relatedArticle);
                document.body.classList.add("--overflow-h"); // Add Overflow: hidden to the body
                document.querySelector(".blurringDiv").classList.add("on"); // Blur bg-color
            }
        });
    });
    // Close meatBalls-menu articles
    const btnsMenuArticleClosers = document.querySelectorAll(".article__section__btn--close");
    btnsMenuArticleClosers.forEach( btn => {
        btn.addEventListener("click", () => {
            menu.closeArticle(btn.parentElement);
            document.body.classList.remove("--overflow-h"); // Remove Overflow: hidden from the body
            document.querySelector(".blurringDiv").classList.remove("on"); // Light bg-color
        });
    });
    // Open main-menu-tabs;
    const menuTabs = document.querySelectorAll(".header__main-menu__btn");
    menuTabs.forEach( tab => {
        tab.addEventListener("click", () => menu.showCurrentTabDoser(tab));
    });
    // Filter VIH Clinical Stage
    const selectDeEstadios = document.querySelector(".article__staging__select");
    selectDeEstadios.addEventListener("change", () => {
        let classNameDoEstadioSelecionado = selectDeEstadios.options[selectDeEstadios.selectedIndex].value;
        menu.filtrarEstadioClinicoOMS(classNameDoEstadioSelecionado);
    });
    // Share
    let data = {
        title: "TAT Pediátrico",
        text: 'O TAT Pediátrico</b> é um serviço online gratuito com um Doseador de medicamentos anti-tuberculose (MATs) que, de acordo com o peso inserido pelo usuário, determina automaticamente doses terapêuticas dos MATs para crianças e adolescentes em tratamento anti-tuberculose (TAT), e um Doseador de piridoxina para profilaxia de Neuropatia Periférica. O serviço é baseado no guião "Avaliação e manejo de pacientes com Tuberculose, Protocolos Nacionais, 2019" actualmente vigente no Serviço Nacional de Saúde (SNS) em Moçambique.',
        url: "https://quinamine.github.io/tat-pediatrico/index.html"
    }
    let btnShare = document.querySelector(".meatballs-menu-expanded__option--share");
    btnShare.addEventListener("click", () => {
        try {
            navigator.share(data).then( () => {
                console.log("Partilha bem sucedida.");
            }).catch(error => {
                console.log(`Não foi possível partilhar o Tarv Pediátrico devido ao erro: ${error}.`);
            });
        } catch (error) {
            console.log('O seu navegador não tem suporte ao método "navigator.share()".');
        }
    });
};
window.addEventListener("load", listenToEvents);
