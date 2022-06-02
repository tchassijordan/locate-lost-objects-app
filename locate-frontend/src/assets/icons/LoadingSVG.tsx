import React from 'react'

export default function LoadingSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill='currentColor'
      className='text-white'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 16 16'
      {...props}>
      <path d='M8.821 13.185c.065.41-.215.799-.629.812a6 6 0 114.773-9.366c.232.343.082.797-.287.986-.37.188-.816.036-1.063-.297a4.5 4.5 0 10-3.658 7.18c.414.004.8.276.864.685z' />
    </svg>
  )
}
