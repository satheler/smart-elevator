/**
 * Calcula o fatorial de um número
 * @param {int} numero Número natural inteiro positivo
 * @returns {int} Numero fatorado
 */
function fatorial(numero) {
	return numero > 1 ? fatorial(numero - 1) * numero : 1
}

/**
 * Calculo de análise combinatória
 * S = a! / p! (a - p)!
 * int a = andares
 * int b = paradas
 * @returns {array} Solucao
 */
function calcularQntSolucoes(andares, totalParadas) {
	let n = 0
	for (let i = 1; i <= totalParadas; i++) {
		n += fatorial(andares) / (fatorial(i) * fatorial(andares - i))
	}

	return n
}

function combinacao(andares, paradas, inicio, fim, indice, qntParadas, solucao) {
	if (indice == qntParadas) {
		let conjunto = []
		for (let i = 0; i < qntParadas; i++) {
			conjunto.push(paradas[i])
		}
		return solucao.push(conjunto)
	}

	for (let i = inicio; i <= fim && fim - i + 1 >= qntParadas - indice; i++) {
		paradas[indice] = andares[i]
		combinacao(andares, paradas, i + 1, fim, indice + 1, qntParadas, solucao)
	}
}

module.exports = { fatorial, calcularQntSolucoes, combinacao }
