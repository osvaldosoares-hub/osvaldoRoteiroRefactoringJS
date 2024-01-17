const { readFileSync } = require('fs');


class ServicoCalculoFatura {

  calcularCredito(apre,pecas) {
    let creditos = 0;
    creditos += Math.max(apre.audiencia - 30, 0);
    if (getPeca(apre).tipo === "comedia") 
       creditos += Math.floor(apre.audiencia / 5);
    return creditos;   
  }

  calcularTotalApresentacao(apre,peca) {
    let total = 0;
    switch (getPeca(apre).tipo) {
      case "tragedia":
        total = 40000;
        if (apre.audiencia > 30) {
          total += 1000 * (apre.audiencia - 30);
        }
        break;
      case "comedia":
        total = 30000;
        if (apre.audiencia > 20) {
          total += 10000 + 500 * (apre.audiencia - 20);
        }
        total += 300 * apre.audiencia;
        break;
      default:
          throw new Error(`Peça desconhecia: ${getPeca(apre).tipo}`);
      }
    return total;
  }
  calcularTotalFatura(pecas, apresentacoes) {
    let totalFatura = 0;
    for (let apre of pecas.apresentacoes) {
      totalFatura += this.calcularTotalApresentacao(apre);
    }
    return totalFatura;
  }

  calcularTotalCreditos(pecas, apresentacoes) {
    let totalCreditos = 0;
    for (let apre of pecas.apresentacoes) {
      totalCreditos += this.calcularCredito(apre);
    }
    return totalCreditos;
  }


}



function getPeca(apresentacao) {
  return pecas[apresentacao.id];
}
 
function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR",
    { style: "currency", currency: "BRL",
      minimumFractionDigits: 2 }).format(valor/100);
} 


function gerarFaturaStr (fatura, calc,pecas) {
    
    let faturaStr = `Fatura ${fatura.cliente}\n`;
    for (let apre of fatura.apresentacoes) {
      faturaStr += `  ${getPeca(apre).nome}: ${formatarMoeda(calc.calcularTotalApresentacao(apre))} (${apre.audiencia} assentos)\n`; 
    }
    faturaStr += `Valor total: ${formatarMoeda(calc.calcularTotalFatura(fatura))}\n`;
    faturaStr += `Créditos acumulados: ${calc.calcularTotalCreditos(fatura)} \n`;
    return faturaStr;
  }


  /*function gerarFaturaHTML(fatura,calc, pecas) {
    const s1 = new ServicoCalculoFatura()
    let HTML = '<html>\n';
    HTML += '<p> Fatura ' + fatura.cliente + '</p>\n';
    HTML += '<ul>\n';
  
    for (let apre of fatura.apresentacoes) {
      HTML += '<li> ' + getPeca(apre).nome + ': R$ ' + formatarMoeda(calc.calcularTotalApresentacao(apre)) + ' (' + apre.audiencia + ' assentos) </li>\n';
    }
  
    HTML += '</ul>\n';
    HTML += '<p> Valor total: R$ ' + formatarMoeda(calc.calcularTotalFatura(fatura)) + '</p>\n';
    HTML += '<p> Créditos acumulados: ' + calc.calcularTotalCreditos(fatura) + ' </p>\n';
    HTML += '</html>';
  
    return HTML;
  }*/
const calc = new ServicoCalculoFatura()
const faturas = JSON.parse(readFileSync('./faturas.json'));
const pecas = JSON.parse(readFileSync('./pecas.json'));
const faturaStr = gerarFaturaStr(faturas,calc,pecas);
//const FaturaHtml = gerarFaturaHTML(faturas,calc,pecas)
//console.log(FaturaHtml);
console.log(faturaStr);
