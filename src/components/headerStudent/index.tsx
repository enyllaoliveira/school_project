import { IoMdSearch } from "react-icons/io";

export default function HeaderStudent() {
  return (
    <div className="flex items-center justify-between px-4 py-2">
      <p className="font-bold text-2xl flex items-center text-center">Minhas notas</p>
      <div
        className={`
          flex items-center p-2
          text-slate-500 rounded-md space-x-1
          bg-white border border-gray-300 
        `}
      >
        <input
          type="text"
          placeholder="Pesquisar aluno(a)"
          className="focus:border-transparent focus:outline-none"
        />
        <button className="flex items-center px-2">
          <IoMdSearch className="text-xl" />
        </button>
      </div>
    </div>
  );
}