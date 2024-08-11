export function getToken() {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('token');
    }
    return null;
}
export function setToken(token: string) {
    if (typeof window !== 'undefined') {
        return localStorage.setItem('token', token);
    }
    return null;
}

export function clearToken() {
    if (typeof window !== 'undefined') {
        return localStorage.removeItem('token');
    }
    return null;
}

export function setUser(user: any) {
    if (typeof window !== 'undefined') {
        return localStorage.setItem('user', JSON.stringify(user));
    }
    return null;
}

export function getUser() {
    if (typeof window !== 'undefined') {
        console.log(localStorage.getItem('user'))
        return localStorage.getItem('user');
    }
    return null;
}