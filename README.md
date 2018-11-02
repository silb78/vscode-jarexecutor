# JAR Executor

Simple extension to execute a jar file from Visual Studio Code.

## Settings

Mandatory settings:
* Path to executable JAR file

Optional settings:
* Arguments

It's possible to you use some placeholders. The placeholders will be automatically replaced by the extension.

| Placeholder   | Value                              |
| ------------- | ---------------------------------- |
| $currentFile  | current opened file in text editor |
| $extPath      | path of **JAR Executor** extension |

![Example Settings](https://github.com/silb78/vscode-jarexecutor/blob/master/exampleSettings.jpg)

## How to build the extension

1. clone git repo

2. install Visual Studio Code Extension Tool
```
npm install -g vsce
```

3. install extension package with all dependencies
```
npm install
```

4. packaging the **JAR Executor** extension
```
vsce package
```

If you want to include an executable jar file to the extension, just copy the jar file to the folder before packaging the extension.
