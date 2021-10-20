import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

type User = {
    id: string,
    name: string,
    login: string,
    avatar_url: string
}

type AuthContextData = {
    user: User | null,
    signInUrl: string,
    signOut: () => void
}

type AuthResponse = {
    token: string,
    user: {
        id: string,
        avatar_url: string,
        name: string,
        login: string
    }
}

export const AuthContext = createContext({} as AuthContextData)

type AuthProvider = {
    children: ReactNode
}

export function AuthProvider(props: AuthProvider) {
    const [user, setUser] = useState<User | null>(null)

    const storageTokenName  = '@doWhile:token'
    const clientId          = '8198160a4cbb3732d3fb'
    const signInUrl         = `https://github.com/login/oauth/authorize?scope=user&client_id=${clientId}`

    async function signIn( githubCode: string ) {

        const response = await api.post<AuthResponse>( 'authenticate', {
            code: githubCode
        })
        
        const { token, user } = response.data

        localStorage.setItem( storageTokenName, token )

        api.defaults.headers.common.authorization = `Bearer ${token}`

        setUser(user)
    }

    function signOut() {
        setUser( null )
        localStorage.removeItem( storageTokenName )
    }

    useEffect(() => {

        const url = window.location.href
        const hasGithubCode = url.includes('?code=')

        if ( hasGithubCode ) {
            // Quebra a URL e obtem a URL Base e o Código retornado do Github
            const [ urlWithoutCode, githubCode ] = url.split('?code=')
            
            // Atualiza a URL sem o código retornado do Github
            window.history.pushState({}, '', urlWithoutCode)

            signIn( githubCode )
        }



    }, [])

    useEffect( () => {

        const token = localStorage.getItem( storageTokenName )

        if( token ) {

            api.defaults.headers.common.authorization = `Bearer ${token}`

            api.get<User>( 'user/profile' )
            .then( response => {
                setUser( response.data )
            })

        }

    }, [])

    return (
        <AuthContext.Provider value={{ signInUrl, user, signOut }}>
            {props.children}
        </AuthContext.Provider>
    )
}