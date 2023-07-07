/* eslint-disable no-use-before-define */
import React from 'react'

interface IButtonComponent{
    title:string,
    onClickFunction?:any,
    param?:any
}

export const InputComponent = ({ label, placeholder }) => {
  return (
    <div>
      <label className='search-form-label'>{label}</label>
      <div>
        <input type='text' className='search-form-input search-form-box' placeholder={`${placeholder}`} />
      </div>
    </div>
  )
}

export const SelectComponent = ({ label }) => {
  return (
    <div>
      <div>
        <label className='search-form-label'>{label}</label>
      </div>
      <div>
        <select name='userLevel' className='search-form-select search-form-box'>
          <option value={''}>Select</option>
          <option value={''}>OP 1</option>
          <option value={''}>OP 2</option>
        </select>
      </div>
    </div>
  )
}

export const ButtonComponent = (props:IButtonComponent) => {
 const { title, onClickFunction, param } = props
  return (
    <div>
      <button className='search-form-button button-label' onClick={() => { onClickFunction(param) }}>{title}</button>
    </div>
  )
}
