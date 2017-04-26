"use strict";

import * as cp from "child_process";
import * as vscode from "vscode";

export default class PuppetParserProvider {

    private diagnosticCollection: vscode.DiagnosticCollection;
    private regex: RegExp = new RegExp("(\\[\\d{1,};\\d{1,}m)(Error|Warning):\\s(.*)at(.*):(\\d{1,})");

    public activate(subscriptions: vscode.Disposable[]) {

        this.diagnosticCollection = vscode.languages.createDiagnosticCollection("PuppetParser");

        vscode.workspace.onDidOpenTextDocument(this.doPuppetParser, this, subscriptions);

        vscode.workspace.onDidCloseTextDocument((textDocument) => {
            this.diagnosticCollection.delete(textDocument.uri);
        }, null, subscriptions);

        vscode.workspace.onDidSaveTextDocument(this.doPuppetParser, this);
        vscode.workspace.textDocuments.forEach(this.doPuppetParser, this);
    }

    public dispose(): void {
        this.diagnosticCollection.clear();
        this.diagnosticCollection.dispose();
    }

    private doPuppetParser(textDocument: vscode.TextDocument) {

        if (textDocument.languageId !== "puppet") {
            return;
        }

        let decoded: string = "";
        let diagnostics: vscode.Diagnostic[] = [];
        let options: cp.SpawnOptions = vscode.workspace.rootPath ? { cwd: vscode.workspace.rootPath, shell: true } : undefined;

        let command = "";
        let commandOptions = ["parser", "validate", "\"" + textDocument.fileName + "\""];

        if (process.platform === "win32") {
            command = "cmd.exe";
            commandOptions = ["/c", "puppet"].concat(commandOptions);
        } else {
            command = "puppet";
        }
        let childProcess: cp.ChildProcess = cp.spawn(command, commandOptions, options);

        if (childProcess.pid) {
            childProcess.stderr.on("data", (data: Buffer) => {
                decoded += data;
            });

            // puppet Parser Validate uses Standard Error
            childProcess.stderr.on("end", () => {

                decoded.split("\n").forEach(item => {
                    if (item) {
                        let matches: RegExpExecArray = this.regex.exec(item);
                        let isWarning = matches[2].toLowerCase() === "warning";
                        let severity = isWarning ? vscode.DiagnosticSeverity.Warning : vscode.DiagnosticSeverity.Error;
                        let message = "puppet parser validate: " + matches[3];
                        let range = new vscode.Range(Number(matches[5]) - 1, 0, Number(matches[5]), 300);
                        let diagnostic = new vscode.Diagnostic(range, message, severity);
                        diagnostics.push(diagnostic);
                    }
                });

                this.diagnosticCollection.set(textDocument.uri, diagnostics);
            });
        }
    }
}