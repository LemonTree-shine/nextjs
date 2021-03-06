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
            <meta http-equiv="x-dns-prefetch-control" content="on"></meta>
            <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no,viewport-fit=cover"/>
            <link rel="stylesheet" href="/static/editorMd/css/editormd.css" />
            <link rel="stylesheet" href="/static/editorMd/css/editormd.css" />
            <script src="/static/editorMd/js/jquery.min.js"></script>

            <script src="/static/editorMd/lib/marked.min.js"></script>
            <script src="/static/editorMd/lib/prettify.min.js"></script>
            <script src="/static/editorMd/lib/raphael.min.js"></script>
            <script src="/static/editorMd/lib/underscore.min.js"></script>
            <script src="/static/editorMd/lib/sequence-diagram.min.js"></script>
            <script src="/static/editorMd/lib/flowchart.min.js"></script>
            <script src="/static/editorMd/lib/jquery.flowchart.min.js"></script>

            <script src="/static/editorMd/editormd.min.js"></script>
            <link rel="dns-prefetch" href="//www.xiaogangji.com"></link>
            <script src="http://yx-web.nos.netease.com/official/websdk/NIM_Web_SDK_v4.8.0.js"></script>
            
            <script src="//at.alicdn.com/t/font_1468772_7h1usuv0gac.js"></script>
          </Head>
          <body className="custom_class">
            <Main />
            <NextScript />
          </body>
        </html>
      )
    }
  }