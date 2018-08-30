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
                let sels = new Array<vscode.Selection>();
                let pos = new vscode.Position(0, editor.document.lineAt(0).range.end.character);
                sels.push(new vscode.Selection(pos, pos));
                pos = new vscode.Position(2, editor.document.lineAt(0).range.end.character);
                sels.push(new vscode.Selection(pos, pos));
                editor.selections = sels;
            }
        })

        this._disposable = Disposable.from(...subscriptions);
    }

    dispose() {
        this._disposable.dispose();
    }
}