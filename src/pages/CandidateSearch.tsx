import Candidate from '../interfaces/Candidate.interface';
import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

//information for one candidate should be displayed, including the candidate's name, username, location, avatar, email, html_url, and company

// I click the "+" button candidate should be saved to the list of potential candidates and the next candidate's information should be displayed+ 

// I click the "-" button the next candidate's information should be displayed without saving the current candidate
//WHEN there are no candidates available to review an appropriate message should be shown indicating no more candidates are available
const CandidateSearch = () => {

  const [currentCandidate, setCurrentCandidate] = useState<Candidate>({login: '', id: 0, name: '', username: '', location: '', avatar_url: '', email: '', html_url: '', company: ''});

  const [candidateList, setCandidateList] = useState<Candidate[] | []>([]);  

  const [candidateIndex, setCandidateIndex] = useState<number> (0);

  useEffect(() => {
const userData = async () =>{
  const data = await searchGithub();
  setCurrentCandidate(data[candidateIndex]);
  setCandidateList(data);
}
userData();
}, []);

  const fetchNextCandidate = async () => {
    setCandidateIndex(candidateIndex+1);
     const userInfo =  await searchGithubUser(candidateList[candidateIndex+1].login);
    setCurrentCandidate(userInfo);
  };

  
  return (
    <>
    <h1>CandidateSearch</h1>
    {currentCandidate ? (
      <section className="flex">
        <div className="avatar">
          <img src={currentCandidate.avatar_url} alt={`${currentCandidate.name}'s avatar`} />
        </div>
        <div>
          <h4>{currentCandidate.name}</h4>
          <p>Username: {currentCandidate.login}</p>
          <p>Location: {currentCandidate.location || `Location is not available`}</p>
          <p>Email: {currentCandidate.email || `Email not available`}</p>
          <p>Company: {currentCandidate.company || `Company not listed`}</p>
          <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">
            View Profile
          </a>
          <div>
            <button onClick={fetchNextCandidate}>-</button>
            <button
              onClick={() => {
                const newCandidate = JSON.parse(localStorage.getItem('potentialCandidates') || '[]') || [] ;
                newCandidate.push(currentCandidate); 
                localStorage.setItem( "potentialCandidates", JSON.stringify(newCandidate));
              fetchNextCandidate();
              }}
            > + </button>
          </div>
        </div>
      </section>
    ) : (
      <p>No more candidates available</p>
    )}
  </>
);
};

export default CandidateSearch;
