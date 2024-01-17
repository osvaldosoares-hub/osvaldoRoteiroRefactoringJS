const { readFileSync } = require('fs');
let Repositorio = require("./repositorio.js");
let ServicoCalculoFatura = require('./servico.js');
var gerarFaturaStr = require("./apresentacao.js");

 
const calc = new ServicoCalculoFatura(new Repositorio())
const faturas = JSON.parse(readFileSync('./faturas.json'));
const faturaStr = gerarFaturaStr(faturas,calc);
//const FaturaHtml = gerarFaturaHTML(faturas,calc,pecas)
//console.log(FaturaHtml);
console.log(faturaStr);




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
