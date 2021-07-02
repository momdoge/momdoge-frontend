import { BscConnector } from '@binance-chain/bsc-connector'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { ConnectorNames, getChainId } from 'alium-uikit/src'
import { networksDev, networksProd } from '../alium-uikit/src/widgets/WalletModal/config'
// import Web3 from 'web3'
import getNodeUrl from './getRpcUrl'

export const getConnectorsByName = (connectorID: ConnectorNames) => {
  const POLLING_INTERVAL = 12000
  const chainId = getChainId()
  const rpcUrl = getNodeUrl(chainId)

  // const isDev = process.env.NODE_ENV === 'development'
  const isDev = true
  const networks = isDev ? networksDev : networksProd

  const supported = networks.find((network) => network.chainId === chainId)
  const supportedId = supported?.chainId

  const injected = new InjectedConnector({ supportedChainIds: [supportedId] })

  const walletconnect = new WalletConnectConnector({
    rpc: { [supportedId]: rpcUrl as string },
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true,
    pollingInterval: POLLING_INTERVAL,
  })

  const bscConnector = new BscConnector({ supportedChainIds: [supportedId] })

  const connectorsByName: { [connectorName in ConnectorNames]: any } = {
    [ConnectorNames.Injected]: injected,
    [ConnectorNames.WalletConnect]: walletconnect,
    [ConnectorNames.BSC]: bscConnector,
    [ConnectorNames.TOKENPOCKET]: null,
  }

  return { chainId: supportedId, connector: connectorsByName[connectorID] }
}

export const getLibrary = (provider: any) => {
  return provider
}
