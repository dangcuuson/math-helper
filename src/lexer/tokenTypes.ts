/** Declare math language for lexer */

export type Token = (
    OperatorToken |
    MathFuncToken |
    MathConstantToken |
    ParenthesisToken |
    NumberToken |
    VarToken
);

/**
 * Implicit mul operator are operators that are added
 * to make expression more explicit
 * e.g: ab(x+y) => a*b*(x+y), and those '*' are implicit
 * The difference between mulitply and implicyMul is that when convert to string, implicit mul will not print anything
 * Also, calculation order between them are difference:
 *   - a/bc will calc bc first before division
 *   - a/b*c will calc a/b first and then mul by c
 */
export type OperatorType =
    'add' |
    'subtract' |
    'multiply' |
    'divide' |
    'exponent' |
    'implicitMul' |
    'mod' |
    'factorial' |
    'percentage';

export interface OperatorToken {
    type: 'operator';
    operator: OperatorType;
}

export type MathFuncType = 'sqrt' | 'sin' | 'cos' | 'tan' | 'csc' | 'sec' | 'cot' |
    'frac' | 'abs' | 'log' |  'sum' | 'prod';
export interface MathFuncToken {
    type: 'mathFunc';
    funcName: MathFuncType;
    negativeSign?: boolean;
}

export type ParenthesisShape = '(' | ')' | '[' | ']' | '{' | '}';

export interface ParenthesisToken {
    type: 'parenthesis';
    shape: ParenthesisShape;
    negativeSign?: boolean;
}

export type MathConstantType = 'PI' | 'E';
export interface MathConstantToken {
    type: 'mathConst';
    constName: MathConstantType;
    negativeSign?: boolean;
}

export interface NumberToken {
    type: 'number';
    value: number;
    negativeSign?: boolean;
    nDecimal: number;
}

export interface VarToken {
    type: 'variable';
    varName: string;
    negativeSign?: boolean;
}