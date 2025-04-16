
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";

interface LoginCredentials {
  email: string;
  password: string;
}

export const useCredentialsAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async ({ email, password }: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .rpc('verify_credentials', { 
          p_email: email, 
          p_senha: password 
        });

      if (error) throw error;
      
      if (!data) {
        throw new Error('Credenciais inválidas');
      }

      // Se autenticado com sucesso, redireciona para o dashboard
      window.location.href = "/dashboard";
      
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
    error
  };
};
