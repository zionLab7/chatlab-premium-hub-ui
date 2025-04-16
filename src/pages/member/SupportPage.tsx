
import { useState } from "react";
import { MemberLayout } from "@/components/layouts/MemberLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const supportFormSchema = z.object({
  subject: z.string().min(5, { message: "O assunto deve ter pelo menos 5 caracteres" }),
  category: z.string(),
  message: z.string().min(20, { message: "A mensagem deve ter pelo menos 20 caracteres" }),
  attachment: z.string().optional(),
});

type SupportFormValues = z.infer<typeof supportFormSchema>;

const SupportPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SupportFormValues>({
    resolver: zodResolver(supportFormSchema),
    defaultValues: {
      subject: "",
      category: "",
      message: "",
      attachment: "",
    },
  });

  const onSubmit = (data: SupportFormValues) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(data);
      setIsLoading(false);
      form.reset();
      toast.success("Sua mensagem foi enviada com sucesso! Responderemos em breve.");
    }, 1000);
  };

  return (
    <MemberLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Suporte</h1>
          <p className="text-muted-foreground">
            Estamos aqui para ajudar! Envie sua dúvida ou problema e nossa equipe responderá em breve.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Entre em contato</CardTitle>
                <CardDescription>
                  Preencha o formulário abaixo para enviar sua mensagem.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Assunto</FormLabel>
                          <FormControl>
                            <Input placeholder="Digite o assunto da sua mensagem" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Categoria</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione uma categoria" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="technical">Problema técnico</SelectItem>
                              <SelectItem value="billing">Faturamento</SelectItem>
                              <SelectItem value="content">Dúvida sobre conteúdo</SelectItem>
                              <SelectItem value="account">Conta</SelectItem>
                              <SelectItem value="other">Outro</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mensagem</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Descreva sua dúvida ou problema em detalhes" 
                              className="min-h-[150px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="attachment"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Anexo (opcional)</FormLabel>
                          <FormControl>
                            <Input 
                              type="file" 
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  field.onChange(file.name); // Just store the name for demo
                                }
                              }} 
                            />
                          </FormControl>
                          <FormDescription>
                            Você pode anexar um arquivo para ajudar a explicar seu problema (máx. 5MB).
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end">
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Enviando..." : "Enviar mensagem"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>FAQ</CardTitle>
                <CardDescription>
                  Perguntas frequentes que podem ajudar.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium">Como acessar os cursos?</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Acesse a seção "Cursos" no menu lateral para ver todos os cursos disponíveis.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium">Como faço para alterar minha senha?</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Vá para "Configurações" e selecione a guia "Segurança" para alterar sua senha.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium">Posso acessar em dispositivos móveis?</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Sim! Nossa plataforma é totalmente responsiva e funciona em qualquer dispositivo.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium">Como cancelar minha assinatura?</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Acesse seu perfil, vá para a guia "Assinatura" e clique em "Cancelar assinatura".
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Contato direto</CardTitle>
                <CardDescription>
                  Outras formas de entrar em contato conosco.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    <a href="mailto:suporte@chatlab.com.br" className="text-primary">suporte@chatlab.com.br</a>
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium">WhatsApp</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    <a href="https://wa.me/5511999999999" className="text-primary" target="_blank" rel="noopener noreferrer">+55 (11) 99999-9999</a>
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium">Horário de atendimento</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Segunda a sexta, das 9h às 18h (horário de Brasília)
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MemberLayout>
  );
};

export default SupportPage;
