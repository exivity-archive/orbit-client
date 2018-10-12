import React from 'react'

import { addDecorator, configure } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withOptions } from '@storybook/addon-options'

import { WithStyle } from '@exivity/ui'

const options = {
  name: '@exivity/proton',
  url: 'https://github.com/exivity/proton',
  showAddonPanel: true,
  addonPanelInRight: true,
  hierarchySeparator: /\/|\./,
  hierarchyRootSeparator: /\|/,
}

const withStyle = story => <div style={{
  padding: "20px"
}}>
  <style>{`h1:first-child { margin-top: 0; }`}</style>
  <WithStyle>
    {story()}
  </WithStyle>
</div>

// add decorators
addDecorator(withInfo)
addDecorator(withOptions(options))
addDecorator(withStyle)

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.stories.js$/)

function loadStories () {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
