import React from "react";
import { IoMdSearch } from "react-icons/io";

interface HeaderProps {
    title: string;
}

const HeaderProfile: React.FC<HeaderProps> = ({ title }) => {
    return (
    <header className="flex flex-row lg:flex-row items-center justify-between my-10 mx-4 lg:mx-8">
      <section className="mb-4 lg:mb-0">
        <h1 className="font-bold text-2xl lg:text-3xl">{title}</h1>
      </section>
      <section className="flex p-3 text-center mt-4 lg:mt-0  bg-white border rounded-md border-gray-300 font-thin">
        <input
          type="text"
          placeholder="Pesquisar aluno(a)"
          className="focus:border-transparent outline-none"
        />
        <button>
          <IoMdSearch className="text-xl" />
        </button>
      </section>
    </header>
  );
}

export default HeaderProfile