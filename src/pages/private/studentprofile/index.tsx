import Header from "@/components/header"
import HeaderProfile from "@/components/headerProfiles";
import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import ConnectionAPI from "@/shared/API/connection";
import { ConnectionAPIGet } from "@/shared/API/connection";

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

export default function StudentProfile() {

  const [student, setStudent] = useState<Student | null>(null);
    
  useEffect(() => {
    ConnectionAPIGet(`${process.env.URLBase}/private/studentprofile`)
      .then((response) => {
        const typeResponse = response as ApiResponse
        setStudent(response.data.length > 0 ? response.data[0] : null)
      })
      .catch(error => {
        console.error("Erro ao obter dados do aluno:", error)
      })
  }, [])


   return(
      <div>
      <Header/>        
      <div className="bg-gray-200 min-h-screen flex flex-col">
      <HeaderProfile title={"Minhas notas"}/>
      <div className="p-3 text-center mx-4 lg:mx-4 overflow-x-auto">
      <div className={`
      bg-gray-100 `}>
        
    {student && (
          <table className="min-w-full border rounded-md border-gray-300">
          <thead>
                <tr className=" bg-white">
                  <th className="p-8 text-sm lg:text-base"> Nota 1 </th>
                  <th className="p-8 text-sm lg:text-base"> Nota 2 </th>
                  <th className="p-8 text-sm lg:text-base"> Nota 3 </th>
                  <th className="p-8 text-sm lg:text-base"> Nota 4 </th>
                  <th className="p-8 text-sm lg:text-base"> Média final </th>
                  <th className="p-8 text-sm lg:text-base"> Situação </th>
                </tr>
              </thead>
              <tbody>
                <tr>
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
              </tbody>
            </table>
        
)}    
      </div>
    </div>
    </div>
    </div>
    )
}

