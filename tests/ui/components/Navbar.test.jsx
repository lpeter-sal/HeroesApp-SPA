import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../src/auth/context/AuthContext";
import { Navbar } from "../../../src/ui";

const mockUseNavigate = jest.fn();

/*HACER PRUEBAS DE LIBRERIAS COMPLETAS
 SOLO TOMANDO LAS FUNCIONES QUE QUEREMOS EVALUAR
 EN ESTE CASO useNavigate
 ...jest.requireActual('react-router-dom'), SIGNIFICA
 QUE NO QUEREMOS EVALUAR/HACER MOCKS DE OTRAS PROPIEDADES
 DE LA LIBRERIA QUE ESTAMOS USANDO EN ESTE CASO MemoryRouter
*/
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate,
}));

describe('Pruebas en <Navbar />', () => { 
    
    const contextValue = {
        logged: true,
        user: {
            id: 123,
            name: 'Bienvenido'
        },
        logout: jest.fn()
    }
    beforeEach( () => jest.clearAllMocks() );

    test('Debe de mostrar el nombre del usuario loggeado', () => { 
        render(
            <MemoryRouter initialEntries={['/login']} >
                <AuthContext.Provider value={ contextValue } >
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        expect(screen.getByText(contextValue.user.name)).toBeTruthy();
    });

    test('Debe de llamar el Logout y navigate cuando se hace click en el boton', () => { 
        render(
            <MemoryRouter initialEntries={['/login']} >
                <AuthContext.Provider value={ contextValue } >
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        const buttonElement = screen.getByRole('button');
        fireEvent.click( buttonElement );
        
        expect(contextValue.logout).toHaveBeenCalled();
        expect(mockUseNavigate).toHaveBeenCalledWith('/login', {'replace': true});
    });

    
})



