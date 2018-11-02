'use strict';
import * as vscode from 'vscode';
import {window} from 'vscode';
import ExtensionUtil from './extensionUtil';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.runJarExecutor', () => {
        console.log('running jar executor');

        var editor = window.activeTextEditor;
        if (editor) {
            let configPath = vscode.workspace.getConfiguration('jarexecutor').get('path');
            let configArgs = vscode.workspace.getConfiguration('jarexecutor').get('arguments');

            if(configPath) {
                var exec = require('child_process').exec;
                var executeCommand = 'java -jar';
                executeCommand = executeCommand + ' ' + configPath;
                if(configArgs) {
                    executeCommand = ExtensionUtil.parseCommand(editor.document.uri.fsPath, executeCommand, configArgs);
                }
                console.log('execute command: ' + executeCommand)
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

