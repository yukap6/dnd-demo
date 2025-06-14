'use client'

import React from 'react'
import classnames from 'classnames'

interface IProps {
  icon: React.ReactNode
  title: string
  isDisabled?: boolean
  onClick?: () => void
}

export default function NavIcon(props: IProps) {
  const { onClick = () => {}, icon = null, title = '', isDisabled = false } = props
  return (
    <button
      className={classnames(
        'nav-icon inline-flex flex-col justify-center items-center cursor-pointer',
        { 'opacity-30 cursor-not-allowed bg-white-50': isDisabled }
      )}
      onClick={onClick}
    >
      <div className="size-6">{icon}</div>
      {title}
    </button>
  )
}
