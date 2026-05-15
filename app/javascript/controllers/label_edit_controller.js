import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["display", "editor", "input"]
  static values = { url: String }

  edit() {
    this.element.classList.add("editing")
    this.displayTarget.classList.add("d-none")
    this.editorTarget.classList.remove("d-none")
    this.inputTarget.select()
  }

  cancel() {
    this.editorTarget.classList.add("d-none")
    this.displayTarget.classList.remove("d-none")
    this.element.classList.remove("editing")
  }

  destroy() {
    fetch(this.urlValue, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
      },
      body: JSON.stringify({ bookmark_title: "" })
    }).then(response => {
      if (response.ok) this.element.remove()
    })
  }

  save() {
    const value = this.inputTarget.value.trim()
    if (!value) { this.inputTarget.focus(); return }

    fetch(this.urlValue, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
      },
      body: JSON.stringify({ bookmark_title: value })
    }).then(response => {
      if (response.ok) {
        this.displayTarget.textContent = value
        this.inputTarget.value = value
        this.cancel()
      }
    })
  }
}
