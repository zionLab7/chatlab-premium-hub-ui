
// Mock data para a aplicação Hub Chat Lab

// Cursos
export const courses = [
  {
    id: "c1",
    title: "Dominando Chatbots para Atendimento",
    description: "Aprenda a criar e implementar chatbots inteligentes que transformarão o atendimento da sua empresa.",
    image: "https://images.unsplash.com/photo-1587560699334-bea93391dcef?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hhdGJvdHxlbnwwfHwwfHx8MA%3D%3D",
    progress: 65,
    totalModules: 5,
    totalLessons: 23,
    category: "Chatbots",
    duration: "8h 30min",
    modules: [
      {
        id: "m1c1",
        title: "Introdução aos Chatbots",
        description: "Fundamentos e conceitos básicos de chatbots",
        progress: 100,
        lessons: [
          {
            id: "l1m1c1",
            title: "O que são Chatbots e por que utilizá-los",
            duration: "12:30",
            isCompleted: true,
            isLocked: false,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            id: "l2m1c1",
            title: "História e evolução dos Chatbots",
            duration: "15:45",
            isCompleted: true,
            isLocked: false,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            id: "l3m1c1",
            title: "Tipos de Chatbots: regras vs IA",
            duration: "18:20",
            isCompleted: true,
            isLocked: false,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          }
        ]
      },
      {
        id: "m2c1",
        title: "Estratégias de Atendimento com Chatbots",
        description: "Como utilizar chatbots para melhorar o atendimento",
        progress: 75,
        lessons: [
          {
            id: "l1m2c1",
            title: "Definindo objetivos para seu Chatbot",
            duration: "20:10",
            isCompleted: true,
            isLocked: false,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            id: "l2m2c1",
            title: "Mapeando a jornada do cliente",
            duration: "18:30",
            isCompleted: true,
            isLocked: false,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            id: "l3m2c1",
            title: "Integrando Chatbot com equipe humana",
            duration: "22:15",
            isCompleted: false,
            isLocked: false,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            id: "l4m2c1",
            title: "Métricas para avaliar eficiência",
            duration: "14:50",
            isCompleted: false,
            isLocked: false,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          }
        ]
      },
      {
        id: "m3c1",
        title: "Construindo seu primeiro Chatbot",
        description: "Passo a passo para criar um chatbot funcional",
        progress: 0,
        lessons: [
          {
            id: "l1m3c1",
            title: "Escolhendo a plataforma ideal",
            duration: "16:40",
            isCompleted: false,
            isLocked: true,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            id: "l2m3c1",
            title: "Planejando fluxos de conversa",
            duration: "25:15",
            isCompleted: false,
            isLocked: true,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          }
        ]
      }
    ]
  },
  {
    id: "c2",
    title: "Marketing Digital para Conversões",
    description: "Estratégias avançadas de marketing digital para aumentar conversões e vendas em seu negócio.",
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1hcmtldGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    progress: 25,
    totalModules: 6,
    totalLessons: 28,
    category: "Marketing",
    duration: "10h 15min",
    modules: [
      {
        id: "m1c2",
        title: "Fundamentos de Marketing Digital",
        progress: 100,
        lessons: [
          {
            id: "l1m1c2",
            title: "Pilares do Marketing Digital",
            duration: "18:30",
            isCompleted: true,
            isLocked: false,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            id: "l2m1c2",
            title: "Análise de concorrência online",
            duration: "22:10",
            isCompleted: true,
            isLocked: false,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          }
        ]
      },
      {
        id: "m2c2",
        title: "SEO e Tráfego Orgânico",
        progress: 50,
        lessons: [
          {
            id: "l1m2c2",
            title: "Otimização on-page para Google",
            duration: "24:15",
            isCompleted: true,
            isLocked: false,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            id: "l2m2c2",
            title: "Estratégias de Link Building",
            duration: "20:30",
            isCompleted: false,
            isLocked: false,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          }
        ]
      }
    ]
  },
  {
    id: "c3",
    title: "Estratégias Avançadas de Vendas Online",
    description: "Técnicas e métodos comprovados para aumentar suas vendas online e maximizar seu faturamento.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNhbGVzfGVufDB8fDB8fHww",
    progress: 10,
    totalModules: 4,
    totalLessons: 16,
    category: "Vendas",
    duration: "6h 45min",
    modules: []
  },
  {
    id: "c4",
    title: "WhatsApp Business para Resultados",
    description: "Como utilizar o WhatsApp como ferramenta poderosa para vendas, atendimento e relacionamento com clientes.",
    image: "https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHdoYXRzYXBwfGVufDB8fDB8fHww",
    progress: 0,
    totalModules: 3,
    totalLessons: 12,
    category: "Atendimento",
    duration: "4h 20min",
    modules: []
  }
];

