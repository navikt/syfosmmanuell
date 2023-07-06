'use client'

import React, { PropsWithChildren, ReactElement } from 'react'

import StoreProvider from '../data/store'
import { ModiaContext, ModiaContextError } from '../services/modiaService'

type Props = {
    modiaContext: ModiaContext | ModiaContextError
}

function Providers({ children, modiaContext }: PropsWithChildren<Props>): ReactElement {
    return <StoreProvider modiaContext={modiaContext}>{children}</StoreProvider>
}

export default Providers
