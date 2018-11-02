'use strict';
import * as vscode from 'vscode';
import {window} from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.runJarExecutor', () => {
        console.log('running jar executor');

        var editor = window.activeTextEditor;
        if (editor) {
            let configPath = vscode.workspace.getConfiguration('jarexecutor').get('path');
            let configArg1 = vscode.workspace.getConfiguration('jarexecutor').get('arg1');
            let configArg2 = vscode.workspace.getConfiguration('jarexecutor').get('arg2');
            let configArg3 = vscode.workspace.getConfiguration('jarexecutor').get('arg3');

            if(configPath) {
                var exec = require('child_process').exec;
                var executeCommand = 'java -jar';
                executeCommand = executeCommand + ' ' + configPath;
                if(configArg1) {
                    executeCommand = parseArgument(editor, executeCommand, configArg1);  
                }
                if(configArg2) {
                    executeCommand = parseArgument(editor, executeCommand, configArg2);  
                }
                if(configArg3) {
                    executeCommand = parseArgument(editor, executeCommand, configArg3);  
                }
                exec(executeCommand, function (error, stdout, stderr) {
                    if(error !== null) {
                        console.log('exec error: ' + error);
                        console.log('stderr: ' + stderr);
                        console.log('stdout: ' + stdout);
                        vscode.window.showErrorMessage(error);
                        vscode.window.showErrorMessage(stderr);
                        vscode.window.showErrorMessage(stdout);
                    } else {
                        console.log('stdout: ' + stdout)
                        vscode.window.showInformationMessage(stdout);
                    }
                });
            } else {
                vscode.window.showErrorMessage('please configure the jar executor extension');
            }
        } else {
            vscode.window.showErrorMessage('please open a file');
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {
    // do nothing
}

function parseArgument(editor: vscode.TextEditor, executeCommand: string, arg) {
    executeCommand = executeCommand + ' ' + arg;
    executeCommand = executeCommand.replace("$currentFile", editor.document.uri.fsPath);

    return executeCommand;
}