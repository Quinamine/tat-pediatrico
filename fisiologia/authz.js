location.href.includes('authz=1') && (() => {
    const body = document.querySelector("body");
    const firstDialogBox = document.querySelector(".dialog-box-default--bibliography");
    const caixaAlerta = document.querySelector(".caixa-alerta");
    const desfoque = document.querySelector(".blurring-div");
    body.classList.remove("--overflow-h");
    firstDialogBox.classList.remove("--display-none");
    caixaAlerta.classList.add("--display-none");
    desfoque.classList.remove("--on");
})();