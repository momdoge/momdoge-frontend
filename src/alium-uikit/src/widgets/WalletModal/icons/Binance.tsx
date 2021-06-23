import React from 'react'
import Svg from '../../../components/Svg/Svg'
import { SvgProps } from '../../../components/Svg/types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M8.50409 10.5638L11.9997 7.06828L15.4972 10.5656L17.5312 8.53162L11.9997 3L6.47009 8.52977L8.50409 10.5638Z"
        fill="#F3BA2F"
      />
      <path d="M7.0679 11.9995L5.03394 9.96558L2.99987 11.9996L5.03384 14.0336L7.0679 11.9995Z" fill="#F3BA2F" />
      <path
        d="M8.50427 13.4363L11.9999 16.9318L15.4972 13.4346L17.5324 15.4674L17.5314 15.4686L11.9999 21L6.47013 15.4704L6.46729 15.4676L8.50427 13.4363Z"
        fill="#F3BA2F"
      />
      <path d="M18.9661 14.0347L21.0002 12.0006L18.9662 9.96665L16.9322 12.0007L18.9661 14.0347Z" fill="#F3BA2F" />
      <path
        d="M14.0629 11.9989H14.0637L11.9997 9.93494L10.4744 11.4603H10.4743L10.2991 11.6356L9.9376 11.9971L9.93475 11.9999L9.9376 12.0029L11.9997 14.0651L14.0637 12.0011L14.0647 11.9999L14.0629 11.9989Z"
        fill="#F3BA2F"
      />
    </Svg>
  )
}

export default Icon
