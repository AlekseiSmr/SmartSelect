import { window } from 'vscode';


/**
 * Shows an input box using window.showInputBox().
 */
export async function showInputBox() {
    const result = await window.showInputBox({
        value: '',
        valueSelection: [2, 4],
        placeHolder: 'For example: x*2',
        validateInput: text => {
            return null;
            // var re = new RegExp("^[0-1x*+-\\]*$");
            // return re.test(text) ? null : 'Specify x and operators!';
        }
    });
    return result || '';
}