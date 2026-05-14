import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["message"]

  connect() {
    requestAnimationFrame(() => {
      if (!this.hasMessageTarget) return
      this.messageTarget.classList.add("visible")
      this.hideTimer = setTimeout(() => {
        this.messageTarget.classList.remove("visible")
      }, 4000)
    })
  }

  disconnect() {
    clearTimeout(this.hideTimer)
  }
}
