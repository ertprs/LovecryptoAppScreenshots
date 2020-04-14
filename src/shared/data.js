export const data = [
    {
      id: 202003241,
      name: 'Como lavar as mãos corretamente',
      reward: 1,
      numberOfTasks: 1,
      urlImage: '../../../assets/banner/1.jpeg',
      questions :[
        {
          questionType: 'Info',
          questionText: 'Bem vindo a essa task, aqui devemos ter um texto curto explicando algo'
        },
        {
          questionType: 'Info',
          questionText: 'Obrigado por suas respostas'
        },
        
      ]
    },
    {
      id: 202003242,
      name: 'Minuto Saúde, Prevenção Coronavirus',
      reward: 1,
      numberOfTasks: 1,
      urlImage: '../../../assets/banner/1.jpeg',
      questions : [
        {
          questionType: 'Info',
          questionText: 'Bem vindo a essa task, aqui devemos ter um texto curto explicando algo'
        },
        {
          questionType: 'Info',
          questionText: 'Obrigado por suas respostas'
        },
        
      ]
    },
    {
      id: 202003243,
      name: 'Minuto Saúde, Etiqueta de Higiene:',
      reward: 2,
      numberOfTasks: 1,
      urlImage: '../../../assets/banner/1.jpeg',
      questions : [
        {
          questionType: 'Info',
          questionText: 'Bem vindo a essa task, aqui devemos ter um texto curto explicando algo'
        },
        {
          questionType: 'Info',
          questionText: 'Obrigado por suas respostas'
        },
        
      ]
    },
    {
      id: 202003244,
      name: 'WHO',
      reward: 2,
      numberOfTasks: 1,
      urlImage: '../../../assets/banner/1.jpeg',
      questions : [
        {
          questionType: 'Info',
          questionText: 'Bem vindo a essa task, aqui devemos ter um texto curto explicando algo'
        },
        {
          questionType: 'Info',
          questionText: 'Obrigado por suas respostas'
        },
        
      ]
    },
    {
      id: 202003245,
      name: 'Perfil Familiar',
      reward: 5,
      numberOfTasks: 5,
      urlImage: '../../../assets/banner/2.jpeg',
      questions : [
        {
          questionType: 'Info',
          questionText: 'Gostariamos de saber mas sobre seu perfil familiar'
        },
        {
          questionType: 'SelectionGroup',
          questionText:
              'Você tem algum parente idoso que mora com você(65 anos ou mais)',
          questionId: 'singleDefault',
          questionSettings: {
              defaultSelection: 0
          },
          options: [
              {
                  optionText: 'Não',
                  value: 'default'
              },
              {
                  optionText: 'Sim',
                  value: 'alternative'
              },
          ]
      },
      {
        questionType: 'TextInput',
        questionText: 'Se sim, insira o cpf dela?',
        questionId: 'CPF',
        placeholderText: 'CPF',
      },
      {
        questionType: 'TextInput',
        questionText: 'Insira seu CEP',
        questionId: 'CEP',
        placeholderText: 'CEP',
      },
      {
        questionType: 'Info',
        questionText: 'Obrigado por suas respostas'
    },
      
    ]
    },
    {
      id: 202003246,
      name: 'Rede do bem',
      reward: 10,
      numberOfTasks: 1,
      urlImage: '../../../assets/banner/3.jpeg',
      questions : [
        {
          questionType: 'Info',
          questionText: 'Bem vindo a essa task, aqui devemos ter um texto curto explicando algo'
        },
        {
          questionType: 'Info',
          questionText: 'Obrigado por suas respostas'
        },
        
      ]
    },

  ]