// Lives
export const lives = [
  {
    id: "l1",
    title: "Como Implementar Chatbots no WhatsApp: Estratégias Avançadas",
    thumbnail: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGl2ZXN0cmVhbXxlbnwwfHwwfHx8MA%3D%3D",
    date: "25/04/2025",
    time: "19:00 - 20:30",
    isPast: false,
    externalLink: "https://youtube.com/live/example"
  },
  {
    id: "l2",
    title: "Cases de Sucesso: Transformando Atendimento com IA",
    thumbnail: "https://images.unsplash.com/photo-1551818905-29c07d4802d0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2FzZSUyMHN0dWR5fGVufDB8fDB8fHww",
    date: "12/05/2025",
    time: "20:00 - 21:30",
    isPast: false,
    externalLink: "https://youtube.com/live/example"
  },
  {
    id: "l3",
    title: "Marketing de Conteúdo para Atrair Clientes Ideais",
    thumbnail: "https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbnRlbnQlMjBtYXJrZXRpbmd8ZW58MHx8MHx8fDA%3D",
    date: "10/03/2025",
    time: "19:00 - 20:30",
    isPast: true,
    externalLink: "https://youtube.com/watch?v=example"
  },
  {
    id: "l4",
    title: "Estratégias de Vendas para Alta Conversão em 2025",
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNhbGVzJTIwc3RyYXRlZ3l8ZW58MHx8MHx8fDA%3D",
    date: "28/02/2025",
    time: "20:00 - 21:30",
    isPast: true,
    externalLink: "https://youtube.com/watch?v=example"
  }
];

// Materiais
export const materials = [
  {
    id: "m1",
    title: "Guia Definitivo: Chatbots para Negócios em 2025",
    description: "Material completo sobre como implementar chatbots estrategicamente no seu negócio, com exemplos práticos e casos de sucesso.",
    category: "Chatbots",
    fileType: "pdf",
    downloadUrl: "https://example.com/download/guia-chatbots.pdf"
  },
  {
    id: "m2",
    title: "Template de Fluxos para WhatsApp Business",
    description: "Planilha pronta com modelos de fluxos de atendimento e vendas para implementar no seu WhatsApp.",
    category: "Atendimento",
    fileType: "xlsx",
    downloadUrl: "https://example.com/download/template-whatsapp.xlsx"
  },
  {
    id: "m3",
    title: "Checklist SEO para Primeira Página do Google",
    description: "Lista completa de verificação para otimizar seu site e conquistar as primeiras posições no Google.",
    category: "Marketing",
    fileType: "pdf",
    downloadUrl: "https://example.com/download/seo-checklist.pdf"
  },
  {
    id: "m4",
    title: "Apresentação: Implementação de Chatbots em Empresas",
    description: "Slides da apresentação sobre como implementar chatbots em diversos departamentos da empresa.",
    category: "Chatbots",
    fileType: "pptx",
    downloadUrl: "https://example.com/download/slides-chatbots.pptx"
  },
  {
    id: "m5",
    title: "Modelo de Relatório de Performance para Chatbots",
    description: "Template para acompanhamento e relatório de métricas de desempenho dos seus chatbots.",
    category: "Chatbots",
    fileType: "xlsx",
    downloadUrl: "https://example.com/download/relatorio-chatbot.xlsx"
  },
  {
    id: "m6",
    title: "E-book: Copywriting Persuasivo para Chatbots",
    description: "Guia completo sobre como escrever mensagens persuasivas para seus chatbots, aumentando conversão e engajamento.",
    category: "Marketing",
    fileType: "pdf",
    downloadUrl: "https://example.com/download/ebook-copy-chatbots.pdf"
  }
];

