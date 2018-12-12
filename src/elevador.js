class Elevador {
	/**
	 * @param  {number} posFinal Quantidade de andares do prédio
	 * @param  {string} andares Quais andares irá parar?
	 * @param  {number} qntParadas Quantidade de paradas que o elevador irá fazer
	 */
	constructor(posFinal, andares, qntParadas) {
		this.posInicial = 0
		this.posFinal = posFinal

		this.andares = this.gerarAndares(andares.split(',').sort())
		this.qntParadas = qntParadas
	}

	/**
	 * Calcula trajetoria utilizando algoritmo de Força Bruta
	 */
	calcularTrajetoriaFB() {
		let solucoes = []
		for (let i = 1; i <= this.qntParadas; i++) {
			this.combinacao(this.andares, [], 0, this.andares.length - 1, 0, i, solucoes)
		}

		solucoes.sort((a, b) => b.custo - a.custo || a.andares.length - b.andares.length)
		return solucoes
	}

	combinacao(andares, paradas, inicio, fim, indice, qntParadas, solucao) {
		if (indice == qntParadas) {
			let conjunto = []
			let custo = 0
			for (let i = 0; i < qntParadas; i++) {
				custo += paradas[i].qntPessoas
				conjunto.push(paradas[i])
			}
			return solucao.push({ andares: conjunto, custo })
		}

		for (let i = inicio; i <= fim && fim - i + 1 >= qntParadas - indice; i++) {
			paradas[indice] = andares[i]
			this.combinacao(andares, paradas, i + 1, fim, indice + 1, qntParadas, solucao)
		}
	}

	calcularTrajetoriaPD() {
		console.log('Prog. Dinâmica')
	}

	gerarAndares(paradas) {
		let andares = []
		let andaresRemovidos = []

		for (let i = 0; i <= this.posFinal; i++) {
			andares.push({ andar: i, qntPessoas: 0 })
		}

		paradas.forEach(andar => {
			if (andar >= andares.length) {
				if (!andaresRemovidos.includes(andar)) {
					andaresRemovidos.push(andar)
				}
				return
			}

			andares[andar].qntPessoas++
		})

		if (andaresRemovidos.length > 0) {
			console.log(`Um ou mais andares foram removidos (${andaresRemovidos}), pois excedem o limite previamente informado.`)
		}

		return andares
	}
}

module.exports = Elevador
