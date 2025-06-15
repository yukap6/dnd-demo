'use client'

import { useEffect, useRef } from 'react'
import classnames from 'classnames'
import styles from './index.module.scss'

export default function Animate() {
  const boxRef = useRef(null)

  const animationRef = useRef(null) // 保存动画实例

  // 初始化动画
  const initAnimation = () => {
    if (!boxRef.current || animationRef.current) return

    // 关键帧定义
    const keyframes = [
      { transform: 'translateX(200px)', opacity: 1 },
      { transform: 'translateX(400px)', opacity: 0.5 },
    ]

    // 动画配置
    const options = {
      duration: 1000,
      iterations: Infinity, // 无限循环
      direction: 'alternate', // 往返运动
    }

    // 创建动画并保存实例
    animationRef.current = boxRef.current.animate(keyframes, options)
    animationRef.current.pause() // 默认暂停
  }

  // 播放/暂停控制
  const toggleAnimation = () => {
    if (!animationRef.current) initAnimation()

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    animationRef.current.playState === 'paused'
      ? animationRef.current.play()
      : animationRef.current.pause()
  }

  useEffect(() => {
    // const box = document.getElementById('box')
    // let position = 0
    // function animate() {
    //   position += 1
    //   box.style.left = position + 'px'
    //   if (position < 200) requestAnimationFrame(animate) // 递归调用
    // }
    // animate()
    // box.animate(
    //   [{ transform: 'translateX(0)' }, { transform: 'translateX(300px)' }],
    //   { duration: 1000, iterations: Infinity } // 无限循环
    // )
  }, [])

  return (
    <>
      <div className={classnames(styles.animate, 'flex gap-2 p-4 relative')}>
        <button className={classnames(styles.btn, styles.default)}>测试按钮</button>
        <button className={classnames(styles.btn, styles.green, styles.element)}>
          我是一个无限循环的动画
        </button>
        <button id="box" ref={boxRef} className={classnames(styles.btn, styles.green, 'absolute')}>
          requestAnimation动画
        </button>
      </div>
      <div className="flex gap-2">
        <button onClick={toggleAnimation}>暂停</button>
        <button onClick={toggleAnimation}>播放</button>
      </div>
    </>
  )
}
