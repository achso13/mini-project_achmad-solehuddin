import * as Ai from "react-icons/ai";

export default function SearchBar() {
  return (
    <form className="m-0 flex items-center gap-2 rounded-lg border-2 border-gray-200 bg-gray-50 py-1 px-2 focus:ring-2 focus:ring-red-500">
      <button
        type="submit"
        className="rounded-full text-xl text-gray-500 hover:text-red-500"
      >
        <Ai.AiOutlineSearch />
      </button>
      <input
        type="text"
        placeholder="Cari beritamu"
        className="bg-gray-50 focus:outline-none"
      />
    </form>
  );
}
