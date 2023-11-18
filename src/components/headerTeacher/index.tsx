import { IoMdSearch } from "react-icons/io";

export default function HeaderTeacher() {
  return (
    <div className="flex items-center">
      <section>
        <p className="font-bold text-3xl ml-0">Meus alunos</p>
      </section>
      <section
        className={`
          flex items-center p-3 
          text-slate-500 rounded-md mr-0
          bg-white border border-gray-300 font-thin
        `}
      >
        <input
          type="text"
          placeholder="Pesquisar aluno(a)"
          className="focus:border-transparent focus:outline-none"
        />
        <button className="flex items-center">
          <IoMdSearch className="text-xl" />
        </button>
      </section>
    </div>
  );
}