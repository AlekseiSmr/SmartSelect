import { window } from 'vscode';


/**
 * Shows an input box using window.showInputBox().
 */
export async function showInputBox() {
    const result = await window.showInputBox({
        value: '',
        placeHolder: 'For example: x*2',
        validateInput: text => {
            // TODO: validate if possible in better way
            var re = new RegExp("(x){1}");
            const isValid = re.test(text);
            return isValid ? null : 'Specify x and operators!';
        }
    });
    return result || '';
}