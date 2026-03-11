'use client';

import  Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/app/providers';

const Navbar = () => {
    const {user, logout} = useAuth();
    const [isOpen, setIsOpen] = useState(false);
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
                    <Link href='/incomeForm'>Income Entry</Link>
                </div> }
                <Link href='/manage'>Manage Receipts</Link>
                {user && <button onClick={logout}>Logout</button> }
            </div>
            
        </nav>
    );
}
 
export default Navbar;