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
 * @param int [a] - Quantidade de andares
 * @param int [p] - Quantidade de paradas
 * @returns {int} fatorial(a) / fatorial(p) fatorial(a - p)
 */
function calcularQntSolucoes(andares, totalParadas) {
	let n = 0
	for (let i = 1; i <= totalParadas; i++) {
		n += fatorial(andares) / (fatorial(i) * fatorial(andares - i))
	}

	return n
}

module.exports = { fatorial, calcularQntSolucoes }
