module.exports = [
	{
		type: 'input',
		name: 'qntAndares',
		message: 'Informe a quantidade de andares do prédio:',
		default: '5',
		validate: value => (value.match('^[1-9]+[0-9\\S]*$') ? true : 'Por favor, informe um valor numerico positivo.')
	},
	{
		type: 'input',
		name: 'paradas',
		default: '2,3,3,3,5,4,5',
		message: 'Informe os andares a parar separando-os por vírgula (e.g. 13,14,14,15):',
		validate: value =>
			value.match(`^[1-9]+[0-9,\\S]*$`) ? true : 'Por favor, informe somente andares numericos positivos.'
	},
	{
		type: 'input',
		name: 'qntParadas',
		default: '2',
		message: 'Quantas paradas você deseja que o elevador faça:',
		validate: value => (value.match('^[1-9]+[0-9\\S]*$') ? true : 'Por favor, informe um valor numerico.')
	},
	{
		type: 'list',
		name: 'resolucao',
		message: 'Selecione a forma de resolução',
		choices: [
			{
				name: 'Força bruta',
				value: 'FB'
			},
			{
				name: 'Programação dinâmica',
				value: 'PD'
			}
		]
	}
]
