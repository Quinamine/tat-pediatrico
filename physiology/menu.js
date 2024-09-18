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
    showCurrentTabDoser(currentTab) {
        // Change Doser and Document Title
        const doserTitle = document.querySelector(".doser__title");
        doserTitle.textContent = currentTab.title;
        // highlight current btn menu
        const mainMenuTabs = document.querySelectorAll(".header__main-menu__btn");
        for (const menuTab of mainMenuTabs) {
            menuTab.classList.remove("header__main-menu__btn--current");
        }
        currentTab.classList.add("header__main-menu__btn--current");
        // Show currentTab Medicines
        const doserOptgroups = document.querySelectorAll(".doser__select__optgroup");
        const currenTabMedicines = document.querySelector(`.${currentTab.dataset.optgroup}`);
        for (const optgroup of doserOptgroups) {
            optgroup.classList.add("--display-none");
        }
        currenTabMedicines.classList.remove("--display-none");
        // Select currentTab default medicine
        let options = document.querySelectorAll(".doser__select__option");
        for (const option of options) {
            option.classList.remove("--selected");
        }
        let defaultOption;
        if(currentTab.title === "Doseador de Piridoxina") {
            defaultOption = document.querySelector(".doser__select__option--vit-b6-25mg"); 
        } else {
            defaultOption = document.querySelector(".doser__select__option--placeholder"); 
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
                document.querySelector(".blurringDiv").classList.add("on"); // Blur background
            }
        });
    });
    // Close meatBalls-menu articles
    const btnsMenuArticleClosers = document.querySelectorAll(".article__section__btn--close");
    btnsMenuArticleClosers.forEach( btn => {
        btn.addEventListener("click", () => {
            menu.closeArticle(btn.parentElement);
            document.body.classList.remove("--overflow-h"); // Remove Overflow: hidden from the body
            document.querySelector(".blurringDiv").classList.remove("on"); // Light background
            // If article === article__section--efeitos-adversos
            const details = document.getElementsByTagName("details");
            for (const d of details) {
                d.removeAttribute("open");
            }
        });
    });
    // Open main-menu-tabs;
    const mainMenuBtns = document.querySelectorAll(".header__main-menu__btn");
    mainMenuBtns.forEach( btn => {
        btn.addEventListener("click", () => menu.showCurrentTabDoser(btn));
    });
    // Share
    let data = {
        title: "TAT Pediátrico",
        text: "O TAT Pediátrico doseia automaticamente fármacos anti-tuberculose e piridoxina de acordo com o peso inserido pelo usuário. Tem como referência o guião de Avaliação e manejo de pacientes com Tuberculose, Protocolos Nacionais, 2019 que, até a altura da publicação do TAT (Agosto/2024), ainda estava em vigor no Serviço Nacional de Saúde em Moçambique.",
        url: "https://quinamine.github.io/tat-pediatrico/index.html"
    }
    let btnShare = document.querySelector(".meatballs-menu-expanded__option--share");
    btnShare.addEventListener("click", () => {
        try {
            navigator.share(data).then( () => {
                console.log("Partilha bem sucedida.");
            }).catch(error => {
                console.log(`Não foi possível partilhar o TAT Pediátrico devido ao erro: ${error}.`);
            });
        } catch (error) {
            console.log('O seu navegador não tem suporte ao método "navigator.share()".');
        }
    });
};
window.addEventListener("load", listenToEvents);
