'use client';

import { useState } from "react";
import { useRouter } from 'next/navigation';

interface Receipt {
    id?:string;
    title: string;
    category: string;
    date: Date;
    price: number; 
    user_id: string;
}

const inbox = () => {
    const [pendingReceipts,setReceipts] = useState<Receipt[]>([]);
    const router = useRouter();

    const handleClick = async(id:string|undefined) => {
        
    }

    return ( 
        <div className="pendingReceipts">
            <header>Pending Receipts</header>

            {pendingReceipts.map(receipt =>(
                <div className="receiptpreview" key = {receipt.id}>
                    <h2>{}</h2>
                    <p> Category: {}<br/>
                        Date: {} <br /> 
                    Price: {}</p>
                    <button onClick={() => router.push('/edit/'+ receipt.id)}> Review and Save </button> 

                    <button onClick = {() => handleClick(receipt.id)}>Dismiss</button>
                </div>
            ))}
        </div>
     );
}
 
export default inbox;