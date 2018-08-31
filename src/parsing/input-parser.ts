import * as math from 'mathjs'

export class Parser {
    /**
     * ParseFromFormula
     * formula: string :Array<int>    
    */
    public calculateLineNumbers(formula: string, totalLines: number): Array<number> {
        let lineNumbers: Array<number> = [];
        const parser = math.parser();

        let counter = 0;
        let linePosition = 0;
        while (counter < totalLines) {
            let formulaResult: number;
            try {
                parser.set('x', linePosition++);
                formulaResult = parser.eval(formula);
            }
            catch {
                break;
            }

            if (formulaResult < 0) {
                break;
            }

            if (formulaResult >= 0 && formulaResult < totalLines) {
                lineNumbers.push(Math.round(formulaResult));
            }
            counter = formulaResult;
        }

        let unique = [...new Set(lineNumbers)];
        return unique;
    }

    public dispose() { }
}