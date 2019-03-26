import { Token } from './tokenTypes';
import * as extractor from './tokenExtractor';

const extractorList: extractor.Extractor[] = [
    extractor.mathFuncExtractor,
    extractor.operatorExtractor,
    extractor.parenthesesExtractor,
    extractor.mathConstExtractor,
    extractor.numberExtractor,
    extractor.implicitDecimalNumExtractor,
    extractor.varExtractor
];

// simply use Regex to transform the string into array of tokens
export const lexer = (expr: string): Token[] => {
    let remainExpr = expr;

    const _skipSpace = () => {
        if (remainExpr.startsWith(' ')) {
            remainExpr = remainExpr.replace(/^ */, '');
        }
    }

    const _extractToken = (config: extractor.Extractor): Token | undefined => {
        const { regex, extract } = config;
        const matches = remainExpr.match(regex);
        if (!matches) {
            return undefined;
        }

        const token = extract(matches);
        remainExpr = remainExpr.slice(matches[0].length);
        return token;
    }

    const _readNextToken = () => {
        _skipSpace();

        if (!remainExpr) {
            return undefined;
        }

        for (const extractConfig of extractorList) {
            const token = _extractToken(extractConfig);
            if (!token) {
                continue;
            }
            return token;
        }

        throw Error(`Cannot read next token of ${remainExpr}`);
    }

    const tokens: Token[] = [];
    while (remainExpr.length > 0) {
        const nextToken = _readNextToken();
        if (nextToken) {
            tokens.push(nextToken);
        } else {
            break;
        }
    }

    return tokens;
}