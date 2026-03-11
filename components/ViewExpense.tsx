//import logo from './logo.png';
import { GrMoney } from "react-icons/gr";
import { FaArrowTrendUp,FaArrowTrendDown } from "react-icons/fa6";
import useFetch from "./useFetch";
import { getCurrentMonthName, getCurrentMonthIndex } from "./utils/Date";
import { calcMonthChange, getMonthTotal } from "./utils/getMonthTotal";

const ViewExpense = () => {
    
    const {data} = useFetch('receipts');
    const currMonthIndex = getCurrentMonthIndex()
    const currMonth = getCurrentMonthName();
    const currYear = new Date().getFullYear();
    let prevMonthIndex = currMonthIndex -1;
    let year = currYear;
    if (prevMonthIndex < 0){
        prevMonthIndex += 12;
        year -= 1
    }
    
    
    let total = getMonthTotal(currMonthIndex, currYear, data);
    const prevMonthTotal = getMonthTotal(prevMonthIndex,year, data);
    const delta = calcMonthChange(total, prevMonthTotal);

    return ( 
        <div className="Expense">
            <GrMoney size = {30} style = {{border: '#ffffff'}}/>
            <div className="month">{currMonth.toUpperCase()}</div>
            <div className="label">TOTAL EXPENSE</div>
            <div className="amount">${total}</div>
            <div className="amountchange">
            {delta>=0 && <FaArrowTrendUp style = {{fill: '#0a7400'}} className = 'arrow'/>} 
            {delta<0 && <FaArrowTrendDown style = {{fill:'#ff0000'}} className="arrow"/>}    
            {delta}%
            </div>
        </div>
     );
}
 ///<img src = {logo} alt = 'My Logo'/>
export default ViewExpense;