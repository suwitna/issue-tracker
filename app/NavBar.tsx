'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import classnames from 'classnames'
import { Button } from '@radix-ui/themes';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

const NavBar = () => {
  const { data: session } = useSession();
  const currentPath = usePathname();

  const links =[
      {label: 'Dashboard', href: '/'},
      {label: 'Issues', href: '/issues'},
      {label: 'Products', href: '/products'},
      {label: 'ทริป', href: '/trips'},
  ]
  
  return (
    <nav className='flex-no-wrap fixed top-0 z-10 flex w-full justify-between items-center shadow-md p-1 dark:bg-zinc-200 dark:shadow-black/10 '>
      <div className='flex justify-between items-center space-x-6 px-5 h-14'>
        <div>
          <Link href="/"><AiFillBug/></Link>
        </div>
        <div><ul className='flex space-x-6'>
            {links.map(link => 
                <Link 
                    key={link.href} 
                    className={classnames({
                      'text-zinc-900' : link.href === currentPath,
                      'text-zinc-500' : link.href !== currentPath,
                      'hover:text-zinc-800 transition-colors' : true
                    })}
                    href={link.href}>{link.label}</Link>)}
          </ul>
        </div>
      </div>
      <div className='flex justify-between items-center space-x-6 px-5 h-14'>
      {!session ? (
        <>
          <div>
            <Link 
                key='/login'
                className={classnames({
                  'text-zinc-900' : '/login' === currentPath,
                  'text-zinc-500' : '/login' !== currentPath,
                  'hover:text-zinc-800 transition-colors' : true
                })}
                href='/login'>เข้าสู่ระบบ</Link>
            </div>
            <div>
              <Link 
                key='/register'
                className={classnames({
                  'text-zinc-900' : '/register' === currentPath,
                  'text-zinc-500' : '/register' !== currentPath,
                  'hover:text-zinc-800 transition-colors' : true
                })}
                href='/register'>สมัครสมาชิก</Link>
            </div>
          </>
         ) : ( 
          <>
            <div>
              <Button><a onClick={() => signOut()}>Logout</a></Button>
            </div>
          </>
         )}
      </div>
        
    </nav>
  )
}

export default NavBar
