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
		console.time('Tempo de execução Algoritmo de Força Bruta')
		let solucoes = []
		for (let i = 1; i <= this.qntParadas; i++) {
			this.combinacao(this.andares, [], 0, this.andares.length - 1, 0, i, solucoes)
		}

		console.timeEnd('Tempo de execução Algoritmo de Força Bruta')
		return solucoes
	}

	combinacao(andares, paradas, inicio, fim, indice, qntParada, solucao) {
		if (indice == qntParada) {
			let conjunto = []
			let custo = 0
			for (let i = 0; i < qntParada; i++) {
				custo += paradas[i].qntPessoas
				conjunto.push(paradas[i].andar)
			}
			return solucao.push({ andares: JSON.stringify(conjunto), custo })
		}

		for (let i = inicio; i <= fim && fim - i + 1 >= qntParada - indice; i++) {
			paradas[indice] = andares[i]
			this.combinacao(andares, paradas, i + 1, fim, indice + 1, qntParada, solucao)
		}
	}

	calcularTrajetoriaPD() {
		console.time('Tempo de execução Algoritmo de Programação Dinâmica')
		let solucoes = []
		for (let i = 1; i <= this.qntParadas; i++) {
			this.combinacaoComMemo(this.andares, [], 0, this.andares.length - 1, 0, i, solucoes)
		}

		console.timeEnd('Tempo de execução Algoritmo de Programação Dinâmica')
		return solucoes
	}

	combinacaoComMemo(andares, paradas, inicio, fim, indice, qntParada, solucoes) {
		if (indice == qntParada) {
			let conjunto = []
			let custo = 0
			for (let i = 0; i < qntParada; i++) {
				custo += paradas[i].qntPessoas
				conjunto.push(paradas[i].andar)
			}
			return solucoes.push({ andares: JSON.stringify(conjunto), custo })
		}

		for (let i = inicio; (i <= fim) & (fim - i + 1 >= qntParada - indice); i++) {
			paradas[indice] = andares[i]
			if (paradas[indice].qntPessoas != 0) {
				this.combinacaoComMemo(andares, paradas, i + 1, fim, indice + 1, qntParada, solucoes)
			}
		}
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
			console.log(
				`Um ou mais andares foram removidos (${andaresRemovidos}), pois excedem o limite previamente informado.`
			)
		}

		return andares
	}
}

// Teste
if (process.argv[2] && process.argv[2].toLowerCase() == 'debug') {
	let el = new Elevador(5, '2,3,3,3,5,4,5', 2)
	console.log(el.calcularTrajetoriaFB())
	console.log('')
	console.log(el.calcularTrajetoriaPD())
}

module.exports = Elevador
