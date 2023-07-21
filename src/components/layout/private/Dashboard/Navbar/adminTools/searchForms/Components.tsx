/* eslint-disable no-use-before-define */
import React from 'react'

interface IButtonComponent{
    title:string,
    onClickFunction?:any,
    param?:any
}

interface IInputComponent
{
    label:string,
    placeholder:string,
    onChangeFunction?:any,
    param?:any,
    value?:any
}

interface ISelectComponent {
    label:string,
    options?:Array<any>,
    name: string
    onChangeFunction?:any,
    param?:any,
    value?:any
}

export const InputComponent = (props:IInputComponent) => {
  const { label, placeholder, onChangeFunction, param, value } = props
  return (
    <div>
      <label className='search-form-label'>{label}</label>
      <div>
        <input type='text' className='search-form-input search-form-box' placeholder={`${placeholder}`} onChange={(event) => { onChangeFunction(event, param) }} value={value} />
      </div>
    </div>
  )
}

export const SelectComponent = (props:ISelectComponent) => {
  const { label, options, name, onChangeFunction, param, value } = props
  return (
    <div>
      <div>
        <label className='search-form-label'>{label}</label>
      </div>
      <div>
        <select name={`${name}`} className='search-form-select search-form-box' value={value} onChange={(event) => { onChangeFunction(event, param) }}>
          <option value={''}>Select</option>
          {
            options
              ? options.map((option) => (
                <option value={option.value}>{option.name}</option>
              ))
              : <></>
          }
          {/* <option value={''}>Select</option>
          <option value={''}>OP 1</option>
          <option value={''}>OP 2</option> */}
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
