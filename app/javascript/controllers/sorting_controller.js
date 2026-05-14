import { Controller } from "@hotwired/stimulus"
import Sortable from "sortablejs"

export default class extends Controller {
  connect() {
    this.sortable = Sortable.create(this.element, {
      animation: 150,
      swapThreshold: 0.4,
      onEnd: this.onEnd.bind(this)
    })
  }

  disconnect() {
    this.sortable.destroy()
  }

  onEnd(event) {
    const post_id = event.item.dataset.id
    const position = event.newIndex + 1 

    fetch(`/posts/${post_id}/bookmark`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
      },
      body: JSON.stringify({ position })
    })
  }
}
