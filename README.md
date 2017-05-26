[![Build Status](https://travis-ci.org/bitzl/vscode-puppet.svg?branch=master)](https://travis-ci.org/bitzl/vscode-puppet)

# Puppet Extension for Visual Studio Code

The Puppet Extension for Visual Studio Code offers rich language support for Puppet DSL, snippets, and linter for [Visual Studio Code](http://code.visualstudio.com).

## Requirements
This extension relies on [puppet-lint](http://puppet-lint.com/) to check your Puppet code. Use Ruby `gem` to install:

```
sudo gem install puppet-lint
```

## Features

### Syntax Keywords
- Puppet DSL Syntax

### Snippets
- augeas
- case
- cron
- define
- exec
- fail
- file
- file_line
- group
- if
- elsif
- else
- mount
- node
- package
- service
- unless
- user
- yumrepo
- versioncmp
- zfs
- zpool

### Configure Checks

Checks are performed via `puppet-lint`. To enable or disable certain checks different from default create a `~/.puppet-lint.rc` file in project root. Add switches, one per line. For full list of switches run `puppet-lint --help`.

Example:
```
--no-80chars-check
--no-case_without_default-check
```

## Contributions

Contributions are welcomed. Feel free to add issues and pull requests :-)

Thanks to all contributors:

- [blindly](https://github.com/blindly)
- [jgreat](https://github.com/jgreat)
- [dhollinger](https://github.com/dhollinger)
- [mikemimik](https://github.com/mikemimik)
- [pjmagee](https://github.com/pjmagee)

*This extension was created as a fork from [blindly/vscode-puppet](https://github.com/blindly/vscode-puppet) to integrate bugfixes. A future merge with the original project is still possible.*

## Changelog

- 0.4.5 - Add proper parsing for EPP files
- 0.4.4 - Add Puppetfile to supported file types
- 0.4.3 - Add Puppet Parser Validate support.
- 0.4.2 - Add documentation.
- 0.4.1 - Add metadata for extension store.
- 0.4.0 - Fork as bitzl/vscode-puppet for further development:
  - Fixes linting on Windows
  - Fixes endless "reload to activate this extension" prompt.
  - Minor upgrades to newer VS Code API
- 0.3.1 - Removed old Puppet file detection documentation
- 0.3.0 - Merged with [Puppet Linter Extension](https://github.com/jgreat/vscode-puppetlinter)
- 0.2.0 - Added MIT License

