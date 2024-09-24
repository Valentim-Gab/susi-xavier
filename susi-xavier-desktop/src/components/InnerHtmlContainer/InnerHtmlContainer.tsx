import DOMPurify from 'dompurify'
import './InnerHtmlContainer.scss'

export default function InnerHtmlContainer({ html }: { html: string }) {
  const sanitizedHTML = DOMPurify.sanitize(html, {
    ALLOWED_ATTR: ['style', 'class', 'href', 'target', 'rel', 'src'],
  })

  return <div className='html-container' dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
}
