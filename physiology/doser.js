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
        doserSelect.classList.toggle("--open");
        const selectOfMedicines = document.querySelector(".doser__section--medicines");
        doserGeneralFunctions.highlightFocusedInput(selectOfMedicines);
    },
    closeSelect() {
        const doserSelect = document.querySelector(".doser__select");
        doserSelect.classList.remove("--open");
        // Clear input-search of select
        const inputTypeSearchIntoSelect =  document.querySelector(".doser__select__input--search")
        inputTypeSearchIntoSelect.value = "";
        // Show hidden options
        const optGroupAndOptions = document.querySelectorAll(".doser__optgroup__title, .doser__select__option");
        for (const opt of optGroupAndOptions) {
            opt.classList.remove("--display-none");
        }
        const selectOfMedicines = document.querySelector(".doser__section--medicines");
        doserGeneralFunctions.removehighlightFromFocusedInput(selectOfMedicines);
    },
    selectAnOption(optionToSelect) {
        const options = document.querySelectorAll(".doser__select__option");
        for (const option of options) {
            option.classList.remove("--selected");
        }
        optionToSelect.classList.add("--selected");
    },
    filterAnOption(query) {
        function trimAndLowerStr(str) {
            return str.replaceAll(/\W/g, "").toLowerCase();
        }
        function showOrHideElement(action, element) {
            action === "show" ? element.classList.remove("--display-none")
            : element.classList.add("--display-none")
        }

        // Filter or Search options
        query = trimAndLowerStr(query);
        const options = document.querySelectorAll(".doser__select__option");
        for (const option of options) {
            trimAndLowerStr(option.textContent).includes(query) ? showOrHideElement("show", option)
            : showOrHideElement("hide", option);
        }

        // Filter Optgroups
        const optgroups = document.querySelectorAll(".doser__select__optgroup");
        for (const optgroup of optgroups) {
            if(trimAndLowerStr(optgroup.textContent).includes(query)) {
                showOrHideElement("show", optgroup);

                let optionsRelated = optgroup.parentElement.querySelectorAll(".doser__select__option");
                for (const option of optionsRelated) {showOrHideElement("show", option)}
            } else {
                showOrHideElement("hide", optgroup);
            }
        }
    },
    showMinWeightAlert() {
        const alertaDePesoMinimo = document.querySelector(".doser__min-weight-alert");
        alertaDePesoMinimo.textContent = "O peso não deve ser menor que 3.";
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
    getUnidadeDaDose() {
        return this.medicine.includes("susp") ? "ml" 
        : this.medicine.includes("saquetas") ? "saquetas" 
        : "cp(s)";
    }
    getNotasEprecaucoes() {
        let note;
        if(this.medicine === "abc/3tc-120/60mg" && this.weight >= 25) {
            note = 'Para peso &ge; 25 kg, use <strong>ABC/3TC 600 mg/300 mg Comp.</strong>';
        } else if(this.medicine === "abc/3tc-600/300mg" && this.weight < 25) {
            note = 'Para peso &lt; 25 kg, use <strong>ABC/3TC 120 mg/60 mg Comp.</strong>'
        } else if(this.medicine === "pDtg-10mg" && this.weight >= 20 && this.weight < 25) {
            note = '*Esta dosagem é prevista para uso <strong>APENAS</strong> na ausência de comprimidos de DTG 50 mg. Para peso &ge; 20 kg, recomenda-se <strong>DTG 50 mg Comp.</strong>'
        } else if(this.medicine === "pDtg-10mg" && this.weight >= 25) {
            note = 'Para peso &ge; 20 kg, recomenda-se <strong>DTG 50 mg Comp.</strong>'
        } else if(this.medicine === "dtg-50mg" && this.weight < 20) {
            note = 'Para peso &lt; 20 kg, use <strong>pDTG 10 mg Comp.</strong>'
        }  else if(this.medicine === "pDtg-10mg" && this.weight < 20 || this.medicine === "dtg-50mg" && this.weight >= 20) {
            note = '<b>(1)</b> Não é recomendado tomar o DTG ao mesmo tempo que as vitaminas, sal ferroso, fenitoína ou antiácidos, pois reduzem  a concentração plasmática do DTG. Nestes casos, recomenda-se tomar o DTG no mínimo 2 horas antes ou 6 horas depois da toma desses medicamentos. <b>(2)</b> Pacientes que estiverem a usar a Rifampicina (RIF) devem ajustar a dose de DTG (DTG 12/12 horas)</b> durante o tempo que recebem RIF e por mais 2 semanas. Depois passam a tomar o DTG apenas 1 vez/dia.'
        } else if(this.medicine === "tdf/3tc/dtg" && this.weight < 30) {
            note = 'O <b>TDF/3TC/DTG 300/300/50 mg Comp.</b> não é recomendado para crianças com peso &lt;  30 kg.'
        } else if(this.medicine === "lpv/r-40/10mg-saquetas" && this.weight >= 20) {
            note = 'Para peso &ge; 20 kg, use <strong>LPV/r 100 mg/25 mg Comp.</strong> ou <strong>LPV/r 200 mg/50 mg Comp.</strong>'
        } else if(this.medicine === "lpv/r-100/25mg" && this.weight < 10 || this.medicine === "lpv/r-200/50mg" && this.weight < 10) {
            note = 'Para peso &lt; 10 kg, use <strong>LPV/r 40 mg/10 mg Saquetas</strong>.'
        } else if(this.medicine === "lpv/r-200/50mg" && this.weight < 14) {
            note = 'Para peso &lt; 14 kg, use <strong>LPV/r 40 mg/10 mg Saquetas</strong> ou <strong>LPV/r 100 mg/25 mg Comp.</strong>'
        } else if(this.medicine === "lpv/r-100/25mg" && this.weight >= 10 || this.medicine === "lpv/r-200/50mg" && this.weight >= 14) {
            note = 'Deve-se engolir inteiro. Este comprimido não se parte, não se esmaga e não se dissolve em líquidos. Caso não consiga engolir inteiro, deve tomar <b>LPV/r 40 mg/10 mg Saquetas</b>.'
        } else if(this.medicine === "azt-susp" && this.weight >= 14) {
            note = 'O <b>AZT 10 mg/ml Xarope</b> recomenda-se para crianças com peso &lt; 14 kg.'
        } else if(this.medicine === "duovir-ped" && this.weight >= 25) {
            note = 'Para peso &ge; 25 kg, use <strong>AZT/3TC 300 mg/150 mg Comp.</strong>'
        } else if(this.medicine === "duovir-adult" && this.weight < 14) {
            note = 'Para peso &lt; 14 kg, use <strong>AZT/3TC 60 mg/30 mg Comp.</strong>'
        } else if(this.medicine === "tdf/3tc" && this.weight < 30) {
            note = 'O <b>TDF/3TC 300 mg/300 mg Comp.</b> não é recomendado para crianças com peso &lt;  30 kg.'
        } else if(this.medicine === "tdf/3tc/efv" && this.weight < 30) {
            note = 'O <b>TDF/3TC/EFV 300/300/400 mg Comp.</b> não é recomendado para crianças com peso &lt;  30 kg.'
        } else if(this.medicine === "efv" && this.weight < 10) {
            note = 'O <b>EFV 200 mg Comp.</b> não é recomendado para crianças com peso &lt; 10 kg.'
        } else if(this.medicine === "atv/r" && this.weight < 25) {
            note = 'O <b>ATV/r 300 mg/100 mg Comp.</b> não é recomendado para crianças com peso &lt; 25 kg.'
        } else if(this.medicine === "rtv-100-superboosting" && this.weight < 10) {
            note = 'O <b>RTV 100 mg Comp. <sup>(para&nbsp;superboosting)</sup></b> recomenda-se a partir de 10 kg.'
        } else if(this.medicine.includes("drv") && this.weight < 14) {
            note = 'O <b>Darunavir</b> recomenda-se a partir de 14 kg.'
        } else if(this.medicine === "drv-75" && this.weight >= 25 && this.weight < 30) {
            note = 'Para peso &ge; 25 kg, use <strong>DRV 150 mg Comp.</strong> ou <strong>DRV 600 mg Comp.</strong>'
        } else if(this.medicine === "drv-75" && this.weight >= 30) {
            note = 'Para peso &ge; 30 kg, use <strong>DRV 600 mg Comp.</strong>'
        } else if(this.medicine === "drv-600" && this.weight >= 14 && this.weight < 25) {
            note = '*Esta dosagem é prevista para uso <strong>APENAS</strong> na ausência de comprimidos de DRV de 75 ou 150 mg.</strong>'
        } else if(this.medicine === "rtv-100-3alinha" && this.weight < 14) {
            note = 'O <strong>RTV 100 mg Comp. <sup>(na&nbsp;3ª&nbsp;linha&nbsp;com&nbsp;DRV)</strong> recomenda-se a partir de 10 kg.'
        } else if(this.medicine === "ctz-susp" && this.weight >= 25) {
            note = 'Para peso &ge; 25 kg, use <strong>Cotrimoxazol 480 mg Comp.</strong>'
        } else if(this.medicine === "inh-300" && this.weight < 25) {
            note = 'Para peso &lt; 25 kg, use <strong>Isoniazida 100 mg Comp.</strong>'
        } else if(this.medicine.includes("3hp") && this.weight < 10) {
            note = '<strong>Oferecer profilaxia com Isoniazida (TPT - INH).</strong>'
        } else if(this.medicine=== "3hp-100/150" && this.weight >= 30) {
            note = 'Para peso &ge; 30 kg, recomenda-se <strong>Isoniazida/Rifapentina 300 mg/300 mg Comp.<sup>(3HP em DFC)</sup></strong> ou, na ausência desse, <strong>Isoniazida 300 mg e Rifapentina 150 mg Comp.<sup>(3HP não DFC)</sup></strong>'
        } else if(this.medicine=== "3hp-300/150" && this.weight >= 16 && this.weight < 24) {
            note = '*Caso tenha apenas comprimidos de Isoniazida 300 mg disponível, <strong>a dosagem é de 1.5 comprimidos por semana.</strong>'
        } else if(this.medicine=== "3hp-300/150" && this.weight >= 30) {
            note = 'Prefira usar <strong>Isoniazida/Rifapentina 300 mg/300 mg Comp.<sup>(3HP em DFC)</sup></strong> (menor quantidade de comprimidos).'
        } else if(this.medicine=== "3hp-300/300-dfc" && this.weight < 30) {
            note = 'Para peso &lt; 30 kg, recomenda-se <strong>Isoniazida 100 mg e Rifapentina 150 mg Comp.<sup>(3HP não DFC)</sup></strong> ou <strong>Isoniazida 300 mg e Rifapentina 150 mg Comp.<sup>(3HP não DFC)</sup></strong>'
        }  else if(this.medicine === "lfx-100" && this.weight >= 16 && this.weight < 26) {
            note = '*Crianças com peso &ge; 16 kg que consigam engolir comprimidos inteiros, passar para comprimidos de 250 mg. <br/> Se o caso fonte tiver resistência comprovada a Fluroquinolonas, não deve ser oferecido TPT.</strong>'
        } else if(this.medicine === "lfx-100" && this.weight >= 26) {
            note = 'Para peso &ge; 26 kg, recomenda-se <strong>Levofloxacina 250 mg Comp.</strong>'
        } else if(this.medicine === "lfx-250" && this.weight < 4) {
            note = 'Para peso &lt; 4 kg, use <strong>Levofloxacina 100 mg Comp.</strong>'
        } else if(this.medicine === "lfx-250" && this.weight >= 4 || this.medicine === "lfx-100" && this.weight < 16) {
            note = 'Se o caso fonte tiver resistência comprovada a Fluroquinolonas, não deve ser oferecido TPT.'
        } else {
            note = "";
        }
        return note;
    }
    determinarDose() {
        let doseManha, doseNoite = "-";
        let weight = this.weight;
        if(this.medicine === "abc/3tc-120/60mg") {
            if(weight < 6) {
                doseManha = 1;
            } else if(weight < 10) {
                doseManha = 1.5;
            } else if(weight < 14) {
                doseManha = 2;
            } else if(weight < 20) {
                doseManha = 2.5;
            } else if(weight < 25) {
                doseManha = 3;
            } else {
                doseManha = "-";
            }
        } else if(this.medicine === "abc/3tc-600/300mg") {
            weight < 25 ? doseManha = "-" : doseManha = 1;
        } else if(this.medicine === "pDtg-10mg") {
            if(weight < 6) {
                doseManha = 0.5;
            } else if(weight < 10) {
                doseManha = 1.5;
            } else if(weight < 14) {
                doseManha = 2;
            } else if(weight < 20) {
                doseManha = 2.5;
            } else if(weight < 25) {
                doseManha = "3*";
            } else {
                doseManha = "-";
            }
        } else if(this.medicine === "dtg-50mg") {
            if(weight < 20) {
                doseManha = "-";
            } else {
                doseManha = 1;
            } 
        } else if(this.medicine.includes(`tdf`)) {
            if(weight < 30) {
                doseManha = "-";
            } else {
                doseManha = 1;
            } 
        } else if(this.medicine === "lpv/r-40/10mg-saquetas") {
            if(weight < 6) {
                doseManha = 2;
                doseNoite = 2
            } else if(weight < 10) {
                doseManha = 3;
                doseNoite = 3
            } else if(weight < 14) {
                doseManha = 4;
                doseNoite = 4
            } else if(weight < 20) {
                doseManha = 5;
                doseNoite = 5
            } else {
                doseManha = "-";
                doseNoite = "-";
            }
        } else if(this.medicine === "lpv/r-100/25mg") {
            if(weight < 10) {
                doseManha = "-";
                doseNoite = "-"
            } else if(weight < 14) {
                doseManha = 2;
                doseNoite = 1
            } else if(weight < 25) {
                doseManha = 2;
                doseNoite = 2
            } else {
                doseManha = 3;
                doseNoite = 3;
            }
        } else if(this.medicine === "lpv/r-200/50mg") {
            if(weight < 14) {
                doseManha = "-";
                doseNoite = "-"
            } else if(weight < 25) {
                doseManha = 1;
                doseNoite = 1
            } else if(weight < 30) {
                doseManha = 2;
                doseNoite = 1
            } else {
                doseManha = 2;
                doseNoite = 2;
            }
        } else if(this.medicine === "azt-susp") {
            if(weight < 6) {
                doseManha = 6;
                doseNoite = 6
            } else if(weight < 10) {
                doseManha = 9;
                doseNoite = 9
            } else if(weight < 14) {
                doseManha = 12;
                doseNoite = 12
            } else {
                doseManha = "-"
                doseNoite = "-"
            }
        } else if(this.medicine === "duovir-ped") {
            if(weight < 6) {
                doseManha = 1;
                doseNoite = 1;
            } else if(weight < 10) {
                doseManha = 1.5;
                doseNoite = 1.5;
            } else if(weight < 14) {
                doseManha = 2;
                doseNoite = 2;
            } else if(weight < 20) {
                doseManha = 2.5;
                doseNoite = 2.5;
            } else if(weight < 25) {
                doseManha = 3;
                doseNoite = 3;
            } else {
                doseManha = "-"
                doseNoite = "-"
            }
        } else if(this.medicine === "duovir-adult") {
            if(weight < 14) {
                doseManha = "-"
                doseNoite = "-"
            } else if(weight < 25) {
                doseManha = 1;
                doseNoite = 0.5;
            } else {
                doseManha = 1;
                doseNoite = 1;
            }
        } else if(this.medicine === "efv") {
            if(weight < 10) {
                doseManha = "-"
                doseNoite = "-"
            } else if(weight < 14) {
                doseManha = "-"
                doseNoite = 1;
            } else if(weight < 25) {
                doseManha = "-"
                doseNoite = 1.5;
            } else {
                doseManha = "-"
                doseNoite = 2;
            }
        } else if(this.medicine === "atv/r") {
            if(weight < 25) {
                doseManha = "-";
                doseNoite = "-";
            } else {
                doseManha = 1;
                doseNoite = "-";
            }
        } else if(this.medicine === "rtv-100-superboosting") {
            if(weight < 10) {
                doseManha = "-";
                doseNoite = "-";
            } else if(weight < 14) {
                doseManha = 1;
                doseNoite = 1;
            } else if(weight < 25) {
                doseManha = 1;
                doseNoite = 2;
            } else {
                doseManha = 2;
                doseNoite = 2;
            }
        } else if(this.medicine === "drv-75") {
            if(weight >= 14 && weight < 25) {
                doseManha = 5;
                doseNoite = 5;
            } else {
                doseManha = "-";
                doseNoite = "-";
            }
        } else if(this.medicine === "drv-150") {
            if(weight < 14) {
                doseManha = "-";
                doseNoite = "-";
            } else if(weight < 25) {
                doseManha = 2.5;
                doseNoite = 2.5;
            } else if(weight < 30) {
                doseManha = 3;
                doseNoite = 3;
            } else {
                doseManha = "-";
                doseNoite = "-";
            }
        } else if(this.medicine === "drv-600") {
            if(weight < 14) {
                doseManha = "-";
                doseNoite = "-";
            } else if(weight < 25) {
                doseManha = "0.5*";
                doseNoite = "0.5*";
            } else {
                doseManha = 1;
                doseNoite = 1;
            }
        } else if(this.medicine === "rtv-100-3alinha") {
            if(weight < 14) {
                doseManha = "-";
                doseNoite = "-";
            } else if(weight < 25) {
                doseManha = 0.5;
                doseNoite = 0.5;
            } else {
                doseManha = 1;
                doseNoite = 1;
            }
        } else if(this.medicine === "ctz-susp") {
            if(weight < 6) {
                doseManha = 2.5;
                doseNoite = "-";
            } else if(weight < 14) {
                doseManha = 5;
                doseNoite = "-";
            } else if(weight < 25) {
                doseManha = 10;
                doseNoite = "-";
            } else {
                doseManha = "-";
                doseNoite = "-";
            }
        } else if(this.medicine === "ctz-cp") {
            if(weight < 6) {
                doseManha = 0.25;
                doseNoite = "-";
            } else if(weight < 14) {
                doseManha = 0.5;
                doseNoite = "-";
            } else if(weight < 25) {
                doseManha = 1;
                doseNoite = "-";
            } else {
                doseManha = 2;
                doseNoite = "-";
            }
        } else if(this.medicine === "inh-100") {
            if(weight < 5) {
                doseManha = 0.5;
                doseNoite = "-";
            } else if(weight < 10) {
                doseManha = 1;
                doseNoite = "-";
            } else if(weight < 14) {
                doseManha = 1.5;
                doseNoite = "-";
            } else if(weight < 20) {
                doseManha = 2;
                doseNoite = "-";
            } else if(weight < 25) {
                doseManha = 2.5;
                doseNoite = "-";
            } else {
                doseManha = 3;
                doseNoite = "-";
            }
        } else if(this.medicine === "inh-300") {
            if(weight < 25) {
                doseManha = "-";
                doseNoite = "-";
            } else {
                doseManha = 1;
                doseNoite = "-";
            }
        } else if(this.medicine === "3hp-100/150") {
            let doseDeINH, doseDeRifapentina;
            if(weight < 10 || weight >= 30) {
                return '<p class="doser__section__note">Ver <b>Notas e Precauções</b>.</p>';
            } else if(weight < 16) {
                doseDeINH = 3;
                doseDeRifapentina= 2;
            } else if(weight < 24) {
                doseDeINH = 5;
                doseDeRifapentina= 3;
            } else if(weight < 30) {
                doseDeINH = 6;
                doseDeRifapentina= 4;
            }
            return this.printDoseDe3hpNaoDFC("Isoniazida <br/> cp 100mg", doseDeINH, "Rifapentina <br/> cp 150mg", doseDeRifapentina);
        } else if(this.medicine === "3hp-300/150") {
            let doseDeINH, doseDeRifapentina;
            if(weight < 10) {
                return '<p class="doser__section__note">Ver <b>Notas e Precauções</b>.</p>';
            } else if(weight < 16) {
                doseDeINH = 1;
                doseDeRifapentina= 2;
            } else if(weight < 24) {
                doseDeINH = "1 cp de 300mg + 2 cp(s) de 100mg/semana*";
                doseDeRifapentina= 3;
                return this.printDoseDe3hpComINHde100e300("Isoniazida <br/> cp 300mg", doseDeINH, "Rifapentina <br/> cp 150mg", doseDeRifapentina)
            } else if(weight < 30) {
                doseDeINH = 2;
                doseDeRifapentina= 4;
            } else {
                doseDeINH = 3;
                doseDeRifapentina= 6;
            }
            return this.printDoseDe3hpNaoDFC("Isoniazida <br/> cp 300mg", doseDeINH, "Rifapentina <br/> cp 150mg", doseDeRifapentina);
        } else if(this.medicine === "3hp-300/300-dfc") {
            let dose;
            if(weight < 30) {
                return '<p class="doser__section__note">Ver <b>Notas e Precauções</b>.</p>';
            } else {
                dose = 3;
                return this.printDoseDe3hpDFC(dose);
            }
        } else if(this.medicine === "lfx-100") {
            if(weight < 4) {
                doseManha = 0.5;
                doseNoite = "-";
            } else if(weight < 7) {
                doseManha = 1;
                doseNoite = "-";
            } else if(weight < 10) {
                doseManha = 1.5;
                doseNoite = "-";
            } else if(weight < 13) {
                doseManha = 2;
                doseNoite = "-";
            } else if(weight < 16) {
                doseManha = 3;
                doseNoite = "-";
            } else if(weight < 19) {
                doseManha = "3.5*";
                doseNoite = "-";
            } else if(weight < 21) {
                doseManha = "4*";
                doseNoite = "-";
            } else if(weight < 24) {
                doseManha = "4.5*";
                doseNoite = "-";
            } else if(weight < 26) {
                doseManha = 5;
                doseNoite = "-";
            } else {
                doseManha = "-";
                doseNoite = "-";
            }
        } else if(this.medicine === "lfx-250") {
            if(weight < 4) {
                doseManha = "-";
                doseNoite = "-";
            } else if(weight < 10) {
                doseManha = 0.5;
                doseNoite = "-";
            } else if(weight < 16) {
                doseManha = 1;
                doseNoite = "-";
            } else if(weight < 21) {
                doseManha = 1.5;
                doseNoite = "-";
            } else if(weight < 26) {
                doseManha = 2;
                doseNoite = "-";
            } else if(weight < 45) {
                doseManha = 3;
                doseNoite = "-";
            } else {
                doseManha = 4;
                doseNoite = "-";
            }
        }
        return this.printDose(doseManha, doseNoite)
    }
    printDose(doseManha, doseNoite) {
        let doseM = doseManha;
        let doseN = doseNoite;
        // Eliminar asterisco das doses com legenda
        if(typeof doseM === "string" && doseM.includes("*")) {
            doseM = Number(doseM.split("*")[0]);
        }
        if(typeof doseN === "string" && doseN.includes("*")) {
            doseN = Number(doseN.split("*")[0]);
        }
        // Calcular quantidade de cps ou frascos por fornecer ao paciente
        let dispensaMensal, dispensaTrimestral;
        let unidadeDaDoseManha = this.getUnidadeDaDose();
        let unidadeDaDoseNoite = this.getUnidadeDaDose();
        let unidadeDaQtdAaviar = this.getUnidadeDaDose();
        if(typeof doseM === "number" && typeof doseN === "number") {
            dispensaMensal = (doseM + doseN) * 30;
            dispensaTrimestral = (doseM + doseN) * 90;
            if(this.medicine.includes("susp")) {
                // Regra de 3 simples (Total de ml * 1/100 ml) em que 1 é frasco e 100, o seu volume;
                dispensaMensal = Math.ceil((doseM + doseN) * 30 / 100);
                dispensaTrimestral = Math.ceil((doseM + doseN) * 90 / 100); 
                unidadeDaQtdAaviar = "frasco(s) de <br> 100 ml";
            }
        } else if(typeof doseM === "number" && typeof doseN !== "number") {
            dispensaMensal = doseM * 30;
            dispensaTrimestral = doseM * 90;
            unidadeDaDoseNoite = "";
            if(this.medicine.includes("susp")) {
                // Regra de 3 simples (Total de ml * 1/100 ml) em que 1 é frasco e 100, o seu volume;
                dispensaMensal = Math.ceil(doseM * 30 / 100);
                dispensaTrimestral = Math.ceil(doseM * 90 / 100); 
                unidadeDaQtdAaviar = "frasco(s) de <br> 100 ml";
            }
        } else if(typeof doseM !== "number" && typeof doseN === "number") {
            dispensaMensal = doseN * 30;
            dispensaTrimestral = doseN * 90;
            unidadeDaDoseManha = "";
            if(this.medicine.includes("susp")) {
                // Regra de 3 simples (Total de ml * 1/100 ml) em que 1 é frasco e 100, o seu volume;
                dispensaMensal = Math.ceil(doseN * 30 / 100);
                dispensaTrimestral = Math.ceil(doseN * 90 / 100); 
                unidadeDaQtdAaviar = "frasco(s) de <br> 100 ml";
            }
        } else if(doseManha === "-" && doseNoite === "-"){
            return '<p class="doser__section__note">Ver <b>Notas e Precauções</b>.</p>';
        }
        // Converter dose de CTZ de 0.25 para 1/4
        if(doseManha === 0.25) doseManha = "<sup>1</sup>/<sub>4</sub>";
        return `<table class="table table--grayscale table--layout-fixed table--no-margin-b">
            <thead class="table__header table__header--bg-color-grayscale">
                <tr class="--border-t">
                    <th class="table__cell">Dose-manhã</th> 
                    <th class="table__cell">Dose-noite</th>
                </tr>
            </thead>
            <tbody>
                <tr class="--border-t">
                    <td class="table__cell">${doseManha} ${unidadeDaDoseManha}</td> 
                    <td class="table__cell">${doseNoite} ${unidadeDaDoseNoite}</td>
                </tr>
                <tr class="table__header table__header--bg-color-grayscale --border-t">
                    <td class="table__cell">Dispensa mensal</td> 
                    <td class="table__cell">Dispensa trimestral</td>
                </tr>
                <tr class="--border-b --border-t">
                    <td class="table__cell">${dispensaMensal} ${unidadeDaQtdAaviar}</td> 
                    <td class="table__cell">${dispensaTrimestral} ${unidadeDaQtdAaviar}</td>
                </tr>                   
            </tbody>
        </table>`
    }
    printDoseDe3hpNaoDFC(inh, doseDeINH, rifapentina, doseDeRifapentina) {
        let dispensaMensalDeINH = doseDeINH * 4;
        let dispensaTrimestralDeINH = doseDeINH * 12;
        let dispensaMensalDeRifapentina = doseDeRifapentina * 4;
        let dispensaTrimestralDeRifapentina= doseDeRifapentina * 12;
        return `<table class="table table--grayscale table--layout-fixed table--no-margin-b">
        <thead class="table__header table__header--bg-color-grayscale">
            <tr class="--border-t">
                <th class="table__cell">${inh}</th> 
                <th class="table__cell">${rifapentina}</th>
            </tr>
        </thead>
        <tbody>
            <tr class="--border-t">
                <td class="table__cell">${doseDeINH} cp(s)/semana</td> 
                <td class="table__cell">${doseDeRifapentina} cp(s)/semana</td>
            </tr>
            <tr class="table__header table__header--bg-color-grayscale --border-t">
                <td class="table__cell">Dispensa mensal</td> 
                <td class="table__cell">Dispensa trimestral</td>
            </tr>
            <tr class="--border-b --border-t">
                <td class="table__cell">Isoniazida: ${dispensaMensalDeINH} cp(s), <br> 
                Rifapentina: ${dispensaMensalDeRifapentina} cp(s)</td> 
                <td class="table__cell">Isoniazida: ${dispensaTrimestralDeINH} cp(s), <br> 
                Rifapentina: ${dispensaTrimestralDeRifapentina} cp(s)</td>
            </tr>                   
        </tbody>
        </table>` 
    }
    printDoseDe3hpComINHde100e300(inh, doseDeINH, rifapentina, doseDeRifapentina) {
        let dispensaMensalDeINH300 = 1 * 4;
        let dispensaTrimestralDeINH300 = 1 * 12;
        let dispensaMensalDeINH100 = 2 * 4;
        let dispensaTrimestralDeINH100 = 2 * 12;
        let dispensaMensalDeRifapentina = doseDeRifapentina * 4;
        let dispensaTrimestralDeRifapentina= doseDeRifapentina * 12;
        return `<table class="table table--grayscale table--layout-fixed table--no-margin-b">
        <thead class="table__header table__header--bg-color-grayscale">
            <tr class="--border-t">
                <th class="table__cell">${inh}</th> 
                <th class="table__cell">${rifapentina}</th>
            </tr>
        </thead>
        <tbody>
            <tr class="--border-t">
                <td class="table__cell">${doseDeINH}</td> 
                <td class="table__cell">${doseDeRifapentina} cp(s)/semana</td>
            </tr>
            <tr class="table__header table__header--bg-color-grayscale --border-t">
                <td class="table__cell">Dispensa mensal</td> 
                <td class="table__cell">Dispensa trimestral</td>
            </tr>
            <tr class="--border-b --border-t">
                <td class="table__cell">
                    Isoniazida 300mg: ${dispensaMensalDeINH300} cp(s), <br> Isoniazida 100mg: ${dispensaMensalDeINH100} cp(s), <br> Rifapentina: ${dispensaMensalDeRifapentina} cp(s)
                </td> 
                <td class="table__cell">
                    Isoniazida 300mg: ${dispensaTrimestralDeINH300} cp(s), <br> Isoniazida 100mg: ${dispensaTrimestralDeINH100} cp(s), <br> Rifapentina: ${dispensaTrimestralDeRifapentina} cp(s)
                </td>
            </tr>                   
        </tbody>
        </table>` 
    }
    printDoseDe3hpDFC(dose) {
        let dispensaMensal = dose * 4;
        let dispensaTrimestral = dose * 12;
        return `<table class="table table--grayscale table--layout-fixed table--no-margin-b">
        <thead class="table__header table__header--bg-color-grayscale">
            <tr class="--border-t">
                <th colspan="2" class="table__cell">Isoniazida/Rifapentina 300 mg/300 mg Comp. (3HP em DFC)</sup></th>
            </tr>
        </thead>
        <tbody>
            <tr class="--border-t">
                <td colspan="2" class="table__cell">${dose} cp(s)/semana</td>
            </tr>
            <tr class="table__header table__header--bg-color-grayscale --border-t">
                <td class="table__cell">Dispensa mensal</td> 
                <td class="table__cell">Dispensa trimestral</td>
            </tr>
            <tr class="--border-b --border-t">
                <td class="table__cell">${dispensaMensal} cp(s)</td> 
                <td class="table__cell">${dispensaTrimestral} cp(s)</td>
            </tr>                   
        </tbody>
        </table>` 
    }
}
function instantiateDoser() {
    let weight = document.querySelector(".doser__input--weight").value;
    if(weight !== "" && weight < 3) {
        doserGeneralFunctions.showMinWeightAlert();
        doserGeneralFunctions.clearDoseAndnote();
    } else if(weight !== "" && weight >= 3) {
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
        opener.addEventListener("click", doserGeneralFunctions.openOrCloseSelect);
    });
    // Close select 
    const btnSelectCloser = document.querySelector(".doser__select__btn--close");
    btnSelectCloser.addEventListener("click", doserGeneralFunctions.closeSelect);
    // Close select by clicking anywhere 
    window.addEventListener("click", event => {
        !event.target.matches(".doser__select *, .select-opener") && doserGeneralFunctions.closeSelect();
    });
    // Select an option
    const medicines = document.querySelectorAll(".doser__select__option");
    medicines.forEach( medicine => {
        medicine.addEventListener("click", () => doserGeneralFunctions.selectAnOption(medicine));
    });
    // Search an option
    const inputTypeSearch = document.querySelector(".doser__select__input--search");
    inputTypeSearch.addEventListener("input", () => doserGeneralFunctions.filterAnOption(inputTypeSearch.value));
    // Determine doses
    inputForWeight.addEventListener("input", instantiateDoser);
    const medicinesAndMenuTabs = document.querySelectorAll(".doser__select__option, .header__main-menu__btn");
    medicinesAndMenuTabs.forEach( target => {
        target.addEventListener("click", instantiateDoser);
    });
}
window.addEventListener("load", listenToDoserEvents);