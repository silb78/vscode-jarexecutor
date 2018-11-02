'use strict';
import * as vscode from 'vscode';

export default class ExtensionUtil {

    static parseCommand(filePath: string, executeCommand: string, args) {
        executeCommand = executeCommand + ' ' + args;
        executeCommand = executeCommand.replace("$currentFile", filePath);
        
        let jarExecutorExtension =vscode.extensions.getExtension('silvan-brenner.jarexecutor')
        if(jarExecutorExtension) {
            executeCommand = executeCommand.replace("$extPath", jarExecutorExtension.extensionPath);
        }
        return executeCommand;
    }

}