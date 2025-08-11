import { authRedirect } from '@/lib/auth-redirect';
import Image from 'next/image';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-tallin-blue grid h-screen w-screen grid-cols-12 items-center justify-center">
      <div className="col-span-1 h-full w-full"></div>
      <div className="col-span-11 flex h-full w-full flex-col items-center justify-center rounded-l-3xl bg-white">
        <Image src="/tallin-logo.png" alt="logo" width={200} height={200} />
        {children}
      </div>
    </div>
  );
}
