import React from 'react'
import StoryRouter from 'storybook-react-router'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, number } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import Receive from 'components/Receive'
import initStates from 'states/initStates'
import addresses from './data/addresses'

const states = {
  'Has no addresses': {
    ...initStates,
    wallet: {
      ...initStates.wallet,
      addresses: addresses['Empty List'],
    },
    dispatch: (dispatchAction: any) => action(dispatchAction),
  },
  'Has addresses': {
    ...initStates,
    wallet: {
      ...initStates.wallet,
      addresses: addresses['Content List'],
    },
    dispatch: (dispatchAction: any) => action(dispatchAction),
  },
}

const stories = storiesOf('Receive', module).addDecorator(StoryRouter())

Object.entries(states).forEach(([title, props]) => {
  console.info(props)
  stories.add(title, () => <Receive />)
})

stories.addDecorator(withKnobs).add('With knobs', () => {
  const props = {
    ...initStates,
    wallet: {
      ...initStates.wallet,
      addresses: addresses['Content List'].slice(1).map(addr => ({
        address: text(`Address`, addr.address),
        identifier: text(`Identifier`, addr.identifier),
        description: text(`Description`, addr.description),
        type: number(`Type`, addr.type) as 0 | 1,
        txCount: number(`Tx count`, 0),
        balance: text(`Balance`, addr.balance),
        index: number(`Index`, addr.index),
      })),
    },
  }
  console.info(props)
  return <Receive />
})
