const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let atomToStringDisposable = vscode.commands.registerCommand('ex-maps.atomToString', function () {
		let editor = vscode.window.activeTextEditor;

		if (editor) {
			editor.edit(editBuilder => {
				let selection = editor.selection;
				let replacedText = editor.document.getText(selection).replace(/[\w]*:/g, (match) => {
					return `"${match.replace(/(\W)*/g, "")}" =>`;
				});

				editBuilder.replace(selection, replacedText);
			});
		}
	});

	let stringToAtomDisposable = vscode.commands.registerCommand('ex-maps.stringToAtom', function () {
		let editor = vscode.window.activeTextEditor;

		if (editor) {
			editor.edit(editBuilder => {
				let selection = editor.selection;
				let replacedText = editor.document.getText(selection).replace(/"[\w]*"( )?=>/g, (match) => {
					return `${match.replace(/(\W)*/g, "")}:`;
				});

				editBuilder.replace(selection, replacedText);
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
