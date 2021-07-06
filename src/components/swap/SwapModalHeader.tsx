import { Trade, TradeType } from '@alium-official/sdk'
import { Button, ColoredArrowDownIcon, Text } from 'alium-uikit/src'
import React, { useContext, useMemo } from 'react'
import { AlertTriangle } from 'react-feather'
import styled, { ThemeContext } from 'styled-components'
import { toSignificantCurrency } from 'utils/currency/toSignificantCurrency'
import { Field } from '../../state/swap/actions'
import { isAddress, shortenAddress } from '../../utils'
import { computeSlippageAdjustedAmounts, computeTradePriceBreakdown, warningSeverity } from '../../utils/prices'
import { AutoColumn } from '../Column'
import CurrencyLogo from '../CurrencyLogo'
import { RowBetween, RowFixed } from '../Row'
import { TYPE } from '../Shared'
import { SwapShowAcceptChanges } from './styleds'

const { main: Main } = TYPE

const PriceInfoText = styled(Text)`
  line-height: 1.3;
  color: #8990a5;
  font-size: 14px;

  span {
    color: #6c5dd3;
    font-weight: 600;
  }
`

export default function SwapModalHeader({
  trade,
  allowedSlippage,
  recipient,
  showAcceptChanges,
  onAcceptChanges,
}: {
  trade: Trade
  allowedSlippage: number
  recipient: string | null
  showAcceptChanges: boolean
  onAcceptChanges: () => void
}) {
  const slippageAdjustedAmounts = useMemo(
    () => computeSlippageAdjustedAmounts(trade, allowedSlippage),
    [trade, allowedSlippage],
  )
  const { priceImpactWithoutFee } = useMemo(() => computeTradePriceBreakdown(trade), [trade])
  const priceImpactSeverity = warningSeverity(priceImpactWithoutFee)

  const theme = useContext(ThemeContext)

  return (
    <AutoColumn gap="md" style={{ marginTop: '20px' }}>
      <RowBetween
        align="flex-end"
        style={{
          backgroundColor: '#F5F7FF',
          borderRadius: '6px',
          height: '48px',
          placeItems: 'center',
          padding: '0 16px',
        }}
      >
        <RowFixed gap="0px">
          <CurrencyLogo currency={trade.inputAmount.currency} size="24px" style={{ marginRight: '12px' }} />
          <Text
            fontSize="14px"
            color={showAcceptChanges && trade.tradeType === TradeType.EXACT_OUTPUT ? theme.colors.primary : 'text'}
          >
            {toSignificantCurrency(trade.inputAmount)}
          </Text>
        </RowFixed>
        <RowFixed gap="0px">
          <Text fontSize="14px" style={{ marginLeft: '10px', fontWeight: 500 }}>
            {trade.inputAmount.currency.symbol}
          </Text>
        </RowFixed>
      </RowBetween>
      <RowFixed>
        <ColoredArrowDownIcon width="24px" style={{ marginLeft: '16px' }} />
      </RowFixed>
      <RowBetween
        align="flex-end"
        style={{
          backgroundColor: '#F5F7FF',
          borderRadius: '6px',
          height: '48px',
          placeItems: 'center',
          padding: '0 16px',
        }}
      >
        <RowFixed gap="0px">
          <CurrencyLogo currency={trade.outputAmount.currency} size="24px" style={{ marginRight: '12px' }} />
          <Text
            fontSize="14px"
            style={{ marginLeft: '10px', fontWeight: 500 }}
            color={
              priceImpactSeverity > 2
                ? theme.colors.failure
                : showAcceptChanges && trade.tradeType === TradeType.EXACT_INPUT
                ? theme.colors.primary
                : 'text'
            }
          >
            {toSignificantCurrency(trade.outputAmount)}
          </Text>
        </RowFixed>
        <RowFixed gap="0px">
          <Text fontSize="14px" style={{ marginLeft: '10px', fontWeight: 500 }}>
            {trade.outputAmount.currency.symbol}
          </Text>
        </RowFixed>
      </RowBetween>
      {showAcceptChanges ? (
        <SwapShowAcceptChanges justify="flex-start" gap="0px">
          <RowBetween>
            <RowFixed>
              <AlertTriangle size={20} style={{ marginRight: '8px', minWidth: 24 }} />
              <Main color={theme.colors.primary} style={{ fontSize: '14px' }}>
                {' '}
                Price Updated
              </Main>
            </RowFixed>
            <Button onClick={onAcceptChanges}>Accept</Button>
          </RowBetween>
        </SwapShowAcceptChanges>
      ) : null}
      <AutoColumn justify="flex-start" gap="sm" style={{ padding: '16px 0 0' }}>
        {trade.tradeType === TradeType.EXACT_INPUT ? (
          <PriceInfoText>
            {`Output is estimated. You will receive at least `}
            <span>
              {toSignificantCurrency(slippageAdjustedAmounts[Field.OUTPUT])} {trade.outputAmount.currency.symbol}
            </span>
            {' or the transaction will revert.'}
          </PriceInfoText>
        ) : (
          <PriceInfoText>
            {`Input is estimated. You will sell at most `}
            <span>
              {toSignificantCurrency(slippageAdjustedAmounts[Field.INPUT])} {trade.inputAmount.currency.symbol}
            </span>
            {' or the transaction will revert.'}
          </PriceInfoText>
        )}
      </AutoColumn>
      {recipient !== null ? (
        <AutoColumn justify="flex-start" gap="sm" style={{ padding: '16px 0 0' }}>
          <Main>
            Output will be sent to{' '}
            <b title={recipient}>{isAddress(recipient) ? shortenAddress(recipient) : recipient}</b>
          </Main>
        </AutoColumn>
      ) : null}
    </AutoColumn>
  )
}
