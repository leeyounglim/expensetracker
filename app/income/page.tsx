'use client';

import useFetch from "/useFetch";
import { useState } from "react";
import {createClient} from '@/lib/supabase/client';
import { useAuth } from '@/app/providers';
import { useRouter } from 'next/navigation';

const Income = () => {
    const [month, setMonth] = useState('');
    const [income, setIncome] = useState(0);
    const [isPending, setIsPending]  = useState(false);
    const router = useRouter();
    const { user } = useAuth();

    const enterIncome = async(month, income) => {
        const {error} = await supabase
            .from('income')
            .insert({month,income, user_id: user.id})
        if (error) console.log(error.message);
        else {
            setIsPending(false)
            router.back()}
    }
    const updateIncome = async(month,income, exists) => {
        const {error} = await supabase
            .from('income')
            .update({month, income})
            .eq('id',exists.id)
            .eq('user_id',user.id)
        if (error) console.log(error.message)
        else {
            setIsPending(false)
            router.back()
        }
    }
    
    const {data: incomeData} = useFetch('income');
    const handleSubmit = async(e) =>{
        e.preventDefault();
        setIsPending(true);
        // check if receipt exists
        const exists = Array.isArray(incomeData) && incomeData.find(entry => entry.month === month)

        if (!exists){enterIncome(month,income)}
        else {updateIncome(month,income, exists)}
    }
    return ( 
        <div className="IncomeForm">
            <form onSubmit={handleSubmit}>
                <label>
                <input 
                required
                type = 'month'
                value = {month}
                onChange={(e) => {setMonth(e.target.value)}} />
                </label>
                <br />

                <label className="inputIncome">S$
                <input 
                required
                type = 'number'
                 value={income} 
                 placeholder="0.00" 
                 onChange={(e) => {setIncome(e.target.value)}}/>
                 </label>
                 <br/>

                 {!isPending && <button>Enter</button>}
                 {isPending && <button disabled>Adding...</button>}
            </form>
        </div>
     );
}
 
export default Income;