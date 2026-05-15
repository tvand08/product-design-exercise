class PagesController < ApplicationController
  def home
    @total_posts = Post.count
    @recent_posts = Post.includes(:bookmarks).order(created_at: :desc).limit(3)
    @bookmarked_posts = Post.includes(:bookmarks).joins(:bookmarks).order("bookmarks.position asc")
  end
end
