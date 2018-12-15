const inquirer = require('inquirer')
const chalkPipe = require('chalk-pipe')

const questoes = require('./questoes')
const Elevador = require('./elevador')

function init(inicio) {
	if (inicio != undefined) {
		process.stdout.write('\u001b[2J\u001b[0;0H')

		console.log(chalkPipe('#FFD700.bold')('        Elevadores Inteligentes - Introdução à Análise de Algoritmos'))
		console.log(chalkPipe('white')('		(Para sair da execução pressione CTRL + C)'))
		console.log(
			chalkPipe('#006400')(
				'\n     Digamos que eu trabalho em um prédio muito alto com um elevador muito\n lento, convenhamos que é frustrante quando as pessoas apertam os botões de\n muitos andares vizinhos (digamos 13, 14 e 15) de forma que eu vá do térreo\n para a cobertura.\n     Neste caso, minha viagem até a cobertura é interrompida três vezes,\n uma vez em cada um desses andares. Seria mais educado se as três pessoas\n concordassem em pressionar apenas o 14 - nos andares 13 e 15, as pessoas\n subiriam ou desceriam as escadas em um andar.\n     Desta forma, este algoritmo foi desenvolvido para otimizar elevadores.\n De modo a minimizar o número de pessoas que precisam subir/descer escadas.\n '
			)
		)
	}
	menuPrincipal()
}

function debug(solucoes) {
	if (process.argv[2] && process.argv[2].toLowerCase() == 'debug') {
		console.log()
		console.log(chalkPipe('purple')('== Conjunto de soluções =='))
		console.log(solucoes)
		console.log()
	}
}

function menuPrincipal() {
	inquirer.prompt(questoes).then(opcoes => {
		console.log()
		console.time('- Tempo de execução')

		let elevador = new Elevador(opcoes.qntAndares, opcoes.paradas.split(','))
		let solucoes = []
		for (let i = 1; i <= opcoes.qntParadas; i++) {
			eval(`elevador.combinacao${opcoes.resolucao}(i, solucoes)`)
		}
		console.timeEnd('- Tempo de execução')

		solucoes.sort((a, b) => b.custo - a.custo || a.andares.length - b.andares.length)
		console.log(chalkPipe('lightblue')(`- Foram encontradas ${solucoes.length} possíveis soluções;`))
		debug(solucoes)
		console.log(chalkPipe('yellow')(`- A melhor combinação de paradas do elevador são nos andares ${solucoes[0].andares};`))
		console.log(
			chalkPipe('yellow')(
				`- Quantidade de pessoas que irão subir ou descer as escadas: ${elevador.qntPessoas - solucoes[0].custo} de ${elevador.qntPessoas}`
			)
		)

		console.log()
		init()
	})
}

init(true)
