import { useRouter } from "next/router";

export default function Header() {
    const router = useRouter()

    return (
      <div className={`
          flex items-center justify-evenly 
          h-auto md:h-32 text-black bg-white text-base
      `}>
        <section className="md:mb-2 lg:mb-0 md:mr-4 lg:mr-6">
        <button onClick={() => router.push ('/')} className="md:text-lg lg:text-xl">Escola Mundial</button>
        </section>
  
        <nav className="flex justify-evenly space-x-4 md:space-x-6 lg:space-x-8">
          <button className="text-base md:text-lg lg:text-xl">Sobre a escola</button>
          <button className="text-base md:text-lg lg:text-xl">Informações</button>
          <button className="text-base md:text-lg lg:text-xl">Contate-nos</button>
        </nav>
  
        <section>
          <button className={`
                  bg-sky-700 text-white
                  p-3 md:p-5 rounded-lg
              `}>Perfil</button>
        </section>
      </div>
    );
  }