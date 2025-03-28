import React from "react";

const FooterLinks = ({ links }) => {
  return (
    <ul className="space-y-2">
      {links.map((link) => (
        <li 
          key={link.name} 
          className="cursor-pointer transition-all duration-300 hover:translate-x-[2px]"
        >
          <a href={link.link} className="hover:text-gray-300">
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default FooterLinks;
