import React, { useEffect, useMemo, useState } from "react";
import { api, SERVER_URL } from "./api";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Candidates from "./pages/Candidates";
import Employers from "./pages/Employers";
import ContactEnquiries from "./pages/ContactEnquiries";
import DetailModal from "./components/DetailModal";

export default function App(){
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("flyhirre_admin_user") || "null"));
  const [page, setPage] = useState("dashboard");
  const [stats, setStats] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [employers, setEmployers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  const notify = (message) => { setToast(message); setTimeout(() => setToast(""), 2800); };

  async function loadAll(){
    setLoading(true);
    try {
      const [d,c,e,ct] = await Promise.all([api("/admin/dashboard"), api("/candidates"), api("/employers"), api("/contact")]);
      setStats(d.stats); setCandidates(c.data || []); setEmployers(e.data || []); setContacts(ct.contacts || []);
    } catch(err){
      if(!localStorage.getItem("flyhirre_admin_token")) setUser(null); else notify(err.message);
    } finally { setLoading(false); }
  }

  useEffect(()=>{ if(user) loadAll(); },[user]);

  if(!user) return <Login onLogin={(u)=>setUser(u)} />;

  const filteredCandidates = useMemo(()=>candidates.filter(x=>`${x.fullName} ${x.email} ${x.phone} ${x.currentRole} ${x.candidateRole} ${x.industry}`.toLowerCase().includes(search.toLowerCase())),[candidates,search]);
  const filteredEmployers = useMemo(()=>employers.filter(x=>`${x.companyName} ${x.fullName} ${x.workEmail} ${x.industry} ${x.hiringRole} ${x.hiringFunction}`.toLowerCase().includes(search.toLowerCase())),[employers,search]);
  const filteredContacts = useMemo(()=>contacts.filter(x=>`${x.name} ${x.email} ${x.phone} ${x.subject} ${x.message}`.toLowerCase().includes(search.toLowerCase())),[contacts,search]);

  async function updateCandidate(id, patch){ const result=await api(`/candidates/${id}`,{method:"PATCH",body:JSON.stringify(patch)}); setCandidates(items=>items.map(x=>x._id===id?result.data:x)); setSelected(result.data); notify("Candidate updated successfully"); }
  async function updateEmployer(id, patch){ const result=await api(`/employers/${id}`,{method:"PATCH",body:JSON.stringify(patch)}); setEmployers(items=>items.map(x=>x._id===id?result.data:x)); setSelected(result.data); notify("Employer record updated successfully"); }
  function navigate(next){ setPage(next); setSearch(""); setSelected(null); }
  function logout(){ localStorage.clear(); setUser(null); }

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="side-brand"><div className="brand-mark">F</div><div><strong>FLYHIRRE</strong><span>Admin Console</span></div></div>
      <nav>
        <button className={page==="dashboard"?"active":""} onClick={()=>navigate("dashboard")}>Overview</button>
        <button className={page==="candidates"?"active":""} onClick={()=>navigate("candidates")}>Candidates <b>{stats?.newCandidates ?? 0}</b></button>
        <button className={page==="employers"?"active":""} onClick={()=>navigate("employers")}>Employers <b>{stats?.newEmployers ?? 0}</b></button>
        <button className={page==="contacts"?"active":""} onClick={()=>navigate("contacts")}>Contact Enquiries</button>
      </nav>
      <div className="side-bottom"><div className="admin-mini"><span>{user.name?.slice(0,1)?.toUpperCase()}</span><div><strong>{user.name}</strong><small>{user.email}</small></div></div><button className="logout" onClick={logout}>Sign out</button></div>
    </aside>
    <main className="main-area">
      <header className="topbar"><div><span className="eyebrow">RECRUITMENT OPERATIONS</span><h1>{page === "dashboard" ? "Dashboard Overview" : page === "candidates" ? "Candidate Applications" : page === "employers" ? "Employer Requirements" : "Contact Enquiries"}</h1></div><div className="top-actions"><button onClick={loadAll} className="refresh">↻ Refresh</button><div className="avatar">{user.name?.slice(0,1)?.toUpperCase()}</div></div></header>
      {page!=="dashboard" && <div className="toolbar"><div className="search"><span>⌕</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder={`Search ${page}...`} /></div><span className="count">{page==="candidates"?filteredCandidates.length:page==="employers"?filteredEmployers.length:filteredContacts.length} records</span></div>}
      {loading && <div className="loading">Loading recruitment data…</div>}
      {page==="dashboard" && <Dashboard stats={stats} candidates={candidates} employers={employers} setPage={navigate} />}
      {page==="candidates" && <Candidates data={filteredCandidates} onSelect={setSelected} />}
      {page==="employers" && <Employers data={filteredEmployers} onSelect={setSelected} />}
      {page==="contacts" && <ContactEnquiries data={filteredContacts} />}
      {selected && <DetailModal item={selected} isCandidate={!!selected.cv} onClose={()=>setSelected(null)} onCandidateUpdate={updateCandidate} onEmployerUpdate={updateEmployer} SERVER_URL={SERVER_URL} />}
      {toast && <div className="toast">✓ {toast}</div>}
    </main>
  </div>;
}
