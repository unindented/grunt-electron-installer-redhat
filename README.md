# grunt-electron-redhat-installer [![Version](https://img.shields.io/npm/v/grunt-electron-redhat-installer.svg)](https://www.npmjs.com/package/grunt-electron-redhat-installer) [![Build Status](https://img.shields.io/travis/unindented/grunt-electron-redhat-installer.svg)](http://travis-ci.org/unindented/grunt-electron-redhat-installer) [![Dependency Status](https://img.shields.io/gemnasium/unindented/grunt-electron-redhat-installer.svg)](https://gemnasium.com/unindented/grunt-electron-redhat-installer)

> Create a Red Hat package for your Electron app.


## Requirements

This tool requires `rpmbuild` to build the `.rpm` package:

```
$ sudo dnf install rpm-build
```


## Getting Started

This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-electron-redhat-installer --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-electron-redhat-installer');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4), but in case you can't please use [v0.3.2](https://github.com/gruntjs/grunt-contrib-copy/tree/grunt-0.3-stable).*


## Installer task

_Run this task with the `grunt electron-redhat-installer` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Usage

To create a `.rpm` package from your app:

```js
'electron-redhat-installer': {
  app: {
    options: {
      arch: 'x86_64'
    },
    src: 'path/to/app/',
    dest: 'path/to/out/app-0.0.1-1.i386.rpm'
  }
}
```

To create different packages for different architectures:

```js
'electron-redhat-installer': {
  options: {
    productName: 'Foo',
    productDescription: 'Bar baz qux.',
    categories: [
      'Utility'
    ]
  },

  linux32: {
    options: {
      arch: 'x86'
    },
    src: 'path/to/linux32/',
    dest: 'path/to/out/app-0.0.1-1.x86.rpm'
  },

  linux64: {
    options: {
      arch: 'x86_64'
    },
    src: 'path/to/linux64/',
    dest: 'path/to/out/app-0.0.1-1.x86_64.rpm'
  }
}
```

### Options

#### options.name
Type: `String`
Default: `package.name`

Name of the package (e.g. `atom`), used in the [`Name` field of the `spec` file](https://fedoraproject.org/wiki/How_to_create_an_RPM_package#Creating_a_SPEC_file).

Check out the [Fedora Naming Guidelines](https://fedoraproject.org/wiki/Packaging:NamingGuidelines#Common_Character_Set_for_Package_Naming).

#### options.productName
Type: `String`
Default: `package.productName || package.name`

Name of the application (e.g. `Atom`), used in the [`Name` field of the `desktop` specification](http://standards.freedesktop.org/desktop-entry-spec/desktop-entry-spec-latest.html).

#### options.genericName
Type: `String`
Default: `package.genericName || package.productName || package.name`

Generic name of the application (e.g. `Text Editor`), used in the [`GenericName` field of the `desktop` specification](http://standards.freedesktop.org/desktop-entry-spec/desktop-entry-spec-latest.html).

#### options.description
Type: `String`
Default: `package.description`

Short description of the application, used in the [`Summary` field of the `spec` file](https://fedoraproject.org/wiki/How_to_create_an_RPM_package#Creating_a_SPEC_file).

#### options.productDescription
Type: `String`
Default: `package.productDescription || package.description`

Long description of the application, used in the [`%description` tag of the `spec` file](https://fedoraproject.org/wiki/How_to_create_an_RPM_package#Creating_a_SPEC_file).

#### options.version
Type: `String`
Default: `package.version`

Version number of the package, used in the [`Version` field of the `spec` file](https://fedoraproject.org/wiki/How_to_create_an_RPM_package#Creating_a_SPEC_file).

#### options.revision
Type: `String`
Default: `package.revision`

Revision number of the package, used in the [`Release` field of the `spec` file](https://fedoraproject.org/wiki/How_to_create_an_RPM_package#Creating_a_SPEC_file).

#### options.license
Type: `String`
Default: `package.license`

License of the package, used in the [`License` field of the `spec` file](https://fedoraproject.org/wiki/How_to_create_an_RPM_package#Creating_a_SPEC_file).

#### options.arch
Type: `String`
Default: `undefined`

Machine architecture the package is targeted to, used to set the `%_target` macro.

#### options.requires
Type: `Array[String]`
Default: `['lsb']`

Packages that are required when the program starts, used in the [`Requires` field of the `spec` file](https://fedoraproject.org/wiki/How_to_create_an_RPM_package#Creating_a_SPEC_file).

#### options.homepage
Type: `String`
Default: `package.homepage || package.author.url`

URL of the homepage for the package, used in the [`Homepage` field of the `control` specification](https://fedoraproject.org/wiki/How_to_create_an_RPM_package#Creating_a_SPEC_file).

#### options.bin
Type: `String`
Default: `package.name`

Relative path to the executable that will act as binary for the application, used in the [`Exec` field of the `desktop` specification](http://standards.freedesktop.org/desktop-entry-spec/desktop-entry-spec-latest.html).

The generated package will contain a symlink `/usr/bin/<%= options.name %>` pointing to the path provided here.

For example, providing this configuration:

```js
{
  options: {
    name: 'foo',
    bin: 'resources/cli/launcher.sh'
  },
  src: '...',
  dest: '...'
}
```

Will create a package with the following symlink:

```
usr/bin/foo@ -> ../share/foo/resources/cli/launcher/sh
```

And a desktop specification with the following `Exec` key:

```
Exec=foo %U
```

#### options.icon
Type: `String`
Default: `undefined`

Path to the image that will act as icon for the application, used in the [`Icon` field of the `desktop` specification](http://standards.freedesktop.org/desktop-entry-spec/desktop-entry-spec-latest.html).

#### options.categories
Type: `Array[String]`
Default: `[]`

Categories in which the application should be shown in a menu, used in the [`Categories` field of the `desktop` specification](http://standards.freedesktop.org/desktop-entry-spec/desktop-entry-spec-latest.html).

For possible values check out the [Desktop Menu Specification](http://standards.freedesktop.org/menu-spec/latest/apa.html).


## Meta

* Code: `git clone git://github.com/unindented/grunt-electron-redhat-installer.git`
* Home: <https://github.com/unindented/grunt-electron-redhat-installer/>


## Contributors

* Daniel Perez Alvarez ([unindented@gmail.com](mailto:unindented@gmail.com))


## License

Copyright (c) 2015 Daniel Perez Alvarez ([unindented.org](https://unindented.org/)). This is free software, and may be redistributed under the terms specified in the LICENSE file.
