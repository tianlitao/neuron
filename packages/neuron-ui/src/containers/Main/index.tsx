import React, { useMemo } from 'react'
import { Route, useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useState as useGlobalState, useDispatch } from 'states/stateProvider'

import Overview from 'components/Overview'
import WalletWizard from 'components/WalletWizard'
import ImportKeystore from 'components/ImportKeystore'
import Send from 'components/Send'
import Receive from 'components/Receive'
import History from 'components/History'
import Transaction from 'components/Transaction'
import Settings from 'components/Settings'
import Addresses from 'components/Addresses'
import NetworkEditor from 'components/NetworkEditor'
import WalletEditor from 'components/WalletEditor'
import LaunchScreen from 'components/LaunchScreen'
import PasswordRequest from 'components/PasswordRequest'
import NervosDAO from 'components/NervosDAO'

import { Routes } from 'utils/const'

import { useSubscription, useSyncChainData, useOnCurrentWalletChange } from './hooks'

export const mainContents: CustomRouter.Route[] = [
  {
    name: `Launch`,
    path: Routes.Launch,
    exact: true,
    component: LaunchScreen,
  },
  {
    name: `General`,
    path: Routes.Overview,
    exact: true,
    component: Overview,
  },
  {
    name: `Send`,
    path: Routes.Send,
    params: `/:address?`,
    exact: false,
    component: Send,
  },
  {
    name: `Receive`,
    path: Routes.Receive,
    params: `/:address?`,
    exact: false,
    component: Receive,
  },
  {
    name: `History`,
    path: Routes.History,
    exact: false,
    component: History,
  },
  {
    name: `Transaction`,
    path: Routes.Transaction,
    params: `/:hash`,
    exact: false,
    component: Transaction,
  },
  {
    name: `Addresses`,
    path: Routes.Addresses,
    exact: false,
    component: Addresses,
  },
  {
    name: `Settings`,
    path: Routes.Settings,
    exact: false,
    component: Settings,
  },
  {
    name: `NetworkEditor`,
    path: Routes.NetworkEditor,
    params: '/:id',
    exact: false,
    component: NetworkEditor,
  },
  {
    name: `WalletEditor`,
    path: Routes.WalletEditor,
    params: '/:id',
    exact: false,
    component: WalletEditor,
  },
  {
    name: `WalletWizard`,
    path: Routes.WalletWizard,
    exact: false,
    component: WalletWizard,
  },
  {
    name: `ImportKeystore`,
    path: Routes.ImportKeystore,
    exact: false,
    component: ImportKeystore,
  },
  {
    name: `PasswordRequest`,
    path: '/',
    exact: false,
    component: PasswordRequest,
  },
  {
    name: `NervosDAO`,
    path: Routes.NervosDAO,
    exact: true,
    component: NervosDAO,
  },
]

const MainContent = () => {
  const history = useHistory()
  const {
    app: { isAllowedToFetchList = true },
    wallet: { id: walletID = '' },
    chain,
    settings: { networks = [] },
  } = useGlobalState()
  const dispatch = useDispatch()
  const { networkID } = chain
  const [, i18n] = useTranslation()

  useSubscription({
    walletID,
    chain,
    isAllowedToFetchList,
    history,
    dispatch,
  })

  const chainURL = useMemo(() => {
    const network = networks.find(n => n.id === networkID)
    return network ? network.remote : ''
  }, [networks, networkID])

  useSyncChainData({
    chainURL,
    dispatch,
  })

  useOnCurrentWalletChange({
    walletID,
    chain,
    i18n,
    history,
    dispatch,
  })

  return (
    <>
      {mainContents.map(container => (
        <Route
          exact={container.exact}
          path={`${container.path}${container.params || ''}`}
          key={container.name}
          component={container.component}
        />
      ))}
    </>
  )
}

MainContent.displayName = 'Main'

export default MainContent
