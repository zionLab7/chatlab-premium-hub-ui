
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/dashboard/StatCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { ArrowUpRight, BookOpen, Users, Video, FileText, MessageSquare } from "lucide-react";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const userActivityData = [
  { name: 'Jan', users: 400 },
  { name: 'Fev', users: 300 },
  { name: 'Mar', users: 600 },
  { name: 'Abr', users: 800 },
  { name: 'Mai', users: 1000 },
  { name: 'Jun', users: 900 },
  { name: 'Jul', users: 1200 },
];

const contentEngagementData = [
  { name: 'Curso 1', views: 4000 },
  { name: 'Curso 2', views: 3000 },
  { name: 'Curso 3', views: 2000 },
  { name: 'Curso 4', views: 2780 },
  { name: 'Curso 5', views: 1890 },
];

const categoryDistributionData = [
  { name: 'Chatbots', value: 400 },
  { name: 'Marketing', value: 300 },
  { name: 'Atendimento', value: 300 },
  { name: 'Estratégia', value: 200 },
  { name: 'Outros', value: 100 },
];

const recentUsers = [
  { id: 1, name: 'Carolina Silva', email: 'carolina@email.com', date: '2 horas atrás', plan: 'Premium' },
  { id: 2, name: 'Rafael Oliveira', email: 'rafael@email.com', date: '3 horas atrás', plan: 'Premium' },
  { id: 3, name: 'Juliana Santos', email: 'juliana@email.com', date: '5 horas atrás', plan: 'Premium' },
  { id: 4, name: 'Marcos Pereira', email: 'marcos@email.com', date: '1 dia atrás', plan: 'Premium' },
  { id: 5, name: 'Amanda Costa', email: 'amanda@email.com', date: '1 dia atrás', plan: 'Premium' },
];

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral da plataforma e métricas de desempenho.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard 
            title="Usuários Ativos" 
            value="1,254" 
            description="+12% em relação ao mês anterior" 
            icon={Users} 
            iconClassName="text-blue-500"
          />
          <StatCard 
            title="Cursos" 
            value="24" 
            description="4 adicionados este mês" 
            icon={BookOpen} 
            iconClassName="text-indigo-500"
          />
          <StatCard 
            title="Lives Realizadas" 
            value="86" 
            description="3 agendadas para esta semana" 
            icon={Video} 
            iconClassName="text-purple-500"
          />
          <StatCard 
            title="Materiais" 
            value="132" 
            description="12 downloads hoje" 
            icon={FileText} 
            iconClassName="text-green-500"
          />
          <StatCard 
            title="Chatbots Criados" 
            value="578" 
            description="+25% em relação ao mês anterior" 
            icon={MessageSquare} 
            iconClassName="text-orange-500"
          />
        </div>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="analytics">Análises Detalhadas</TabsTrigger>
            <TabsTrigger value="users">Usuários Recentes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Atividade de Usuários</CardTitle>
                  <CardDescription>
                    Usuários ativos mensais nos últimos 7 meses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={userActivityData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Distribuição por Categoria</CardTitle>
                  <CardDescription>
                    Distribuição de conteúdo por categoria
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryDistributionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {categoryDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Engajamento com Conteúdo</CardTitle>
                <CardDescription>
                  Visualizações dos cursos mais populares
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={contentEngagementData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="views" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Análises de Uso do Hub</CardTitle>
                <CardDescription>
                  Dados detalhados sobre como os usuários interagem com a plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium">Tempo médio de uso</h3>
                    <div className="flex items-center mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                      </div>
                      <span className="ml-4 text-sm font-medium">32 minutos/dia</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium">Taxa de conclusão de cursos</h3>
                    <div className="flex items-center mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                      <span className="ml-4 text-sm font-medium">45%</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium">Engajamento em lives</h3>
                    <div className="flex items-center mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '82%' }}></div>
                      </div>
                      <span className="ml-4 text-sm font-medium">82%</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium">Downloads de materiais</h3>
                    <div className="flex items-center mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '63%' }}></div>
                      </div>
                      <span className="ml-4 text-sm font-medium">63%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Usuários Recentes</CardTitle>
                <CardDescription>
                  Últimos usuários que acessaram a plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2 font-medium">Nome</th>
                        <th className="text-left py-3 px-2 font-medium">Email</th>
                        <th className="text-left py-3 px-2 font-medium">Plano</th>
                        <th className="text-left py-3 px-2 font-medium">Último acesso</th>
                        <th className="text-left py-3 px-2 font-medium">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUsers.map((user) => (
                        <tr key={user.id} className="border-b">
                          <td className="py-3 px-2">{user.name}</td>
                          <td className="py-3 px-2">{user.email}</td>
                          <td className="py-3 px-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              {user.plan}
                            </span>
                          </td>
                          <td className="py-3 px-2">{user.date}</td>
                          <td className="py-3 px-2">
                            <Button variant="ghost" size="sm">Detalhes</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
