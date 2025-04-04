import type { User, Post, Category, Tag, Comment } from "../types"

// Mock Users
export const users: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    photoURL: "/placeholder.svg?height=128&width=128",
    bio: "Administrador do blog de tecnologia e logística",
    socialLinks: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
    role: "admin",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: "2",
    name: "Author User",
    email: "author@example.com",
    photoURL: "/placeholder.svg?height=128&width=128",
    bio: "Autor de conteúdo sobre tecnologia e logística",
    socialLinks: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
    role: "author",
    createdAt: new Date("2023-01-02"),
    updatedAt: new Date("2023-01-02"),
  },
  {
    id: "3",
    name: "Reader User",
    email: "reader@example.com",
    role: "reader",
    createdAt: new Date("2023-01-03"),
    updatedAt: new Date("2023-01-03"),
  },
]

// Mock Categories
export const categories: Category[] = [
  {
    id: "1",
    name: "Tecnologia",
    slug: "tecnologia",
    description: "Artigos sobre as últimas tendências em tecnologia",
    postCount: 5,
  },
  {
    id: "2",
    name: "Logística",
    slug: "logistica",
    description: "Conteúdo sobre logística e cadeia de suprimentos",
    postCount: 3,
  },
  {
    id: "3",
    name: "IA",
    slug: "ia",
    description: "Inteligência Artificial e suas aplicações",
    postCount: 2,
  },
  {
    id: "4",
    name: "Blockchain",
    slug: "blockchain",
    description: "Tecnologia blockchain e suas aplicações",
    postCount: 1,
  },
  {
    id: "5",
    name: "Sustentabilidade",
    slug: "sustentabilidade",
    description: "Práticas sustentáveis em tecnologia e logística",
    postCount: 2,
  },
]

// Mock Tags
export const tags: Tag[] = [
  { id: "1", name: "Tecnologia", slug: "tecnologia", postCount: 5 },
  { id: "2", name: "Logística", slug: "logistica", postCount: 3 },
  { id: "3", name: "IA", slug: "ia", postCount: 2 },
  { id: "4", name: "Blockchain", slug: "blockchain", postCount: 1 },
  { id: "5", name: "Sustentabilidade", slug: "sustentabilidade", postCount: 2 },
  { id: "6", name: "Inovação", slug: "inovacao", postCount: 4 },
  { id: "7", name: "Automação", slug: "automacao", postCount: 2 },
  { id: "8", name: "Cadeia de Suprimentos", slug: "cadeia-de-suprimentos", postCount: 3 },
  { id: "9", name: "Análise de Dados", slug: "analise-de-dados", postCount: 2 },
  { id: "10", name: "Machine Learning", slug: "machine-learning", postCount: 1 },
]

