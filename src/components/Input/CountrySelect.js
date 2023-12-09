"use client"

import useCountries from '@/hooks/useCountries'
import React from 'react'
import Select from "react-select"

function CountrySelect({ value, onChange}) {
    const {getAll} = useCountries();

  return (
    <div>
        <Select placeholder= "Anywhere" isClearable options={getAll()} value={value} onChange={(value) => onChange(value)} formatOptionLabel={(options) => (<div className=' flex items-center gap-3'>
        <div> {options.flag}</div>
        <div>{options.label}, <span className=' text-neutral-500'>{options.region}</span></div>
            </div>
        )} classNames={{control:() => " p-3 border-2"}}/>
    </div>
  )
}

export default CountrySelect

//classNames in Select component allows you to style the component however you like