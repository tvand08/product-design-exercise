class AddColumnsToBookmarks < ActiveRecord::Migration[8.1]
  def change
    add_column :bookmarks, :title, :string, null: true
    add_column :bookmarks, :position, :integer
  end
end
