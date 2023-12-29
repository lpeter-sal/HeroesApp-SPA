import { screen } from "@testing-library/react";
import { authReducer } from "../../../src/auth/context/authReducer"
import { types } from "../../../src/auth/types/types";



describe('Pruebas en authReducer', () => { 

    const initialState = {
        logged: false
    }

    const user = {
        id: 123,
        name: 'Bienvenido'
    }



    test('Debe de retornar el estado por defecto', () => { 
        
        const newState = authReducer(initialState, {});
        expect(newState).toEqual({ logged: false });
    });

    test('Debe de llamar el login autenticar y establecer el user', () => { 

        const action = { 
                    type: types.login, 
                    payload: user 
        }

        const newState = authReducer(initialState, action);
        expect(newState.logged).toBeTruthy();
        expect(newState.user.name).toBe(user.name);
    });

    test('Debe de llamar el logout borrar el nombre del usuario y logged false', () => { 

        const action = { 
                    type: types.logout
        }

        const state = {
            logged: true,
            user
        }

        const newState = authReducer(state, action);
        expect(newState.logged).toBeFalsy();
        expect(newState).not.toContain(user.name);
    });

});