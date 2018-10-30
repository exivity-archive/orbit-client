const fs = require('fs')
const path = require('path')
const babel = require('@babel/core')

fs.readFile('../occonfig.json', 'utf8', (err, data) => {
  if (err) throw err
  const relativeSchemaPathConfig = JSON.parse(data).schema
  const relativeSchemaPath = path.join('..', ...relativeSchemaPathConfig.split('/'))

  fs.readFile(relativeSchemaPath, 'utf8', (err, data) => {
    if (err) throw err
    babel.transformFile(relativeSchemaPath, {
      presets: [ '@babel/preset-env']
    }, (err, result) => {
      if (err) throw err
      fs.writeFile('./tempSchema.js', result.code, (err) => {
        if (err) throw err
        console.log('Created temporary schema file...')
        const schema = require('./tempSchema')
        const models = Object.keys(schema.default.models)

        models.forEach((model) => {
          createRecordComponent(model)
          createRecordsComponent(model)
        })

        fs.unlink('./tempSchema.js', (err) => {
          if (err) throw err
          console.log('Deleted temporary schema file...')
        })
      })
    })
  })
})

const capitalize = ([first, ...rest]) => first.toUpperCase() + rest.join('')

const createRecordComponent = (model) => {
  fs.readFile('./templates/entity.js', 'utf8', (err, result) => {
    if (err) throw err
    const capitalizedModel = capitalize(model)
    const component = result.replace(/_Entity/g, capitalizedModel)
    const finished = component.replace(/_entity/g, model)

    const savePath = '../entity/' + capitalizedModel + '.js'
    fs.writeFile(savePath, finished, (err) => {
      if (err) throw err
      console.log('Created: ', savePath)
    })
  })
}

const createRecordsComponent = (model) => {
  fs.readFile('./templates/entities.js', 'utf8', (err, result) => {
    if (err) throw err
    const capitalizedModel = capitalize(model) + 's'
    const Entities = result.replace(/_Entities/g, capitalizedModel)
    const entity = Entities.replace(/_entity/g, model)
    const entities = entity.replace(/_entities/g, model + 's')

    const savePath = '../entity/' + capitalizedModel + '.js'
    fs.writeFile(savePath, entities, (err) => {
      if (err) throw err
      console.log('Created: ', savePath)
    })
  })
}

