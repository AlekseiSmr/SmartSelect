'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Parser } from './parsing/input-parser';
import { SmartSelectController } from './controller/smart-select-controller';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    let parser = new Parser();
    let controller = new SmartSelectController(parser);

    context.subscriptions.push(controller);
    context.subscriptions.push(parser);
}

// this method is called when your extension is deactivated
export function deactivate() {
}