'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { Eye, EyeOff, Lock, User } from 'lucide-react';

const loginSchema = z.object({
  username: z.string().min(3, 'Mínimo 3 caracteres'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      setIsLoading(true);
      setError(null);
      await login(data.username, data.password);
    } catch {
      setError('Usuario o contraseña incorrectos');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex">
      {/* Panel izquierdo decorativo */}
      <div className="hidden lg:flex w-1/2 bg-[#2a2e6e] flex-col items-center justify-center relative overflow-hidden">
        {/* Círculos decorativos */}
        <div className="absolute top-[-80px] left-[-80px] w-80 h-80 bg-white/5 rounded-full" />
        <div className="absolute bottom-[-60px] right-[-60px] w-64 h-64 bg-[#ffc712]/10 rounded-full" />
        <div className="absolute top-1/2 left-[-40px] w-32 h-32 bg-white/5 rounded-full" />

        <div className="relative z-10 flex flex-col items-center gap-8 px-12 text-center">
          <Image
            src="/logo.png"
            alt="Naveguz"
            width={220}
            height={80}
            priority
            className="drop-shadow-2xl"
          />
          <div className="space-y-3">
            <h1 className="text-white text-3xl font-bold leading-tight">
              Panel de Administración
            </h1>
            <p className="text-white/60 text-lg">
              Gestiona tu contenido, productos y más desde un solo lugar.
            </p>
          </div>

          {/* Tarjetas decorativas */}
          <div className="flex flex-col gap-3 w-full mt-4">
            {['Gestión de Carousel', 'Control de Productos', 'Administración de Usuarios'].map(
              (item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3"
                >
                  <div className="w-2 h-2 rounded-full bg-[#ffc712]" />
                  <span className="text-white/80 text-sm font-medium">{item}</span>
                </div>
              ),
            )}
          </div>
        </div>
      </div>

      {/* Panel derecho — formulario */}
      <div className="flex-1 flex items-center justify-center bg-[#fdf8ee] px-6 py-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo mobile */}
          <div className="flex justify-center lg:hidden">
            <Image
              src="/logo.png"
              alt="Naveguz"
              width={160}
              height={55}
              priority
            />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-[#2a2e6e]">
              Bienvenido 👋
            </h2>
            <p className="text-gray-500">
              Ingresa tus credenciales para acceder al panel
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Username */}
            <div className="space-y-2">
              <Label
                htmlFor="username"
                className="text-[#2a2e6e] font-semibold text-sm"
              >
                Usuario
              </Label>
              <div className="relative">
                <User
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <Input
                  id="username"
                  placeholder="Admin / 71560442"
                  {...register('username')}
                  className="pl-9 border-[#ddd8cc] bg-white focus-visible:ring-[#2a2e6e] h-11"
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-xs">{errors.username.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-[#2a2e6e] font-semibold text-sm"
              >
                Contraseña
              </Label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••"
                  {...register('password')}
                  className="pl-9 pr-10 border-[#ddd8cc] bg-white focus-visible:ring-[#2a2e6e] h-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs">{errors.password.message}</p>
              )}
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#2a2e6e] hover:bg-[#1e2154] text-white font-bold h-11 rounded-xl text-base transition-all"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Ingresando...
                </span>
              ) : (
                'Ingresar'
              )}
            </Button>
          </form>

          <p className="text-center text-xs text-gray-400">
            © {new Date().getFullYear()} Naveguz. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </main>
  );
}