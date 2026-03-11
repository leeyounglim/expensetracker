'use client';

import Receipts from '@/components/Receiptlist';
import useFetch from './useFetch';
import { useState, useEffect } from 'react';
import {createClient} from '@/lib/supabase/client';
import { useAuth } from '@/app/providers';

const Manage = () => {
    const [receipts,setReceipts] = useState([]);
    const {data, isPending, error} = useFetch('receipts');
    const {user} = useAuth();

    useEffect(() =>{
        if (data) setReceipts(data);
    }, [data])

    const handleClick = async(id) => {
        const {error} = await supabase
            .from('receipts')
            .delete()
            .eq('id',id)
            .eq('user_id',user.id)
        if (error) console.log(error.message)
        else{
            setReceipts(prev => prev.filter(r=> r.id !== id))
        } 
    };

    return (
        <div className="manage">
            
            {error && <div>{error}</div> }
            {isPending && <div>Loading Receipts...</div>}
            {receipts && <Receipts receipts = {receipts} handleClick = {handleClick} />}
            
        </div> 
     );
}
 
export default Manage;