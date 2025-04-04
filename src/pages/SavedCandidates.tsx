import { useEffect, useState } from "react";

const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<any[]>([]);
  
  useEffect(() => {
    const savedCandidates = JSON.parse(localStorage.getItem("potentialCandidates") || "[]");
    setCandidates(savedCandidates);
  }, []);

  const handleRemoveCandidate = (index: number) => {
    const updatedCandidates = candidates.filter((_, i) => i !== index);
    setCandidates(updatedCandidates);
    localStorage.setItem("potentialCandidates", JSON.stringify(updatedCandidates));
  };

  return (
    <div>
      <h1>Potential Candidates</h1>
      {candidates.length > 0 ? (
        <table cellPadding="10" cellSpacing="0" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Username</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>GitHub</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={candidate.avatar_url}
                    alt={`${candidate.name}'s avatar`}
                    width={40}
                    height={40}
                    style={{ borderRadius: "50%" }}
                  />
                </td>
                <td>{candidate.name}</td>
                <td>{candidate.username}</td>
                <td>{candidate.location}</td>
                <td>{candidate.email || "N/A"}</td>
                <td>{candidate.company || "N/A"}</td>
                <td>
                  <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                    Profile
                  </a>
                </td>
                <td>
                  <button onClick={() => handleRemoveCandidate(index)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No candidates have been accepted yet.</p>
      )}
    </div>
  );
};

export default SavedCandidates;
