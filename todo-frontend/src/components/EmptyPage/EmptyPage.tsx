import type { JSX } from "react"
import { ClipboardList } from "lucide-react"
import "./EmptyPage.scss"

export const EmptyPage = (): JSX.Element => {
  return (
    <section className="empty-page">
      <div className="container">
        <div className="empty-page__card">
          <div className="empty-page__icon">
            <ClipboardList size={48} />
          </div>

          <h2 className="empty-page__title">You don't have any tasks yet</h2>
          <p className="empty-page__subtitle">
            Create tasks and organize your to-do items
          </p>
        </div>
      </div>
    </section>
  )
}
