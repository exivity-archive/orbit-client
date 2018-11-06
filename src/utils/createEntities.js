#!/usr/bin/env node

const fs = require('fs')
const babel = require('@babel/core')
const pluralize = require('pluralize')

const pathUtils = './node_modules/orbit-client/src/utils'

fs.readFile('./occonfig.json', 'utf8', (err, data) => {
  if (err) throw err
  const schemaPath = JSON.parse(data).schema
  const targetPath = JSON.parse(data).target + '/orbit-client'

  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath)
  }

  fs.readFile(schemaPath, 'utf8', (err, data) => {
    if (err) throw err
    babel.transformFile(schemaPath, {
      presets: [ '@babel/preset-env']
    }, (err, result) => {
      if (err) throw err
      fs.writeFile('./tempSchema.js', result.code, (err) => {
        if (err) throw err
        console.log('Created temporary schema file...')
        const schema = require('../../../../tempSchema')
        const models = Object.keys(schema.default.models)

        createComponentIndex(models, targetPath)

        fs.unlink('./tempSchema.js', (err) => {
          if (err) throw err
          console.log('Deleted temporary schema file...')
        })
      })
    })
  })
})

const capitalize = ([first, ...rest]) => first.toUpperCase() + rest.join('')

const createComponentIndex = (models, savePath) => {
  fs.readFile(pathUtils + '/indexTemplate.js', 'utf8', (err, result) => {
    if (err) throw err

    const index = models.reduce((code, model) => {
      const entity = capitalize(model)
      const entities = pluralize(capitalize(model))
      return code + `export const ${entity} = (props) => <Model type={'${model}'} {...props} />\n` +
        `export const ${entities} = (props) => <Models type={'${pluralize(model)}'} {...props} />\n`
    }, result)

    const path = savePath + '/index.js'
    fs.writeFile(path, index, (err) => {
      if (err) throw err
      console.log('Created: ', path)
    })
  })
}