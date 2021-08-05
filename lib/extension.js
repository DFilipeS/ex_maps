const vscode = require('vscode');
const converter = require('./converter');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let atomToStringDisposable = vscode.commands.registerCommand('ex-maps.atomToString', function () {
		let editor = vscode.window.activeTextEditor;

		if (editor) {
			editor.edit(editBuilder => {
				let selection = editor.selection;
				let convertedContent = converter.atomToString(editor.document.getText(selection));

				editBuilder.replace(selection, convertedContent);
			});
		}
	});

	let stringToAtomDisposable = vscode.commands.registerCommand('ex-maps.stringToAtom', function () {
		let editor = vscode.window.activeTextEditor;

		if (editor) {
			editor.edit(editBuilder => {
				let selection = editor.selection;
				let convertedContent = converter.stringToAtom(editor.document.getText(selection));

				editBuilder.replace(selection, convertedContent);
			});
		}
	});

	context.subscriptions.push(atomToStringDisposable);
	context.subscriptions.push(stringToAtomDisposable);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
