async function request(path: string, config: RequestInit): Promise<Response>{

    const customConfig = config

    const request = new Request(path, customConfig)
    const response = await fetch(request)

    if(!response.ok){
        const errorBody: {message: string, body?: string[]} = await response.json().then(res => res).catch(() => ({message: "Request falhou", body: undefined}))

        if(response.status == 401){
            window.localStorage.removeItem('jwt')
            window.location.replace(window.location.origin + '/login')
        }

        throw new Error(errorBody.message)
    }

    return response
}

export async function get<TResponse>(path: string, config?: RequestInit): Promise<TResponse>{
    let init = { method: 'GET', ...config}
    const jwt = window.localStorage.getItem('jwt')

    if(jwt)
    init = {
        ...init,
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            'x-acess-token' : jwt
        }
    }

    return ((await request(path, init)).json().catch(() => ({})))
}

export async function getWithNotCORS<TResponse>(path: string, config?: RequestInit): Promise<TResponse>{
    let init = { method: 'GET', ...config}

    return ((await request(path, init)).json().catch(() => ({})))
}

export async function post<TRequest, TResponse>(path: string, body?: TRequest, config?: RequestInit): Promise<TResponse>{
    let init = { method: 'POST', ...config}
    const jwt = window.localStorage.getItem('jwt')

    if(body !== undefined){
        if(jwt)
            init = {
                ...init,
                body: JSON.stringify(body),
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                    'x-acess-token' : jwt
                }
            }
        else
            init = {
                ...init,
                body: JSON.stringify(body),
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                }
            }
    } else {
        if(jwt)
            init = {
                ...init,
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                    'x-acess-token' : jwt
                }
            }
    }
    return ((await request(path, init)).json().catch(() => ({})))
}

export async function del<TResponse>(path: string, config?: RequestInit): Promise<TResponse>{
    let init = { method: 'DELETE', ...config}
    const jwt = window.localStorage.getItem('jwt')

    if(jwt)
    init = {
        ...init,
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            'x-acess-token' : jwt
        }
    }

    return ((await request(path, init)).json().catch(() => ({})))
}