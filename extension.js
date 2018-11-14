const vscode = require('vscode');

const { initializeSnippetsClient } = require('./snippetsClient');
const { snippetsServiceBaseUrl } = require('./config');

function activate(context) {

    let disposable = vscode.commands.registerCommand('extension.codypasteSelected', async () => {

        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        let selection = editor.selection;
        let text = editor.document.getText(selection);
        if(!text) {
            vscode.window.showErrorMessage('codypaste: No text for snippet selected!');
        }

        const groupName = await vscode.window.showInputBox({
            placeHolder: "Insert group name"
        });
        
        const snippetsClient = initializeSnippetsClient(snippetsServiceBaseUrl)

        const { _id: groupId } = await snippetsClient.postGroup({
            title: groupName,
            expirationDatetime: null
        })

        const snippetName = vscode.window.activeTextEditor.document.fileName.replace(/^.*[\\\/]/, '');

        const snippetCreationPayload  = groupID => ({
            snippet: text,
            group: groupID,
            author: 'Default author',
            snippetName: snippetName,
            syntax: vscode.window.activeTextEditor.document.languageId,
        });
          
        await snippetsClient.postSnippet(snippetCreationPayload(groupId));
          
        vscode.window.showInformationMessage(`https://codypaste.io/view/${groupId}`);
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;