module.exports = [
	{
		type: 'input',
		name: 'qntAndares',
		message: 'Informe a quantidade de andares do prédio:',
		// default: '15',
		validate: value => (value.match('^[1-9]+[0-9\\S]*$') ? true : 'Por favor, informe um valor numerico positivo.')
	},
	{
		type: 'input',
		name: 'paradas',
		// default: '1,3,6,8,11,14,15,15',
		message: 'Informe os andares a parar separando-os por vírgula (e.g. 13,14,14,15):',
		validate: value => (value.match(`^[1-9]+[0-9,\\S]*$`) ? true : 'Por favor, informe somente andares numericos positivos.')
	},
	{
		type: 'input',
		name: 'qntParadas',
		// default: '3',
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
