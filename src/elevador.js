const chalkPipe = require('chalk-pipe')

/**
 * Classe elevador
 * @property {number} qntTotalPessoas Quantidade total de pessoas
 * @property {Array<number>} andares Andares indicados para parar
 */
class Elevador {
	/**
	 * Inicializa o elevador com o tamanho total do prédio e
	 *
	 * @param {number} posFinal Fim do indice dos andares
	 * @param {Array<number>} paradas Andares indicados para parar
	 */
	constructor(posFinal, paradas) {
		this.qntTotalPessoas = 0
		this.andares = this.gerarAndares(posFinal, paradas.sort())
	}

	/**
	 * Percorre todas as combinações de tamanho n
	 * em uma matriz de tamanho p
	 *
	 * @param  {number} qntParadas Tamanho do conjunto de combinações
	 * @param  {Array} solucao Vetor das soluções encontradas
	 * @param  {number} inicio [inicio = 0] Inicio do indice dos andares
	 * @param  {number} indice [indice = 0] Indice atual do vetor de paradas
	 * @param  {Array} paradas [paradas = Array] Vetor temporario de combinações
	 */
	combinacaoFB(qntParadas, solucao, inicio = 0, indice = 0, paradas = []) {
		// A combinação atual está pronta para ser calculada
		if (indice == qntParadas) {
			return this.calcularAndar(qntParadas, paradas, solucao)
		}

		// Substitui o indice por todos os elementos possíveis
		for (let i = inicio; i <= this.andares.length; i++) {
			// Esta condição garante que um elemento adicionado na lista de paradas
			// irá realizar uma combinação única com o resto dos elemento
			// e ainda irá realizar somente nas posições restantes
			if (this.andares.length - i >= qntParadas - indice) {
				paradas[indice] = this.andares[i]
				this.combinacaoFB(qntParadas, solucao, i + 1, indice + 1, paradas)
			}
		}
	}

	/**
	 * Percorre todas as combinações de tamanho n
	 * em uma matriz de tamanho p
	 *
	 * @param  {number} qntParadas Tamanho do conjunto de combinações
	 * @param  {Array} solucao Vetor das soluções encontradas
	 * @param  {number} inicio [inicio = 0] Inicio do indice dos andares
	 * @param  {number} indice [indice = 0] Indice atual do vetor de paradas
	 * @param  {Array} paradas [paradas = Array] Vetor temporario de combinações
	 */
	combinacaoPD(qntParadas, solucao, inicio = 0, indice = 0, paradas = []) {
		// A combinação atual está pronta para ser calculada
		if (indice == qntParadas) {
			return this.calcularAndar(qntParadas, paradas, solucao)
		}

		// Substitui o indice por todos os elementos possíveis
		for (let i = inicio; i <= this.andares.length; i++) {
			// Esta condição garante que um elemento adicionado na lista de paradas
			// irá realizar uma combinação única com o resto dos elemento
			// e ainda irá realizar somente nas posições restantes
			paradas[indice] = this.andares[i]
			if (this.andares.length - i >= qntParadas - indice && paradas[indice].qntPessoas != 0) {
				this.combinacaoPD(qntParadas, solucao, i + 1, indice + 1, paradas)
			}
		}
	}

	/**
	 * Calcula quantas pessoas irão descer naquela combinação de andares
	 *
	 * @param {number} qntParadas Tamanho do conjunto de combinações
	 * @param {number} paradas Vetor de combinações
	 * @param {Array} solucao Vetor de soluções encontradas
	 *
	 */
	calcularAndar(qntParadas, paradas, solucao) {
		let conjunto = []
		let custo = 0
		for (let i = 0; i < qntParadas; i++) {
			custo += paradas[i].qntPessoas
			conjunto.push(paradas[i].andar)
		}

		solucao.push({ andares: conjunto, custo })
	}

	/**
	 * Calcula quantas pessoas irão descer no conjunto de andares
	 * @param {number} qntAndares Tamanho do conjunto de combinações
	 * @param {Array} paradas Vetor temporário de combinações
	 */
	gerarAndares(qntAndares, paradas) {
		let andares = []
		let andaresRemovidos = []

		for (let i = 1; i <= qntAndares; i++) {
			andares.push({
				andar: i,
				qntPessoas: 0
			})
		}

		paradas.forEach(andar => {
			if (andar - 1 >= andares.length) {
				if (!andaresRemovidos.includes(andar)) {
					andaresRemovidos.push(andar)
				}
				return
			}

			andares[andar - 1].qntPessoas++
			this.qntTotalPessoas++
		})

		if (andaresRemovidos.length > 0) {
			console.log(chalkPipe('pink')(`- Um ou mais andares foram removidos (${andaresRemovidos}), pois excede(m) o limite previamente informado;`))
		}

		return andares
	}
}

module.exports = Elevador
