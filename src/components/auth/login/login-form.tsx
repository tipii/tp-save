'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import Link from 'next/link';
import { authClient } from '@/external-services/better-auth/auth-client';
import { useAction } from 'next-safe-action/hooks';
import { loginFormSchema, LoginFormSchema } from './login-form-schema';
import { submitLoginAction } from './login-form-action';
import { zodResolver } from '@hookform/resolvers/zod';

export function LoginForm() {
  const { execute, hasErrored, isPending, result } = useAction(submitLoginAction);
  const { refetch } = authClient.useSession();
  const router = useRouter();

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  useEffect(() => {
    if (result?.data?.success) {
      toast.success(result.data.message || 'Connexion réussie!');

      // Determine redirect URL based on 'from' parameter
      const redirectUrl = result.data.redirectTo || '/';
      router.push(redirectUrl);
      refetch();
    }
    if (result?.data?.error) {
      toast.error(result.data.error);
    }
  }, [result, router, refetch]);

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(execute)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" className="bg-white" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Mot de passe</FormLabel>
                  <Link href="/auth/forgot-password">
                    <Button
                      type="button"
                      variant="link"
                      className="text-primary h-auto px-0 text-xs"
                    >
                      Mot de passe oublié ?
                    </Button>
                  </Link>
                </div>
                <FormControl>
                  <Input {...field} type="password" className="bg-white" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="cursor-pointer text-sm text-gray-500">
                  Se souvenir de moi
                </FormLabel>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-primary hover:bg-primary/90 w-full"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Connexion en cours...
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" />
                Se connecter
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
