import React, { useEffect, useState, Suspense  } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './redux/store'
import { Provider, useDispatch } from 'react-redux'
import axios from 'axios'
import jwtDecode from "jwt-decode";

const WithAxios = ({ children }) => {
    const dispatch = useDispatch()
    const [ready, setReady] = useState(false)
    useEffect(() => {
        axios.interceptors.request.use(function (config) {
            if(localStorage.getItem('token')) {
                config.headers.common.authorization = 'Bearer ' + localStorage.getItem('token')
            }
            return config;
        }, function (error) {
            return Promise.reject(error);
        });
        axios.interceptors.response.use(function (response) {
            if(response.data?.token){
                const decoded = jwtDecode(response.data?.token);
                dispatch({type: 'user/update', payload: { ...decoded }})
                localStorage.setItem('token', response.data?.token)
            }
            return response;
        }, function (error) {
            if(error.response?.status === 403){
                localStorage.removeItem('token')
                window.location.href = "./";
                return;
            }
            return Promise.reject(error);
        });
        setReady(true)
    }, [])

    if(ready){
        return children
    }
    return <></>
}

import LoadingBar from 'react-top-loading-bar'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <WithAxios>
            <Suspense fallback={<LoadingBar color='#399CC6' progress={90}/>}>
                <App />
            </Suspense>
        </WithAxios>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
