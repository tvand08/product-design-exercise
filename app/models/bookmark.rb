class Bookmark < ApplicationRecord
  belongs_to :bookmarkable, polymorphic: true
  acts_as_list
end
