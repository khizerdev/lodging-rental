import { Nunito } from 'next/font/google'

import './globals.css'

export const metadata = {
  title: 'Booking Calendar Site',
  description: 'Generated by create next app',
}

const font = Nunito({ 
  subsets: ['latin'], 
});

import Navbar from '@/app/components/navbar/Navbar';
import ClientOnly from '@/app/components/ClientOnly';
import RegisterModal from '@/app/components/modals/RegisterModal';
import LoginModal from '@/app/components/modals/LoginModal';
import RentModal from '@/app/components/modals/RentModal';
import SearchModal from '@/app/components/modals/SearchModal';

import ToasterProvider from '@/app/providers/ToasterProvider';

import getCurrentUser from '@/app/actions/getCurrentUser';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
      
        <ClientOnly>
        <ToasterProvider />
          <RegisterModal/>
          <SearchModal/>
          <LoginModal />
          <RentModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className='pb-20 pt-28'>
          {children}
        </div>
      </body>
    </html>
  )
}
