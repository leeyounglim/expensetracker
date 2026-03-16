'use client';

import  Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/app/providers';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const {user, logout} = useAuth();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        router.push('/login');
        router.refresh()
    }
    return (  
        <nav className="navbar">
            
            <h1>Expense Tracker</h1>
            <div className = 'links'>
                <Link href='/home'>Home</Link>
                <label onMouseEnter = {()=> setIsOpen(true)} onMouseLeave={()=>setIsOpen(false)}>New</label>
                {isOpen && <div onMouseEnter ={()=> setIsOpen(true)}
                                onMouseLeave={()=>setIsOpen(false)}
                 className="dropdown-content">
                    <Link href='/create'>Receipt</Link>
                    <Link href='/income'>Income Entry</Link>
                </div> }
                <Link href='/manage'>Receipts</Link>
                <Link href='/emailsetting'>Emails</Link>
                {user && <button onClick={handleLogout}>Logout</button> }
            </div>
            
        </nav>
    );
}
 
export default Navbar;