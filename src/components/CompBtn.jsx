import React from "react";

function CompBtn({ onClick, children, variant = "primary", type = "button" }) {
  const styles = {
    primary: "px-4 py-2 rounded-md font-bold bg-primary text-secondary hover:bg-primary/90 active:text-primary active:bg-secondary transition-colors duration-300 ease-in-out border-2 border-primary",

    secondary: "px-4 py-2 rounded-md font-bold bg-secondary text-btnprimary hover:bg-secondary/90 active:text-secondary active:bg-btnprimary transition-colors duration-300 ease-in-out border-2 border-btnprimary",
    
    danger: "px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button onClick={onClick} className={styles[variant]} type={type}>
      {children}
    </button>
  );
}

export default CompBtn;
