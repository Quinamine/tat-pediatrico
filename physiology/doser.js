"use strict"
const doserGeneralFunctions = {
    highlightFocusedInput(focusedInput) {
        focusedInput.classList.add("--focus");
    },
    removehighlightFromFocusedInput(focusedInput) {
        focusedInput.classList.remove("--focus");
    },
    openOrCloseSelect() {
        const doserSelect = document.querySelector(".doser__select");
        const selectOfMedicines = document.querySelector(".doser__section--medicines");
        const body = document.querySelector("#body");
        doserSelect.classList.toggle("--open");
        doserGeneralFunctions.highlightFocusedInput(selectOfMedicines);
        body.classList.toggle("--overflow-hidden-on-mobile");
    },
    closeSelect() {
        const doserSelect = document.querySelector(".doser__select");
        const selectOfMedicines = document.querySelector(".doser__section--medicines");
        const body = document.querySelector("#body");
        doserSelect.classList.remove("--open");
        doserGeneralFunctions.removehighlightFromFocusedInput(selectOfMedicines);
        body.classList.remove("--overflow-hidden-on-mobile");
        body.classList.remove("--overflow-hidden-on-mobile");
    },
    selectAnOption(optionToSelect) {
        const options = document.querySelectorAll(".doser__select__option");
        for (const option of options) {
            option.classList.remove("--selected");
        }
        optionToSelect.classList.add("--selected");
    },
    showMinWeightAlert() {
        const alertaDePesoMinimo = document.querySelector(".doser__min-weight-alert");
        alertaDePesoMinimo.textContent = "O peso não deve ser menor que 1.";
        alertaDePesoMinimo.classList.add("--open");
    },
    clearMinWeightAlert() {
        const alertaDePesoMinimo = document.querySelector(".doser__min-weight-alert");
        alertaDePesoMinimo.textContent = "";
        alertaDePesoMinimo.classList.remove("--open");
    },
    clearDoseAndnote() {
        document.querySelector(".doser__section__dose").innerHTML = "";
        let noteOutput = document.querySelector(".doser__section__note");
        noteOutput.innerHTML = "";  
        // remove padding when the note does not have content to avoid bg-color appearing
        noteOutput.classList.add("doser__section__note--no-padding");       
    }
}
class Doser {
    constructor(weight, medicine) {
        this.weight = weight;
        this.medicine = medicine;
    }
    getNotasEprecaucoes() {
        let note;
        if(this.medicine.includes("dfc-ped") && this.weight < 4){
            note = `<b>(1)</b> Descartar a solução de ${this.medicine.split("-ped")[0].toUpperCase()} que sobrar após a administração. <b>(2)</b> <strong>As crianças com TB e com peso inferior a 4 kg, devem ser referidas para internamento.</strong> Devido à especial complexidade para dosificar o tratamento nelas, assim como pela gravidade, estas crianças devem ser geridas inicialmente nas enfermarias de Pediatria.`
        } else if(this.medicine.includes("dfc-ped") && this.weight >= 4 && this.weight < 25) {
            note = `<b>(1)</b> Dissolver o(s) comprimido(s) de ${this.medicine.split("-ped")[0].toUpperCase()} de acordo com o peso da criança e a quantidade de água recomendada. Após a dissolução, administre todo o medicamento de imediato à criança. Se restar algum medicamento no fundo do copo, acrescente um pouco mais de água e administre. <strong>${this.medicine.split("-ped")[0].toUpperCase()}<sup>dispersível</sup> deve sempre ser dissolvido em água. Não deve ser tomado inteiro mesmo que a criança consiga engolir.</strong> <b>(2)</b>&nbsp;Pacientes em TARV com regime contendo Dolutegravir (DTG), devem ajustar a dose de DTG (DTG 12/12 horas) durante o tempo que recebem Rifampicina (contida no ${this.medicine.split("-ped")[0].toUpperCase()}) e por mais 2 semanas. Depois passam a tomar o DTG apenas 1 vez/dia.`;
        } else if(this.medicine === "3dfc-ped" && this.weight >= 25) {
            note = 'Para peso &ge; 25 kg, use <strong>4DFC (RHZE) 150/75/400/275 mg Comp.</strong>'
        } else if(this.medicine === "2dfc-ped" && this.weight >= 25) {
            note = 'Para peso &ge; 25 kg, use <strong>2DFC adulto (RH) 150/75 mg Comp.</strong>'
        } else if(this.medicine.includes("dfc-adulto") && this.weight >= 25) {
            note = `A Rifampicina (incluída no ${this.medicine.split("-adulto")[0].toUpperCase()}) reduz os níveis dos inibidores de protease (IPs) (LPV/r, ATV/r) e da Nevirapina.
            <br>• &nbsp; NVP e Rifampicina: Associação não recomendada;  
            <br>• &nbsp; ATV/r e Rifampicina: Associação não recomendada; 
            <br>• &nbsp; LPV/r e Rifampicina: ajustar a dose de LPV/r (<a href="https://quinamine.github.io/tarv-pediatrico/index.html">Acessar Doseador de ARVs</a> para dosagem do LPV/r e RTV isolado para potenciação (superboosting) durante o TAT). 
            <br>• &nbsp; Os pacientes em TARV com ATV/r ou LPV/r devem substituir o Inibidor da protease por DTG (<strong>Nota:</strong> A decisão de trocar para o regime de resgate deve ser tomada pelo comité terapêutico e deve-se ter em consideração o histórico dos regimes de TARV prévios do paciente). 
            <br>• &nbsp; A dose de DTG deve ser ajustada durante o tempo que o paciente recebe tratamento com Rifampicina e por mais 2 semanas. O ajuste deste medicamento é feito da seguinte forma: duplicar a dose diária de DTG (DTG 12/12 horas, até o fim do tratamento de TB e por mais 2 semanas). 
            <br><strong>Todos os pacientes que iniciam DTG no sector de PNCT, mantêm este tratamento após terem alta do sector.</strong>`
        } else if(this.medicine  === "4dfc-adulto" && this.weight < 25) {
            note = 'Para peso &lt; 25 kg, use <strong>3DFC (RHZ) 75/50/150 mg Comp.</strong> e <strong>Etambutol 100 mg Comp.</strong>'
        } else if(this.medicine  === "2dfc-adulto" && this.weight < 25) {
            note = 'Para peso &lt; 25 kg, use <strong>2DFC pediátrico (RH) 75/50 mg Comp.</strong>'
        } else if(this.medicine === "e100" && this.weight < 4) {
            note = '<b>(1)</b> Os comprimidos de Etambutol devem ser esmagados e administrados com água em separado do 3DFC ou, para os que conseguem engolir, podem tomar sem esmagar. <b>(2)</b> <strong>As crianças com TB e com peso inferior a 4 kg, devem ser referidas para internamento.</strong> Devido à especial complexidade para dosificar o tratamento nelas, assim como pela gravidade, estas crianças devem ser geridas inicialmente nas enfermarias de Pediatria.'
        } else if(this.medicine === "e100" && this.weight < 25) {
            note = 'Os comprimidos de Etambutol devem ser esmagados e administrados com água em separado do 3DFC ou, para os que conseguem engolir, podem tomar sem esmagar.'
        } else if(this.medicine ==="e100" && this.weight >= 25) {
            note = 'O <b>Etambutol 100 mg Comp.</b> está indicado para crianças com peso &lt; 25 kg.'
        } else if(this.medicine.includes("bdq-100") && this.weight >= 30) {
            note = '<b>(1)</b> *Dose de indução durante as 2 primeiras semanas. <b>(2)</b> Bedaquilina e Inibidores da protease (ATV/r, LPV/r): evitar combinação sempre que possível. IPs aumentam os níveis de Bedaquilina, com risco aumentado de toxicidade cardíaca e hepática. <strong>Em resumo, em pacientes em tratamento com o regime padrão para TB-MR, é preferível a combinação de TAT com um esquema de TARV contendo Dolutegravir.</strong>'
        } else if(this.medicine.includes("lzd-600") && this.weight >= 30) {
            note = '<b>(1)</b> No regime padronizado, Linezolide é administrado apenas durante a fase intensiva. <b>(2)</b> AZT e Linezolide: evitar essa combinação pelo risco de mielotoxicidade (anemia, neutropenia, trombocitopenia).'
        } else if(this.medicine.includes("cs-250") && this.weight >= 30) {
            note = 'Se intolerância, dividir a dose em 2 tomas diárias.'
        } else if(this.medicine ==="piridoxina-50mg" && this.weight < 5) {
            note = 'Para peso &lt; 5 kg, use <strong>Piridoxina 25 mg Comp.</strong>'
        }  else {
            note = "";
        }
        return note;
    }
    determinarDose() {
        let dose, posologia = "/dia";
        let weight = this.weight;
        if(this.medicine.includes("dfc-ped") && weight < 4) {
            let doseEmMl, doseEmCp;
            weight < 2 ? (doseEmMl = 2.5, doseEmCp = "<sup>1</sup>/<sub>4</sub>")
            : weight < 3 ? (doseEmMl = 5, doseEmCp = "<sup>1</sup>/<sub>2</sub>")
            : (doseEmMl = 7.5, doseEmCp = "<sup>3</sup>/<sub>4</sub>");
            return this.printDoseDispersivelSePesoMenorQ4kg(doseEmMl, doseEmCp);
        } else if(this.medicine === "e100" && weight < 4) {
            weight < 2 ? dose = 0.25
            : weight < 3 ? dose = 0.5 
            : dose = 0.75;
        } else if(this.medicine.includes("dfc-ped") || this.medicine === "e100") {
            dose = weight < 8 && weight >= 4 ? 1
            : weight < 12 ? 2
            : weight < 16 ? 3
            : 4;
            if(weight >= 25) return '<p class="doser__section__note">Ver <b>Notas e Precauções</b>.</p>';
        } else if(this.medicine.includes("dfc-adulto")) {
            if(weight < 25) return '<p class="doser__section__note">Ver <b>Notas e Precauções</b>.</p>';
            dose = weight < 40 ? 2
            : weight < 55 ? 3
            : weight < 71 ? 4
            : 5;
        } else if(this.medicine.includes("-2a-linha") && weight < 30) {
            return this.alertarMinPesoDeveSer30();
        } else if(this.medicine.includes("bdq-100")) {
            return this.printDoseDeBdqPeso30ouMais();
        } else if(this.medicine.includes("lzd-600")) {
            dose = weight < 36 ? 0.5 : 1;
        } else if(this.medicine.includes("lfx-250")) {
            dose = weight < 46 ? 3 : 4;
        } else if(this.medicine.includes("cfz-100")) {
            weight >= 30 && (dose = 1);
        } else if(this.medicine.includes("cs-250")) {
            dose = weight < 56 ? 2 : 3;
        } else if(this.medicine === "piridoxina-25mg") {
            weight < 5 ? (dose = 0.5, posologia = " 3 vezes/semana")
            : dose = weight < 8 ? 0.5
            : weight < 15 ? 1
            : 2;
        } else if(this.medicine === "piridoxina-50mg") {
            if(weight < 5) return '<p class="doser__section__note">Ver <b>Notas e Precauções</b>.</p>';
            weight < 15 ? (dose = 0.5, posologia = " 3 vezes/semana")
            : dose = 1;
        }
        return this.printDoseEmCp(dose, posologia);
    }
    printDoseEmCp(dose, posologia) {
        if(this.medicine.includes("dfc-ped")) {
            return this.printDoseDispersivel(dose, (dose * 10));
        }
        let numeroDetomasPorSemana; // Variável essencial para o cálculo de dispensa para 14 ou 28 dias;
        posologia.includes("3 vezes/semana") ? numeroDetomasPorSemana = 3 : numeroDetomasPorSemana = 7;

        return `<table class="table table--grayscale table--layout-fixed table--no-margin-b">
            <thead class="table__header table__header--bg-color-grayscale">
                <tr class="--border-t">
                    <th class="table__cell" colspan="2">Dose</th> 
                </tr>
            </thead>
            <tbody>
                <tr class="--border-t">
                    <td class="table__cell" colspan="2">${this.converterDoseDecimalEmFracao(dose)} cp(s)${posologia}</td> 
                </tr>
                <tr class="table__header table__header--bg-color-grayscale --border-t">
                    <td class="table__cell">Dispensa para <br>14 dias</td> 
                    <td class="table__cell">Dispensa para <br>28 dias</td>
                </tr>
                <tr class="--border-b --border-t">
                    <td class="table__cell">${this.calcularDispensaPara2semanas(dose, numeroDetomasPorSemana)} cp(s)</td> 
                    <td class="table__cell">${this.calcularDispensaPara4semanas(dose, numeroDetomasPorSemana)} cp(s)</td>
                </tr>                   
            </tbody>
        </table>`
    }
    printDoseDispersivel(dose, qtdDeAguaParaDiluicao) {
        return `<table class="table table--grayscale table--layout-fixed table--no-margin-b">
            <thead class="table__header table__header--bg-color-grayscale">
                <tr class="--border-t">
                    <th class="table__cell">Dose</th> 
                    <th class="table__cell">Quantidade de água <br>para diluição</th>
                </tr>
            </thead>
            <tbody>
                <tr class="--border-t">
                    <td class="table__cell">${dose} cp(s)/dia</td> 
                    <td class="table__cell">${qtdDeAguaParaDiluicao} ml</td>
                </tr>
                <tr class="table__header table__header--bg-color-grayscale --border-t">
                    <td class="table__cell">Dispensa para <br>14 dias</td> 
                    <td class="table__cell">Dispensa para <br>28 dias</td>
                </tr>
                <tr class="--border-b --border-t">
                    <td class="table__cell">${this.calcularDispensaPara2semanas(dose, 7)} cp(s)</td> 
                    <td class="table__cell">${this.calcularDispensaPara4semanas(dose, 7)} cp(s)</td>
                </tr>                   
            </tbody>
        </table>` 
    }
    printDoseDispersivelSePesoMenorQ4kg(doseEmMl, doseEmCp) {
        return `<table class="table table--grayscale table--layout-fixed table--no-margin-b">
            <thead class="table__header table__header--bg-color-grayscale">
                <tr class="--border-t">
                    <th class="table__cell">Diluir</th> 
                    <th class="table__cell">Administrar</th>
                </tr>
            </thead>
            <tbody>
                <tr class="--border-t">
                    <td class="table__cell">1 comprimido em 10 ml de água</td> 
                    <td class="table__cell"> ${doseEmMl} ml da diluição - correspondente a ${doseEmCp} do comprimido </td>
                </tr>
                <tr class="table__header table__header--bg-color-grayscale --border-t">
                    <td class="table__cell">Dispensa para <br>14 dias</td> 
                    <td class="table__cell">Dispensa para <br>28 dias</td>
                </tr>
                <tr class="--border-b --border-t">
                    <td class="table__cell">14 cp(s)</td> 
                    <td class="table__cell">28 cp(s)</td>
                </tr>                   
            </tbody>
        </table>` 
    }
    printDoseDeBdqPeso30ouMais() {
        return `<table class="table table--grayscale table--layout-fixed table--no-margin-b">
            <thead class="table__header table__header--bg-color-grayscale">
                <tr class="--border-t">
                    <th class="table__cell">Dose inicial</th> 
                    <th class="table__cell">Após 14 dias</th>
                </tr>
            </thead>
            <tbody>
                <tr class="--border-t">
                    <td class="table__cell">
                        400 mg (4 cps)* uma vez/dia por 14 dias
                    </td> 
                    <td class="table__cell">
                    Diminuir para 200 mg (2 cps) nas Segundas, Quartas e Sextas feiras
                    </td>
                </tr>                
            </tbody>
        </table>` 
    }
    converterDoseDecimalEmFracao(doseDecimal) {
        return doseDecimal === 0.25 ? doseDecimal = "<sup>1</sup>/<sub>4</sub>"
        : doseDecimal === 0.5 ? doseDecimal = "<sup>1</sup>/<sub>2</sub>"
        : doseDecimal === 0.75 ? doseDecimal = "<sup>3</sup>/<sub>4</sub>"
        : doseDecimal = doseDecimal;
    }
    calcularDispensaPara2semanas(dose, numeroDetomasPorSemana) {
        return dose * numeroDetomasPorSemana * 2; // Em que 2 corresponde as semanas de dispensa;
    }
    calcularDispensaPara4semanas(dose, numeroDetomasPorSemana) {
        return dose * numeroDetomasPorSemana * 4; // Em que 4 corresponde as semanas de dispensa;
    }
    alertarMinPesoDeveSer30() {
        return '<p class="doser__section__note">O Doseador de MATs da 2ª linha não prevê dosagem para crianças com peso < 30 kg.</p>';
    }
}
function instantiateDoser() {
    let weight = document.querySelector(".doser__input--weight").value;
    if(weight !== "" && weight < 1) {
        doserGeneralFunctions.showMinWeightAlert();
        doserGeneralFunctions.clearDoseAndnote();
    } else if(weight !== "" && weight >= 1) {
        doserGeneralFunctions.clearMinWeightAlert();
        doserGeneralFunctions.clearDoseAndnote();
        const medicines = document.querySelectorAll(".doser__select__option");
        let selectedMedicine;
        for (const medicine of medicines) {
            if(medicine.matches(".--selected")) {
                selectedMedicine = medicine;
            }
        }
        // Se não for option de placeholder
        if(selectedMedicine.dataset.nameofthemedicine) {
            selectedMedicine = selectedMedicine.dataset.nameofthemedicine;
            let doserObject = new Doser(weight, selectedMedicine);
            let doseOutput = document.querySelector(".doser__section__dose");
            let noteOutput = document.querySelector(".doser__section__note");
            doseOutput.innerHTML = doserObject.determinarDose();
            noteOutput.innerHTML = doserObject.getNotasEprecaucoes();
            // Add Padding to the note when it has some content or remove when it does not to avoid bg-color appearing
            noteOutput.textContent !== "" ? noteOutput.classList.remove("doser__section__note--no-padding")
            : noteOutput.classList.add("doser__section__note--no-padding");
        }
    } else {
        doserGeneralFunctions.clearMinWeightAlert();
        doserGeneralFunctions.clearDoseAndnote();
    }
}
function listenToDoserEvents() {
     // Highlight focused input
     const inputForWeight = document.querySelector(".doser__input--weight");
     inputForWeight.addEventListener("focusin", () => doserGeneralFunctions.highlightFocusedInput(inputForWeight.parentElement));
     // Remove highlight from the input
     inputForWeight.addEventListener("focusout", () => doserGeneralFunctions.removehighlightFromFocusedInput(inputForWeight.parentElement));
    // Toggle select (Open or Close);
    const selectOpeners = document.querySelectorAll(".doser__select__option, .select-opener");
    selectOpeners.forEach(opener => {
        opener.addEventListener("click", () => {
            if(opener.dataset.isnotamedicine) return false;
            doserGeneralFunctions.openOrCloseSelect();
        });
    });
    // Close select by clicking anywhere 
    window.addEventListener("click", event => {
        !event.target.matches(".doser__select, .doser__select *, .select-opener") && doserGeneralFunctions.closeSelect();
    });
    // Select an option
    const medicines = document.querySelectorAll(".doser__select__option");
    medicines.forEach( medicine => {
        medicine.addEventListener("click", () => {
            if(medicine.dataset.isnotamedicine) return false;
            doserGeneralFunctions.selectAnOption(medicine);
        });
    });
    // Determine doses
    inputForWeight.addEventListener("input", instantiateDoser);
    const medicinesAndMenuTabs = document.querySelectorAll(".doser__select__option, .header__main-menu__btn");
    medicinesAndMenuTabs.forEach( target => {
        target.addEventListener("click", instantiateDoser);
    });
}
window.addEventListener("load", listenToDoserEvents);