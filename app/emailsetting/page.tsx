'use client';
import { useAuth } from '@/app/providers'; 
import { useState } from 'react';
import { isSet } from 'util/types';

const banks = [
  { id: "uob", name: "UOB", color: "#0033A0", abbr: "UOB", sender: "unialerts@uobgroup.com" },
  { id: "dbs", name: "DBS / POSB", color: "#E60028", abbr: "DBS", sender: "dbseadvice@dbs.com" },
  { id: "ocbc", name: "OCBC", color: "#EE3524", abbr: "OCBC", sender: "Notifications@ocbc.com" },
  { id: "sc", name: "Standard Chartered", color: "#00A9E0", abbr: "SC", sender: "notifications@sc.com" },
  { id: "hsbc", name: "HSBC", color: "#DB0011", abbr: "HSBC", sender: "hsbc.notifications@messaging.hsbc.com.sg" },
  { id: "citi", name: "Citibank", color: "#003087", abbr: "CITI", sender: "citi.securemail@citi.com" },
];

interface bank{
    id: string;
    name: string;
    color: string;
    abbr: string;
    sender: string;
}

interface enabledBankProps{
    uob?: boolean;
    dbs?: boolean;
    ocbc?: boolean;
    sc?: boolean;
    hsbc?: boolean;
    citi?: boolean;
}



const manageEmail = () => {
    const connected = true;
    const {user, isPending} = useAuth();
    const [enabledBanks, setEnabledBanks] = useState<Record<string,boolean>>({ uob: true, dbs: true });
    const [fetchingBank, setFetchingBank] = useState<string|null>(null);
    const [activeTab, setActiveTab] = useState("config");
    const [isSetup, setIsSetup] = useState(false);
    const [setupStep, setSetupStep] = useState(0); // 0 = landing, 1 = enter email, 2 = enter app password
    const [setupEmail, setSetupEmail] = useState("");
    const [setupPass, setSetupPass] = useState("");
    const [setupConnecting, setSetupConnecting] = useState(false);


    async function handleFetchBank(id:string) {
        setFetchingBank(id);
        await new Promise((r) => setTimeout(r, 1600));
        setFetchingBank(null);
    }

    function toggleBank(id:string) {
        setEnabledBanks((prev) => ({ ...prev, [id]: !prev[id] }));
    }

    if (isPending) return 
        <div>Loading...</div>
    if (!user) return null

    if(!isSetup) return{
        
    }

    return ( 
        <div className = "page-wrap">
            <div className="header">
                <h1>Email Sync</h1>
                <div className={`conn-badge ${connected ? "ok" : "err"}`}>
                    <div className={`dot ${connected ? "ok" : "err"}`} />
                    {connected ? "Connected" : "Disconnected"}
                </div>
            </div>
            {/* Tabs */}
            <div className="tabs">
            {["config", "log"].map((t) => (
                <button key={t} className={`tab ${activeTab === t ? "active" : ""}`} onClick={() => setActiveTab(t)}>
                {t === "config" ? "Configuration" : "Sync Log"}
                </button>
            ))}
            </div>
            {activeTab === 'config' &&(
                <>
                <div className="section">
                <div className="section-label">Gmail Account</div>
                <div className="card">
                    <div className="email-row">
                    <div className="email-icon">✉</div>
                    <div className="email-text">
                        <strong>{user.email}</strong>
                        <span>IMAP · Port 993 · TLS</span>
                    </div>
                    <button className="btn-ghost">Change</button>
                    </div>
                </div>
                </div>

              {/* Banks */}
                <div className="section">
                <div className="section-label">Banks to monitor</div>
                <div className="bank-grid">
                    {banks.map((bank) => {
                    const on = !!enabledBanks[bank.id];
                    const fetching = fetchingBank === bank.id;
                    return (
                        <div key={bank.id} className="bank-row">
                        <div
                            className="bank-chip"
                            style={{ background: bank.color + "22", color: bank.color, border: `1px solid ${bank.color}44` }}
                        >
                            {bank.abbr}
                        </div>
                        <div className="bank-info">
                            <strong>{bank.name}</strong>
                            <span>{bank.sender}</span>
                        </div>
                        <div className="bank-actions">
                            {on && (
                            <button
                                className={`fetch-btn ${fetching ? "spinning" : ""}`}
                                onClick={(e) => { e.stopPropagation(); handleFetchBank(bank.id); }}
                                title="Fetch now"
                            >
                                {fetching ? "↻" : "↓"}
                            </button>
                            )}
                            <button
                            className={`toggle ${on ? "on" : "off"}`}
                            onClick={() => {
                                return toggleBank(bank.id)}}
                            >
                            <div className="toggle-thumb" />
                            </button>
                        </div>
                        </div>
                    );
                    })}
                </div>
                </div>
                </>
            )}            
        </div>
     );
}
 
export default manageEmail;