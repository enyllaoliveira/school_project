import Header from "@/components/header"
import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"

interface Score {
  id: string;
  createdAt: string;
  updatedAt: string;
  n1: number;
  n2: number;
  n3: number;
  n4: number;
  average: number;
  situation: string;
}

interface Student {
  id: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  email: string;
  scores: Score[];
} 


export default function StudentProfile() {

  const [student, setStudent] = useState<Student | null>(null);
    
  useEffect(() => {
    const token = localStorage.getItem('token')
    const headers = { 'Authorization': `Bearer ${token}` };
    axios.get<Student>('https://test-dev.tikal.tech/aluno/score', {headers}).then(response => {
      setStudent(response.data);
    }); 
  }, [])

    return(
        <div>
        <Header/>        

        <div className={`
      bg-gray-200 h-screen 
      flex flex-col justify-center items-center
    `}> 
      <div className={`
      bg-gray-100 h-4/5 w-4/5 p-8 
      `}>
    {student && (
            <table className="w-full lg:w-4/5 xl:w-11/12 mx-auto">
              <thead>
                <tr>
                  <th> Nota 1 </th>
                  <th> Nota 2 </th>
                  <th> Nota 3 </th>
                  <th> Nota 4 </th>
                  <th> Média final </th>
                  <th> Situação </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{student.scores[0].n1}</td>
                  <td>{student.scores[0].n2}</td>
                  <td>{student.scores[0].n3}</td>
                  <td>{student.scores[0].n4}</td>
                  <td>{student.scores[0].average}</td>
                  <td>{student.scores[0].situation}</td>
                </tr>
              </tbody>
            </table>
        
)}    
      </div>
    </div>
    </div>
    )
}

