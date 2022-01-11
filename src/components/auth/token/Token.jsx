export function isAuth() {
    const mockedToken = window.sessionStorage.getItem('mockedToken');
    if (mockedToken) return true;
    return false;
}