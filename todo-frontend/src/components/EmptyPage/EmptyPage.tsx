import type { JSX } from "react"
import "./EmptyPage.scss"

import emptyPageImg from "../../assets/empty-page.png"


export const EmptyPage = (): JSX.Element => {
  return (
    <>
      <section className="empty__page">
        <div className="container">
          <div className="empty__page-inner">
            <div>
              <img src={emptyPageImg} alt="empty_state" className="empty__page-img" />
            </div>

            <p className="empty__page-title">You don’t have any tasks yet</p>
            <p className="empty__page-subtitle">Create tasks and organize your to-do items</p>
          </div>
        </div>
      </section>
    </>
  )
}
