import { useState } from "react";
import { MemberLayout } from "@/components/layouts/MemberLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";

const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(6, {
      message: "A senha atual deve ter pelo menos 6 caracteres",
    }),
    newPassword: z.string().min(6, {
      message: "A nova senha deve ter pelo menos 6 caracteres",
    }),
    confirmPassword: z.string().min(6, {
      message: "A confirmação da senha deve ter pelo menos 6 caracteres",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordFormSchema>;

const SettingsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    marketing: false,
    newCourses: true,
    newLives: true,
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const onPasswordSubmit = (data: PasswordFormValues) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(data);
      setIsLoading(false);
      passwordForm.reset();
      toast.success("Senha alterada com sucesso!");
    }, 1000);
  };

  const handleNotificationChange = (key: string) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key as keyof typeof notifications],
    });
    
    toast.success("Configurações de notificações atualizadas!");
  };

  return (
    <MemberLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie suas preferências de conta e segurança.
          </p>
        </div>
        
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full md:w-[600px] grid-cols-3">
            <TabsTrigger value="account">Conta</TabsTrigger>
            <TabsTrigger value="security">Segurança</TabsTrigger>
            <TabsTrigger value="notifications">Notificações</TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciamento de Conta</CardTitle>
                <CardDescription>
                  Gerencie suas preferências gerais de conta.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <select
                    id="language"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="pt-BR">Português (Brasil)</option>
                    <option value="en-US">English (US)</option>
                    <option value="es">Español</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuso Horário</Label>
                  <select
                    id="timezone"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="America/Sao_Paulo">América/São Paulo (GMT-3)</option>
                    <option value="America/New_York">América/Nova York (GMT-4)</option>
                    <option value="Europe/London">Europa/Londres (GMT+1)</option>
                    <option value="Asia/Tokyo">Ásia/Tóquio (GMT+9)</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode">Modo escuro</Label>
                    <div className="text-sm text-muted-foreground">
                      Ativar tema escuro na interface
                    </div>
                  </div>
                  <Switch id="dark-mode" />
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button onClick={() => toast.success("Configurações salvas!")}>
                    Salvar alterações
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-destructive">Zona de perigo</CardTitle>
                <CardDescription>
                  Ações irreversíveis relacionadas à sua conta.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Excluir minha conta</h3>
                    <p className="text-sm text-muted-foreground">
                      Excluir permanentemente sua conta e todos os seus dados. Esta ação não pode ser desfeita.
                    </p>
                  </div>
                  <Button variant="destructive">Excluir conta</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Alterar senha</CardTitle>
                <CardDescription>
                  Atualize sua senha para manter sua conta segura.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...passwordForm}>
                  <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                    <FormField
                      control={passwordForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Senha atual</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={passwordForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nova senha</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••" {...field} />
                          </FormControl>
                          <FormDescription>
                            Mínimo de 6 caracteres.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={passwordForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirmar nova senha</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end">
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Alterando..." : "Alterar senha"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Sessões ativas</CardTitle>
                <CardDescription>
                  Gerencie os dispositivos logados na sua conta.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Chrome em Windows 10</h3>
                      <p className="text-sm text-muted-foreground">São Paulo, Brasil • Ativo agora</p>
                    </div>
                    <div className="flex items-center">
                      <Badge variant="success" className="mr-2">Atual</Badge>
                      <Button variant="outline" size="sm" disabled>Encerrar</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Safari em iPhone 13</h3>
                      <p className="text-sm text-muted-foreground">São Paulo, Brasil • 3 dias atrás</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => toast.success("Sessão encerrada!")}>Encerrar</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Firefox em MacBook Pro</h3>
                      <p className="text-sm text-muted-foreground">Rio de Janeiro, Brasil • 7 dias atrás</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => toast.success("Sessão encerrada!")}>Encerrar</Button>
                  </div>
                </div>
                
                <div className="pt-2 flex justify-end">
                  <Button variant="destructive" size="sm" onClick={() => toast.success("Todas as outras sessões foram encerradas!")}>
                    Encerrar todas as outras sessões
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preferências de notificação</CardTitle>
                <CardDescription>
                  Escolha como e quando deseja ser notificado.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Notificações por email</Label>
                      <div className="text-sm text-muted-foreground">
                        Receber emails sobre atualizações importantes
                      </div>
                    </div>
                    <Switch 
                      id="email-notifications" 
                      checked={notifications.email}
                      onCheckedChange={() => handleNotificationChange("email")}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketing-notifications">Emails de marketing</Label>
                      <div className="text-sm text-muted-foreground">
                        Receber emails sobre promoções e novidades
                      </div>
                    </div>
                    <Switch 
                      id="marketing-notifications" 
                      checked={notifications.marketing}
                      onCheckedChange={() => handleNotificationChange("marketing")}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="new-courses">Novos cursos</Label>
                      <div className="text-sm text-muted-foreground">
                        Receber notificações quando novos cursos forem adicionados
                      </div>
                    </div>
                    <Switch 
                      id="new-courses" 
                      checked={notifications.newCourses}
                      onCheckedChange={() => handleNotificationChange("newCourses")}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="new-lives">Lives programadas</Label>
                      <div className="text-sm text-muted-foreground">
                        Receber lembretes sobre lives futuras
                      </div>
                    </div>
                    <Switch 
                      id="new-lives" 
                      checked={notifications.newLives}
                      onCheckedChange={() => handleNotificationChange("newLives")}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MemberLayout>
  );
};

export default SettingsPage;
