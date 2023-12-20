# UiPath Code Support

**UiPath Code Support** is a Visual Studio Code extension that simplifies the development of UiPath Coded Workflows by generating a dummy C# project with all necessary dependencies. This integration enables advanced editing features such as IntelliSense, code highlighting, and navigation capabilities, making the development process within VS Code more efficient and user-friendly.

## Features

- **Intelligent Editing**: Leverages the powerful editing features of VS Code, such as IntelliSense, for auto-completion, parameter info, quick info, and member lists, while you type.
- **Syntax Highlighting**: Improve code readability with syntax highlighting tailored for UiPath Coded Workflows.
- **Navigation**: Enables 'Go to Definition', 'Find All References', and 'Peek Definition' features for easy navigation and understanding of the code structure within your workflows.
- **C# Project Simulation**: Generates a dummy `.csproj` file with references to the necessary dependencies so that VS Code can provide language features typically available for C# projects.
- **Dependency Management**: Reflects UiPath project dependencies within the C# project file to streamline the development cycle.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Publisher

The extension is published form **Automation CodeX** on the Visual Studio Code Marketplace.

## Source Code Repository

The source code for this extension is available on GitHub:
[https://github.com/automationcodex/vscode-uipath-code-support](https://github.com/automationcodex/vscode-uipath-code-support)

Feel free to fork, submit issues, and send pull requests to help improve the project!

## Installation

Follow these steps to install the **UiPath Code Support** extension:

1. Open Visual Studio Code and go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window.
2. Search for "UiPath Code Support" and select the extension.
3. Press the "Install" button to install the extension.

**Note**: The **UiPath Code Support** extension requires the C# extension (`ms-dotnettools.csharp`) for full functionality. If you do not already have the C# extension installed, VS Code will prompt you to install it when you install **UiPath Code Support**.

## Usage

### Initialize the Project Support

To generate dummy C# project files with all the necessary dependencies:

1. Open your UiPath project or workflow within VS Code.
2. Open the Command Palette (`Ctrl+Shift+P` on Windows/Linux, `Cmd+Shift+P` on macOS).
3. Type and select "Initialize UiPath Code Support for this project" to create the `.csproj` and `Directory.Build.props` files.

### Updating the Project Support

If you need to update the project support to reflect changes in your UiPath project's dependencies:

1. Open the Command Palette.
2. Type and select "Update UiPath Code Support for this project."

This command updates the project files to synchronize with any changes made to the project dependencies.

### Removing the Project Support

To remove the generated C# project file and clean up the workspace:

1. Open the Command Palette.
2. Type and select "Remove UiPath Code Support from this project."

The project files will be removed from the workspace, and UiPath Code Support will be deactivated.

By using these commands, you can manage the C# project file that enables enhanced editing features in VS Code for your UiPath Coded Workflows.

## Requirements

- Visual Studio Code version 1.84.0 or higher.
- C# extension (`ms-dotnettools.csharp`) installed and enabled.

## Extension Commands

**UiPath Code Support** provides the following command:

- **Initialize UiPath Code Support for this project**: Initializes UiPath code support by creating a custom `.csproj` file.
- **Update UiPath Code Support for this project**: Updates UiPath code support by updating the custom `.csproj` file.
- **Remove UiPath Code Support from this project**: Removes UiPath code support by removing the custom `.csproj` file.

## Release Notes

### 1.0.0

- Initial release of **UiPath Code Support**.
- IntelliSense support for UiPath Coded Workflows.
- Command for generating a `.csproj` file.

### 1.0.1

- Bug fixes
- Support for importing assemblies from UiPath install folder

### 1.0.2

- Support for all assemblies in UiPath install folder

### 1.0.3

- Moved output folders to AppData to prevent errors in UiPath

### 1.1.0

- Added update command
- Added remove command
- More accurate assemblies to match UiPath
- Removed requirement to have AllDependencies.json present
- Code refactor

### 1.1.1

- `Directory.Build.props` file now created alongside `.csproj`
- Warnings are suppressed in build logs.

---

We hope you enjoy using **UiPath Code Support** to improve your UiPath development process within Visual Studio Code!
