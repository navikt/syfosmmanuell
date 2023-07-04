import React, { ReactNode } from 'react'

interface MarginProps {
    children: ReactNode
    liten?: boolean
    stor?: boolean
}

const Margin = ({ children, liten, stor }: MarginProps) => {
    if (!children) {
        return null
    }

    const marginBottom = liten ? '1rem' : stor ? '4rem' : '2rem'

    return <div style={{ marginBottom }}>{children}</div>
}

export default Margin
