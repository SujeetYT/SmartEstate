import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

const Search = ({name, id, placeholder}) => {
  return (
    <div className="d-flex px-1 py-2 border rounded">
      <AiOutlineSearch className="my-auto" size={20}/>
      <input
        type="search"
        name={name}
        id={id}
        placeholder={placeholder}
        className="border-0 w-100"
        style={{ outline: "none" }}
      />
    </div>
  );
};

export default Search;
