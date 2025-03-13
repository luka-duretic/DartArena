"use client";

import React, { useState, useMemo, useEffect } from "react";
import countryList from "react-select-country-list";
import dynamic from "next/dynamic";
// onemogucava render na serveru, vec se ono radi samo kod klijenta za ovu komponentu
const Select = dynamic(() => import("react-select"), { ssr: false });

function CountryInput({handleCountry}:any) {
  const [value, setValue] = useState("");
  const countries = useMemo(() => countryList().getData(), []);
  const [mode, setMode] = useState<any>("light")
  
  useEffect(() => {
    let tmp = localStorage.getItem("mode")  
    setMode(tmp)
  })

  useEffect(() => {
    const storedMode = localStorage.getItem("mode");
    if (storedMode) {
      setMode(storedMode);
    }
  }, []);
  
  const countryOptions = countries.map((country) => ({
    value: country.value,
    label: country.label,
  }));

  const changeHandler = (value: any) => {
    setValue(value);
    handleCountry(value.label)    
  };

  const custom = {
    control: (base:any, {isFocused}:any) => ({
      ...base,
      backgroundColor: (mode === "dark" ? "oklch(0.373 0.034 259.733)" : "oklch(0.928 0.006 264.531)"), 
      color: (mode === "dark" ? "oklch(0.707 0.022 261.325)" : "oklch(0.373 0.034 259.733)"),
      padding: "2px",
      borderColor: (isFocused ? "oklch(0.585 0.233 277.117)" : (mode === "dark" ? "oklch(0.278 0.033 256.848)" : "oklch(0.872 0.01 258.338)")),
      "&:hover": { borderColor: "" },
    }),
    option: (base:any, { isFocused, isSelected }:any) => ({
      ...base,
      backgroundColor: isSelected ? (mode === "dark" ? "oklch(0.278 0.033 256.848)" : "oklch(0.707 0.022 261.325)") : isFocused ? (mode === "dark" ? "oklch(0.278 0.033 256.848)" : "oklch(0.707 0.022 261.325)") : (mode === "dark" ? "oklch(0.373 0.034 259.733)" : "oklch(0.928 0.006 264.531)"),
      color: isSelected ? (mode === "dark" ? "white" : "oklch(0.373 0.034 259.733)") : (mode === "dark" ? "oklch(0.707 0.022 261.325)" : "oklch(0.373 0.034 259.733)"),
    }),
    singleValue: (base:any) => ({
      ...base,
      color: "", 
    }),
  };

  return <Select options={countryOptions} onChange={changeHandler} className="w-full rouned-lg mt-3" styles={custom}/>;
}

export default CountryInput;
