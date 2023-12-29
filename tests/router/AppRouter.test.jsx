import { render, screen } from "@testing-library/react"
import { AuthContext } from "../../src/auth"
import { MemoryRouter } from "react-router-dom"
import { AppRouter } from "../../src/router/AppRouter"


describe('Pruebas en <AppRouter />', () => { 

    test('Debe de mostrar el login si no esta autenticado', () => { 

        const contextValue = {
            logged: false
        }


        render(
            <MemoryRouter initialEntries={['/marvel']} >
                <AuthContext.Provider value={ contextValue } >
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getAllByText('Login')).toBeTruthy();
        expect(screen.getAllByText('Login').length).toBeGreaterThan(1);
    });

    test('Debe de mostrar el componente de marvel si esta autenticado', () => { 
        const contextValue = {
            logged: true,
            user: {
                id: 123,
                name: 'Bienvenido'
            }
        }


        render(
            <MemoryRouter initialEntries={['/login']} >
                <AuthContext.Provider value={ contextValue } >
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getAllByText('Marvel Comics')).toBeTruthy();
        expect(screen.getAllByText('Marvel Comics').length).toBeGreaterThan(1);
    });


    

})