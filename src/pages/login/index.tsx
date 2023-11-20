import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isTeacher, setIsTeacher] = useState<boolean>(false);
    const router = useRouter();
    const isButtonDisabled = !email || !password;

    const changeUser = () => {
        setIsTeacher(!isTeacher)
    }

    const submitTeacher = () => {
      axios.post('https://test-dev.tikal.tech/adm/admin/login', { email, password })
        .then(response => {
          const token = response.data.token;    
          localStorage.setItem('token', token);
          router.push('/teacherprofile');
        })
        .catch(error => {
          console.error('Erro no login:', error);
        });
    };

    const submitStudent = 
    () => {

      axios.post('https://test-dev.tikal.tech/adm/admin/login', { email, password })
        .then(response => {
          const token = response.data.token;    
          localStorage.setItem('token', token);
          router.push('/studentprofile');
        })
        .catch(error => {
          console.error('Erro no login:', error);
        });

                // axios.post('https://test-dev.tikal.tech/aluno/student/login', {email, password}).then(response => {
        //     console.log(response.data);
        //     localStorage.setItem('token','token')
        //     router.push('/studentprofile')
        //     });
    }

    useEffect( () => {

    }, [changeUser]) 

  return (

      <div className={`
        bg-gray-200 
        flex justify-center items-center h-full
      `}>

        <div className={`
          bg-gray-100 h-3/5 w-2/6 p-8 
        `}>

        <h1 className='text-black text-lg font-bold mb-16 text-right'> { isTeacher ? 'Área do professor' : 'Área do aluno' } </h1>


        <form className='items-center justify-center'>
          <section className='mx-12'>
            <label className="block text-gray-700 text-lg font-bold mb-4">Usuário</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-3 mb-12 px-4 text-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
            />
          </section>

          <section className='mx-12'>
            <label className="block text-gray-700 text-lg font-bold mb-4">Senha</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full mb-16 py-3 px-4 text-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
            />
          </section>

          <section className="flex flex-col">
          <button
          disabled={isButtonDisabled}
          onClick={isTeacher ? submitTeacher : submitStudent}
          className={`${
            isButtonDisabled
            ? 'bg-gray-500'
            : 'bg-blue-500 hover:bg-blue-700'
            } text-white font-bold text-lg py-3 md:px-10 w-full mx-12 mb-10 md:w-auto rounded`}
            type="button"> Acessar </button>

          <button
            className={`text-black font-bold  hover:text-red-500 text-lg py-2 px-10 mb-10`}
            type="button"> Esqueceu sua senha?
        </button>
        </section>
        <a onClick={changeUser} className="hover:underline font-thin text-sm md:text-base lg:text-lg flex justify-center">
        {!isTeacher ? 'Acessar área do professor' : 'Acessar área do aluno'}</a>        
        </form>
        </div>

      </div>
  );
}