// Mock Posts
export const posts: Post[] = [
  {
    id: "1",
    title: "O Papel da Tecnologia na Gestão Logística Moderna",
    slug: "o-papel-da-tecnologia-na-gestao-logistica-moderna",
    content: `
      <h2>Introdução à Tecnologia na Logística</h2>
      <p>A integração de tecnologias avançadas em operações logísticas não é mais um luxo, mas uma necessidade. As empresas que adotaram a transformação digital têm visto uma significativa melhoria em suas operações.</p>
      
      <p>À medida que a tecnologia continua a evoluir, a integração de soluções digitais na logística tornou-se essencial. A Amazon Web Services (AWS) oferece a AWS SaaS Consultancy Partner program, permitindo empresas a combinar experiência em transporte com conhecimento técnico em desenvolver Software-as-a-Service para soluções eficientes.</p>
      
      <blockquote>
        <p>A integração de tecnologias avançadas em operações logísticas não é mais um luxo, mas uma necessidade. As empresas que adotaram a transformação digital na significativa melhoria de suas operações. A consultoria especializada tem sido fundamental para ajudar organizações a navegar nessa jornada.</p>
        <cite>— Silvester Scott</cite>
      </blockquote>
      
      <h2>Principais Tecnologias em Logística</h2>
      
      <p>Como Parceiro de Consultoria AWS SaaS, compartilhamos insights sobre como alcançamos marcos significativos.</p>
      
      <p>As empresas enfrentam oportunidades sem precedentes na era digital, aproveitando o poder da computação em nuvem, inteligência artificial e análise de dados.</p>
      
      <h3>Tecnologias transformadoras:</h3>
      <ul>
        <li>IoT e Rastreamento em Tempo Real</li>
        <li>IA e Aprendizado de Máquina para Otimização</li>
        <li>Sistemas de Gerenciamento de Transporte e Armazém</li>
        <li>Automação de Armazém e Robótica</li>
      </ul>
      
      <h2>Conclusão</h2>
      
      <p>A adoção de tecnologias avançadas na logística não é apenas uma tendência, mas uma necessidade competitiva. As empresas que investem em soluções tecnológicas estão vendo melhorias significativas em eficiência, redução de custos e satisfação do cliente.</p>
    `,
    excerpt:
      "Descubra como a tecnologia está revolucionando o setor de logística e como empresas estão se adaptando a essas mudanças para melhorar a eficiência operacional.",
    featuredImage: "/placeholder.svg?height=600&width=1200",
    author: {
      id: "1",
      name: "Admin User",
      photoURL: "/placeholder.svg?height=128&width=128",
    },
    categories: ["Tecnologia", "Logística"],
    tags: ["Tecnologia", "Logística", "Inovação", "AWS", "SaaS"],
    status: "published",
    featured: true,
    viewCount: 1250,
    createdAt: new Date("2023-06-15"),
    updatedAt: new Date("2023-06-15"),
    publishedAt: new Date("2023-06-15"),
  },
  {
    id: "2",
    title: "Inteligência Artificial na Otimização de Rotas",
    slug: "inteligencia-artificial-na-otimizacao-de-rotas",
    content: `
      <h2>Transformando a Logística com IA</h2>
      <p>A inteligência artificial está revolucionando a forma como as empresas planejam e executam suas operações logísticas, especialmente na otimização de rotas de entrega.</p>
      
      <p>Algoritmos avançados de IA podem analisar milhões de variáveis em tempo real para determinar as rotas mais eficientes, considerando fatores como tráfego, condições climáticas, restrições de tempo e capacidade de carga.</p>
      
      <h2>Benefícios da Otimização de Rotas com IA</h2>
      
      <ul>
        <li>Redução de custos operacionais em até 30%</li>
        <li>Diminuição do tempo de entrega em até 40%</li>
        <li>Redução significativa da emissão de carbono</li>
        <li>Melhoria na satisfação do cliente</li>
      </ul>
      
      <h3>Casos de Sucesso</h3>
      
      <p>Empresas como DHL, UPS e Amazon já implementaram sistemas de IA para otimização de rotas e têm relatado resultados impressionantes. A DHL, por exemplo, conseguiu reduzir seus custos operacionais em 15% e melhorar a pontualidade das entregas em 25%.</p>
      
      <blockquote>
        <p>A implementação de algoritmos de IA para otimização de rotas foi um divisor de águas para nossa operação logística. Conseguimos não apenas reduzir custos, mas também melhorar significativamente a experiência do cliente.</p>
        <cite>— Diretor de Logística da DHL</cite>
      </blockquote>
      
      <h2>O Futuro da Otimização de Rotas</h2>
      
      <p>O futuro da otimização de rotas com IA promete ser ainda mais revolucionário, com a integração de veículos autônomos, drones e sistemas de entrega robotizados. Essas tecnologias, combinadas com algoritmos de IA cada vez mais sofisticados, têm o potencial de transformar completamente a cadeia de suprimentos global.</p>
    `,
    excerpt:
      "Como a inteligência artificial está transformando a otimização de rotas logísticas e criando novas oportunidades para eficiência e redução de custos.",
    featuredImage: "/placeholder.svg?height=600&width=1200",
    author: {
      id: "2",
      name: "Author User",
      photoURL: "/placeholder.svg?height=128&width=128",
    },
    categories: ["IA", "Logística"],
    tags: ["IA", "Logística", "Otimização", "Machine Learning"],
    status: "published",
    featured: true,
    viewCount: 980,
    createdAt: new Date("2023-07-10"),
    updatedAt: new Date("2023-07-10"),
    publishedAt: new Date("2023-07-10"),
  },
  {
    id: "3",
    title: "Blockchain na Cadeia de Suprimentos",
    slug: "blockchain-na-cadeia-de-suprimentos",
    content: `
      <h2>Revolucionando a Transparência na Cadeia de Suprimentos</h2>
      <p>A tecnologia blockchain está transformando a forma como as empresas gerenciam suas cadeias de suprimentos, oferecendo níveis sem precedentes de transparência, rastreabilidade e segurança.</p>
      
      <p>Com blockchain, cada transação ou movimento na cadeia de suprimentos é registrado em um livro-razão distribuído e imutável, permitindo que todas as partes interessadas tenham acesso às mesmas informações em tempo real.</p>
      
      <h2>Principais Benefícios do Blockchain na Cadeia de Suprimentos</h2>
      
      <ul>
        <li>Rastreabilidade completa de produtos do fabricante ao consumidor</li>
        <li>Redução de fraudes e falsificações</li>
        <li>Maior eficiência em processos de auditoria e conformidade</li>
        <li>Automação de contratos e pagamentos através de smart contracts</li>
        <li>Melhoria na gestão de recalls de produtos</li>
      </ul>
      
      <h3>Casos de Uso Reais</h3>
      
      <p>Várias empresas já estão implementando blockchain em suas cadeias de suprimentos. A Walmart, por exemplo, utiliza blockchain para rastrear a origem de produtos alimentícios, permitindo identificar a fonte de contaminações em questão de segundos, em vez de dias ou semanas.</p>
      
      <p>A Maersk, uma das maiores empresas de transporte marítimo do mundo, desenvolveu a plataforma TradeLens em parceria com a IBM, utilizando blockchain para digitalizar e simplificar o comércio global.</p>
      
      <blockquote>
        <p>O blockchain está transformando nossa capacidade de rastrear produtos ao longo da cadeia de suprimentos. O que antes levava dias para rastrear, agora pode ser feito em segundos, melhorando significativamente nossa capacidade de resposta a problemas de qualidade e segurança.</p>
        <cite>— VP de Cadeia de Suprimentos da Walmart</cite>
      </blockquote>
      
      <h2>Desafios e Considerações</h2>
      
      <p>Apesar dos benefícios, a implementação de blockchain na cadeia de suprimentos ainda enfrenta desafios, como a necessidade de padronização, questões de escalabilidade e a resistência à mudança por parte de alguns participantes da cadeia.</p>
      
      <p>No entanto, à medida que a tecnologia amadurece e mais casos de sucesso surgem, espera-se que a adoção de blockchain na cadeia de suprimentos continue a crescer, transformando fundamentalmente a forma como as empresas gerenciam suas operações logísticas.</p>
    `,
    excerpt:
      "Como a tecnologia blockchain está sendo utilizada para aumentar a transparência e segurança nas cadeias de suprimentos globais.",
    featuredImage: "/placeholder.svg?height=600&width=1200",
    author: {
      id: "1",
      name: "Admin User",
      photoURL: "/placeholder.svg?height=128&width=128",
    },
    categories: ["Blockchain", "Tecnologia"],
    tags: ["Blockchain", "Cadeia de Suprimentos", "Transparência", "Segurança"],
    status: "published",
    viewCount: 750,
    createdAt: new Date("2023-08-05"),
    updatedAt: new Date("2023-08-05"),
    publishedAt: new Date("2023-08-05"),
  },
  {
    id: "4",
    title: "Sustentabilidade na Logística Moderna",
    slug: "sustentabilidade-na-logistica-moderna",
    content: `
      <h2>A Importância da Sustentabilidade na Logística</h2>
      <p>A sustentabilidade tornou-se um imperativo estratégico para as empresas de logística, impulsionada por regulamentações mais rigorosas, demandas dos consumidores e a necessidade de reduzir custos operacionais.</p>
      
      <p>O setor de logística é responsável por uma parcela significativa das emissões globais de carbono, tornando essencial a adoção de práticas mais sustentáveis para combater as mudanças climáticas.</p>
      
      <h2>Estratégias para uma Logística Mais Verde</h2>
      
      <h3>1. Otimização de Rotas e Redução de Quilometragem</h3>
      <p>Utilizando algoritmos avançados e sistemas de gerenciamento de transporte, as empresas podem otimizar rotas para reduzir a distância percorrida, o consumo de combustível e as emissões de carbono.</p>
      
      <h3>2. Adoção de Veículos Elétricos e Alternativos</h3>
      <p>A transição para veículos elétricos, híbridos ou movidos a combustíveis alternativos pode reduzir significativamente a pegada de carbono das operações logísticas.</p>
      
      <h3>3. Embalagens Sustentáveis</h3>
      <p>O uso de materiais recicláveis, biodegradáveis ou reutilizáveis para embalagens pode reduzir o desperdício e o impacto ambiental.</p>
      
      <h3>4. Armazéns Verdes</h3>
      <p>A implementação de tecnologias de eficiência energética, como iluminação LED, sistemas de gerenciamento de energia e painéis solares, pode reduzir o consumo de energia em armazéns.</p>
      
      <blockquote>
        <p>A sustentabilidade não é apenas uma responsabilidade ambiental, mas também uma oportunidade de negócio. Nossas iniciativas sustentáveis não apenas reduziram nossa pegada de carbono, mas também resultaram em economias significativas de custos.</p>
        <cite>— Diretor de Sustentabilidade da DHL</cite>
      </blockquote>
      
      <h2>Casos de Sucesso</h2>
      
      <p>Várias empresas de logística já estão liderando o caminho em sustentabilidade. A UPS, por exemplo, investiu em uma frota de mais de 10.000 veículos alternativos e implementou tecnologias avançadas de otimização de rotas, resultando em uma redução significativa de emissões.</p>
      
      <p>A Amazon comprometeu-se a atingir zero emissões líquidas de carbono até 2040 e já começou a implementar veículos elétricos de entrega em várias cidades ao redor do mundo.</p>
      
      <h2>O Futuro da Logística Sustentável</h2>
      
      <p>O futuro da logística sustentável promete ser ainda mais inovador, com o desenvolvimento de novas tecnologias como drones movidos a energia solar, veículos autônomos elétricos e sistemas de entrega urbana baseados em microhubs.</p>
      
      <p>À medida que a pressão por práticas mais sustentáveis continua a crescer, as empresas que liderarem a transição para uma logística mais verde não apenas contribuirão para um planeta mais saudável, mas também ganharão vantagem competitiva em um mercado cada vez mais consciente ambientalmente.</p>
    `,
    excerpt:
      "Estratégias para implementar práticas sustentáveis em operações logísticas sem comprometer a eficiência ou aumentar os custos.",
    featuredImage: "/placeholder.svg?height=600&width=1200",
    author: {
      id: "2",
      name: "Author User",
      photoURL: "/placeholder.svg?height=128&width=128",
    },
    categories: ["Sustentabilidade", "Logística"],
    tags: ["Sustentabilidade", "Logística Verde", "Redução de Carbono", "Eficiência Energética"],
    status: "published",
    featured: true,
    viewCount: 820,
    createdAt: new Date("2023-09-20"),
    updatedAt: new Date("2023-09-20"),
    publishedAt: new Date("2023-09-20"),
  },
  {
    id: "5",
    title: "O Futuro dos Veículos Autônomos na Logística",
    slug: "o-futuro-dos-veiculos-autonomos-na-logistica",
    content: `
      <h2>A Revolução dos Veículos Autônomos na Logística</h2>
      <p>Os veículos autônomos estão prestes a revolucionar o setor de logística, prometendo transformar fundamentalmente a forma como mercadorias são transportadas ao redor do mundo.</p>
      
      <p>De caminhões autônomos em rodovias a pequenos robôs de entrega em áreas urbanas, a tecnologia de direção autônoma está avançando rapidamente e tem o potencial de resolver muitos dos desafios enfrentados pelo setor logístico atual.</p>
      
      <h2>Benefícios dos Veículos Autônomos na Logística</h2>
      
      <h3>1. Aumento da Eficiência e Produtividade</h3>
      <p>Veículos autônomos podem operar 24 horas por dia, 7 dias por semana, sem necessidade de pausas para descanso, potencialmente dobrando a produtividade em comparação com veículos operados por humanos.</p>
      
      <h3>2. Redução de Custos</h3>
      <p>A eliminação da necessidade de motoristas humanos pode reduzir significativamente os custos operacionais, especialmente considerando que os salários dos motoristas representam uma parcela substancial dos custos de transporte.</p>
      
      <h3>3. Melhoria na Segurança</h3>
      <p>Veículos autônomos não sofrem de fadiga, distração ou outras limitações humanas que frequentemente levam a acidentes, potencialmente reduzindo significativamente as taxas de acidentes em estradas.</p>
      
      <h3>4. Otimização de Rotas e Redução de Emissões</h3>
      <p>Sistemas avançados de IA podem otimizar rotas em tempo real, reduzindo o consumo de combustível e as emissões de carbono.</p>
      
      <blockquote>
        <p>Os veículos autônomos representam o futuro da logística. Eles não apenas reduzirão custos e aumentarão a eficiência, mas também tornarão nossas estradas mais seguras e nossas operações mais sustentáveis. As empresas que adotarem essa tecnologia primeiro terão uma vantagem competitiva significativa.</p>
        <cite>— Especialista em Tecnologia de Transporte</cite>
      </blockquote>
      
      <h2>Estado Atual e Desafios</h2>
      
      <p>Apesar do grande potencial, a implementação em larga escala de veículos autônomos na logística ainda enfrenta desafios significativos. Questões regulatórias, preocupações com segurança cibernética, limitações tecnológicas e resistência pública são alguns dos obstáculos que precisam ser superados.</p>
      
      <p>No entanto, o progresso continua em ritmo acelerado. Empresas como Waymo, TuSimple e Embark já estão testando caminhões autônomos em rodovias reais, enquanto Amazon, FedEx e outros estão experimentando com robôs de entrega autônomos em áreas urbanas.</p>
      
      <h2>O Caminho para o Futuro</h2>
      
      <p>A transição para veículos autônomos na logística provavelmente ocorrerá em fases. Inicialmente, veremos sistemas de assistência ao motorista cada vez mais avançados, seguidos por autonomia em ambientes controlados como rodovias, e eventualmente, autonomia completa em todos os ambientes.</p>
      
      <p>As empresas de logística devem começar a se preparar agora para essa revolução iminente, investindo em tecnologia, desenvolvendo novas competências e repensando seus modelos de negócios para aproveitar ao máximo o potencial transformador dos veículos autônomos.</p>
    `,
    excerpt:
      "Explorando o potencial dos veículos autônomos para transformar o transporte de mercadorias e a logística global.",
    featuredImage: "/placeholder.svg?height=600&width=1200",
    author: {
      id: "1",
      name: "Admin User",
      photoURL: "/placeholder.svg?height=128&width=128",
    },
    categories: ["Tecnologia", "Inovação"],
    tags: ["Veículos Autônomos", "Inovação", "Tecnologia", "Futuro da Logística"],
    status: "published",
    viewCount: 950,
    createdAt: new Date("2023-10-15"),
    updatedAt: new Date("2023-10-15"),
    publishedAt: new Date("2023-10-15"),
  },
  {
    id: "6",
    title: "Análise de Dados na Otimização de Operações Logísticas",
    slug: "analise-de-dados-na-otimizacao-de-operacoes-logisticas",
    content: `
      <h2>O Poder da Análise de Dados na Logística</h2>
      <p>A análise de dados está transformando o setor de logística, permitindo que as empresas tomem decisões mais informadas, otimizem operações e melhorem a eficiência em toda a cadeia de suprimentos.</p>
      
      <p>Com o volume crescente de dados gerados por sensores IoT, sistemas de gerenciamento de transporte, dispositivos móveis e outras fontes, as empresas de logística têm acesso a uma riqueza de informações que podem ser analisadas para obter insights valiosos.</p>
      
      <h2>Aplicações da Análise de Dados na Logística</h2>
      
      <h3>1. Previsão de Demanda</h3>
      <p>Algoritmos avançados de análise de dados podem prever com precisão a demanda futura, permitindo que as empresas otimizem seus níveis de estoque, reduzam custos de armazenamento e evitem situações de falta de estoque.</p>
      
      <h3>2. Otimização de Rotas</h3>
      <p>A análise de dados de tráfego, condições climáticas, padrões históricos e outros fatores pode ajudar a determinar as rotas mais eficientes, reduzindo custos de combustível, tempo de trânsito e emissões de carbono.</p>
      
      <h3>3. Manutenção Preditiva</h3>
      <p>Analisando dados de sensores em veículos e equipamentos, as empresas podem prever falhas antes que ocorram, programando manutenção preventiva e evitando interrupções caras nas operações.</p>
      
      <h3>4. Otimização de Armazéns</h3>
      <p>A análise de dados pode melhorar o layout do armazém, otimizar a alocação de produtos e aumentar a eficiência das operações de picking, reduzindo custos operacionais e melhorando os tempos de processamento.</p>
      
      <blockquote>
        <p>A análise de dados não é mais um luxo, mas uma necessidade competitiva na logística moderna. As empresas que não aproveitarem o poder dos dados ficarão para trás em um mercado cada vez mais orientado por dados.</p>
        <cite>— Diretor de Análise de Dados de uma empresa de logística global</cite>
      </blockquote>
      
      <h2>Tecnologias e Ferramentas</h2>
      
      <p>Várias tecnologias e ferramentas estão impulsionando a revolução da análise de dados na logística:</p>
      
      <ul>
        <li>Big Data: Plataformas como Hadoop e Spark permitem o processamento de grandes volumes de dados.</li>
        <li>Machine Learning: Algoritmos de aprendizado de máquina podem identificar padrões e fazer previsões baseadas em dados históricos.</li>
        <li>Visualização de Dados: Ferramentas como Tableau e Power BI permitem a visualização intuitiva de dados complexos.</li>
        <li>IoT: Sensores e dispositivos conectados geram dados em tempo real sobre localização, condições e status de ativos.</li>
      </ul>
      
      <h2>Casos de Sucesso</h2>
      
      <p>Muitas empresas já estão colhendo os benefícios da análise de dados na logística. A UPS, por exemplo, desenvolveu o sistema ORION (On-Road Integrated Optimization and Navigation), que utiliza análise avançada de dados para otimizar rotas de entrega, economizando milhões de galões de combustível anualmente.</p>
      
      <p>A Amazon utiliza análise preditiva para antecipar a demanda e posicionar produtos em centros de distribuição estratégicos, reduzindo drasticamente os tempos de entrega.</p>
      
      <h2>O Futuro da Análise de Dados na Logística</h2>
      
      <p>O futuro promete avanços ainda mais significativos, com a integração de tecnologias como inteligência artificial, aprendizado profundo e análise em tempo real. As empresas que investirem em capacidades de análise de dados agora estarão bem posicionadas para aproveitar essas inovações futuras e manter uma vantagem competitiva no mercado logístico em rápida evolução.</p>
    `,
    excerpt:
      "Como a análise de dados está ajudando empresas de logística a tomar decisões mais informadas e melhorar suas operações.",
    featuredImage: "/placeholder.svg?height=600&width=1200",
    author: {
      id: "2",
      name: "Author User",
      photoURL: "/placeholder.svg?height=128&width=128",
    },
    categories: ["Análise de Dados", "Tecnologia"],
    tags: ["Análise de Dados", "Big Data", "Machine Learning", "Otimização"],
    status: "published",
    viewCount: 780,
    createdAt: new Date("2023-11-05"),
    updatedAt: new Date("2023-11-05"),
    publishedAt: new Date("2023-11-05"),
  },
]

