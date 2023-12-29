import { render, screen } from "@testing-library/react"
import { AuthContext } from "../../src/auth"
import { MemoryRouter } from "react-router-dom";
import { PrivateRoute } from "../../src/router/PrivateRoute";


describe('Pruebas en <PrivateRoute />', () => { 

    test('Debe de mostrar el children si esta autenticado', () => { 

        Storage.prototype.setItem = jest.fn();

        const contextValue = {
            logged: true,
            user: {
                id: 123,
                name: 'Bienvenido'
            }
        }


        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/search?q=batman']}>
                    <PrivateRoute >
                        <h1>Ruta Privada</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        )
        

        expect(screen.getByText('Ruta Privada')).toBeTruthy();
        expect( localStorage.setItem ).toHaveBeenCalled();
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/search?q=batman');

    });




});