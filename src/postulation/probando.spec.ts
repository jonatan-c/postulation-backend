/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
function sumar(a, b) {
	return a + b;
}

describe('Pruebas de sumar', () => {
	it('Debe retornar 5 si se suman 2 y 3', () => {
		expect(sumar(2, 3)).toBe(5);
	});
});
