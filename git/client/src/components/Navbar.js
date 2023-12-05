import React from "react";
import {HiMenuAlt4} from "react-icons/hi";
import {AiOutlineClose} from "react-icons/ai"
import Home from "./Home";
const Navbar=()=>{
    const NavbarItem =({title,classProps})=>{
        return(
            <li className={`mx-4 cursor-pointer ${classProps}`}>
                {title}
            </li>
        )
    }
    return(
        <nav className="w-full flex md:justify-center justify-between items-center p-4">
            <ul className="text-white md:flex hidden list-none flex-row justify items-center flex-initial">
                {["Home","About","Contact"].map((item,index)=>(
                    <NavbarItem key={item+index} title={item} />
                ))}
            </ul>
        </nav>
    );
}

export default Navbar;