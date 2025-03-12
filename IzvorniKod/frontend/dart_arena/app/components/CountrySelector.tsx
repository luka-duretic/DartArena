"use client";

import React, { useState, useMemo } from "react";
import countryList from "react-select-country-list";
import dynamic from "next/dynamic";
// onemogucava render na serveru, vec se ono radi samo kod klijenta za ovu komponentu
const Select = dynamic(() => import("react-select"), { ssr: false });

function CountrySelector() {
  const [value, setValue] = useState("");
  const countries = useMemo(() => countryList().getData(), []);

  const countryOptions = countries.map((country) => ({
    value: country.value,
    label: country.label,
  }));

  const changeHandler = (value: any) => {
    setValue(value);
  };

  const custom = {
    control: (base:any, {isFocused}:any) => ({
      ...base,
      backgroundColor: "#e5e7eb", // Boja pozadine
      color: "white",
      padding: "2px",
      borderColor: isFocused ? "oklch(0.585 0.233 277.117)" : "#d1d5dc",
      "&:hover": { borderColor: "" },
    }),
    option: (base:any, { isFocused, isSelected }:any) => ({
      ...base,
      backgroundColor: isSelected ? "#99a1af" : isFocused ? "#d1d5dc" : "white",
      color: isSelected ? "white" : "#364153",
    }),
    singleValue: (base:any) => ({
      ...base,
      color: "#99a1af", // Plava boja teksta
    }),
  };

  return <Select options={countryOptions} onChange={changeHandler} className="w-full mt-3" styles={custom}/>;
}

export default CountrySelector;
