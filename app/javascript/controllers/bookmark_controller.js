import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["message", "label", "naming", "input"]
  static values = { url: String }

  connect() {
    if (this.triggered) return
    this.triggered = true

    requestAnimationFrame(() => {
      if (!this.hasMessageTarget) return
      this.messageTarget.classList.add("visible")
      this.hideTimer = setTimeout(() => this.#hide(), 4000)
    })
  }

  disconnect() {
    clearTimeout(this.hideTimer)
  }

  openNaming() {
    clearTimeout(this.hideTimer)
    this.labelTarget.classList.add("d-none")
    this.namingTarget.classList.remove("d-none")
    this.messageTarget.classList.add("naming")
    this.inputTarget.focus()
  }

  confirmName() {
    const title = this.inputTarget.value.trim()
    if (!title) { this.inputTarget.focus(); return }

    fetch(this.urlValue, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content,
        "Accept": "text/vnd.turbo-stream.html"
      },
      body: JSON.stringify({ bookmark_title: title })
    }).then(r => r.text())
      .then(html => {
        this.#hide()
        Turbo.renderStreamMessage(html)
      })
  }

  denyName() {
    this.namingTarget.classList.add("d-none")
    this.messageTarget.classList.remove("naming")
    this.labelTarget.classList.remove("d-none")
    this.hideTimer = setTimeout(() => this.#hide(), 2000)
  }

  #hide() {
    this.messageTarget.classList.remove("visible", "naming")
  }
}
