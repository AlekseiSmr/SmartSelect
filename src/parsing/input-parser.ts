import * as math from 'mathjs'

export class Parser {
    /**
     * ParseFromFormula
     * formula: string :Array<int>    
    */
    public CalculateLineNumbers(formula: string, totalLines: number): Array<number> {
        let lineNumbers: Array<number> = [];
        const parser = math.parser();

        let counter = 0;
        let linePosition = 0;
        while (counter < totalLines) {
            parser.set('x', linePosition++);
            const result = parser.eval(formula);
            if (result < totalLines) {
                lineNumbers.push(result);
            }
            counter = result;
        }

        return lineNumbers;
    }

    public dispose() { }
}