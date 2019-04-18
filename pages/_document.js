import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
      const initialProps = await Document.getInitialProps(ctx)
      return { ...initialProps }
    }
  
    render() {
      return (
        <html>
          <Head>
            <meta charSet="utf-8"/>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
            <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no,viewport-fit=cover"/>
            <link rel="stylesheet" href="/static/editorMd/css/editormd.css" />
            <link rel="stylesheet" href="/static/editorMd/css/editormd.css" />
            <script src="/static/editorMd/js/jquery.min.js"></script>
            <script src="/static/editorMd/editormd.min.js"></script>
          </Head>
          <body className="custom_class">
            <Main />
            <NextScript />
          </body>
        </html>
      )
    }
  }