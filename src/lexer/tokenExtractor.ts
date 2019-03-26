import {
    Token, OperatorToken, ParenthesisToken,  MathFuncToken, MathConstantToken,
    NumberToken, VarToken, OperatorType, MathFuncType, MathConstantType, 
    ParenthesisShape
} from './tokenTypes';

export interface Extractor<T extends Token = Token> {
    regex: RegExp;
    extract: (matches: string[]) => T;
}

interface TokenMap<T> {
    str: string;
    tokenType: T;
}

const operatorTokenMap: TokenMap<OperatorType>[] = [
    { str: '+', tokenType: 'add' },
    { str: '-', tokenType: 'subtract' },
    { str: '*', tokenType: 'multiply' },
    { str: '/', tokenType: 'divide' },
    { str: '^', tokenType: 'exponent' },
    { str: '!', tokenType: 'factorial' },
    { str: '%', tokenType: 'percentage' }
];

export const operatorExtractor: Extractor<OperatorToken> = {
    regex: /^(\+|\-|\*|\/|\^|\!|\%)/,
    extract: matches => {
        const tokenMap = operatorTokenMap.find(t => t.str === matches[0]);
        if (!tokenMap) {
            throw new Error(`Cannot extract operator: ${matches[0]}`);
        }
        return { type: 'operator', operator: tokenMap.tokenType };
    }
};

export const parenthesesExtractor: Extractor<ParenthesisToken> = {
    regex: /^(\(|\)|\[|\]|\{|\})/,
    extract: matches => {
        return { type: 'parenthesis', shape: matches[0] as ParenthesisShape }
    }
};

const mathFuncTokenMap: TokenMap<MathFuncType>[] = [
    { str: 'sqrt', tokenType: 'sqrt' },
    { str: 'sin', tokenType: 'sin' },
    { str: 'cos', tokenType: 'cos' },
    { str: 'tan', tokenType: 'tan' },
    { str: 'csc', tokenType: 'csc' },
    { str: 'sec', tokenType: 'sec' },
    { str: 'cot', tokenType: 'cot' },
    { str: 'frac', tokenType: 'frac' },
    { str: 'abs', tokenType: 'abs' },
    { str: 'log', tokenType: 'log' },
    { str: 'sum', tokenType: 'sum' },
    { str: 'prod', tokenType: 'prod' }
];

export const mathFuncExtractor: Extractor<MathFuncToken> = {
    // tslint:disable-next-line:max-line-length
    regex: /^(sqrt|frac|prod|sin|sum|cos|tan|cot|csc|sec|log|abs)/,
    extract: matches => {
        const tokenMap = mathFuncTokenMap.find(t => t.str === matches[0]);
        if (!tokenMap) {
            throw new Error(`Cannot extract math func: ${matches[0]}`);
        }
        return { type: 'mathFunc', funcName: tokenMap.tokenType };
    }
};

const mathConstTokenMap: TokenMap<MathConstantType>[] = [
    { str: 'PI', tokenType: 'PI' },
    { str: 'E', tokenType: 'E' }
];

export const mathConstExtractor: Extractor<MathConstantToken> = {
    regex: /^(PI|E)/,
    extract: matches => {
        const tokenMap = mathConstTokenMap.find(t => t.str === matches[0]);
        if (!tokenMap) {
            throw new Error(`Cannot extract operator: ${matches[0]}`);
        }
        return { type: 'mathConst', constName: tokenMap.tokenType };
    }
};

export const numberExtractor: Extractor<NumberToken> = {
    regex: /^\d[0-9 ]*(\.\d+)?/,
    extract: matches => {
        return {
            type: 'number',
            value: +matches[0].replace(/ /g, ''),
            nDecimal: matches[1] ? matches[1].length - 1 : 0
        };
    }
};

// e.g: .23 => 0.23
export const implicitDecimalNumExtractor: Extractor<NumberToken> = {
    regex: /^(\.\d+)/,
    extract: matches => {
        return {
            type: 'number',
            value: +matches[0],
            nDecimal: matches.length - 1
        };
    }
};

export const varExtractor: Extractor<VarToken> = {
    regex: /^\$?[A-Za-z]/,
    extract: matches => {
        return {
            type: 'variable',
            varName: matches[0]
        };
    }
};