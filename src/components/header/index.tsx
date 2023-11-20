import { useRouter } from "next/router";
import { useState } from "react";

export default function Header() {
    const router = useRouter()
    const [menuOpen, setMenuOpen] = useState(false);

    const viewMenu = () => {
      setMenuOpen(!menuOpen);
    }

    return (
      <div className={`
          flex items-center justify-between mx-8 
          h-auto md:h-32 text-black bg-white text-base`}>
        <section className="md:mb-2 lg:mb-0 md:mr-4 lg:mr-6">
        <button onClick={() => router.push ('/')} className="md:text-lg lg:text-xl">Escola Mundial</button>
        </section>
  
        <div className="md:hidden h-20 flex items-center md:h-32">
         <button onClick={viewMenu} className="text-3xl ">
         ☰
        </button> 
        </div>

        <nav className={`
        ${menuOpen ? 'flex flex-col items-start space-y-4 absolute top-full left-0 bg-white w-full px-4 py-2 border md:hidden' : 'hidden md:flex space-x-4 md:space-x-8 lg:space-x-24'}`}>
        <button className="text-base md:text-lg lg:text-xl">Sobre a escola</button>
        <button className="text-base md:text-lg lg:text-xl">Informações</button>
        <button className="text-base md:text-lg lg:text-xl">Contate-nos</button>
        
        <section>
          <button className={`
           bg-sky-700 text-white
            p-3 md:p-5 rounded-lg`}> Perfil</button>
        </section>
        </nav>
  
      </div>
    );
  }