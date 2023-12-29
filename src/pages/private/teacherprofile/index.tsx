import Header from "@/components/header";
import HeaderProfile from "@/components/headerProfiles";
import { useEffect, useState } from "react";
import { VscArrowDown } from "react-icons/vsc";
import { useSession } from "next-auth/react";
import { ConnectionAPIGet } from "@/shared/API/connection";
import { error } from "console";
import ConnectionAPI from "@/shared/API/connection";

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

interface ApiResponse {
  data: Student[]
}

export default function TeacherProfile() {

const [students, setStudents] = useState<Student[]>([])
const { data: session } = useSession()

  useEffect(() => {
    
    if(session?.token) {
      ConnectionAPI.setHeaders({
        Authorization: `Bearer ${session.token}`
      })
    }

    ConnectionAPIGet(`${process.env.URLBase}/private/teacherprofile`)
    .then((response) => {
      const typeResponse = response as ApiResponse
      setStudents(typeResponse.data);
    })
    .catch(error => {
      console.log("Erro ao obter dados dos alunos:", error)
    })
    }, [session])


  function formatedData(dataISO: string) {
    return new Date(dataISO).toLocaleDateString('pt-BR');
  }
  return (

      <div>
      <Header />
      <div className="bg-gray-200 min-h-screen flex flex-col">
        <HeaderProfile title={"Meus alunos"} />
        <div className="p-3 text-center mx-4 lg:mx-4 overflow-x-auto">
          
          <table className="min-w-full bg-white border rounded-md border-gray-300">
            <thead>
              <tr className="bg-gray-100">
              <th className="p-8 text-sm lg:text-base flex items-center"> Nome do aluno <VscArrowDown /> </th>                  
              <th className="p-8 text-sm lg:text-base">Atualização</th>
                <th className="p-8 text-sm lg:text-base">Avaliação 1</th>
                <th className="p-8 text-sm lg:text-base">Avaliação 2</th>
                <th className="p-8 text-sm lg:text-base">Avaliação 3</th>
                <th className="p-8 text-sm lg:text-base">Avaliação 4</th>
                <th className="p-8 text-sm lg:text-base">Média final</th>
                <th className="p- text-sm lg:text-base">Situação</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id}>
                  <td className="p-8 text-sm lg:text-base whitespace-nowrap">{student.firstName} {student.lastName}</td>
                  <td className="p-4 text-sm lg:text-base whitespace-nowrap">
                  {formatedData(student.scores[0].updatedAt)} </td>        
                      
                  <td className="p-4 text-sm lg:text-base whitespace-nowrap">{student.scores[0].n1}</td>
                  <td className="p-4 text-sm lg:text-base whitespace-nowrap">{student.scores[0].n2}</td>
                  <td className="p-4 text-sm lg:text-base whitespace-nowrap">{student.scores[0].n3}</td>
                  <td className="p-4 text-sm lg:text-base whitespace-nowrap">{student.scores[0].n4}</td>
                  <td className="p-4 text-sm lg:text-base whitespace-nowrap">{student.scores[0].average}</td>
                  <td className="p-4 whitespace-nowrap">
                    <span className={`block ${student.scores[0].situation === 'Reprovado' ? 'bg-red-500' : 'bg-green-500'} text-white rounded-full p-1 text-sm lg:text-base`}>
                      {student.scores[0].situation}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    );
  }