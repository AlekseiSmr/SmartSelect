import { Parser } from "../parsing/input-parser";
import { Disposable } from "vscode";
import { showInputBox } from "../input/formula-input";
import * as vscode from 'vscode';

export class SmartSelectController {
    _parser: Parser;
    _disposable: Disposable;

    constructor(parser: Parser) {
        this._parser = parser;

        let subscriptions: Array<any> = [];
        vscode.commands.registerCommand('extension.enterFormula', async () => {
            let input = '';

            await showInputBox()
                .then(userInput => {
                    input = userInput;
                })
                .catch(console.error);

            const editor = vscode.window.activeTextEditor;
            if (editor && input) {
                const lines = this._parser.calculateLineNumbers(input, editor.document.lineCount);
                if (lines.length <= 0) {
                    vscode.window.showInformationMessage('Formula cannot be applied.');
                    this._disposable = Disposable.from(...subscriptions);
                    return;
                }

                let sels = new Array<vscode.Selection>();

                lines.forEach(lineNumber => {
                    let pos = new vscode.Position(lineNumber, editor.document.lineAt(lineNumber).range.end.character);
                    sels.push(new vscode.Selection(pos, pos));
                });

                editor.selections = sels;
            }
        })

        this._disposable = Disposable.from(...subscriptions);
    }

    dispose() {
        this._disposable.dispose();
    }
}