import { Calculator } from "./calculator";

/* 

describe - define una suite de tests. Una colección de tests. Recibe dos parámetros, un string con el nombre de la suite y una function() donde se definen los tests.

it - define un test en particular. Recibe como parámetro el nombre del test y una función a ejecutar por el test.

expect - Lo que esperar recibir ese test. Con expect se hace la comprobación del test.

*/

/* 
Arrange:(Arreglar). Se establece el estado inicial, conocida como el sujeto a probar. Aquí se inicializan variables, importaciones. Se crea el ambiente a probar.

Act (Actuar): Se generan acciones o estímulos. Se llaman métodos, o se simulan clicks por ejemplo

Assert (Afirmar): observar el comportamiento. Los resultados son los esperados. Eje: Que algo cambie, se incremente, o no suceda nada.
*/

/* 
ng test --no-watch --code-coverage

con fdescribe ejecuta únicamente el suite de test

con xdescribe se omite el suite de test

con fit ejecuta el focus sobre un test

con xit se omite un test

Statements (Declaraciones):

Definición: Mide el porcentaje de declaraciones ejecutables en tu código que fueron ejecutadas durante las pruebas.
Ejemplo: Si tienes 100 declaraciones en tu código y 90 de ellas se ejecutaron durante las pruebas, la cobertura de declaraciones sería del 90%.
Branches (Ramas):

Definición: Mide el porcentaje de ramas (como los caminos condicionales en if, else o switch) que fueron ejecutadas.
Ejemplo: Si una sentencia if-else tiene dos posibles ramas y solo se ejecuta el bloque if durante las pruebas, la cobertura de ramas sería del 50%.
Functions (Funciones):

Definición: Mide el porcentaje de funciones que fueron llamadas al menos una vez durante las pruebas.
Ejemplo: Si tu código tiene 10 funciones y las pruebas ejecutan 8 de ellas, la cobertura de funciones sería del 80%.
Lines (Líneas):

Definición: Similar a "Statements" pero más detallado, mide el porcentaje de líneas individuales de código que fueron ejecutadas.
Ejemplo: Si tienes 200 líneas de código y 150 de ellas se ejecutaron durante las pruebas, la cobertura de líneas sería del 75%.

 */
describe('Test for calculator', () => {
    describe('Test for multiply', () => {

        it('#multiply should return a nine', () => {
            //Arrange
            const calculator = new Calculator();
            //Act
            const rta = calculator.multiply(3, 3);
            //Assert
            expect(rta).toEqual(9);
        });

        it('#multiply should return a four', () => {
            //Arrange
            const calculator = new Calculator();
            //Act
            const rta = calculator.multiply(1, 4);
            //Assert
            expect(rta).toEqual(4);
        });
    });

    describe('Test for divide', () => {
        it('#divide zero', () => {
            //Arrange
            const calculator = new Calculator();
            //Act
            expect(calculator.divide(6, 3)).toEqual(2);
            expect(calculator.divide(5, 2)).toEqual(2.5);
            //Assert
        });
        it('#divide should return some numbers', () => {
            //Arrange
            const calculator = new Calculator();
            //Act
            expect(calculator.divide(6, 0)).toBeNull();
            //Assert
        });
    });



    it('Tests matchers', () => {
        let name = 'Juan';
        let name2;

        expect(name).toBeDefined();
        expect(name2).toBeUndefined();

        expect(1 + 3 === 4).toBeTruthy();
        expect(1 + 1 === 3).toBeFalsy();

        expect(5).toBeLessThan(10);
        expect(20).toBeGreaterThan(10);

        expect('123456').toMatch(/123/);
        expect(['apple', 'orange', 'pear']).toContain('orange');

    });
});