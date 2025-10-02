"use strict"
const doserGeneralFunctions = {
    highlightFocusedInput(focusedInput){
        focusedInput.classList.add("--focus");
    },
    removehighlightFromFocusedInput(focusedInput){
        focusedInput.classList.remove("--focus");
    },
    openOrCloseSelect(){
        const doserSelect = document.querySelector(".doser__select");
        const selectOfMedicines = document.querySelector(".doser__section--medicines");
        const body = document.querySelector("#body");
        doserSelect.classList.toggle("--open");
        doserGeneralFunctions.highlightFocusedInput(selectOfMedicines);
        body.classList.toggle("--overflow-hidden-on-mobile");
    },
    closeSelect(){
        const doserSelect = document.querySelector(".doser__select");
        const selectOfMedicines = document.querySelector(".doser__section--medicines");
        const body = document.querySelector("#body");
        doserSelect.classList.remove("--open");
        doserGeneralFunctions.removehighlightFromFocusedInput(selectOfMedicines);
        body.classList.remove("--overflow-hidden-on-mobile");
        body.classList.remove("--overflow-hidden-on-mobile");
    },
    selectAnOption(optionToSelect){
        const options = document.querySelectorAll(".doser__select__option");
        for (const option of options){
            option.classList.remove("--selected");
        }
        optionToSelect.classList.add("--selected");
    },
    showMinWeightAlert(){
        const alertaDePesoMinimo = document.querySelector(".doser__min-weight-alert");
        alertaDePesoMinimo.textContent = "O peso não deve ser menor que 1.";
        alertaDePesoMinimo.classList.add("--open");
    },
    clearMinWeightAlert(){
        const alertaDePesoMinimo = document.querySelector(".doser__min-weight-alert");
        alertaDePesoMinimo.textContent = "";
        alertaDePesoMinimo.classList.remove("--open");
    },
    clearDoseAndnote(){
        document.querySelector(".doser__section__dose").innerHTML = "";
        let noteOutput = document.querySelector(".doser__section__note");
        noteOutput.innerHTML = "";  
        // remove padding when the note does not have content to avoid bg-color appearing
        noteOutput.classList.add("doser__section__note--no-padding");       
    }
}
class Doser {
    constructor(weight, medicine){
        this.wt = weight;
        this.med = medicine;
    }
    getFormaFarmaceutica() {
        return this.med.includes("cfz") || this.med.includes("cs") ? "cáps." 
        : "cp(s)";
    }
    getNotasEprecaucoes(){
        let note;
        if(this.med.includes("dfc-ped") && this.wt < 4){
            note = `<b>(1)</b> Descartar a solução de ${this.med.split("-ped")[0].toUpperCase()} que sobrar após a administração. <b>(2)</b> <strong>As crianças com TB e com peso inferior a 4 kg, devem ser referidas para internamento.</strong> Devido à especial complexidade para dosificar o tratamento nelas, assim como pela gravidade, essas crianças devem ser geridas inicialmente nas enfermarias de Pediatria.`
        } else if(this.med.includes("dfc-ped") && this.wt >= 4 && this.wt < 25){
            note = `<b>(1)</b> Dissolver o(s) comprimido(s) de ${this.med.split("-ped")[0].toUpperCase()} de acordo com o peso da criança e a quantidade de água recomendada. Após a dissolução, administre todo o medicamento de imediato à criança. Se restar algum medicamento no fundo do copo, acrescente um pouco mais de água e administre. <strong>${this.med.split("-ped")[0].toUpperCase()}<sup>dispersível</sup> deve sempre ser dissolvido em água. Não deve ser tomado inteiro mesmo que a criança consiga engolir.</strong> <b>(2)</b>&nbsp;Pacientes em TARV com regime contendo Dolutegravir (DTG), devem ajustar a dose de DTG (DTG 12/12 horas) durante o tempo que recebem Rifampicina (contida no ${this.med.split("-ped")[0].toUpperCase()}) e por mais 2 semanas. Depois passam a tomar o DTG apenas 1 vez/dia.`;
        } else if(this.med === "3dfc-ped" && this.wt >= 25){
            note = 'Para peso &ge; 25 kg, está indicado <mark>4DFC (RHZE) 150/75/400/275 mg Comp.</mark>'
        } else if(this.med === "2dfc-ped" && this.wt >= 25){
            note = 'Para peso &ge; 25 kg, está indicado <mark>2DFC adulto (RH) 150/75 mg Comp.</mark>'
        } else if(this.med.includes("dfc-adulto") && this.wt >= 25){
            note = `A Rifampicina (incluída no ${this.med.split("-adulto")[0].toUpperCase()}) reduz os níveis dos inibidores de protease (IPs) (LPV/r, ATV/r), Nevirapina e de DTG.
            <br>• &nbsp; <mark>DTG e Rifampicina</mark>: A dose de DTG deve ser duplicada (DTG 12/12 horas) durante o tempo que o paciente recebe tratamento com Rifampicina e por mais 2 semanas.
            <br>• &nbsp; <mark>NVP e Rifampicina</mark>: Associação não recomendada;  
            <br>• &nbsp; <mark>ATV/r e Rifampicina</mark>: Associação não recomendada; 
            <br>• &nbsp; <mark>LPV/r e Rifampicina</mark>: ajustar a dose de LPV/r (<a href="https://quinamine.github.io/tarv-pediatrico/index.html">Doseador de ARVs</a>).`
        } else if(this.med  === "4dfc-adulto" && this.wt < 25){
            note = 'Para peso &lt; 25 kg, está indicado <mark>3DFC (RHZ) 75/50/150 mg Comp.</mark> e <mark>Etambutol 100 mg Comp.</mark>'
        } else if(this.med  === "2dfc-adulto" && this.wt < 25){
            note = 'Para peso &lt; 25 kg, está indicado <mark>2DFC pediátrico (RH) 75/50 mg Comp.</mark>'
        } else if(this.med === "e100" && this.wt < 4){
            note = '<b>(1)</b> Os comprimidos de Etambutol devem ser esmagados e administrados com água em separado do 3DFC ou, para os que conseguem engolir, podem tomar sem esmagar. <b>(2)</b> <strong>As crianças com TB e com peso inferior a 4 kg, devem ser referidas para internamento.</strong> Devido à especial complexidade para dosificar o tratamento nelas, assim como pela gravidade, essas crianças devem ser geridas inicialmente nas enfermarias de Pediatria.'
        } else if(this.med === "e100" && this.wt < 25){
            note = 'Os comprimidos de Etambutol devem ser esmagados e administrados com água em separado do 3DFC ou, para os que conseguem engolir, podem tomar sem esmagar.'
        } else if(this.med ==="e100" && this.wt >= 25){
            note = 'O <mark>Etambutol 100 mg Comp.</mark> está indicado para crianças com peso &lt; 25 kg.'
        } else if(this.med.includes("-2a-linha") && this.wt < 5){
            note = 'O ajuste de alguns MATs nesta faixa de peso (&lt; 5 kg) é complexo. Estes casos deverão ser consultados com um especialista em TB-MR pediátrica.'
        } else if(this.med.includes("dlm-50") && this.wt < 7){
            note = `O Doseador de MATs da 2ª linha não prevê dosagem de <mark>Delamanide 50 mg Comp.</mark> para crianças com peso &lt; 7 kg.`;
        } else if(this.med.includes("bdq-100") && this.wt < 10){
            note = '<mark>Bedaquilina (Bdq) 100 mg Comp.</mark> está indicado a partir de 10 kg.'
        } else if(this.med.includes("bdq-100") && this.wt >= 10){
            note = '<b>(1)</b> *Dose de indução durante as 2 primeiras semanas. <b>(2)</b> <mark>Bedaquilina e Inibidores da protease (ATV/r, LPV/r)</mark>: evitar combinação sempre que possível. IPs aumentam os níveis de Bedaquilina, com risco aumentado de toxicidade cardíaca e hepática. <strong>Em resumo, em pacientes em tratamento com o regime padrão para TB-MR, é preferível a combinação de TAT com um esquema de TARV contendo Dolutegravir.</strong>'
        } else if(this.med.includes("lzd-150") && this.wt >= 26){
            note = 'Para peso &ge; 26 kg, está indicado <mark>Linezolide (Lzd) 600 mg Comp.</mark>'
        } else if(this.med.includes("lzd-600") && this.wt < 6){
            note = 'Para peso &lt; 6 kg, está indicado <mark>Linezolide (Lzd) 150 mg Comp.</mark>'
        } else if(this.med.includes("lzd-600") && this.wt > 6 || this.med.includes("lzd-150") && this.wt < 26){
            note = '<b>(1)</b> No regime padronizado, Linezolide é administrado apenas durante a fase intensiva. <b>(2)</b> AZT e Linezolide: evitar essa combinação pelo risco de mielotoxicidade (anemia, neutropenia, trombocitopenia).'
        } else if(this.med.includes("lfx-100") && this.wt < 30){
            note = 'Os comprimidos de <mark>Levofloxacina (Lfx) 100 mg Comp.<sup>dispersível</sup></mark> devem ser disolvidos em água antes de serem administrados.'
        } else if(this.med.includes("lfx-100") && this.wt >= 30){
            note = 'Para peso &ge; 30 kg, está indicado <mark>Levofloxacina 250 mg Comp.</mark>'
        } else if(this.med.includes("cfz-50") && this.wt >= 20){
            note = 'Para peso &ge; 20 kg, está indicado <mark>Clofazimina (Cfz) 100 mg Cápsulas</mark>.'
        } else if(this.med.includes("cs-125") && this.wt >= 30){
            note = 'Para peso &ge; 30 kg, está indicado <mark>Cicloserina (Cs) 250 mg Cápsulas</mark>.'
        } else if(this.med.includes("cs-125") && this.wt >= 5){
            note = 'Se intolerância, dividir a dose em 2 tomas diárias.'
        } else if(this.med.includes("cs-250")){
            if(this.wt >= 25 || this.wt >= 12 && this.wt <= 16){
                note = 'Se intolerância, dividir a dose em 2 tomas diárias.'
            }
            else if(this.wt < 12 || this.wt > 16 && this.wt < 25){
                note = '<b>(1)</b> As cápsulas de Cicloserina 250 mg devem ser abertas e o conteúdo diluído em 10 ml de água. Deverá ser administrada a parte correspondente de solução segundo o peso. <b>(2)</b> Se intolerância, dividir a dose em 2 tomas diárias.';
            }
        } else if(this.med === "vitb6-25" && this.wt < 25 || this.med === "vitb6-50" && this.wt >= 25) {
            note = `A Piridoxina deve ser dada a todos pacientes em TPT ou tratamento da TB com regimes contendo Isoniazida. Em caso de neuropatia periférica, a dosagem deve ser aumentada para <mark>2&nbsp;mg/kg/dia</mark>. <br><b>Sinais e sintomas de neuropatia periférica</b>: Dor, queimação ou formigamento nas mãos ou pés, dormência ou perda de sensibilidade nos braços e pernas, ou cãibras ou espasmos musculares.`;
        } else if(this.med === "vitb6-25" && this.wt >= 25 || this.med === "vitb6-50" && this.wt < 25) {
            let dosagemVitB6 = (this.med === "vitb6-25") ? 50 : 25;
            note = `*No caso de não haver comprimidos de ${dosagemVitB6} mg. A Piridoxina deve ser dada a todos pacientes em TPT ou tratamento da TB com regimes contendo Isoniazida. Em caso de neuropatia periférica, a dosagem deve ser aumentada para <mark>2&nbsp;mg/kg/dia</mark>. <br><b>Sinais e sintomas de neuropatia periférica</b>: Dor, queimação ou formigamento nas mãos ou pés, dormência ou perda de sensibilidade nos braços e pernas, ou cãibras ou espasmos musculares.`;
        } else if(this.med.includes("bpal") && this.wt < 30) {
            note = `O peso mínimo deve ser 30 kg e idade &ge; 14 anos.`;
        } else if(this.med.includes("bpal") && this.wt >= 30) {
            let fql = (this.med === "bpall") ? "; <mark>Lfx</mark>: Levofloxacina." 
            : (this.med === "bpalm") ? "; <mark>Mfx</mark>: Moxifloxacina" : ".";
            note = `<mark>Bdq 100 mg Comp.:</mark> <br>${this.printDoseDeBdq()} <hr><b>Legenda:</b> <mark>Bdq</mark>: Bedaquilina;  <mark>Pa</mark>: Pretomanida;  <mark>Lzd</mark>: Linezolide${fql}`;
        }  else {
            note = "";
        }
        return note;
    }
    determinarDose(){
        let dose, posologia = "uma vez/dia";
        let wt = this.wt;
        if(this.med.includes("dfc-ped") && wt < 4){
            let numDeCpsPorDiluir = 1, qtdDeAgua = 10;
            let doseEmMl, doseEmCpCorrespondente, posologia = "uma vez/dia"
            wt < 2 ? (doseEmMl = 2.5, doseEmCpCorrespondente = 0.25)
            : wt < 3 ? (doseEmMl = 5, doseEmCpCorrespondente = 0.5)
            : (doseEmMl = 7.5, doseEmCpCorrespondente = 0.75);
            return this.printDoseDeCpEmMl(numDeCpsPorDiluir, qtdDeAgua, doseEmMl, doseEmCpCorrespondente, posologia);
        } else if(this.med === "e100" && wt < 4){
            wt < 2 ? dose = 0.25
            : wt < 3 ? dose = 0.5 
            : dose = 0.75;
        } else if(this.med.includes("dfc-ped") || this.med === "e100"){
            dose = wt < 8 && wt >= 4 ? 1
            : wt < 12 ? 2
            : wt < 16 ? 3
            : 4;
            if(wt >= 25) return this.lerNotasEprecaucoes();;
        } else if(this.med.includes("dfc-adulto")){
            if(wt < 25) return this.lerNotasEprecaucoes();;
            dose = wt < 40 ? 2
            : wt < 55 ? 3
            : wt < 71 ? 4
            : 5;
        } else if(this.med.includes("-2a-linha") && wt < 5){
            return this.lerNotasEprecaucoes();
        } else if(this.med.includes("dlm-50")){
            if(wt < 7) return this.lerNotasEprecaucoes();
            dose = wt < 23 ? 0.5
            : wt < 30 ? 1
            : 2;
            posologia = " 12/12 horas";
        } else if(this.med.includes("bdq-100")){
            if(wt < 10){
                return this.lerNotasEprecaucoes();
            }
            return this.printDoseDeBdq();
        } else if(this.med.includes("lzd-150")){
            dose = wt < 8 ? 0.5 
            : wt < 12 ? 1 
            : wt < 18 ? 1.5 
            : 2;
            if(wt >= 26) return this.lerNotasEprecaucoes();;
        } else if(this.med.includes("lzd-600")){
            if(wt < 6){
                return this.lerNotasEprecaucoes();;
            } else if(wt < 16){
                let numDeCpsPorDiluir = 0.5, qtdDeAgua = 15;
                let doseEmMl = "7.5", doseEmCpCorrespondente = 0.25, posologia = "uma vez/dia";
                return this.printDoseDeCpEmMl(numDeCpsPorDiluir, qtdDeAgua, doseEmMl, doseEmCpCorrespondente, posologia);
            } else if(wt < 36){
                dose = 0.5;
            } else {
                dose = 1;
            }
        } else if(this.med.includes("lfx-100")){
            dose = wt < 6 ? 1 
            : wt < 9 ? 1.5 
            : wt < 11 ? 2 
            : wt < 12 ? 2.5 
            : wt < 13 ? 2
            : wt < 16 ? 3
            : wt < 19 ? 3.5
            : wt < 22 ? 4
            : wt < 24 ? 4.5
            : 5;
            if(wt >= 30) return this.lerNotasEprecaucoes();;
        } else if(this.med.includes("lfx-250")){
            dose = wt < 9 ? 0.5  
            : wt < 12 ? 0.75 
            : wt < 17 ? 1
            : wt < 25 ? 1.5
            : wt < 30 ? 2
            : wt < 46 ? 3
            : 4;
        } else if(this.med.includes("cfz-50")){
            dose = 1;
            if(wt < 10){
                posologia = "dias alternados";
            } else if(wt < 20){
                posologia = "uma vez/dia";
            } else {
                return this.lerNotasEprecaucoes();;
            }
        } else if(this.med.includes("cfz-100")){
            dose = 1;
            if(wt < 10){
                posologia = "a cada 3 dias";
            } else if(wt < 20){
                posologia = "dias alternados";
            } else{
                posologia = "uma vez/dia";
            }
        } else if(this.med.includes("cs-125")){
            dose = wt < 10 ? 1 
            : wt < 16 ? 2 
            : wt < 21 ? 3
            : 4;
            if(wt >= 30) return this.lerNotasEprecaucoes();;
        } else if(this.med.includes("cs-250")){
            if(wt < 12 || wt > 16 && wt < 25){
                let numDeCpsPorDiluir = 1, qtdDeAgua = 10;
                let doseEmMl, doseEmCpCorrespondente, posologia = "uma vez/dia"
                if(wt < 9){
                    doseEmMl = 5, doseEmCpCorrespondente = 0.5;
                } else if(wt < 12){
                    doseEmMl = 7.5, doseEmCpCorrespondente = 0.75;
                } else if(wt > 16 && wt < 25){
                    numDeCpsPorDiluir = 2,  qtdDeAgua = 20, doseEmMl = 15, doseEmCpCorrespondente = 1.5
                }
                return this.printDoseDeCpEmMl(numDeCpsPorDiluir, qtdDeAgua, doseEmMl, doseEmCpCorrespondente, posologia);
            } else if(wt >= 12 && wt < 17){
                dose = 1;
            } else if(wt >= 25 && wt < 56){
                dose = 2;
            } else if(wt >= 56){
                dose = 3;
            }
        } else if(this.med === "vitb6-25") {
            dose = wt < 25 ? 0.5
            : "2*";
        } else if(this.med === "vitb6-50") {
            dose = wt < 25 ? "0.25*"
            : 1;
        } else if(this.med.includes("bpal")) {
            if(wt < 30) return this.lerNotasEprecaucoes();
            return this.printDoseDeBpalm();
        }
        return this.printDoseEmCp(dose, posologia);
    }
    printDoseEmCp(dose, posologia){
        if(this.med.includes("dfc-ped")){
            return this.printDoseDispersivel(dose, (dose * 10));
        }
        let doseDiaria = Number(String(dose).replace(/[^0-9.]/g, ""));
        posologia.includes("12/12 horas") && (doseDiaria = dose * 2);
        posologia.includes("dias alternados") && (doseDiaria = dose - dose / 2);
        posologia.includes("a cada 3 dias") && (doseDiaria = dose / 3);
        return `<table class="table-grayscale table--no-margin-b">
            <tr>
                <td colspan="3">${this.converterDoseDecimalEmFracao(dose)} ${this.getFormaFarmaceutica()} ${posologia}</td> 
            </tr>
            <tr><th colspan="3">Quantidade a aviar para:</th></tr>
            <tr><th>7 dias</th><th>15 dias</th><th>30 dias</th></tr>
            <tr>
                <td>${this.calcularDispensaPara(doseDiaria, 7)} ${this.getFormaFarmaceutica()}</td> 
                <td>${this.calcularDispensaPara(doseDiaria, 15)} ${this.getFormaFarmaceutica()}</td>
                <td>${this.calcularDispensaPara(doseDiaria, 30)} ${this.getFormaFarmaceutica()}</td>
            </tr>
        </table>`
    }
    printDoseDispersivel(dose, h20paraDil){
        return `<table class="table-grayscale table--no-margin-b">
            <thead>
                <tr><th colspan="2">Dose e Posologia</th><th>Água para diluição</th></tr>
            </thead>
            <tbody>
                <tr><td colspan="2">${dose} ${this.getFormaFarmaceutica()} uma vez/dia</td><td>${h20paraDil} ml</td></tr>
                <tr><th colspan="3">Quantidade a aviar para:</th></tr>
                <tr><th>7 dias</th><th>15 dias</th><th>30 dias</th></tr>
                <tr>
                    <td>${this.calcularDispensaPara(dose, 7)} ${this.getFormaFarmaceutica()}</td> 
                    <td>${this.calcularDispensaPara(dose, 15)} ${this.getFormaFarmaceutica()}</td>
                    <td>${this.calcularDispensaPara(dose, 30)} ${this.getFormaFarmaceutica()}</td>
                </tr>                   
            </tbody>
        </table>` 
    }
    printDoseDeCpEmMl(numDeCpsPorDiluir, qtdDeAgua, doseEmMl, doseEmCpCorrespondente, posologia){
        let preposicaoDoOuDa = this.med.includes("cfz") || this.med.includes("cs") ? "da" 
            : "do";
        return `<table class="table-grayscale table--no-margin-b">
            <thead>
                <tr><th colspan="2">Diluir</th><th>Administrar</th></tr>
            </thead>
            <tbody>
                <tr>
                    <td colspan="2">${this.converterDoseDecimalEmFracao(numDeCpsPorDiluir)} ${this.getFormaFarmaceutica()} em ${qtdDeAgua} ml de água</td> 
                    <td>${doseEmMl} ml da diluição - correspondente a ${this.converterDoseDecimalEmFracao(doseEmCpCorrespondente)} ${preposicaoDoOuDa} ${this.getFormaFarmaceutica()} ${posologia}</td>
                </tr>
                <tr><th colspan="3">Quantidade a aviar para:</th></tr>
                <tr><th>7&nbsp;dias</th><th>15&nbsp;dias</th><th>30 dias</th></tr>
                <tr>
                    <td>${this.calcularDispensaPara(numDeCpsPorDiluir, 7)} ${this.getFormaFarmaceutica()}</td> 
                    <td>${this.calcularDispensaPara(numDeCpsPorDiluir, 15)} ${this.getFormaFarmaceutica()}</td>
                    <td>${this.calcularDispensaPara(numDeCpsPorDiluir, 30)} ${this.getFormaFarmaceutica()}</td>
                </tr>                 
            </tbody>
        </table>` 
    }
    printDoseDeBdq(){
        let doseInicial, doseSeguinte, doseParaCalcDeDisp;
        if(this.wt < 16){
            doseInicial = "100 mg (1 comp.)", doseSeguinte = `50 mg (${this.converterDoseDecimalEmFracao(0.5)} comp.)`;
            doseParaCalcDeDisp = 1;
        } else if(this.wt < 30){
            doseInicial = "200 mg (2 comp.)", doseSeguinte = "100 mg (1 comp.)";
            doseParaCalcDeDisp = 2;
        } else {
            doseInicial = "400 mg (4 comp.)", doseSeguinte = "200 mg (2 comp.)";
            doseParaCalcDeDisp = 4;
        }
        let dispensaS = Math.ceil(doseParaCalcDeDisp * 7);
        let dispensaQ = Math.ceil(doseParaCalcDeDisp * 15);
        let dispensaM = Math.ceil(doseParaCalcDeDisp * 30);
        return `<table class="table-grayscale table--no-margin-b">
            <thead>
                <tr><th colspan="2">Dose inicial*</th><th colspan="3">Após 14 dias</th></tr>
            </thead>
            <tbody>
                <tr><td colspan="2">${doseInicial} uma vez/dia por 14 dias</td><td colspan="3">Diminuir para ${doseSeguinte} 3 dias/semana (2ª, 4ª e 6ª feira)</td></tr>
                <tr><th colspan="2">Dispensa para:</th><th>7 dias</th><th>15 dias</th><th>30 dias</th></tr>
                <tr>
                    <td colspan="2">Nas 1ªs duas semanas</td>
                    <td>${dispensaS}</td><td>${dispensaQ}</td><td>${dispensaM}</td>
                </tr>
                <tr>
                    <td colspan="2">A partir da 3ª semana</td>
                    <td>${dispensaS/2}</td><td>${dispensaQ/2}</td><td>${dispensaM/2}</td>
                </tr>            
            </tbody>
        </table>` 
    }
    printDoseDeBpalm() {
        // Peso minimo: 30 kg
        let dose = 1, flq = "Mfx 400 mg", doseDeFlq = dose;
        if(this.med === "bpall") {
            flq = "Lfx 250 mg";
            doseDeFlq = (this.wt < 46) ? 3 : 4;
        }
        let linhaDeFlq = `<tr><td class="txt-left">${flq}</td><td>${doseDeFlq}</td><td>${doseDeFlq * 7}</td><td>${doseDeFlq * 15}</td><td>${doseDeFlq * 30}</td></tr>`;
        if(this.med === "bpal") {
            linhaDeFlq = "<tr class='--display-none'></tr>";
        }
        return `<table class="table-grayscale table--no-margin-b">
                    <thead>
                        <tr><th rowspan="2">MAT <br>(Comp.)</th><th rowspan="2">Dose diária</th><th colspan="3">Dispensa para</th></tr>
                        <tr><th>7 dias</th><th>15 dias</th><th>30 dias</th></tr>
                    </thead>
                    <tbody>
                        <tr><td class="txt-left">Bdq&nbsp;100&nbsp;mg</td><td colspan="4">Ver no campo de notas</td></tr>
                        <tr><td class="txt-left">Pa 200 mg</td><td>${dose}</td><td>${dose * 7}</td><td>${dose * 15}</td><td>${dose * 30}</td></tr>
                        <tr><td class="txt-left">Lzd 600 mg</td><td>${dose}</td><td>${dose * 7}</td><td>${dose * 15}</td><td>${dose * 30}</td></tr>
                        ${linhaDeFlq}   
                    </tbody>
                </table>`
    }
    converterDoseDecimalEmFracao(doseDecimal){
        return doseDecimal === 0.25 ? doseDecimal = "<sup>1</sup>/<sub>4</sub>"
        : doseDecimal === "0.25*" ? doseDecimal = "<sup>1</sup>/<sub>4</sub>*"
        : doseDecimal === 0.5 ? doseDecimal = "<sup>1</sup>/<sub>2</sub>"
        : doseDecimal === 0.75 ? doseDecimal = "<sup>3</sup>/<sub>4</sub>"
        : doseDecimal === "2*" ? doseDecimal = "2*"
        : doseDecimal = doseDecimal;
    }
    calcularDispensaPara(doseDiaria, numeroDeDias){
        return Math.ceil(doseDiaria * numeroDeDias);
    }
    lerNotasEprecaucoes(){
        return '<p class="doser__section__note">Ler <b>Notas e Precauções</b> 👇.</p>';
    }
}
function instantiateDoser(){
    let weight = document.querySelector(".doser__input--weight").value;
    if(weight !== "" && weight < 1){
        doserGeneralFunctions.showMinWeightAlert();
        doserGeneralFunctions.clearDoseAndnote();
    } else if(weight !== "" && weight >= 1){
        doserGeneralFunctions.clearMinWeightAlert();
        doserGeneralFunctions.clearDoseAndnote();
        const medicines = document.querySelectorAll(".doser__select__option");
        let selectedMedicine;
        for (const medicine of medicines){
            if(medicine.matches(".--selected")){
                selectedMedicine = medicine;
            }
        }
        // Se não for option de placeholder
        if(selectedMedicine.dataset.farmaco){
            selectedMedicine = selectedMedicine.dataset.farmaco;
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
function listenToDoserEvents(){
     // Highlight focused input
     const inputForWeight = document.querySelector(".doser__input--weight");
     inputForWeight.addEventListener("focusin", () => doserGeneralFunctions.highlightFocusedInput(inputForWeight.parentElement));
     // Remove highlight from the input
     inputForWeight.addEventListener("focusout", () => doserGeneralFunctions.removehighlightFromFocusedInput(inputForWeight.parentElement));
    // Toggle select (Open or Close);
    const selectOpeners = document.querySelectorAll(".doser__select__option, .select-opener");
    selectOpeners.forEach(opener => {
        opener.addEventListener("click", () => {
            if(opener.dataset.farmaco === "notamed") return false;
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
            if(medicine.dataset.farmaco === "notamed") return false;
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