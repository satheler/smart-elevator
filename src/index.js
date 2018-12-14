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

function menuPrincipal() {
	inquirer.prompt(questoes).then(opcoes => {
		let elevador = new Elevador(opcoes.qntAndares, opcoes.paradas, opcoes.qntParadas)
		let resultado = eval(`elevador.calcularTrajetoria${opcoes.resolucao}()`)
		resultado.sort((a, b) => b.custo - a.custo || a.andares.length - b.andares.length)

		console.log(resultado)
		console.log('')
		init()
	})
}

init(true)
