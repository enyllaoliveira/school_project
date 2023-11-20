import { IoMdSearch } from "react-icons/io";

export default function HeaderStudent() {
  return (
    <header className="flex flex-row lg:flex-row items-center justify-between my-10 mx-4 lg:mx-8">
      <section className="mb-4 lg:mb-0">
      <h1 className="font-bold text-2xl lg:text-3xl">Minhas notas</h1>
      </section>
      <section className="flex p-3 text-center mt-4 lg:mt-0  bg-white border rounded-md border-gray-300 font-thin">
        <input
          type="text"
          placeholder="Pesquisar aluno(a)"
          className="focus:border-transparent focus:outline-none"/>
        <button className="text-xl">
          <IoMdSearch className="text-xl" />
        </button>
      </section>
    </header>
  );
}

