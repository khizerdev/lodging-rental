'use client';

import { usePathname, useSearchParams } from 'next/navigation';

import {categoriesList} from "@/app/data/categoriesList"

import CategoryBox from '@/app/components/CategoryBox';


const Categories = () => {

  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
        {
            categoriesList.map(item => {
                return (
                    <CategoryBox 
                        key={item.label}
                        label={item.label}
                        icon={item.icon}
                        selected={category === item.label}
                    />
                )
            })
        }
    </div>
  )
}

export default Categories