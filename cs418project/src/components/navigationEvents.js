'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from '@/lib/context';

export function NavigationEvents() {
    const {user, userData} = useContext(UserContext);
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter();

    useEffect(() => {
        const url = `${pathname}?${searchParams}`
        console.log("NavigationEvents: pathname: " + pathname + " searchParams: " + searchParams);
        switch (pathname) {
            case '/userHome':
                if (!user || !userData.IsVerified) {
                    router.push('/');
                }
                break;
            case '/adminVerifyUsers':
                if (!user || (!userData.IsAdmin && !userData.IsVerified)) {
                    router.push('/');
                }
                break;
            case '/changeUserInformation':
                if (!user || (!userData.IsAdmin && !userData.IsVerified)) {
                    router.push('/');
                }
                break;
            default: break;
        }
    }, [pathname, searchParams])

    return null
}