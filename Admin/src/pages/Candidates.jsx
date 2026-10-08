import React from "react";
import { formatDate } from "../utils";

export default function Candidates({ data, onSelect }) {
  return (
    <section className="content">
      <div className="table-panel">
        <table>
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Candidate Role / Industry</th>
              <th>Experience</th>
              <th>Submitted</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((x) => (
              <tr key={x._id}>
                <td>
                  <strong>{x.fullName}</strong>
                  <small>
                    {x.email}
                    <br />
                    {x.phone}
                  </small>
                </td>
                <td>
                  <strong>{x.candidateRole || x.currentRole || "—"}</strong>
                  <small>{x.industry || "—"}</small>
                </td>
                <td>{x.totalExperience || "—"}</td>
                <td>{formatDate(x.createdAt)}</td>
                <td><Badge value={x.status} /></td>
                <td>
                  <button className="view-btn" onClick={() => onSelect(x)}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!data.length && (
          <div className="empty">
            No candidate records match your search.
          </div>
        )}
      </div>
    </section>
  );
}

function Badge({ value }) {
  const text = String(value || "NEW");
  return (
    <span className={`badge ${text.toLowerCase().replaceAll("_", "-")}`}>
      {text.replaceAll("_", " ")}
    </span>
  );
}