// Estatísticas para Dashboard
export const dashboardStats = [
  {
    title: "Cursos em Andamento",
    value: "3",
    description: "Você tem 3 cursos em progresso",
    icon: "BookOpen",
  },
  {
    title: "Próximas Lives",
    value: "2",
    description: "Próximas 7 dias",
    icon: "Video",
  },
  {
    title: "Materiais Disponíveis",
    value: "12",
    description: "Atualizados recentemente",
    icon: "FileText",
  },
  {
    title: "Progresso Médio",
    value: "35%",
    description: "Nos seus cursos",
    icon: "BarChart",
  },
];

// Construtor de Chatbots
export const constructorInfo = {
  title: "Construtor Avançado de Chatbots",
  description: "Crie chatbots avançados sem precisar programar. Nossa plataforma visual permite arrastar e soltar elementos para criar fluxos complexos de atendimento e vendas. Integração com WhatsApp, sites e redes sociais.",
  features: [
    "Interface visual drag-and-drop",
    "Integração com WhatsApp, Facebook e Instagram",
    "Templates prontos para diferentes segmentos",
    "Inteligência artificial para respostas automáticas",
    "Relatórios detalhados de desempenho"
  ],
  externalLink: "https://construtor.chatlab.com.br",
  image: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxzZWFyY2h8MXx8ZHJhZyUyMGFuZCUyMGRyb3B8ZW58MHx8MHx8fDA%3D"
};

// Dados para o painel de administração
export const adminCoursesMock = [
  {
    id: "c1",
    title: "Dominando Chatbots para Atendimento",
    totalModules: 5,
    totalLessons: 23,
    status: "published",
    students: 128,
    lastUpdated: "15/03/2025"
  },
  {
    id: "c2",
    title: "Marketing Digital para Conversões",
    totalModules: 6,
    totalLessons: 28,
    status: "published",
    students: 95,
    lastUpdated: "20/03/2025"
  },
  {
    id: "c3",
    title: "Estratégias Avançadas de Vendas Online",
    totalModules: 4,
    totalLessons: 16,
    status: "draft",
    students: 0,
    lastUpdated: "10/04/2025"
  }
];

export const adminLivesMock = [
  {
    id: "l1",
    title: "Como Implementar Chatbots no WhatsApp: Estratégias Avançadas",
    date: "25/04/2025",
    time: "19:00 - 20:30",
    status: "scheduled",
    registrations: 76
  },
  {
    id: "l2",
    title: "Cases de Sucesso: Transformando Atendimento com IA",
    date: "12/05/2025",
    time: "20:00 - 21:30",
    status: "scheduled",
    registrations: 52
  },
  {
    id: "l3",
    title: "Marketing de Conteúdo para Atrair Clientes Ideais",
    date: "10/03/2025",
    time: "19:00 - 20:30",
    status: "completed",
    registrations: 118,
    recording: "https://youtube.com/watch?v=example"
  }
];

export const adminMaterialsMock = [
  {
    id: "m1",
    title: "Guia Definitivo: Chatbots para Negócios em 2025",
    category: "Chatbots",
    fileType: "pdf",
    downloads: 87,
    lastUpdated: "05/03/2025"
  },
  {
    id: "m2",
    title: "Template de Fluxos para WhatsApp Business",
    category: "Atendimento",
    fileType: "xlsx",
    downloads: 124,
    lastUpdated: "18/03/2025"
  },
  {
    id: "m3",
    title: "Checklist SEO para Primeira Página do Google",
    category: "Marketing",
    fileType: "pdf",
    downloads: 103,
    lastUpdated: "22/02/2025"
  }
];

export const categoriesMock = [
  { id: "cat1", name: "Chatbots", count: 3 },
  { id: "cat2", name: "Marketing", count: 2 },
  { id: "cat3", name: "Atendimento", count: 1 },
  { id: "cat4", name: "Vendas", count: 1 },
  { id: "cat5", name: "Estratégia", count: 0 }
];

export const usersMock = [
  {
    id: "u1",
    name: "João Silva",
    email: "joao@exemplo.com",
    status: "active",
    joinDate: "10/01/2025",
    lastLogin: "15/04/2025"
  },
  {
    id: "u2",
    name: "Maria Santos",
    email: "maria@exemplo.com",
    status: "active",
    joinDate: "15/01/2025",
    lastLogin: "14/04/2025"
  },
  {
    id: "u3",
    name: "Pedro Almeida",
    email: "pedro@exemplo.com",
    status: "inactive",
    joinDate: "20/02/2025",
    lastLogin: "10/03/2025"
  }
];
