import { Token, OperatorToken } from './tokenTypes';

const isAddSub = (token: Token | undefined): token is OperatorToken => {
    if (!token || token.type !== 'operator') {
        return false;
    }
    return token.operator === 'add' || token.operator === 'subtract';
};

/**
 * Remove redudant continuous add/subtract token
 * e.g: 
 * 12++x => 12+x
 * 12--x => 12+x (double neg is pos)
 * --12 => +12
 */
export const shortenAddSubStreak = (tokens: Token[]): Token[] => {
    const output: Token[] = [];
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        const nextToken: Token | undefined = tokens[i + 1];
        if (isAddSub(token) && isAddSub(nextToken)) {
            if (token.operator !== nextToken.operator) {
                nextToken.operator = 'subtract';
            } else {
                nextToken.operator = 'add';
            }
            continue;
        }
        output.push(token);
    }
    return output;
};

// /**
//  * The expression model being used do not have subtract operation (only add)
//  * Instead, negative is an attribute of the token.
//  * Therefore 12 - 7 is not consider as subtract(12, 7), but add(12, -7)
//  * This function will go though the token list and decide
//  */
// export const addNegativeSign = (tokens: Token[]): Token[] => {
//     // return true if the add/sub sign after the token is considerd 
//     // as the sign of the next token, instead of add/sub operator
//     // e.g: (+5) => plus sign is the sign of '5' token, not add operation token
//     const isNoAddSubOPAfterTokens = (token: Token) => {
//         // add/sub tokens after an operator 
//         if (token.type === 'operator') {

//         }
//     }
//     const noAddSubOPAfterTokens: Token['type'][] = [
//         'openParenthesis', 'comma', 'colon', 'operator', 'comparison'
//     ];

//     const copy = [...tokens];
//     const output: Token[] = [];
//     for (let i = 0; i < copy.length; i++) {
//         const token = copy[i];
//         const prevToken = copy[i - 1] as Token | undefined;
//         const nextToken = copy[i + 1] as Token | undefined;
//         if (
//             isAddSubToken(token) &&
//             (!prevToken || noAddSubOPAfterTokens.includes(prevToken.type)) &&
//             !!nextToken
//         ) {
//             if (
//                 // these tokens are those that won't have negative sign in it
//                 // therefore, if these token comes after an add/sub token, the add/sub token
//                 // is considered as operator, not sign modifier
//                 nextToken.type !== 'closeParenthesis' &&
//                 nextToken.type !== 'operator' &&
//                 nextToken.type !== 'comma' &&
//                 nextToken.type !== 'colon' &&
//                 nextToken.type !== 'comparison' &&
//                 nextToken.type !== 'string'
//             ) {
//                 copy[i + 1] = { ...nextToken, negativeSign: token.operator === 'subtract' };
//                 continue;
//             }
//         }

//         output.push(token);
//     }
//     return output;
// };