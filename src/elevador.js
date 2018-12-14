const chalkPipe = require('chalk-pipe')

class Elevador {
	constructor(posFinal, andares) {
		this.posFinal = posFinal
		this.qntPessoas = 0
		this.andares = this.gerarAndares(andares.sort())
	}

	combinacaoFB(qntParada, solucao, inicio = 0, indice = 0, paradas = []) {
		this.calcularAndar(indice, qntParada, paradas, solucao)

		for (let i = inicio; i <= this.posFinal && this.posFinal - i + 1 >= qntParada - indice; i++) {
			paradas[indice] = this.andares[i]
			this.combinacaoFB(qntParada, solucao, i + 1, indice + 1, paradas)
		}
	}

	combinacaoPD(qntParada, solucao, inicio = 0, indice = 0, paradas = []) {
		this.calcularAndar(indice, qntParada, paradas, solucao)

		for (let i = inicio; i <= this.posFinal && this.posFinal - i + 1 >= qntParada - indice; i++) {
			paradas[indice] = this.andares[i]
			if (paradas[indice].qntPessoas != 0) {
				this.combinacaoPD(qntParada, solucao, i + 1, indice + 1, paradas)
			}
		}
	}

	calcularAndar(indice, qntParada, paradas, solucao) {
		if (indice == qntParada) {
			let conjunto = []
			let custo = 0
			for (let i = 0; i < qntParada; i++) {
				custo += paradas[i].qntPessoas
				conjunto.push(paradas[i].andar)
			}
			return solucao.push({ andares: conjunto, custo })
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
			this.qntPessoas++
		})

		if (andaresRemovidos.length > 0) {
			console.log(
				chalkPipe('pink')(`- Um ou mais andares foram removidos (${andaresRemovidos}), pois excede(m) o limite previamente informado;`)
			)
		}

		return andares
	}
}

module.exports = Elevador
