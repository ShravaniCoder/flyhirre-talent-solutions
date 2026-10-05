import React from "react";
import { formatDate } from "../utils";

export default function ContactEnquiries({data}){return <section className="content"><div className="table-panel"><table><thead><tr><th>Name</th><th>Contact</th><th>Subject</th><th>Message</th><th>Submitted</th></tr></thead><tbody>{data.map(x=><tr key={x._id}><td><strong>{x.name}</strong></td><td>{x.email}<small>{x.phone||"—"}</small></td><td>{x.subject||"—"}</td><td className="message-cell">{x.message}</td><td>{formatDate(x.createdAt)}</td></tr>)}</tbody></table>{!data.length&&<div className="empty">No contact enquiries yet.</div>}</div></section>}
