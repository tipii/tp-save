import Container from '@/components/layout/container';
import Image from 'next/image';
import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen pt-20 pb-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="from-primary/80 to-primary/40 absolute inset-0 z-10 bg-gradient-to-r" />
      </div>

      <Container className="relative z-10 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-20 lg:grid-cols-2">
          {/* Left Column - Auth Forms */}
          <div className="overflow-hidden rounded-xl bg-white/95 shadow-xl backdrop-blur-sm">
            <div className="p-6">{children}</div>
          </div>
          {/* Right Column - Text */}
          <div className="max-w-xl space-y-6 text-white">
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
              Bienvenue chez Devlab Ecommerce Starter Pack
            </h1>
            <p className="text-xl text-white/90">
              Connectez-vous pour accéder à votre compte et profiter de tous nos services nautiques.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                <h3 className="mb-2 text-lg font-medium">Avantages membres</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="bg-secondary mt-0.5 mr-2 flex h-5 w-5 items-center justify-center rounded-full text-xs text-white">
                      ✓
                    </span>
                    <span>Suivi de vos commandes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-secondary mt-0.5 mr-2 flex h-5 w-5 items-center justify-center rounded-full text-xs text-white">
                      ✓
                    </span>
                    <span>Historique d'achats</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-secondary mt-0.5 mr-2 flex h-5 w-5 items-center justify-center rounded-full text-xs text-white">
                      ✓
                    </span>
                    <span>Offres exclusives membres</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
