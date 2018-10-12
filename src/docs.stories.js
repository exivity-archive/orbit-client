import React from 'react'
import { storiesOf } from '@storybook/react'

import { Markdown, Code, CodeBlock } from '@exivity/ui'

import readme from '../README.md'

const maxWidth = story => <div style={{
  maxWidth: '50rem'
}}>
  {story()}
</div>

storiesOf('Docs', module)
  .addDecorator(maxWidth)
  .add('Introduction', () => <Markdown>{readme}</Markdown>)

  .add('Installation', () => <div>
    <h1>Installation</h1>
    <p>With <Code>yarn</Code>:</p>
    <CodeBlock>
      {`yarn add @exivity/proton`}
    </CodeBlock>
    <p>With <Code>npm</Code>:</p>
    <CodeBlock>
      {`npm i @exivity/proton`}
    </CodeBlock>
  </div>)

  .add('Usage', () => <div>
    <h1>Usage</h1>
  </div>)

  .add('Development', () => <div>
    <h1>Development</h1>
  </div>)
