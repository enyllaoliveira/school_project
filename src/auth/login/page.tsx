import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '@/components/loading';
import { signIn } from "next-auth/react";

export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isTeacher, setIsTeacher] = useState<boolean>(false);
    const [showLoading, setShowLoading] = useState(false);
    const router = useRouter();
    const isButtonDisabled = !email || !password;

    const changeUser = () => {
        setIsTeacher(!isTeacher)
    }

    const submitTeacher = async () => {
      setShowLoading(true) 
        const result = await signIn("credentials", {
            redirect:false,
            email,
            password
        })
        console.log(result)
    };

    const submitStudent = () => {
      setShowLoading(true)
      axios.post('https://test-dev.tikal.tech/aluno/student/login', { email, password }).then(response => {
        const token = response.data.token;    
        localStorage.setItem('token', token);
        router.push('/studentprofile');
        })
        .catch(error => {
        console.error('Erro no login:', error);
        })
        .finally(() => {
          setShowLoading(false)
        })
        ;
    }

    useEffect( () => {

    }, [changeUser]) 

  return (

    <div className={`
    bg-gray-200 
    flex justify-center items-center min-h-screen`}>
  
    <div className={`
    bg-gray-100 w-full sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/3 p-8 `}>
  
      <h1 className='text-black text-lg font-bold mb-6 md:mb-8 text-center md:text-right'>
        {isTeacher ? 'Área do professor' : 'Área do aluno'}
      </h1>
  
      <form className='flex flex-col items-center justify-center'>
        <section className='w-full mb-4 md:w-4/5 lg:w-3/4'>
          <label className="block text-gray-700 text-lg font-bold mb-2">Usuário</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-4 text-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"/>
        </section>
  
        <section className="w-full mb-4 md:w-4/5 lg:w-3/4">
          <label className="block text-gray-700 text-lg font-bold mb-2">Senha</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-4 text-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password" />
        </section>
  
        <section className="w-full mb-4 md:w-4/5 lg:w-3/4">
          <button
            disabled={isButtonDisabled}
            onClick={isTeacher ? submitTeacher : submitStudent}
            className={`${
              isButtonDisabled
                ? 'bg-gray-500'
                : 'bg-blue-500 hover:bg-blue-700'
                } text-white font-bold text-lg py-2 md:px-8 w-full rounded`}
                type="button"> Acessar
          </button>
        </section>
  
        <section className="w-full mb-4 md:w-4/5 lg:w-3/4 flex justify-center">
          <button
            className={`text-black font-bold hover:text-red-500 text-lg py-2 px-8`}
            type="button">
            Esqueceu sua senha?
          </button>
        </section>
  
        <section className="w-full md:w-4/5 lg:w-3/4">
          <a onClick={changeUser} className="hover:underline font-thin text-sm md:text-base lg:text-lg mt-2 block text-center">
            {!isTeacher ? 'Acessar área do professor' : 'Acessar área do aluno'}
          </a>
        </section>
      </form>
      { showLoading && <Loading/>}
    </div>
  </div>
  );
}