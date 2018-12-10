var calculo = require('./calculo')

class Elevador {
	constructor(posFinal, paradas, qntParadas) {
		this.posInicial = 0
		this.posFinal = posFinal
		this.paradas = this.gerarAndares(paradas.split(',').sort())
		this.qntParadas = qntParadas
		this.solucoes = []
	}

	// calcularCaminhoFB() {
	// 	for (let i = this.posInicial; i <= this.posFinal; i++) {
	// 		this.gerarSolucao(i)
	// 	}

	// 	this.solucoes.sort((solucaoA, solucaoB) => solucaoA.custo - solucaoB.custo)

	// 	console.log(`De ${this.solucoes.length} soluções encontradas, a(s) melhor(es) solução(ões) encontrada(s) para ${this.qntParadas} parada(s) e(são) o andar: `)
	// 	console.log(JSON.stringify(this.solucoes, null, 2))

	// 	for (let i = 0; i < this.qntParadas; i++) {
	// 		console.log(JSON.stringify(this.solucoes[i].andar, null, 2))
	// 	}
	// }

	calcularCaminhoFB() {
		console.log('Prog. Bruta')
	}

	calcularCaminhoPD() {
		console.log('Prog. Dinâmica')
	}

	gerarSolucao(andar) {
		let subir = this.calcularCustoSubida(andar)
		let descer = this.calcularCustoDescida(andar)

		this.solucoes.push({ andar, subir, descer, custo: subir + descer })
	}

	calcularCustoSubida(andarAtual) {
		let subida = 0
		for (let i = andarAtual + 1; i <= this.posFinal; i++) {
			subida += this.paradas[i].qntPessoas
		}

		return subida
	}

	calcularCustoDescida(andarAtual) {
		let descida = 0
		for (let i = andarAtual - 1; i >= this.posInicial; i--) {
			descida += this.paradas[i].qntPessoas
		}

		return descida
	}

	gerarAndares(paradas) {
		let andares = []
		let andaresRemovidos = []

		for (let i = 0; i <= this.posFinal; i++) {
			andares.push({ andar: i, qntPessoas: 0 })
		}

		paradas.map(andar => {
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

let elevador = new Elevador(5, '2,3,3,3,4,5,5', 1)
elevador.calcularCaminhoFB()

// module.exports = Elevador
