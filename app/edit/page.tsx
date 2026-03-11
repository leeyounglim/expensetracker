// FIX USE PARAMS

import { useEffect, useState } from "react";
import ReceiptForm from "@/components/ReceiptForm";
import { useRouter } from 'next/navigation'; 
import {createClient} from '@/lib/supabase/client';

const Edit = () => {
    const router = useRouter();
    const supabase = createClient();

    const [receipt, setReceipt] = useState(null);

    useEffect(() =>{
        const fetchReceipt = async() =>{
            const {data, error} = await supabase
                .from('receipts')
                .select('*')
                .eq('id',id)
                .single()
            if (error) console.log(error.message);
            else setReceipt(data)
        };
        fetchReceipt();
    }, [id])

    const handleEdit = async(receipt) => {
        const {error} = await supabase
            .from('receipts')
            .update(receipt)
            .eq('id',id)
        if (error) console.log(error.message);
        else router.push('/manage')
    }

    if (!receipt) {return <div>Loading...</div>}

    return ( 
        <div>
        <ReceiptForm 
        initialData = {receipt}
        onSubmit={handleEdit}
        buttonText='Edit'
        />
        
        </div>
        
     );
}
 
export default Edit;