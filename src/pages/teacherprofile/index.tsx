  import Header from "@/components/header";
  import HeaderTeacher from "@/components/headerTeacher";
  import { useEffect, useState } from "react";
  import axios from 'axios';


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

  export default function TeacherProfile() {

    const [students, setStudents] = useState<Student[]>([])
    
    useEffect(() => {
      const token = localStorage.getItem('token')
      const headers = { 'Authorization': `Bearer ${token}` };
      axios.get<Student[]>('https://test-dev.tikal.tech/adm/student', {headers}).then(response => {
        setStudents(response.data);
      }); 
    }, [])

    return (
      <div>
        <Header />
        <div
          className={`
            bg-gray-200 h-screen 
            flex flex-col justify-center items-center 
          `}>
            <div className="flex flex-row justify-between">
            <HeaderTeacher />
            </div>
          <div className="max-w-7xl w-full overflow-x-auto">
          <table className="w-full lg:w-4/5 xl:w-11/12 mx-auto">
            <thead>
              <tr>
                <th> Nome do aluno</th>
                <th> Nome </th>
                <th> Avaliação 1 </th>
                <th> Avaliação 2 </th>
                <th> Avaliação 3 </th>
                <th> Avaliação 4 </th>
                <th> Média final </th>
                <th> Situação </th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
              <tr key={student.id}>
                <td>{student.firstName} {student.lastName}</td>
                <td>{student.scores[0].updatedAt} </td>
                    <td>{student.scores[0].n1} </td>
                    <td>{student.scores[0].n2} </td>
                    <td>{student.scores[0].n3} </td>
                    <td>{student.scores[0].n4} </td>
                    <td>{student.scores[0].average}</td>
                    <td>{student.scores[0].situation} </td>
              </tr>
            ))}
            </tbody>
          </table>
          </div>
          
        </div>
      </div>
    );
  }