# translation-extractor

Translation Extractor is an extension that extracts any translations from the code currently supports i18n simplae translations

## Usage

1. open the command Pallete: and search for `Translation Extractor` and Press Enter
2. choose the src file that the extension should extract translations from
3. the translation will be generated in a file called `translation.json` on the same folder

## Features

Extract Translation command let you choose your src folder then it creates a translations.json file contains all the translation keys found on the src folder.

## Extension Settings

This extension contributes the following settings:

- `translation-extractor.extract`: extract all the translations from the selected folder into translation.json

## Release Notes

### 0.0.1

Initial release of Translation Extraction

### 0.0.2

changed extraction command from `translation-extractor.search` to `translation-extractor.extract`

### 0.0.3

added extraction for all kinds of simple strings ', ", `

### 0.0.4

added the ability to choose the translation function name
