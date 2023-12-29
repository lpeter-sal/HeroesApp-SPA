import { fireEvent, render, renderHook, screen } from "@testing-library/react"
import { MemoryRouter, useLocation, useNavigate } from "react-router-dom"
import { SearchPage } from "../../../src/heroes/pages/SearchPage"
import { useForm } from "../../../src/hooks/useForm";
import queryString from 'query-string'
import { getHeroesByName } from "../../../src/heroes/helpers";

const mockUseNavigate = jest.fn();


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate,
}));

beforeEach( () => jest.clearAllMocks() );

describe('Pruebas en <SearchPage />', () => { 

    test('Debe de mostrarse correctamente los valores por defecto', () => { 

        const { container } = render(
            <MemoryRouter >
                <SearchPage />
            </MemoryRouter>
        );

        expect( container ).toMatchSnapshot();

    });
    
    test('Debe de mostrar batman y el input con el valor del queryString', () => { 

        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        );

        const inputValue = screen.getByRole('textbox');
        expect(inputValue.value).toBe('batman');
        
        const img = screen.getByRole('img');
        expect( img.src ).toContain('/assets/heroes/dc-batman.jpg');

        const alertDanger = screen.getByLabelText('alert-danger');
        expect(alertDanger.style.display).toContain('none');
    });

    test('Debe de mostrar un error si no se encuentra el hero', () => { 

        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        );
        
        const inputValue = screen.getByRole('textbox');
        expect(inputValue.value).toBe('batman123');

        const alertDanger = screen.getByLabelText('alert-danger');
        expect(alertDanger.style.display).not.toContain('none');

        const alertPrimary = screen.getByLabelText('alert-primary');
        expect(alertPrimary.style.display).toContain('none');
    });

    test('Debe de llamar el navigate a la pantalla nueva', () => { 

        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        );

        const inputValue = screen.getByRole('textbox');
        fireEvent.change( inputValue, {target: {name: 'searchText', value: 'superman'}} )

        const form = screen.getByRole('form');
        fireEvent.submit( form );

        expect(mockUseNavigate).toHaveBeenCalledWith('?q=superman');
    });

});