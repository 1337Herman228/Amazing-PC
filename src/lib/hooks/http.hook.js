'use client'

import React, {useState, useCallback, useMemo} from 'react';
import useCookie from '../hooks/cookie.hook';

const useHttp = () =>{

	const {getCookies} = useCookie();
	const [token, setToken] = useState(getCookies('token'));

	const authRequest = useCallback( 
        async(url, method = 'GET', body = null) =>{
		try{
			const response = await fetch(url, {method,body})
            if(!response.ok){
                throw new Error('Could not fetch ' + url + 'status ' + response.status)
            }
            const data = await response.json()
			return data

		}catch(e){throw e}
	},[])

	const requestJson = useCallback( 
        async(url, method = 'GET', body = null, headers={
			'Authorization':'Bearer ' + token,
			'Content-Type': 'application/json'}) =>{
		try{
			const response = await fetch(url, {method,body,headers})
			if(!response.ok){throw new Error('Could not fetch ' + url + 'status ' + response.status)}
            const data = await response.json()
			return data

		}catch(e){throw e}

	},[])

    const requestPromise = useCallback( 
		async(url, method = 'GET', body = null, headers={
			'Authorization':'Bearer ' + token,
			'Content-Type': 'application/json'}) => {
		try{
			const response = await fetch(url, {method,body,headers})
			if(!response.ok){throw new Error('Could not fetch ' + url + 'status ' + response.status)}
			return response

		}catch(e){throw e}

	},[])

	return {requestJson, requestPromise, authRequest}
}

export default useHttp;