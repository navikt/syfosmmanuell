import 'next-logger'

import { Html, Main, NextScript, Head } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                <link
                    rel="preload"
                    href="https://cdn.nav.no/aksel/fonts/SourceSans3-normal.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
            </Head>
            <body className="bg-bg-subtle">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