// Mock Comments
export const comments: Comment[] = [
  {
    id: "1",
    postId: "1",
    author: {
      name: "João Silva",
      email: "joao@example.com",
      photoURL: "/placeholder.svg?height=50&width=50",
    },
    content: "Excelente artigo! Muito informativo e bem escrito.",
    createdAt: new Date("2023-06-16"),
    updatedAt: new Date("2023-06-16"),
  },
  {
    id: "2",
    postId: "1",
    author: {
      name: "Maria Oliveira",
      email: "maria@example.com",
    },
    content:
      "Gostaria de saber mais sobre como implementar essas tecnologias em pequenas empresas. Vocês têm algum artigo sobre isso?",
    createdAt: new Date("2023-06-17"),
    updatedAt: new Date("2023-06-17"),
  },
  {
    id: "3",
    postId: "2",
    author: {
      name: "Carlos Santos",
      email: "carlos@example.com",
      photoURL: "/placeholder.svg?height=50&width=50",
    },
    content:
      "A IA realmente está transformando o setor logístico. Na minha empresa, implementamos um sistema de otimização de rotas baseado em IA e os resultados foram impressionantes.",
    createdAt: new Date("2023-07-11"),
    updatedAt: new Date("2023-07-11"),
  },
  {
    id: "4",
    postId: "3",
    author: {
      id: "3",
      name: "Reader User",
      email: "reader@example.com",
    },
    content:
      "Blockchain é definitivamente o futuro da cadeia de suprimentos. Estou ansioso para ver como essa tecnologia vai evoluir nos próximos anos.",
    createdAt: new Date("2023-08-06"),
    updatedAt: new Date("2023-08-06"),
  },
]

